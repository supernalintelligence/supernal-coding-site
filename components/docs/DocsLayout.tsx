'use client';

/**
 * Docs Layout Component - Content area with TOC (sidebar is in parent DocsLayoutClient)
 */

import type React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import TableOfContents from '@/components/TableOfContents';
import type { Post } from '@/lib/content';

interface DocsLayoutProps {
  post: Post;
  children: React.ReactNode;
  showTOC?: boolean;
  breadcrumbPath?: string[];
}

export default function DocsLayout({
  post,
  children,
  showTOC = true,
  breadcrumbPath
}: DocsLayoutProps) {
  const shouldShowTOC = showTOC && post.metadata.showToc !== false && post.html;

  return (
    <div className="flex-1">
      {/* Main Content Area with optional TOC */}
      <div className={shouldShowTOC ? 'lg:mr-60' : ''}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
          {/* Breadcrumbs */}
          {breadcrumbPath && breadcrumbPath.length > 0 && (
            <div className="mb-6">
              <Breadcrumb path={breadcrumbPath} />
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </div>

      {/* Fixed Right Sidebar - TOC */}
      {shouldShowTOC && (
        <aside className="hidden lg:block fixed right-0 top-16 bottom-0 w-60 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
          <div className="p-5">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              On This Page
            </h3>
            <TableOfContents content={post.html} />
          </div>
        </aside>
      )}
    </div>
  );
}
