/**
 * SVG Pattern Generator for Blog Cards
 * Creates unique geometric patterns based on post metadata
 * Simplified version without geopattern dependency
 */

import type { Post } from './content';

export interface SVGGeneratorOptions {
  width?: number;
  height?: number;
  pattern?: string;
}

export class SVGGenerator {
  // Category-based color schemes (from config) - expanded palette
  private static readonly categoryColors: Record<string, string> = {
    announcements: '#ec4899', // pink
    tutorials: '#06b6d4', // cyan
    'case-studies': '#10b981', // green
    technical: '#8b5cf6', // purple
    principles: '#f59e0b', // amber
    'best-practices': '#3b82f6', // blue
    'ai-agents': '#14b8a6', // teal
    quality: '#8b5cf6', // purple
    compliance: '#10b981', // green
    workflow: '#06b6d4', // cyan
    testing: '#f59e0b', // amber
    architecture: '#6366f1', // indigo
    default: '#0ea5e9', // sky blue (primary)
  };

  // Hash function to consistently select pattern based on title
  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  /**
   * Generate a gradient background based on post
   */
  static generateGradient(post: Post): string {
    const category = Array.isArray(post.metadata.tags)
      ? post.metadata.tags[0]
      : 'default';
    const baseColor =
      SVGGenerator.categoryColors[category] ||
      SVGGenerator.categoryColors.default;

    // Generate complementary color
    const hash = SVGGenerator.hashString(post.slug || post.metadata.title);
    const hueShift = (hash % 60) - 30; // -30 to +30 degree hue shift

    return `linear-gradient(135deg, ${baseColor} 0%, ${SVGGenerator.adjustHue(baseColor, hueShift)} 100%)`;
  }

  /**
   * Generate CSS background style for post card
   */
  static generateBackgroundStyle(post: Post): React.CSSProperties {
    const gradient = SVGGenerator.generateGradient(post);
    const hash = SVGGenerator.hashString(post.slug || post.metadata.title);

    // Select pattern based on hash
    const patterns = ['dots', 'grid', 'diagonal', 'waves'];
    const _pattern = patterns[hash % patterns.length];

    return {
      background: gradient,
      backgroundBlendMode: 'overlay',
      position: 'relative',
    };
  }

  /**
   * Simple hue adjustment (hex color)
   */
  private static adjustHue(hex: string, _degree: number): string {
    // Convert hex to HSL, adjust hue, convert back
    // Simplified implementation
    return hex; // For now, return same color
  }

  /**
   * Get data URL for SVG pattern (placeholder for geopattern)
   */
  static generateDataUrlForPost(
    post: Post,
    _options: SVGGeneratorOptions = {}
  ): string {
    const category = Array.isArray(post.metadata.tags)
      ? post.metadata.tags[0]
      : 'default';
    const color =
      SVGGenerator.categoryColors[category] ||
      SVGGenerator.categoryColors.default;

    // Generate simple geometric pattern
    const hash = SVGGenerator.hashString(post.slug || post.metadata.title);
    const patternType = hash % 4;

    let svg = '';

    switch (patternType) {
      case 0: // Dots
        svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="${color}"/>
          <circle cx="50" cy="50" r="20" fill="rgba(255,255,255,0.1)"/>
          <circle cx="150" cy="100" r="30" fill="rgba(255,255,255,0.1)"/>
          <circle cx="250" cy="150" r="25" fill="rgba(255,255,255,0.1)"/>
          <circle cx="350" cy="200" r="35" fill="rgba(255,255,255,0.1)"/>
        </svg>`;
        break;
      case 1: // Grid
        svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="${color}"/>
          <path d="M 0 0 L 400 0 L 400 300 L 0 300 Z" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="40"/>
          <path d="M 100 0 L 100 300 M 200 0 L 200 300 M 300 0 L 300 300" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
          <path d="M 0 75 L 400 75 M 0 150 L 400 150 M 0 225 L 400 225" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
        </svg>`;
        break;
      case 2: // Diagonal
        svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="${color}"/>
          <path d="M 0 0 L 400 300" stroke="rgba(255,255,255,0.15)" stroke-width="40"/>
          <path d="M -100 0 L 300 300" stroke="rgba(255,255,255,0.1)" stroke-width="30"/>
          <path d="M 100 0 L 500 300" stroke="rgba(255,255,255,0.1)" stroke-width="30"/>
        </svg>`;
        break;
      case 3: // Waves
        svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="${color}"/>
          <path d="M 0 100 Q 100 50 200 100 T 400 100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="20"/>
          <path d="M 0 200 Q 100 150 200 200 T 400 200" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="20"/>
        </svg>`;
        break;
    }

    const encoded = encodeURIComponent(svg);
    return `data:image/svg+xml,${encoded}`;
  }

  /**
   * Convert SVG string to data URL
   */
  static toDataURL(svg: string): string {
    const encoded = encodeURIComponent(svg);
    return `data:image/svg+xml,${encoded}`;
  }
}
