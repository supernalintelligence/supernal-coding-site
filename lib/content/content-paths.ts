import path from 'path';

/**
 * Content section paths - maps URL paths to filesystem paths
 * All content is now served from docs/ directory (installed via sc init)
 */
export const CONTENT_PATHS = {
  // Blog: Read from docs/blog
  blog: path.join(process.cwd(), 'docs', 'blog'),

  // Main documentation
  docs: path.join(process.cwd(), 'docs'),

  // Guides: Subset of docs
  guides: path.join(process.cwd(), 'docs', 'guides'),

  // Workflow/SOPs
  workflow: path.join(process.cwd(), 'docs', 'workflow'),

  // CLI commands documentation (within guides)
  cli: path.join(process.cwd(), 'docs', 'guides', 'cli-commands'),

  // Compliance frameworks
  compliance: path.join(process.cwd(), 'docs', 'compliance'),

  // Architecture
  architecture: path.join(process.cwd(), 'docs', 'architecture'),

  // Planning (epics, roadmap, kanban)
  planning: path.join(process.cwd(), 'docs', 'planning'),

  // Features
  features: path.join(process.cwd(), 'docs', 'features'),
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
 * (internal content not for public documentation)
 */
export function shouldExclude(relativePath: string): boolean {
  const excludePatterns = [
    '/archive/',
    '/deprecated/',
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
      path: '/docs/guides',
      description: 'Step-by-step guides and tutorials',
    },
    {
      id: 'workflow',
      name: 'Workflow',
      path: '/docs/workflow',
      description: 'SOPs and workflow documentation',
    },
    {
      id: 'cli',
      name: 'CLI Reference',
      path: '/docs/guides/cli-commands',
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
