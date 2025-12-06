# Documentation Organization Guide

## How Ordering Works

### Level 1: Top-Level Sections (Sidebar)

**Controlled by**: `docs/site.config.yaml`

```yaml
docs:
  sections:
    - id: 'getting-started'
      order: 1              # First section

    - id: 'core-concepts'
      order: 2              # Second section
```

### Level 2: Documents Within Sections

**Controlled by**: Frontmatter in each `.md` file

```markdown
---
title: "Installation Guide"
order: 1                    # First in section
section: getting-started    # Belongs to this section
---
```

### Level 3: Nested Documents (Optional)

**Controlled by**: `.pages` file in folder

```yaml
# docs/getting-started/.pages
title: Getting Started
order: 1
children:
  - index.md          # Overview
  - installation.md   # Step 1
  - quick-start.md    # Step 2
```

---

## Example Structure

### Folder Layout

```
docs/
├── getting-started/
│   ├── .pages            # Optional: explicit ordering
│   ├── index.md          # order: 1
│   ├── installation.md   # order: 2
│   └── quick-start.md    # order: 3
├── core-concepts/
│   ├── requirements.md   # order: 1, section: core-concepts
│   ├── git-workflow.md   # order: 2, section: core-concepts
│   └── testing.md        # order: 3, section: core-concepts
└── guides/
    ├── tutorial-1.md     # order: 1, section: guides
    └── tutorial-2.md     # order: 2, section: guides
```

### Resulting Sidebar

```
📚 Docs
  🎯 Getting Started
    • Overview
    • Installation
    • Quick Start

  🧠 Core Concepts
    • Requirements System
    • Git Workflow
    • Testing & Validation

  📖 Guides
    • Tutorial 1
    • Tutorial 2
```

---

## Frontmatter Fields for Ordering

```yaml
---
title: "Document Title"
order: 1                      # Position within section
section: "getting-started"    # Which section (matches config id)
category: "tutorial"          # Optional: for filtering
tags: ["beginner", "setup"]   # Optional: for search
showToc: true                 # Show table of contents on this page
showBreadcrumbs: true         # Show breadcrumb navigation
---
```

---

## Config Hierarchy

### 1. Global (`site.config.yaml`)

```yaml
docs:
  sections:
    - id: 'getting-started'
      name: 'Getting Started'
      icon: '🎯'
      order: 1
      description: 'Quick setup guides'
```

### 2. Folder (`.pages` - optional)

```yaml
# docs/getting-started/.pages
title: Getting Started Guide
order: 1
expanded: true  # Expand by default in sidebar
children:
  - installation.md
  - configuration.md
```

### 3. Document (`frontmatter`)

```yaml
---
title: Installation
order: 1
section: getting-started
---
```

---

## How the Sidebar Will Work

### Algorithm:

1. Load sections from `site.config.yaml` (sorted by `order`)
2. For each section:
   - Find all docs with `section: <section-id>` in frontmatter
   - OR find all docs in `docs/<section-id>/` folder
   - Sort by `order` field in frontmatter (default: 999)
   - If `.pages` exists, use that ordering
3. Render hierarchical tree

### Code (Simplified):

```typescript
// Load config
const config = siteConfig.docs.sections;

// Build sidebar
const sidebar = config.map(section => ({
  id: section.id,
  name: section.name,
  icon: section.icon,
  order: section.order,
  docs: getAllDocs()
    .filter(doc => doc.metadata.section === section.id)
    .sort((a, b) => (a.metadata.order ?? 999) - (b.metadata.order ?? 999))
})).sort((a, b) => a.order - b.order);
```

---

## Current Sections (from config)

```yaml
1. Getting Started (🎯)
2. Core Concepts (🧠)
3. Requirements System (📋)
4. Git Workflow (🔀)
5. Testing & Validation (🧪)
6. Compliance (✅)
7. Guides (📖)
8. Reference (📚)
```

---

## Migration Strategy

### Step 1: Add Frontmatter to Existing Docs

```bash
# Example: docs/getting-started/installation.md
---
title: "Installation Guide"
order: 1
section: "getting-started"
showToc: true
---

# Installation Guide
...
```

### Step 2: Organize by Section

Move files into appropriate folders:

- `docs/getting-started/` → All getting started docs
- `docs/core-concepts/` → Fundamental concepts
- `docs/requirements/` → Requirement system docs
- etc.

### Step 3: Test Ordering

Run the site and verify sidebar shows:

1. Sections in correct order (by config)
2. Docs within sections in correct order (by frontmatter)

---

## Best Practices

✅ **DO**:

- Use explicit `order` values (1, 2, 3, not 10, 20, 30)
- Keep section IDs consistent (kebab-case)
- Add descriptions to sections in config
- Use meaningful icons

❌ **DON'T**:

- Skip order values (don't go 1, 3, 5)
- Use negative order values
- Create deeply nested hierarchies (max 3 levels)
- Forget to add `section` field in frontmatter

---

## Example: Adding a New Document

```bash
# 1. Create the file
touch docs/getting-started/troubleshooting.md

# 2. Add frontmatter
cat > docs/getting-started/troubleshooting.md << 'EOF'
---
title: "Troubleshooting Guide"
order: 10
section: "getting-started"
description: "Common issues and solutions"
showToc: true
tags: ["help", "debugging"]
---

# Troubleshooting Guide
...
EOF

# 3. It automatically appears in the sidebar under "Getting Started"
```

---

## Future: Collapsible Sections

We'll add collapse/expand functionality:

```tsx
<CollapsibleSection
  title={section.name}
  icon={section.icon}
  defaultExpanded={section.id === 'getting-started'}
>
  {section.docs.map(doc => (
    <DocLink key={doc.slug} doc={doc} />
  ))}
</CollapsibleSection>
```

---

**Summary**: Order is controlled by:

1. **Config** (`site.config.yaml`) → Section order
2. **Frontmatter** (`order` field) → Doc order within section
3. **Optional** (`.pages` file) → Fine-grained folder control
