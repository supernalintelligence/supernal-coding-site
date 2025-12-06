/**
 * Site Configuration for Supernal Coding
 * Server-only config loader - use getSiteConfig() in server components
 */

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Type definitions for site config
export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  description?: string;
  icon?: string;
  order: number;
  external: boolean;
}

export interface Section {
  id: string;
  name: string;
  icon?: string;
  order: number;
  description?: string;
}

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    url: string;
    language: string;
    favicon: string;
    copyright: string;
  };
  author: {
    name: string;
    email: string;
    link: string;
    social: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      bluesky?: string;
      threads?: string;
    };
  };
  navigation: NavigationItem[];
  docs: {
    sections: Section[];
  };
  cli: {
    sections: Section[];
  };
  blog: {
    postsPerPage: number;
    showAuthor: boolean;
    showReadingTime: boolean;
    showTags: boolean;
    showCategories: boolean;
    defaultImage: string;
    defaultDescription?: string;
    groupBy: 'date' | 'category' | 'tag' | 'author';
    categories: Section[];
  };
  toc: {
    enabled: boolean;
    maxDepth: number;
    minHeadings: number;
    position: 'right' | 'left' | 'inline';
  };
  features: {
    search: boolean;
    breadcrumbs: boolean;
    darkMode: boolean;
    analytics: boolean;
    rss: boolean;
    sitemap: boolean;
  };
  rss: {
    title: string;
    description: string;
    categories: string[];
    ttl: number;
  };
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  og: {
    type: string;
    locale: string;
    siteName: string;
  };
  branding: {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      accent: string;
      accentDark: string;
      accentLight: string;
    };
  };
}

// Cache the config after first load
let cachedConfig: SiteConfig | null = null;

/**
 * Load site configuration - SERVER ONLY
 * Call this in server components, getStaticProps, or API routes
 */
export function getSiteConfig(): SiteConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = path.join(process.cwd(), 'docs', 'site.config.yaml');

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Site configuration file not found at: ${configPath}\n` +
        `Please create docs/site.config.yaml with your site configuration.`
    );
  }

  const configFile = fs.readFileSync(configPath, 'utf8');
  cachedConfig = yaml.load(configFile) as SiteConfig;

  return cachedConfig;
}

// For backward compatibility - but this should only be used in server components
export const siteConfig = getSiteConfig();
