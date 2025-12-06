import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Supernal Coding Colors: Sky Blue + Gold
        primary: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
          darker: '#0369a1',
          darkest: '#0c4a6e',
          light: '#38bdf8',
          lighter: '#7dd3fc',
          lightest: '#bae6fd'
        },
        // Gold/Orange accent
        gold: {
          DEFAULT: '#ff9800',
          dark: '#f57c00',
          light: '#ffb74d',
          lighter: '#ffe0b2'
        },
        orange: {
          DEFAULT: '#ff9800',
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9800',
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.slate[700]'),
            '--tw-prose-headings': theme('colors.slate[900]'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-code': theme('colors.slate[900]'),
            '--tw-prose-pre-code': theme('colors.slate[800]'),
            '--tw-prose-pre-bg': theme('colors.slate[50]'),
            maxWidth: '65ch'
          }
        },
        dark: {
          css: {
            '--tw-prose-body': theme('colors.slate[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.primary.light'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.slate[200]'),
            '--tw-prose-pre-bg': theme('colors.slate[900]')
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
