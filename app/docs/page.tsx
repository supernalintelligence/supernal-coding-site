import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocsContent from '@/components/docs/DocsContent';
import DocsLayout from '@/components/docs/DocsLayout';
import QuickLinksGrid from '@/components/docs/QuickLinksGrid';
import FloatingShareButton from '@/components/FloatingShareButton';
import { getSiteConfig } from '@/config/site';
import { getPostBySlug } from '@/lib/content';

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
  // Load the docs/index.md content
  const post = await getPostBySlug('docs', 'docs');

  if (!post) {
    notFound();
  }

  return (
    <>
      <DocsLayout
        post={post}
        showTOC={true}
        breadcrumbPath={[{ title: 'Documentation', href: '/docs' }]}
      >
        <DocsContent post={post} />
        <QuickLinksGrid />
      </DocsLayout>
      <FloatingShareButton
        title={post.metadata.title}
        description={post.metadata.description || post.excerpt || ''}
        tags={post.metadata.tags || []}
        shareBlurbs={post.metadata.shareBlurbs}
        isAlwaysVisible={false}
        isCollection={false}
        fullContent={post.content || ''}
        htmlContent={post.html || ''}
        coverImage={
          typeof post.metadata.coverImage === 'string'
            ? post.metadata.coverImage
            : post.metadata.coverImage?.url || ''
        }
      />
    </>
  );
}

