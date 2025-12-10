'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import Footer from './Footer';
import Header from './Header';

interface PageLayoutProps {
  children: React.ReactNode;
  sections: Array<{
    id: string;
    title: string;
  }>;
  config: typeof import('@/config/site').siteConfig;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  sections,
  config
}) => {
  const footerRef = useRef<HTMLElement>(null);

  // Force removing any default margins on html/body
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.margin = '0';
      document.documentElement.style.padding = '0';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full overflow-x-hidden m-0 p-0">
      <div
        className="header-wrapper fixed top-0 left-0 right-0 z-40 w-full m-0 p-0"
      >
        <Header sections={sections} />
      </div>
      <main className="flex-grow w-full flex flex-col p-0 m-0 pt-16">{children}</main>
      <Footer ref={footerRef} config={config} />
    </div>
  );
};

export default PageLayout;
