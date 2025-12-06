'use client';

/**
 * Docs Layout Client - Wrapper for docs pages with dynamic sidebar
 */

import type React from 'react';
import type { SidebarItem } from '@/lib/content/sidebar';
import DocsSidebar from './DocsSidebar';

interface DocsLayoutClientProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
}

export default function DocsLayoutClient({
  children,
  sidebarItems = []
}: DocsLayoutClientProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Fixed Left Sidebar - Navigation */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-72 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
        <DocsSidebar items={sidebarItems || []} />
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-72">{children}</div>
    </div>
  );
}
