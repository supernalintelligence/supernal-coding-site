import fs from 'fs/promises';
import path from 'path';
import { logger } from '../logger';
import { readPagesConfig, PagesConfig } from './pages-config';
import { getContentPath } from './content-paths';

export interface SidebarItem {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  order?: number;
  children?: SidebarItem[];
  collapsed?: boolean;
}

/**
 * Build sidebar structure from filesystem
 * @param sectionId The section to build sidebar for (e.g., 'docs')
 * @param relativePath Optional relative path within section
 * @returns Array of sidebar items
 */
export async function buildSidebarFromFilesystem(
  sectionId: string = 'docs',
  relativePath: string = ''
): Promise<SidebarItem[]> {
  try {
    const sectionPath = getContentPath(sectionId as any);
    const targetPath = relativePath
      ? path.join(sectionPath, relativePath)
      : sectionPath;

    logger.info(
      `[buildSidebarFromFilesystem] Building sidebar for ${targetPath}`
    );

    // Read .pages config if it exists
    const pagesConfig = await readPagesConfig(targetPath);

    // Read directory entries
    const entries = await fs.readdir(targetPath, { withFileTypes: true });

    const items: SidebarItem[] = [];

    // Directories to exclude from public sidebar
    const EXCLUDE_DIRS = [
      'archive',
      'deprecated',
      'features',
      'planning',
      'handoffs',
      'research_and_analysis',
      'internal',
      'tests',
      'design',
      'business',
      'evaluations',
      'requirements', // Internal requirements, not public docs
      'blog', // Blog is a top-level section, not part of docs sidebar
      'cli', // CLI reference is shown separately
    ];

    // Process directories and markdown files
    for (const entry of entries) {
      // Skip hidden files and directories
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) {
        continue;
      }

      // Skip excluded directories (case-insensitive)
      if (EXCLUDE_DIRS.includes(entry.name.toLowerCase())) {
        continue;
      }

      const entryPath = path.join(targetPath, entry.name);
      const relativeEntryPath = relativePath
        ? path.join(relativePath, entry.name)
        : entry.name;

      if (entry.isDirectory()) {
        // Check if directory has an index.md
        const indexPath = path.join(entryPath, 'index.md');
        let hasIndex = false;
        let title = formatTitle(entry.name);
        let icon: string | undefined = getDefaultIcon(entry.name);

        try {
          await fs.access(indexPath);
          hasIndex = true;

          // Read frontmatter from index.md to get title and icon
          const indexContent = await fs.readFile(indexPath, 'utf-8');
          const frontmatterMatch = indexContent.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const titleMatch = frontmatter.match(
              /^title:\s*['"]?([^\n'"]+)['"]?$/m
            );
            const iconMatch = frontmatter.match(
              /^icon:\s*['"]?([^\n'"]+)['"]?$/m
            );
            if (titleMatch) title = titleMatch[1];
            if (iconMatch) icon = iconMatch[1];
          }
        } catch (error) {
          // No index.md, continue
        }

        // Recursively build children
        const children = await buildSidebarFromFilesystem(
          sectionId,
          relativeEntryPath
        );

        // Generate URL path using slashes (matching Next.js dynamic routing)
        // Lowercase to match slug normalization in content system
        const urlPath = hasIndex
          ? `/docs/${relativeEntryPath.toLowerCase()}`
          : undefined;

        items.push({
          id: entry.name,
          title,
          path: urlPath,
          icon,
          children: children.length > 0 ? children : undefined,
          collapsed: false, // Default to not collapsed
        });
      } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
        // It's a markdown file
        const fileName = entry.name.replace(/\.md$/, '');
        let title = formatTitle(fileName);
        let order: number | undefined;

        // Read frontmatter to get title and order
        try {
          const content = await fs.readFile(entryPath, 'utf-8');
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const titleMatch = frontmatter.match(
              /^title:\s*['"]?([^\n'"]+)['"]?$/m
            );
            const orderMatch = frontmatter.match(/^order:\s*(\d+)$/m);
            if (titleMatch) title = titleMatch[1];
            if (orderMatch) order = parseInt(orderMatch[1], 10);
          }
        } catch (error) {
          logger.warn(`Could not read frontmatter from ${entryPath}`);
        }

        // Generate URL path using slashes (matching Next.js dynamic routing)
        // Lowercase to match slug normalization in content system
        const urlPath = `/docs/${relativeEntryPath.replace(/\.md$/, '').toLowerCase()}`;

        items.push({
          id: fileName,
          title,
          path: urlPath,
          order,
        });
      }
    }

    // Sort items by order from .pages config, then by order field, then alphabetically
    const sortedItems = sortSidebarItems(items, pagesConfig);

    return sortedItems;
  } catch (error) {
    logger.error(`Error building sidebar for ${sectionId}: ${error}`);
    return [];
  }
}

