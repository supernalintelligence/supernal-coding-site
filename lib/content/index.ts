import path from 'path';
import {
  readDirectoryRecursively,
  readMarkdownFile,
  getContentDirectory,
  getAbsolutePath,
} from './filesystem';
import {
  parseFrontmatter,
  markdownToHtml,
  generateExcerpt,
  PostMetadata,
  splitMarkdownIntoSegments,
  ChatSegmentMetadata,
} from './markdown';
import { generateSlug } from './slugs';
import { logger } from '../logger';
import { cache } from 'react';
import NodeCache from 'node-cache';
import { collectFolderConfigs } from './pages-config';
import { mergeFrontmatter } from './frontmatter-merge';

// Create a server-side cache with a default TTL of 5 minutes (300 seconds) in development, 10 minutes in production
const contentCache = new NodeCache({
  stdTTL: process.env.NODE_ENV === 'production' ? 600 : 300, // 10 min prod, 5 min dev
});

// Cache key prefixes
const CACHE_KEYS = {
  ALL_CONTENT: 'all_content',
  POST_BY_SLUG: 'post_by_slug:',
  CHILD_POSTS: 'child_posts:',
  SECTION_CONTENT: 'section_content:',
};

// Define a plain object type for chat segments to pass to client components
export interface ChatSegmentData {
  content: string; // Processed HTML
  metadata: ChatSegmentMetadata;
  index: number;
}

export interface Post {
  slug: string;
  path: string[];
  content: string;
  html: string;
  excerpt: string;
  metadata: PostMetadata;
  isIndex: boolean;
  childPosts: Post[];
  childSlugs: string[];
  parentSlug?: string;
  sectionId?: string;
  sectionName?: string;
  displayStyle: string;
  // Use the plain data interface here
  chatSegmentsHtml?: ChatSegmentData[];
}

/**
 * Process a single markdown file into a Post object
 * @param filePath The path to the markdown file
 * @returns The processed Post object
 */
