'use client';

/**
 * Blog Card Component - Displays a single blog post card
 * Features dynamic pattern backgrounds based on post metadata
 */

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import type { Post } from '@/lib/content';
import { SVGGenerator } from '@/lib/svg-generator';

interface BlogCardProps {
  post: Post;
  featured?: boolean;
  index?: number;
}

// Helper to format date safely
function formatDate(dateString: string): string {
  try {
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export default function BlogCard({
  post,
  featured = false,
  index = 0
}: BlogCardProps) {
  // Generate dynamic background pattern based on post
  const backgroundPattern = React.useMemo(
    () => SVGGenerator.generateDataUrlForPost(post),
    [post]
  );

  // Strip "blog/" prefix from slug if present
  const cleanSlug = post.slug.startsWith('blog/')
    ? post.slug.substring(5)
    : post.slug;

  const category = Array.isArray(post.metadata.tags)
    ? post.metadata.tags[0]
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col h-full"
    >
      <Link href={`/blog/${cleanSlug}`} className="flex flex-col h-full">
        {/* Dynamic Pattern Header */}
        <div
          className="h-48 relative flex-shrink-0"
          style={{
            backgroundImage: `url("${backgroundPattern}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20" />

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full shadow-sm">
                {category}
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full shadow-lg">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.metadata.title}
          </h3>

          {post.excerpt && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
              {post.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(post.metadata.date)}</span>
            </div>
            {post.metadata.readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.metadata.readingTime}</span>
              </div>
            )}
          </div>

          {/* Read More Link */}
          <div className="flex items-center text-sm text-blue-600 font-semibold group-hover:gap-2 transition-all">
            <span>Read article</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
