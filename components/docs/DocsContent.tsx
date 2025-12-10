'use client';

import { useMemo } from 'react';
import SafeHTML from '@/components/SafeHTML';
import type { Post } from '@/lib/content';
import { formatDate } from '@/lib/utils/dates';

interface DocsContentProps {
  post: Post;
}

export default function DocsContent({ post }: DocsContentProps) {
  // Remove the first H1 from content - title comes from frontmatter
  const processedHtml = useMemo(() => {
    if (!post.html) return '';

    let html = post.html;

    // Remove leading whitespace/newlines
    html = html.replace(/^\s+/, '');

    // ALWAYS remove the first H1 from content since we display title from frontmatter
    // This prevents duplicate headers regardless of whether they match
    html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '');

    // Clean up any leading empty paragraphs or whitespace
    html = html.replace(/^(\s*<p>\s*<\/p>\s*)+/, '');
    html = html.replace(/^\s+/, '');

    return html;
  }, [post.html]);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 md:p-8">
        {/* Title only */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {post.metadata.title}
        </h1>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <SafeHTML html={processedHtml} />
        </div>

        {/* Author/date at bottom if present */}
        {post.metadata.author && (
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            {typeof post.metadata.author === 'string'
              ? post.metadata.author
              : post.metadata.author.name}
            {post.metadata.date && ` • ${formatDate(post.metadata.date)}`}
          </div>
        )}
      </div>
    </article>
  );
}