export async function processMarkdownFile(
  filePath: string
): Promise<Post | null> {
  try {
    const absolutePath = getAbsolutePath(filePath);
    const content = await readMarkdownFile(absolutePath);

    if (!content) {
      return null;
    }

    // Parse frontmatter
    const { metadata: fileFrontmatter, content: markdownContent } =
      parseFrontmatter(content);

    // Skip files without valid frontmatter (requiring at least title)
    if (
      !fileFrontmatter ||
      typeof fileFrontmatter !== 'object' ||
      !fileFrontmatter.title
    ) {
      logger.warn(
        `Skipping file ${filePath} - missing required frontmatter (title)`
      );
      return null;
    }

    // Skip draft posts
    if (fileFrontmatter.draft === true) {
      logger.info(`Skipping draft post: ${filePath}`);
      return null;
    }

    // Collect folder-level configs and merge with file frontmatter
    const folderConfigs = await collectFolderConfigs(absolutePath);

    // Merge configs from general to specific, with file frontmatter taking final precedence
    let mergedMetadata = fileFrontmatter;

    if (folderConfigs.length > 0) {
      // Start with the most general config (last in array)
      let baseDefaults: Partial<PostMetadata> = {};

      // Merge folder configs from general to specific
      for (let i = folderConfigs.length - 1; i >= 0; i--) {
        const config = folderConfigs[i];
        if (config.defaults) {
          baseDefaults = mergeFrontmatter(
            baseDefaults,
            config.defaults as PostMetadata
          ) as Partial<PostMetadata>;
        }
      }

      // Finally merge with file-level frontmatter (file takes precedence)
      if (Object.keys(baseDefaults).length > 0) {
        mergedMetadata = mergeFrontmatter(baseDefaults, fileFrontmatter);
        logger.debug(
          `[Frontmatter Merge: ${filePath}] Applied ${folderConfigs.length} folder config(s)`
        );
      }
    }

    const metadata = mergedMetadata;

    // --- DEBUG LOG: Check parsed metadata ---
    logger.info(
      `[Metadata Check: ${filePath}] Parsed render_as: '${metadata.render_as}'`
    );
    // --- END DEBUG LOG ---
    const excerpt = await generateExcerpt(markdownContent, 160, filePath);

    let html = '';
    // Initialize with the correct type
    let chatSegmentsHtml: ChatSegmentData[] | undefined = undefined;

    if (metadata.render_as === 'chat') {
      const segments = splitMarkdownIntoSegments(markdownContent);
      chatSegmentsHtml = [];
      logger.info(
        `[Chat Processing: ${filePath}] Found ${segments.length} raw segments.`
      ); // Log segment count
      for (const segment of segments) {
        // --- DEBUG LOG ---
        logger.info(
          `[Chat Processing: ${filePath}] Segment ${segment.index} Raw Markdown:\n---\n${segment.rawMarkdown}\n---`
        );
        logger.info(
          `[Chat Processing: ${filePath}] Segment ${segment.index} Metadata: ${JSON.stringify(segment.metadata)}`
        );
        // --- END DEBUG LOG ---

        const segmentHtml = await markdownToHtml(segment.rawMarkdown, filePath);
        chatSegmentsHtml.push({
          content: segmentHtml,
          index: segment.index,
          metadata: segment.metadata,
        });
      }
    } else {
      html = await markdownToHtml(markdownContent, filePath);
    }

    // Generate slug from file path
    const slug = generateSlug(filePath);

    // Determine if this is an index file (more comprehensive check)
    const isIndex =
      filePath.endsWith('index.md') ||
      filePath.endsWith('index.mdx') ||
      slug.endsWith('/index') ||
      slug === 'index';

    // Get the path segments (more robust handling)
    const pathSegments = slug.split('/').filter(Boolean);
    const normalizedPath = pathSegments.join('/');

    // Get the parent slug (enhanced for nested collections)
    let parentSlug: string | undefined;
    if (isIndex) {
      // For index files, parent is one level up
      parentSlug = pathSegments.slice(0, -2).join('/') || undefined;
    } else {
      // For regular files, parent is the current directory
      parentSlug = pathSegments.slice(0, -1).join('/') || undefined;
    }

    // Get the section ID (first path segment)
    const sectionId = pathSegments[0] || '';

    // Create the post object with enhanced collection support
    const post: Post = {
      slug: isIndex ? normalizedPath.replace(/\/index$/, '') : normalizedPath,
      path: pathSegments,
      content: markdownContent,
      html,
      excerpt,
      metadata,
      isIndex,
      childPosts: [],
      childSlugs: [],
      parentSlug,
      sectionId,
      sectionName: sectionId,
      displayStyle: isIndex ? 'collection' : 'standard',
      chatSegmentsHtml,
    };

    return post;
  } catch (error) {
    logger.error(`Error processing markdown file ${filePath}: ${error}`);
    return null;
  }
}

/**
 * Build parent-child relationships between posts
 * @param posts The array of posts to process
 * @returns The processed posts with parent-child relationships
 */
export function buildPostRelationships(posts: Post[]): Post[] {
  // Create a map of slugs to posts for quick lookup
  const postMap = new Map<string, Post>();
  posts.forEach((post) => {
    postMap.set(post.slug, post);
  });

  // Build parent-child relationships
  posts.forEach((post) => {
    // Get all potential parent slugs by walking up the path
    const slugParts = post.slug.split('/');
    for (let i = slugParts.length - 1; i > 0; i--) {
      const potentialParentSlug = slugParts.slice(0, i).join('/');
      const parentPost = postMap.get(potentialParentSlug);

      if (parentPost) {
        // Found the immediate parent
        post.parentSlug = parentPost.slug;
        if (!parentPost.childSlugs.includes(post.slug)) {
          parentPost.childSlugs.push(post.slug);
        }
        break;
      }
    }
  });

  // Populate childPosts arrays
  posts.forEach((post) => {
    post.childPosts = post.childSlugs
      .map((slug) => postMap.get(slug))
      .filter((post): post is Post => post !== undefined);
  });

  return posts;
}

/**
 * Get all content from a specific section
 * @param section The section to load (blog, docs, guides, etc.)
 * @returns An array of all posts in that section
 */
