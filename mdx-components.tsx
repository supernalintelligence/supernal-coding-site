import type { MDXComponents } from 'mdx/types';
import dynamic from 'next/dynamic';

// Dynamically import SimpleMermaid with SSR disabled
const SimpleMermaid = dynamic(() => import('./components/SimpleMermaid'), {
  ssr: false,
  loading: () => (
    <div className="my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-center">
      Loading diagram...
    </div>
  ),
});

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Provide SimpleMermaid component for use in MDX
    SimpleMermaid,
    // Allow components to be overridden by passed-in components
    ...components,
  };
}

