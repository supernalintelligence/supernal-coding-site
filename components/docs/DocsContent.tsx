'use client';

import { useMemo } from 'react';
import SafeHTML from '@/components/SafeHTML';
import type { Post } from '@/lib/content';
import { formatDate } from '@/lib/utils/dates';

interface DocsContentProps {
  post: Post;
}

export default function DocsContent({ post }: DocsContentProps) {
  // Remove duplicate title from HTML content if it matches the metadata title
  const processedHtml = useMemo(() => {
    if (!post.html) return '';

    // Remove the first h1 if it matches the title (to avoid duplication)
    const h1Match = post.html.match(/^<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      const h1Text = h1Match[1].replace(/<[^>]*>/g, '').trim();
      const titleText = post.metadata.title.trim();

      // If the h1 text matches the title, remove it
      if (h1Text.toLowerCase() === titleText.toLowerCase()) {
        return post.html.replace(/^<h1[^>]*>.*?<\/h1>\s*/i, '');
      }
    }
    return post.html;
  }, [post.html, post.metadata.title]);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <header className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {post.metadata.title}
          </h1>
          {post.metadata.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {post.metadata.description}
            </p>
          )}
          {post.metadata.author && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {typeof post.metadata.author === 'string'
                ? post.metadata.author
                : post.metadata.author.name}
              {post.metadata.date && ` • ${formatDate(post.metadata.date)}`}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <SafeHTML html={processedHtml} />
        </div>
      </div>
    </article>
  );
}