export async function getAllContentFromSection(
  section: string
): Promise<Post[]> {
  const cacheKey = `${CACHE_KEYS.SECTION_CONTENT}${section}`;

  // Check if content is already cached
  const cachedContent = contentCache.get(cacheKey);
  if (cachedContent) {
    return cachedContent as Post[];
  }

  // If not cached, process content and store in cache
  try {
    const contentDir = getContentDirectory(section);
    logger.info(`[getAllContentFromSection] Loading from: ${contentDir}`);

    const filePaths = await readDirectoryRecursively(contentDir);
    logger.info(
      `[getAllContentFromSection] Found ${filePaths.length} files in ${section}`
    );

    // Process all markdown files - prepend section directory
    const postsPromises = filePaths.map(async (filePath) => {
      // filePath is relative to contentDir, but processMarkdownFile expects it relative to getContentDirectory()
      // So we need to construct the correct relative path
      const fullPath = path.join(contentDir, filePath);

      // For processMarkdownFile, we need the path relative to the content directory it will use
      // Since getAbsolutePath will call getContentDirectory(), we need to make filePath relative to that
      // The easiest fix: directly read the file here
      try {
        const content = await readMarkdownFile(fullPath);
        if (!content) return null;

        // Use the original processMarkdownFile logic but with our paths
        const { metadata: fileFrontmatter, content: markdownContent } =
          parseFrontmatter(content);

        // If no frontmatter or no title, try to extract title from first heading
        let effectiveFrontmatter = fileFrontmatter || {};
        if (!effectiveFrontmatter.title) {
          const headingMatch = markdownContent.match(/^#\s+(.+)$/m);
          if (headingMatch) {
            effectiveFrontmatter = {
              ...effectiveFrontmatter,
              title: headingMatch[1].trim(),
            };
            logger.info(
              `Using heading as title for ${fullPath}: "${effectiveFrontmatter.title}"`
            );
          } else {
            // Use filename as title
            const fileName = path.basename(fullPath, path.extname(fullPath));
            effectiveFrontmatter = {
              ...effectiveFrontmatter,
              title: fileName.replace(/[-_]/g, ' '),
            };
            logger.info(
              `Using filename as title for ${fullPath}: "${effectiveFrontmatter.title}"`
            );
          }
        }
        const fileFrontmatterWithTitle = effectiveFrontmatter;

        if (fileFrontmatterWithTitle.draft === true) {
          logger.info(`Skipping draft post: ${fullPath}`);
          return null;
        }

        // Generate slug from relative path within section
        const slug = `${section}/${generateSlug(filePath)}`;

        const folderConfigs = await collectFolderConfigs(fullPath);
        let mergedMetadata = fileFrontmatterWithTitle;

        if (folderConfigs.length > 0) {
          let baseDefaults: Partial<PostMetadata> = {};
          for (let i = folderConfigs.length - 1; i >= 0; i--) {
            const config = folderConfigs[i];
            if (config.defaults) {
              baseDefaults = mergeFrontmatter(
                baseDefaults,
                config.defaults as Partial<PostMetadata>
              ) as Partial<PostMetadata>;
            }
          }
          if (Object.keys(baseDefaults).length > 0) {
            mergedMetadata = mergeFrontmatter(
              baseDefaults,
              fileFrontmatterWithTitle
            );
          }
        }

        const metadata = mergedMetadata as PostMetadata;
        const excerpt = await generateExcerpt(markdownContent, 160, fullPath);

        let html = '';
        let chatSegmentsHtml: ChatSegmentData[] | undefined = undefined;

        if (metadata.render_as === 'chat') {
          const segments = splitMarkdownIntoSegments(markdownContent);
          chatSegmentsHtml = [];
          for (const segment of segments) {
            const segmentHtml = await markdownToHtml(
              segment.rawMarkdown,
              fullPath
            );
            chatSegmentsHtml.push({
              content: segmentHtml,
              index: segment.index,
              metadata: segment.metadata,
            });
          }
        } else {
          html = await markdownToHtml(markdownContent, fullPath);
        }

        const isIndex =
          filePath.endsWith('index.md') || filePath.endsWith('index.mdx');
        const pathSegments = slug.split('/').filter(Boolean);
        let parentSlug: string | undefined;

        if (isIndex) {
          parentSlug = pathSegments.slice(0, -2).join('/') || undefined;
        } else {
          parentSlug = pathSegments.slice(0, -1).join('/') || undefined;
        }

        const post: Post = {
          slug: isIndex ? slug.replace(/\/index$/, '') : slug,
          path: pathSegments,
          content: markdownContent,
          html,
          excerpt,
          metadata,
          isIndex,
          childPosts: [],
          childSlugs: [],
          parentSlug,
          sectionId: section,
          sectionName: section,
          displayStyle: isIndex ? 'collection' : 'standard',
          chatSegmentsHtml,
        };

        return post;
      } catch (error) {
        logger.error(`Error processing file ${fullPath}: ${error}`);
        return null;
      }
    });

    // Wait for all promises to resolve
    const posts = (await Promise.all(postsPromises)).filter(
      (post): post is Post => post !== null
    );

    // Build parent-child relationships
    const processedPosts = buildPostRelationships(posts);

    // Store in cache before returning
    contentCache.set(cacheKey, processedPosts);
    return processedPosts;
  } catch (error) {
    logger.error(`Error getting content from section ${section}: ${error}`);
    return [];
  }
}

/**
 * Get all content with proper caching
 * @returns An array of all posts from all sections
 */
export async function getAllContent(): Promise<Post[]> {
  // Check if content is already cached
  const cachedContent = contentCache.get(CACHE_KEYS.ALL_CONTENT);
  if (cachedContent) {
    return cachedContent as Post[];
  }

  // Load content from blog and docs sections
  // Note: 'guides' is a subfolder within 'docs', not a separate section
  try {
    const blogPosts = await getAllContentFromSection('blog');
    const docsPosts = await getAllContentFromSection('docs');

    // Combine all posts
    const allPosts = [...blogPosts, ...docsPosts];

    // Store in cache before returning
    contentCache.set(CACHE_KEYS.ALL_CONTENT, allPosts);
    return allPosts;
  } catch (error) {
    logger.error(`Error getting all content: ${error}`);
    return [];
  }
}

/**
 * Get content for a specific section
 * @param section The section to get content for
 * @returns An array of posts in the section
 */
export async function getSectionContent(section: string): Promise<Post[]> {
  const allContent = await getAllContent();
  return allContent.filter((post) => post.sectionId === section);
}

/**
 * Get a specific post by slug
 * @param slug The slug to get the post for
 * @returns The post with the specified slug, or null if not found
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Check if post is already cached
  const cacheKey = `${CACHE_KEYS.POST_BY_SLUG}${slug}`;
  const cachedPost = contentCache.get(cacheKey);
  if (cachedPost) {
    return cachedPost as Post | null;
  }

  const allContent = await getAllContent();
  const post = allContent.find((post) => post.slug === slug) || null;

  // Cache the result
  contentCache.set(cacheKey, post);
  return post;
}

/**
 * Get all child posts for a given slug
 * @param slug The slug to get child posts for
 * @returns An array of child posts
 */
export async function getChildPosts(slug: string): Promise<Post[]> {
  const allContent = await getAllContent();
  return allContent.filter((post) => post.parentSlug === slug);
}

/**
 * Get all sections from the content directory
 * @returns An array of section objects
 */
export async function getSections(): Promise<{ id: string; name: string }[]> {
  try {
    // Hardcode sections based on CONTENT_PATHS
    // This is simpler and more reliable than trying to discover them
    const sections = [
      { id: 'blog', name: 'Blog' },
      { id: 'docs', name: 'Documentation' },
    ];

    return sections;
  } catch (error) {
    logger.error(`Error getting sections: ${error}`);
    return [];
  }
}

// Cache the content functions to avoid redundant filesystem reads
export const getCachedAllContent = cache(getAllContent);
export const getCachedSectionContent = cache(getSectionContent);
export const getCachedPostBySlug = cache(getPostBySlug);
export const getCachedChildPosts = cache(getChildPosts);
export const getCachedSections = cache(getSections);

// Function to clear cache when content changes
export function clearContentCache() {
  contentCache.flushAll();
}
