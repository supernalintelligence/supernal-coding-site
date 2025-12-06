# Docs Site Redesign - Learning from Demo

**Date**: 2025-12-01

---

## Key Insight: What Belongs Where

### ❌ Currently in Public Docs (Should be Dashboard):

- `features/` - Internal feature development
- `planning/` - Internal project management
- `architecture/` - Internal system design
- `handoffs/` - Internal agent communication
- `research_and_analysis/` - Internal research

### ✅ Should Be in Public Docs:

- `guides/` - How to USE Supernal Coding
  - Getting Started
  - CLI Commands
  - Configuration
- `workflow/sops/` - Standard Operating Procedures for USERS
- `requirements/compliance/` - Compliance frameworks (for users implementing compliance)
- `reference/` - API/CLI reference

### 📊 Should Be in Dashboard:

- Architecture (how it's built)
- Features (development tracking)
- Planning (roadmap, kanban)
- Handoffs (agent work)
- Research & Analysis

---

## Demo Site Design (Better Approach)

### Layout Structure:

```
┌──────────────────────────────────────────┐
│ Header (Navigation)                       │
├───────────┬──────────────────────────────┤
│ Sidebar   │                              │
│ (White    │  Content Area                │
│  Card)    │  (White Card)                │
│           │                              │
│ Sections: │  - Clean prose               │
│ • Getting │  - Max-width 4xl             │
│ • CLI     │  - Nice spacing              │
│ • Config  │  - Related topics at bottom  │
│           │                              │
└───────────┴──────────────────────────────┘
```

### Key Design Elements:

1. **White rounded cards** with shadow
2. **Flat section structure** (not deeply nested collapsible)
3. **Section headers** with icons
4. **Simple list** of docs under each section
5. **Active state**: blue background
6. **Clean typography**: prose-lg
7. **Related topics** at bottom of each doc

---

## Proposed Redesign

### Step 1: Simplify Sidebar Structure

Instead of complex collapsible tree, use **flat sections**:

```
📚 Documentation
───────────────
🎯 Getting Started
  • Introduction
  • Installation
  • Quick Start

⚡ CLI Commands
  • agent
  • deploy
  • git-smart
  • requirement
  • test
  • validate

📋 Requirements System
  • Overview
  • Creating Requirements
  • Validation
  • Testing

🏛️ Compliance
  • FDA 21 CFR 11
  • ISO 13485
  • HIPAA
  • GDPR

🔗 Reference
  • API Reference
  • Configuration
  • Glossary
```

### Step 2: Clean Visual Design

```tsx
// White card sidebar
<aside className="col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-fit sticky top-6">
  <h2 className="text-lg font-bold mb-4">📚 Documentation</h2>
  <nav className="space-y-6">
    {sections.map(section => (
      <div key={section.id}>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
          {section.icon} {section.name}
        </h3>
        <ul className="space-y-1">
          {section.docs.map(doc => (
            <li>
              <Link className={active ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}>
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </nav>
</aside>

// White card content
<main className="col-span-9 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
  <article className="prose prose-lg max-w-4xl">
    {/* Content here */}
  </article>
</main>
```

### Step 3: Reorganize Content

**Create focused user documentation**:

```
docs/
├── index.md (Welcome)
├── getting-started/
│   ├── intro.md
│   ├── installation.md
│   └── quick-start.md
├── cli/
│   ├── overview.md
│   ├── agent.md
│   ├── deploy.md
│   └── ... (all CLI commands)
├── requirements/
│   ├── overview.md
│   ├── creating.md
│   ├── validation.md
│   └── testing.md
├── workflow/
│   └── sops/ (User-facing SOPs only)
├── compliance/
│   ├── fda21cfr11/
│   ├── iso13485/
│   └── ... (all frameworks)
└── reference/
    ├── api.md
    ├── configuration.md
    └── glossary.md
```

**Move to dashboard**:

- `features/` → Dashboard
- `planning/` → Dashboard
- `architecture/` → Dashboard (internal)
- `handoffs/` → Dashboard
- `research_and_analysis/` → Dashboard

---

## Comparison: Current vs Demo vs Needed

### Current (Broken):

- ❌ Complex nested collapsible tree
- ❌ Shows internal dev docs (features/, planning/)
- ❌ Generic blog-style layout
- ❌ No clear visual hierarchy

### Demo (Good):

- ✅ Clean white cards
- ✅ Flat section structure
- ✅ Clear visual separation
- ✅ Dynamic doc loading via API
- ❌ But shows internal docs (architecture, planning, research)

### Needed (Best):

- ✅ Clean white cards (from demo)
- ✅ Flat section structure (from demo)
- ✅ Only USER-facing docs (filtered)
- ✅ Clear categories: Getting Started, CLI, Requirements, Compliance, Reference
- ✅ Move internal docs to dashboard

---

## Implementation Plan

### Phase 1: Fix Visual Design (1 hour)

1. Update `DocsSidebar.tsx` to use white cards
2. Simplify to flat structure (no deep nesting)
3. Use demo's styling patterns
4. Grid layout: col-span-3 (sidebar) + col-span-9 (content)

### Phase 2: Filter Content (30 min)

1. Update `CONTENT_PATHS` exclude patterns
2. Match Docusaurus excludes:
   - `**/archive/**`
   - `**/deprecated/**`
   - `**/features/**`
   - `**/planning/**`
   - `**/handoffs/**`
   - `**/research_and_analysis/**`

### Phase 3: Reorganize Sidebar (1 hour)

1. Group by user-facing categories
2. Getting Started
3. CLI Commands (flat list)
4. Requirements System
5. Compliance Frameworks
6. Reference

---

## Next Steps

1. **Immediate**: Adopt demo's visual style (white cards, flat sections)
2. **Content**: Ensure only user-facing docs are shown
3. **Dashboard**: Create separate dashboard app for internal docs
4. **Navigation**: Simplify sidebar to match demo's approach

---

**Decision needed**: Should I:

1. Redesign the sidebar to match the demo's simpler style?
2. Focus on filtering out internal docs first?
3. Both?
