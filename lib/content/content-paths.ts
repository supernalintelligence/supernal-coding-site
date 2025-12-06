import path from 'path';
import fs from 'fs';

/**
 * Content section paths - maps URL paths to filesystem paths
 * Each section checks for build-time content/ first, then falls back to workspace
 */
export const CONTENT_PATHS = {
  // Blog: Read from local docs/blog (copied from Docusaurus)
  blog: path.join(process.cwd(), 'docs', 'blog'),

  // Docs: Read from workspace docs directory (../../docs)
  // In dev: Always use workspace
  // In build: Use content/ if it exists (from BUILD_WITH_CONTENT.sh)
  docs: (() => {
    const contentDir = path.join(process.cwd(), 'content', 'docs');
    if (fs.existsSync(contentDir)) {
      console.log('[content-paths] docs: Using build content:', contentDir);
      return contentDir;
    }
    const workspaceDocs = path.join(process.cwd(), '..', '..', 'docs');
    console.log('[content-paths] docs: Using workspace:', workspaceDocs);
    return workspaceDocs;
  })(),

  // Guides: Subset of docs (for navigation)
  guides: (() => {
    const contentDir = path.join(process.cwd(), 'content', 'docs', 'guides');
    if (fs.existsSync(contentDir)) {
      return contentDir;
    }
    return path.join(process.cwd(), '..', '..', 'docs', 'guides');
  })(),

  // Workflow/SOPs: Public-facing SOPs
  workflow: (() => {
    const contentDir = path.join(process.cwd(), 'content', 'docs', 'workflow');
    if (fs.existsSync(contentDir)) {
      return contentDir;
    }
    return path.join(process.cwd(), '..', '..', 'docs', 'workflow');
  })(),

  // CLI commands documentation
  cli: (() => {
    const contentDir = path.join(
      process.cwd(),
      'content',
      'docs',
      'guides',
      'cli-commands'
    );
    if (fs.existsSync(contentDir)) {
      return contentDir;
    }
    return path.join(
      process.cwd(),
      '..',
      '..',
      'docs',
      'guides',
      'cli-commands'
    );
  })(),

  // Compliance frameworks
  compliance: (() => {
    const contentDir = path.join(
      process.cwd(),
      'content',
      'docs',
      'compliance'
    );
    if (fs.existsSync(contentDir)) {
      return contentDir;
    }
    return path.join(process.cwd(), '..', '..', 'docs', 'compliance');
  })(),

  // Architecture (public subset)
  architecture: (() => {
    const contentDir = path.join(
      process.cwd(),
      'content',
      'docs',
      'architecture'
    );
    if (fs.existsSync(contentDir)) {
      return contentDir;
    }
    return path.join(process.cwd(), '..', '..', 'docs', 'architecture');
  })(),
} as const;

/**
 * Get the absolute path for a content section
 */
export function getContentPath(section: keyof typeof CONTENT_PATHS): string {
  return CONTENT_PATHS[section];
}

/**
 * Get the content path for a specific file
 */
export function getContentFilePath(
  section: keyof typeof CONTENT_PATHS,
  relativePath: string
): string {
  return path.join(CONTENT_PATHS[section], relativePath);
}

/**
 * Resolve a section from a URL path
 * e.g., /docs/guides/getting-started -> 'docs'
 *       /blog/my-post -> 'blog'
 */
export function resolveSection(
  urlPath: string
): keyof typeof CONTENT_PATHS | null {
  const segments = urlPath.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && firstSegment in CONTENT_PATHS) {
    return firstSegment as keyof typeof CONTENT_PATHS;
  }

  return null;
}

/**
 * Check if a section should be excluded from docs
 * (matches Docusaurus exclude patterns)
 */
export function shouldExclude(relativePath: string): boolean {
  const excludePatterns = [
    '/archive/',
    '/deprecated/',
    '/features/', // Internal feature development
    '/planning/', // Internal project management
    '/handoffs/', // Internal agent communication
    '/research_and_analysis/', // Internal research
  ];

  return excludePatterns.some((pattern) => relativePath.includes(pattern));
}

/**
 * Get all content sections available for navigation
 */
export function getNavigationSections(): Array<{
  id: string;
  name: string;
  path: string;
  description: string;
}> {
  return [
    {
      id: 'docs',
      name: 'Documentation',
      path: '/docs',
      description: 'Complete documentation for using Supernal Coding',
    },
    {
      id: 'guides',
      name: 'Guides',
      path: '/guides',
      description: 'Step-by-step guides and tutorials',
    },
    {
      id: 'cli',
      name: 'CLI Reference',
      path: '/cli',
      description: 'Command-line interface documentation',
    },
    {
      id: 'blog',
      name: 'Blog',
      path: '/blog',
      description: 'Latest updates and insights',
    },
  ];
}
