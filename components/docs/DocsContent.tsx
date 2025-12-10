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

    let html = post.html;

    // Remove leading whitespace/newlines
    html = html.replace(/^\s+/, '');

    // Remove the first h1 if it matches the title (to avoid duplication)
    // Match h1 anywhere near the start (may have whitespace or wrapper divs)
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      const h1Text = h1Match[1].replace(/<[^>]*>/g, '').trim();
      const titleText = post.metadata.title.trim();

      // If the h1 text matches the title (case insensitive), remove it
      if (h1Text.toLowerCase() === titleText.toLowerCase()) {
        html = html.replace(/<h1[^>]*>.*?<\/h1>\s*/i, '');
      }
    }

    // Clean up any leading empty paragraphs or whitespace
    html = html.replace(/^(\s*<p>\s*<\/p>\s*)+/, '');
    html = html.replace(/^\s+/, '');

    return html;
  }, [post.html, post.metadata.title]);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 md:p-8">
        {/* Header - only show if we have metadata */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {post.metadata.title}
          </h1>
          {post.metadata.description && (
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {post.metadata.description}
            </p>
          )}
          {post.metadata.author && (
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {typeof post.metadata.author === 'string'
                ? post.metadata.author
                : post.metadata.author.name}
              {post.metadata.date && ` • ${formatDate(post.metadata.date)}`}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:mt-6 prose-headings:mb-3 prose-p:my-3 prose-ul:my-3 prose-li:my-1">
          <SafeHTML html={processedHtml} />
        </div>
      </div>
    </article>
  );
}
