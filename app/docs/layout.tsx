import type React from 'react';
import DocsLayoutClient from '@/components/docs/DocsLayoutClient';
import { buildSidebarFromFilesystem } from '@/lib/content/sidebar';

export default async function DocsRootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Build sidebar structure from filesystem
  let sidebarItems = [];
  try {
    sidebarItems = await buildSidebarFromFilesystem('docs');
  } catch (error) {
    console.error('[DocsRootLayout] Error building sidebar:', error);
  }

  return (
    <DocsLayoutClient sidebarItems={sidebarItems || []}>
      {children}
    </DocsLayoutClient>
  );
}
