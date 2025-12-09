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

const quickLinks = [
  {
    title: 'Getting Started',
    description: 'Start building with Supernal Coding in minutes',
    href: '/docs/getting-started',
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
    title: 'Tools',
    description: 'CLI commands, git hooks, and integrations',
    href: '/docs/tools',
    icon: Terminal,
    color: 'from-gray-600 to-gray-800'
  },
  {
    title: 'Examples',
    description: 'Code examples and templates',
    href: '/docs/examples',
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

export default function QuickLinksGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      {quickLinks.map((link) => {
        const IconComponent = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-transparent overflow-hidden"
          >
            {/* Gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />

            <div className="relative">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-3`}
              >
                <IconComponent className="h-5 w-5 text-white" />
              </div>

              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {link.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
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
  );
}

