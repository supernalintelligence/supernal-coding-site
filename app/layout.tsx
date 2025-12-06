import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ErrorBoundary from '@/components/ErrorBoundary';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import PageLayout from '@/components/PageLayout';
import { siteConfig } from '@/config/site';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.site.title,
    template: `%s | ${siteConfig.site.title}`
  },
  description: siteConfig.site.description,
  metadataBase: new URL(siteConfig.site.url),
  openGraph: {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    url: '/',
    siteName: siteConfig.site.title,
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.site.title,
    description: siteConfig.site.description
  },
  alternates: {
    types: {
      'application/rss+xml': '/api/feed'
    }
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Sections for navigation (matching Docusaurus structure)
  const sections = [
    { id: 'docs', title: 'Documentation' },
    { id: 'blog', title: 'Blog' }
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        suppressHydrationWarning
      >
        <GoogleAnalytics trackingId={process.env.NEXT_PUBLIC_GTAG_ID} />
        <ErrorBoundary>
          <div className={inter.className}>
            <Providers>
              <PageLayout sections={sections} config={siteConfig}>
                {children}
              </PageLayout>
            </Providers>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
