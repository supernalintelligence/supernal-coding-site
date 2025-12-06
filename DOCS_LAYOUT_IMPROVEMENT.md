# Docs Layout Improvement - Docusaurus-Style Sidebar

**Date**: 2025-12-01  
**Status**: ✅ Implemented

---

## Changes Made

### 1. **Created DocsSidebar Component**

**File**: `components/docs/DocsSidebar.tsx`

Features:

- ✅ Collapsible navigation sections (like Docusaurus)
- ✅ Hierarchical structure with indentation
- ✅ Active page highlighting
- ✅ Icons for visual organization
- ✅ Sticky positioning

Structure mirrors Docusaurus `sidebars.ts`:

- 🚀 Getting Started
- 📋 Standard Operating Procedures
  - AI Workflow Foundations
  - Phase-Specific SOPs (1-3 shown, more to add)
- 📚 Guides
  - CLI Commands
  - Visual Guides
- 🏛️ Compliance Frameworks

### 2. **Updated DocsLayout Component**

**File**: `components/docs/DocsLayout.tsx`

Now provides **3-column layout**:

```
┌─────────────┬────────────────────┬───────────────┐
│ Left        │                    │ Right         │
│ Sidebar     │  Main Content      │ TOC           │
│ (Nav)       │                    │ (On This Page)│
│             │                    │               │
│ Collapsible │  Article/Post      │ Sticky        │
│ Tree        │  Rendered Here     │ Scroll Spy    │
└─────────────┴────────────────────┴───────────────┘
```

### 3. **Layout Properties**

- ✅ Responsive (sidebar hidden on mobile)
- ✅ Sticky left sidebar
- ✅ Sticky right TOC
- ✅ Active page highlight
- ✅ Smooth scrolling
- ✅ Dark mode support

---

## Current Sidebar Structure

### 🚀 Getting Started

- Introduction (`/docs/guides/getting-started/intro`)
- What is Supernal Coding

### 📋 Standard Operating Procedures

- SOP-0: Complete Workflow
- SOP-0.1: AI Workflow Overview
- **AI Workflow Foundations** (collapsible)
  - Part 01: Foundation
  - Part 02: Chat Management
  - Part 03: Prompting
- **Phase-Specific SOPs** (collapsible)
  - Phase 1: Discovery
  - Phase 2: Research
  - Phase 3: Design
  - _(Can add more phases)_

### 📚 Guides

- CLI Commands
- Understanding Phases
- **Visual Guides** (collapsible)
  - Dashboard Guide
  - Workflow Diagrams

### 🏛️ Compliance Frameworks

- FDA 21 CFR Part 11
- ISO 13485
- HIPAA
- GDPR

---

## Next Steps to Complete

### 1. **Add All SOPs Phases**

Currently only showing phases 1-3. Need to add:

- Phase 4: Planning
- Phase 5: Requirements
- Phase 6: Tests
- Phase 7: Build
- Phase 8: Integration
- Phase 9: Milestone
- Phase 10: Staging
- Phase 11: Production
- Phase 12: Operations

### 2. **Add Tool-Specific SOPs**

From `sidebars.ts`:

- Tool-Specific SOPs section

### 3. **Auto-generate Sidebar from Content**

Current approach: Hardcoded structure in `DocsSidebar.tsx`

Future: Generate from:

- Filesystem structure
- Frontmatter metadata
- `.pages.yaml` files (like Docusaurus sidebars)

### 4. **Add Mobile Sidebar Toggle**

- Hamburger menu for mobile
- Slide-out sidebar drawer
- Overlay backdrop

### 5. **Add Breadcrumbs**

Above the main content showing:
`Home > Documentation > Guides > CLI Commands`

---

## Styling Improvements Needed

### Current Issues:

1. Sidebar needs more padding/spacing
2. Active item highlight could be more prominent
3. Collapsible icons need better alignment
4. Need hover states for better UX

### Suggested Improvements:

```css
/* Better active state */
.sidebar-item.active {
  background: linear-gradient(to right, #3b82f6, #60a5fa);
  border-left: 3px solid #2563eb;
}

/* Smooth transitions */
.sidebar-item {
  transition: all 0.2s ease-in-out;
}

/* Better hover */
.sidebar-item:hover {
  transform: translateX(2px);
}
```

---

## Testing

### Test Pages:

1. `/docs` - Should show sidebar with "Welcome to Supernal Coding" active
2. `/docs/guides/cli-commands` - Should show "CLI Commands" active in sidebar
3. `/docs/workflow/sops/SOP-0-overview-complete-workflow` - Should show SOPs section expanded

### Responsive Testing:

- Desktop (>1024px): 3-column layout
- Tablet (768-1024px): Content + TOC, no left sidebar
- Mobile (<768px): Content only

---

## Files Modified

- ✅ `components/docs/DocsSidebar.tsx` (new)
- ✅ `components/docs/DocsLayout.tsx` (updated)

---

## Comparison to Docusaurus

### What We Have:

- ✅ Left sidebar navigation
- ✅ Collapsible sections
- ✅ Active page highlighting
- ✅ Right-side TOC
- ✅ 3-column layout
- ✅ Sticky sidebars

### What's Missing:

- ⏳ Mobile sidebar toggle
- ⏳ Breadcrumbs
- ⏳ Version dropdown (if needed)
- ⏳ Edit this page link
- ⏳ Previous/Next navigation
- ⏳ Full keyboard navigation
- ⏳ Auto-generated sidebar from filesystem

---

**Status**: Basic Docusaurus-style layout complete! Needs testing and refinement.