/**
 * Sort sidebar items based on .pages config and frontmatter order
 */
function sortSidebarItems(
  items: SidebarItem[],
  pagesConfig: PagesConfig | null
): SidebarItem[] {
  if (pagesConfig?.nav) {
    // Use .pages nav order
    const orderedItems: SidebarItem[] = [];
    const itemMap = new Map(items.map((item) => [item.id, item]));
    const remainingItems = new Set(items);

    for (const navItem of pagesConfig.nav) {
      if (navItem === '...') {
        // Add all remaining items sorted by order/alphabetically
        const remaining = Array.from(remainingItems).sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          if (a.order !== undefined) return -1;
          if (b.order !== undefined) return 1;
          return a.title.localeCompare(b.title);
        });
        orderedItems.push(...remaining);
        break;
      } else {
        // Handle both 'file.md' and 'file' formats
        const navItemWithoutExt = navItem.replace(/\.md$/, '');
        const item = itemMap.get(navItem) || itemMap.get(navItemWithoutExt);
        if (item) {
          orderedItems.push(item);
          remainingItems.delete(item);
        }
      }
    }

    // Add any remaining items not in nav
    if (!pagesConfig.nav.includes('...')) {
      const remaining = Array.from(remainingItems).sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        return a.title.localeCompare(b.title);
      });
      orderedItems.push(...remaining);
    }

    return orderedItems;
  }

  // No .pages config, sort by order field then alphabetically
  return items.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Format a filename into a human-readable title
 * Handles ALL CAPS filenames by converting to Title Case
 */
function formatTitle(filename: string): string {
  // Replace dashes and underscores with spaces
  let title = filename.replace(/[-_]/g, ' ');

  // Check if the title is mostly uppercase (screaming case)
  const isScreaming = title === title.toUpperCase() && title.length > 3;

  if (isScreaming) {
    // Convert SCREAMING CASE to Title Case
    title = title
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } else {
    // Normal title case conversion
    title = title
      .split(' ')
      .map((word) => {
        // Keep acronyms like API, CLI, etc.
        if (word.length <= 3 && word === word.toUpperCase()) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

  return title;
}

/**
 * Get default icon name for a folder based on name
 * Returns Lucide icon name for use in the sidebar component
 */
function getDefaultIcon(folderName: string): string | undefined {
  const iconMap: Record<string, string> = {
    guides: 'BookOpen',
    'getting-started': 'Rocket',
    workflow: 'GitBranch',
    sops: 'ClipboardList',
    compliance: 'Shield',
    architecture: 'Boxes',
    reference: 'Link',
    'cli-commands': 'Terminal',
    requirements: 'FileText',
    features: 'Sparkles',
    components: 'Puzzle',
    decisions: 'Target',
    patterns: 'Repeat',
    processes: 'Settings',
    frameworks: 'Package',
    system: 'Server',
    general: 'FileText',
  };
  return iconMap[folderName.toLowerCase()];
}
