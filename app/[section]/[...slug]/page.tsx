import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import CollectionDisplay from '@/components/CollectionDisplay';
import DocsContent from '@/components/docs/DocsContent';
import DocsLayout from '@/components/docs/DocsLayout';
import FloatingShareButton from '@/components/FloatingShareButton';
import PostComponent from '@/components/PostComponent';
import { DEFAULT_IMAGES } from '@/lib/constants';
import { prepareCollectionRenderData } from '@/lib/content/collectionRenderer';
import { loadConfig } from '@/lib/content/resolver';
import { resolveImagePath } from '@/lib/imageUtils';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    section: string;
    slug: string[];
  }>;
}

// This function is now handled by the unified collection renderer

export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { section, slug } = resolvedParams;

  // Use unified collection renderer
  const renderData = await prepareCollectionRenderData(section, slug);

  if (!renderData.indexPost) {
    notFound();
  }

  // Get view configuration from index post frontmatter
  const defaultViewType =
    renderData.indexPost?.metadata?.defaultViewType || 'cards';
  const allowedViewTypes = renderData.indexPost?.metadata?.allowedViewTypes;

  return (
    <>
      {renderData.isCollection ? (
        <CollectionDisplay
          indexPost={renderData.indexPost}
          items={renderData.items}
          section={renderData.section}
          breadcrumbPath={renderData.breadcrumbPath}
          defaultViewType={defaultViewType as any}
          allowedViewTypes={allowedViewTypes as any}
          getImagePath={resolveImagePath}
        />
      ) : section === 'docs' ? (
        <DocsLayout
          post={renderData.indexPost}
          showTOC={true}
          breadcrumbPath={renderData.breadcrumbPath}
        >
          <DocsContent post={renderData.indexPost} />
        </DocsLayout>
      ) : (
        <>
          <div className="breadcrumb-container">
            <Breadcrumb path={renderData.breadcrumbPath} />
          </div>
          <DocsLayout post={renderData.indexPost} showTOC={section === 'blog'}>
            <PostComponent post={renderData.indexPost} />
          </DocsLayout>
        </>
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

  const { section, slug } = resolvedParams;
  const renderData = await prepareCollectionRenderData(section, slug);
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

  const url = `/${resolvedParams.section}/${Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join('/') : resolvedParams.slug}`;

  const title = post.metadata.title;
  const description = post.metadata.description || post.excerpt || '';

  const resolvedImageUrl = resolveImagePath(
    post.metadata.coverImage,
    DEFAULT_IMAGES.post,
    resolvedParams.section,
    post.slug
  );

  const absoluteImageUrl = resolvedImageUrl.startsWith('http')
    ? resolvedImageUrl
    : new URL(resolvedImageUrl, metadataBase).toString();

  const shareBlurbs = post.metadata.shareBlurbs || {};

  // Use platform-specific descriptions for social sharing
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
