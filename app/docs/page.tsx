import type { Metadata } from 'next';
import DocsIndexClient from '@/components/docs/DocsIndexClient';
import { getSiteConfig } from '@/config/site';
import { getAllContentFromSection } from '@/lib/content';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    title: `Documentation | ${siteConfig.site.title}`,
    description:
      'Complete documentation for Supernal Coding - AI-accelerated development workflow system',
    openGraph: {
      title: `Documentation | ${siteConfig.site.title}`,
      description: 'Complete documentation for Supernal Coding',
      type: 'website'
    }
  };
}

export default async function DocsPage() {
  const docs = await getAllContentFromSection('docs');
  const siteConfig = await getSiteConfig();

  return <DocsIndexClient docs={docs} siteConfig={siteConfig} />;
}
