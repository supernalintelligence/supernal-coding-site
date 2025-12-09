import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import CollectionDisplay from '@/components/CollectionDisplay';
import DocsContent from '@/components/docs/DocsContent';
import DocsLayout from '@/components/docs/DocsLayout';
import FloatingShareButton from '@/components/FloatingShareButton';
import { DEFAULT_IMAGES } from '@/lib/constants';
import { prepareCollectionRenderData } from '@/lib/content/collectionRenderer';
import { loadConfig } from '@/lib/content/resolver';
import { resolveImagePath } from '@/lib/imageUtils';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  return [];
}

export default async function DocsSlugPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Use unified collection renderer with 'docs' as the section
  const renderData = await prepareCollectionRenderData('docs', slug);

  if (!renderData.indexPost) {
    notFound();
  }

  // Get view configuration from index post frontmatter
  const defaultViewType =
    renderData.indexPost?.metadata?.defaultViewType || 'cards';
  const allowedViewTypes = renderData.indexPost?.metadata?.allowedViewTypes;
  
  // Allow frontmatter to override collection display (displayStyle: standard forces doc view)
  const displayStyle = renderData.indexPost?.metadata?.displayStyle;
  const showAsCollection = renderData.isCollection && displayStyle !== 'standard';

  return (
    <>
      {showAsCollection ? (
        <CollectionDisplay
          indexPost={renderData.indexPost}
          items={renderData.items}
          section={renderData.section}
          breadcrumbPath={renderData.breadcrumbPath}
          defaultViewType={defaultViewType as any}
          allowedViewTypes={allowedViewTypes as any}
          getImagePath={resolveImagePath}
        />
      ) : (
        <DocsLayout
          post={renderData.indexPost}
          showTOC={true}
          breadcrumbPath={renderData.breadcrumbPath}
        >
          <DocsContent post={renderData.indexPost} />
        </DocsLayout>
      )}
      <FloatingShareButton
        title={renderData.indexPost.metadata.title}
        description={
          renderData.indexPost.metadata.description ||
          renderData.indexPost.excerpt ||
          ''
        }
        tags={renderData.indexPost.metadata.tags || []}
        shareBlurbs={renderData.indexPost.metadata.shareBlurbs}
        isAlwaysVisible={false}
        isCollection={renderData.isCollection}
        fullContent={renderData.indexPost.content || ''}
        htmlContent={renderData.indexPost.html || ''}
        coverImage={
          typeof renderData.indexPost.metadata.coverImage === 'string'
            ? renderData.indexPost.metadata.coverImage
            : renderData.indexPost.metadata.coverImage?.url || ''
        }
      />
    </>
  );
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const renderData = await prepareCollectionRenderData('docs', slug);
  const post = renderData.indexPost;

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }

  const config = loadConfig();
  const { site } = config;

  const parentMetadata = await parent;
  const metadataBase = parentMetadata.metadataBase || new URL(site.url);

  const url = `/docs/${Array.isArray(slug) ? slug.join('/') : slug}`;

  const title = post.metadata.title;
  const description = post.metadata.description || post.excerpt || '';

  const resolvedImageUrl = resolveImagePath(
    post.metadata.coverImage,
    DEFAULT_IMAGES.post,
    'docs',
    post.slug
  );

  const absoluteImageUrl = resolvedImageUrl.startsWith('http')
    ? resolvedImageUrl
    : new URL(resolvedImageUrl, metadataBase).toString();

  const shareBlurbs = post.metadata.shareBlurbs || {};

  const facebookDescription = shareBlurbs.facebook || description;
  const twitterDescription = shareBlurbs.twitter || description;

  return {
    title,
    description,
    metadataBase: metadataBase,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: title,
      description: facebookDescription,
      url: url,
      siteName: site.title,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: site.social.openGraph.locale,
      type: 'article',
      publishedTime: post.metadata.date
        ? new Date(post.metadata.date).toISOString()
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: twitterDescription,
      images: [absoluteImageUrl]
    }
  };
}
