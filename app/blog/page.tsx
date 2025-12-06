import type { Metadata } from 'next';
import BlogIndexClient from '@/components/blog/BlogIndexClient';
import { getSiteConfig } from '@/config/site';
import { getCachedAllContent } from '@/lib/content';
import { getAllTags } from '@/lib/content/tags';

// Add static rendering with revalidation
export const revalidate = 3600; // Revalidate content every hour

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();

  return {
    title: `Blog | ${siteConfig.site.title}`,
    description:
      siteConfig.blog.defaultDescription ||
      'Latest updates, insights, and tutorials',
    openGraph: {
      title: 'Blog',
      description:
        siteConfig.blog.defaultDescription ||
        'Latest updates, insights, and tutorials',
      url: `${siteConfig.site.url}/blog`,
      siteName: siteConfig.site.title,
      images: [
        {
          url: siteConfig.blog.defaultImage,
          width: 1200,
          height: 630,
          alt: 'Blog'
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog',
      description:
        siteConfig.blog.defaultDescription ||
        'Latest updates, insights, and tutorials',
      images: [siteConfig.blog.defaultImage]
    }
  };
}

export default async function BlogPage() {
  const siteConfig = getSiteConfig();

  try {
    // Fetch all posts
    const allPosts = await getCachedAllContent();

    // Filter out index posts and empty posts from blog section
    const blogPosts = allPosts
      .filter((post) => {
        const section = post.slug.split('/')[0];
        return (
          section === 'blog' &&
          !post.isIndex &&
          post.html &&
          post.html.length > 0
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.metadata.date || '').getTime();
        const dateB = new Date(b.metadata.date || '').getTime();
        return dateB - dateA; // Newest first
      });

    // Extract unique categories from config
    const categories = [
      'All',
      ...siteConfig.blog.categories.map((c) => c.name)
    ];

    // Get tags if enabled
    const tags = siteConfig.features.search ? getAllTags(blogPosts, 2) : [];

    return (
      <BlogIndexClient
        posts={blogPosts}
        categories={categories}
        tags={tags}
        siteTitle={siteConfig.site.title}
        blogDescription={
          siteConfig.blog.defaultDescription ||
          'Latest updates, insights, and tutorials'
        }
      />
    );
  } catch (error) {
    console.error('Error rendering blog page:', error);
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Latest updates, insights, and tutorials
          </p>
        </div>
        <div className="mt-12 text-center bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            Error Loading Blog
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            There was a problem loading the blog content. Please try refreshing
            the page.
          </p>
        </div>
      </div>
    );
  }
}
