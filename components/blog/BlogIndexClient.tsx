'use client';

/**
 * Blog Index Client Component
 * Features demo-inspired hero section, search, and category filters
 */

import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { Post } from '@/lib/content';
import type { TagInfo } from '@/lib/content/tags';
import BlogCard from './BlogCard';

interface BlogIndexClientProps {
  posts: Post[];
  categories: string[];
  tags: TagInfo[];
  siteTitle: string;
  blogDescription: string;
}

export default function BlogIndexClient({
  posts,
  categories,
  tags,
  siteTitle,
  blogDescription
}: BlogIndexClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchTerm ||
        post.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        (Array.isArray(post.metadata.tags) &&
          post.metadata.tags.includes(selectedCategory));

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  // Responsive grid column calculation
  const getGridColumns = () => {
    if (filteredPosts.length === 1) return 'grid-cols-1 max-w-2xl mx-auto';
    if (filteredPosts.length === 2) return 'grid-cols-1 lg:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {siteTitle} Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {blogDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedCategory === 'All'
              ? 'Latest Articles'
              : `${selectedCategory} Articles`}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${getGridColumns()}`}>
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  index={index}
                  featured={post.metadata.featured}
                />
              ))}
            </div>
          )}
        </div>

        {/* More content notice */}
        {posts.length < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center bg-gray-100 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              More Articles Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Stay tuned for more insights on AI-accelerated development
              workflows, compliance automation, and modern testing practices.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
