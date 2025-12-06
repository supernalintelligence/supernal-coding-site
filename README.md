# Supernal Coding Documentation Site

**Built with**: Next.js 15 + Your proven blog architecture  
**Status**: 🚧 In Development

Mobile-first documentation site with working navigation, robust markdown processing, and Supernal's cool notched design system.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3001
```

## 📁 Structure

```
apps/docs-next/
├── app/              # Next.js App Router pages
├── components/       # React components (from personal blog)
├── lib/              # Utilities & markdown processing
├── config/           # Site configuration
├── docs/             # Markdown content
└── styles/           # Global styles
```

## 🎨 Design System

### Colors

- **Primary**: Sky Blue (#0ea5e9)
- **Accent**: Gold/Orange (#ff9800)
- **Dark**: Slate (#0f172a)

### Features

- Notched corners on buttons/cards
- Grid patterns on hero
- Mobile-first navigation
- Dark mode support

## 📝 Content Structure

Content goes in `/docs` directory:

```
docs/
├── index.md          # Docs homepage
├── guides/
│   ├── index.md
│   └── getting-started.md
└── blog/
    ├── index.md
    └── 2025-12-01-post.md
```

## 🔧 Configuration

Edit `config/site.ts` to customize:

- Site metadata
- Navigation sections
- Social links
- Branding colors

## 🎯 What Works

✅ **Proven Architecture** (from personal blog)

- Proper HTML/body tags
- Working mobile navigation
- Robust markdown processing
- Content auto-loading
- Mermaid diagrams
- Admonitions (note, tip, warning, danger)

✅ **Supernal Design**

- Notched buttons & cards
- Sky blue + gold colors
- Grid patterns
- Sharp corners (no rounding)

## 🚧 TODO

- [ ] Copy blog posts from Docusaurus
- [ ] Set up docs navigation
- [ ] Add dashboard features
- [ ] Optional authentication (later)

## 📚 Based On

Forked from: `/Users/ianderrington/git/ianderrington/nextjs-github-markdown-blog`

- Proven mobile navigation
- Robust content system
- Working markdown processing

Applied: Supernal Coding design system

- Notched corners
- Sky blue + gold theme
- Grid patterns

---

**Ready to build!** 🚀
