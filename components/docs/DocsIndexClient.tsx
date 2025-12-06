'use client';

import {
  ArrowRight,
  BookOpen,
  Boxes,
  GitBranch,
  Rocket,
  Shield,
  Terminal
} from 'lucide-react';
import Link from 'next/link';
import type { Post } from '@/lib/content';
import type { SiteConfig } from '@/lib/server/config';

interface DocsIndexClientProps {
  docs: Post[];
  siteConfig: SiteConfig;
}

const quickLinks = [
  {
    title: 'Getting Started',
    description: 'Start building with Supernal Coding in minutes',
    href: '/docs/guides/getting-started',
    icon: Rocket,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Guides',
    description: 'Step-by-step tutorials and best practices',
    href: '/docs/guides',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Workflow',
    description: 'Standard operating procedures and processes',
    href: '/docs/workflow',
    icon: GitBranch,
    color: 'from-orange-500 to-amber-500'
  },
  {
    title: 'CLI Commands',
    description: 'Reference for all command-line tools',
    href: '/docs/guides/cli-commands',
    icon: Terminal,
    color: 'from-gray-600 to-gray-800'
  },
  {
    title: 'Architecture',
    description: 'System design and technical decisions',
    href: '/docs/architecture',
    icon: Boxes,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Compliance',
    description: 'ISO 13485, FDA, GDPR, and SOC2 frameworks',
    href: '/docs/compliance',
    icon: Shield,
    color: 'from-rose-500 to-pink-500'
  }
];

export default function DocsIndexClient({
  docs,
  siteConfig
}: DocsIndexClientProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to transform your codebase into a compliant,
          AI-ready development environment.
        </p>
      </div>

      {/* Quick Links Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {quickLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-transparent overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-4`}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {link.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {link.description}
                </p>

                <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Documents */}
      {docs.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recently Updated
          </h2>
          <div className="space-y-3">
            {docs
              .filter((doc) => !doc.slug.includes('index'))
              .slice(0, 8)
              .map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/${doc.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {doc.metadata.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
