# Dynamic Sidebar Implementation

## Problem

Sidebar was hardcoded with manual paths, defeating the purpose of making it a template.

## Solution

Implemented filesystem-based dynamic sidebar generation, matching the pattern used in `/Users/ianderrington/git/ianderrington/nextjs-github-markdown-blog`.

## Changes

### 1. Created `lib/content/sidebar.ts`

- `buildSidebarFromFilesystem()`: Recursively scans directories
- Reads frontmatter from `index.md` for section titles and icons
- Supports `.pages` config files for custom ordering (like mkdocs-material)
- Generates URL paths using dash format: `/docs/guides-getting-started-intro`

### 2. Updated Components

- **`app/docs/layout.tsx`**: Server component that builds sidebar from filesystem
- **`components/docs/DocsLayoutClient.tsx`**: Client wrapper that renders sidebar
- **`components/docs/DocsSidebar.tsx`**: Now accepts `items` prop instead of hardcoded config

### 3. Created `.pages` Configuration

- **`docs/.pages`**: Orders top-level sections (guides, workflow, compliance, etc.)

## How It Works

### Directory Structure

```
docs/
├── .pages              # Orders top-level sections
├── guides/
│   ├── index.md        # Title: "Getting Started" (becomes section header)
│   ├── intro.md        # URL: /docs/guides-intro
│   └── cli-commands/
│       ├── index.md    # URL: /docs/guides-cli-commands
│       └── agent.md    # URL: /docs/guides-cli-commands-agent
├── workflow/
│   ├── index.md
│   └── sops/
│       └── ...
└── compliance/
    └── ...
```

### URL Generation

- Filesystem: `docs/guides/getting-started/intro.md`
- URL: `/docs/guides-getting-started-intro` (slashes become dashes)

### Ordering

1. `.pages` file (if exists): `nav: [intro, setup, ...]`
2. Frontmatter `order` field
3. Alphabetical

## Benefits

- **No hardcoding**: Sidebar auto-generates from filesystem
- **Template-friendly**: Works for any project structure
- **`.pages` control**: Local ordering without touching code
- **Frontmatter metadata**: Icons, titles, order from markdown files

## Next Steps

1. Restart dev server to see changes
2. Add `.pages` files to subdirectories for custom ordering
3. Add `icon:` and `order:` to frontmatter as needed

## Example `.pages` File

```yaml
nav:
  - intro
  - quickstart
  - ...           # Rest in alphabetical order

title: Getting Started
```

## Example Frontmatter

```yaml
---
title: Introduction to Supernal Coding
icon: 🚀
order: 1
---
```
