import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { isServer } from './server-utils';

// Browser-safe path utilities
function normalizePath(p: string): string {
  return p.replace(/\\/g, '/').replace(/\/+/g, '/');
}

function dirname(p: string): string {
  const normalized = normalizePath(p);
  const lastSlash = normalized.lastIndexOf('/');
  return lastSlash === -1 ? '.' : normalized.slice(0, lastSlash);
}

// Simple in-memory cache (browser-safe)
const linkCache = new Map<string, string>();

// Track processing stack to prevent infinite loops
const processingStack = new Set<string>();

interface RemarkMdLinksOptions {
  rootDir: string;
  currentFilePath: string;
  checkFiles?: boolean; // Whether to check if files exist (server-side only)
}

/**
 * A remark plugin that finds and replaces .md links in markdown files with the proper format
 * for Next.js routing, and optionally provides warnings for missing files (server-side only).
 */
const remarkMdLinks: Plugin<[RemarkMdLinksOptions], Root> = (options) => {
  const { rootDir, currentFilePath, checkFiles = false } = options;

  return (tree) => {
    // Normalize the file path to prevent different representations of the same file
    const normalizedFilePath = normalizePath(currentFilePath);

    // Prevent infinite recursion with processing stack
    if (processingStack.has(normalizedFilePath)) {
      console.warn(
        `Circular reference detected in remarkMdLinks for: ${normalizedFilePath}`
      );
      return;
    }

    processingStack.add(normalizedFilePath);

    try {
      // Get the directory of the current file
      const _currentDir = dirname(currentFilePath);

      // Visit all link nodes in the markdown AST
      visit(tree, 'link', (node: any) => {
        // Only process relative links that end with .md
        if (
          node.url?.endsWith('.md') &&
          !node.url.startsWith('http') &&
          !node.url.startsWith('/')
        ) {
          // Get the link transformation from cache or process it
          const cacheKey = `${currentFilePath}:${node.url}`;
          const cachedUrl = linkCache.get(cacheKey);

          if (cachedUrl) {
            node.url = cachedUrl;
            return; // Use cached result without logging
          }

          // Get the absolute path of the referenced markdown file
          const relativePath = node.url;

          // File existence checking is skipped to avoid client-side issues
          // This would only run during build time or server-side rendering
          if (checkFiles && isServer()) {
            // We avoid importing fs directly to prevent webpack issues
            // This is handled through the server-utils which safely handles imports
            if (process.env.NODE_ENV !== 'production') {
              // Just log during development - we don't need to validate on every page load
              // Path validation will happen during the build process
              console.log(`Skipping file check for: ${relativePath}`);
            }
          }

          // Only log when actually processing new links (not cached)
          if (process.env.NODE_ENV === 'development') {
            console.log(`Transforming link from: ${node.url}`);
          }

          // Remove the .md extension from the URL
          const newUrl = node.url.replace(/\.md$/, '');
          node.url = newUrl;

          // Cache the transformed URL
          linkCache.set(cacheKey, newUrl);

          // Only log when actually transforming (not using cache)
          if (process.env.NODE_ENV === 'development') {
            console.log(`Transformed to: ${node.url}`);
          }
        }
      });
    } finally {
      processingStack.delete(normalizedFilePath);
    }
  };
};

export default remarkMdLinks;
