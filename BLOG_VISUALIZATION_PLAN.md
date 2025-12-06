# Blog & Docs Visualization - Updated Plan

**Status**: In Progress  
**Inspired by**: `/Users/ianderrington/git/supernal-nova/platform/packages/@supernal-interface/core/demo`

---

## What Makes the Demo Blog Look Good

### Blog Index Page (`/blog`)

1. **Clean Hero Section** - White background, large centered title, description
2. **Search + Category Filters** - Search input with icon + pill-style category buttons
3. **Responsive Grid** - 1/2/3 columns based on content (1 col for 1 post, 2 for 2, 3 for 3+)
4. **Beautiful BlogCards** with:
   - Dynamic SVG pattern backgrounds (geopattern based on post metadata)
   - Category badge (top-left)
   - Featured badge (top-right, gradient purple-pink)
   - Title with hover effect (turns blue)
   - Meta info (date + reading time with icons)
   - "Read article" link with animated arrow
   - Hover effects: shadow-xl + translate-y-1
   - `line-clamp-2` for title/excerpt truncation

5. **Motion/Framer animations** - Staggered fade-in for cards

### Blog Post Page (`/blog/[slug]`)

1. **Flexible Header Styles** - hero, gradient, minimal, default (controlled by frontmatter)
2. **Large Title** - text-4xl to text-6xl responsive
3. **Metadata Row** - Author, date, reading time with lucide icons
4. **Tags** - Pill-style tags below metadata
5. **Max-width content** - max-w-4xl for readability
6. **TableOfContents** component (right side)
7. **Code block enhancement** - Copy button on hover

### Docs Page (`/docs`)

1. **3-Column Layout**:
   - Left sidebar (col-span-3): Hierarchical sections with icons
   - Main content (col-span-9): Document rendering
   - **Missing**: Right TOC (that's what user noted)

2. **Sticky Sidebar** - `sticky top-6`, stays in view on scroll
3. **Section Organization**:
   - Collapsible sections (not implemented in demo, but good to add)
   - Icon-based categories (emojis)
   - Active state highlighting
   - Order-based sorting

---

## Implementation Plan (Updated)

### Phase 1: Blog Components (High Priority - User likes this)

#### 1.1 Create BlogCard Component

```tsx
// apps/docs-next/components/blog/BlogCard.tsx
- Dynamic SVG backgrounds (copy SVGGenerator pattern)
- Category + Featured badges
- Meta info with icons (Calendar, Clock from lucide-react)
- Hover animations
- line-clamp-2 for truncation
```

#### 1.2 Update Blog Index Page

```tsx
// apps/docs-next/app/blog/page.tsx
- Hero section with centered title
- Search input + category filter pills
- Responsive grid (1/2/3 columns logic)
- Framer motion staggered animations
```

#### 1.3 Update Blog Post Page

```tsx
// apps/docs-next/app/blog/[...slug]/page.tsx
- Flexible header styles (hero, gradient, minimal)
- Large responsive title (text-4xl → text-6xl)
- Metadata row with icons
- Tags display
- max-w-4xl content wrapper
```

### Phase 2: Docs Layout (Add Missing TOC)

#### 2.1 Create 3-Column Docs Layout

```tsx
// apps/docs-next/components/docs/DocsLayout.tsx
<div className="grid grid-cols-12 gap-6">
  <DocsSidebar className="col-span-3" />     {/* Left */}
  <DocContent className="col-span-6" />      {/* Center */}
  <TableOfContents className="col-span-3" /> {/* Right - MISSING */}
</div>
```

#### 2.2 Port TableOfContents (from demo)

```tsx
// Already exists: apps/docs-next/components/TableOfContents.tsx
- Make it sticky: `sticky top-6`
- Add scroll spy
- Show on docs pages (currently missing)
```

#### 2.3 Update Docs Sidebar

```tsx
// apps/docs-next/components/docs/DocsSidebar.tsx
- Use config.docs.sections for structure
- Icon-based sections
- Active state highlighting
- Sticky positioning
```

---

## Key Components to Port/Create

### 1. BlogCard (NEW - Copy from demo)

**Source**: `demo/src/components/blog/BlogCard.tsx`  
**Features**:

- SVG pattern backgrounds
- Category/Featured badges
- Hover animations
- Meta info with icons

### 2. SVGGenerator (NEW - Copy from demo)

**Source**: `demo/lib/svg-generator.ts`  
**Purpose**: Generate unique SVG patterns for blog cards

### 3. Blog Index Layout (UPDATE)

**File**: `apps/docs-next/app/blog/page.tsx`  
**Changes**:

- Hero section
- Search + filters
- Responsive grid
- Use new BlogCard

### 4. Blog Post Layout (UPDATE)

**File**: `apps/docs-next/app/blog/[...slug]/page.tsx`  
**Changes**:

- Flexible headers
- Larger title
- Better meta display
- Add TOC on right

### 5. Docs Layout (NEW)

**File**: `apps/docs-next/components/docs/DocsLayout.tsx`  
**Features**:

- 3-column grid
- Left sidebar + center content + right TOC

### 6. TableOfContents (UPDATE)

**File**: `apps/docs-next/components/TableOfContents.tsx`  
**Changes**:

- Make sticky
- Add to docs pages (currently missing)
- Scroll spy

---

## File Structure

```
apps/docs-next/
├── components/
│   ├── blog/
│   │   ├── BlogCard.tsx              # NEW - Port from demo
│   │   ├── BlogHero.tsx              # NEW - Hero section
│   │   ├── BlogFilters.tsx           # NEW - Search + categories
│   │   └── BlogPostHeader.tsx        # NEW - Flexible post header
│   ├── docs/
│   │   ├── DocsLayout.tsx            # NEW - 3-column wrapper
│   │   ├── DocsSidebar.tsx           # NEW - Hierarchical sidebar
│   │   └── DocContent.tsx            # NEW - Main content area
│   └── TableOfContents.tsx           # UPDATE - Make sticky, add to docs
├── lib/
│   └── svg-generator.ts              # NEW - Port from demo
├── app/
│   ├── blog/
│   │   ├── page.tsx                  # UPDATE - New layout
│   │   └── [...slug]/
│   │       └── page.tsx              # UPDATE - Add TOC
│   └── docs/
│       └── [...slug]/
│           └── page.tsx              # UPDATE - Use DocsLayout + TOC
```

---

## Implementation Steps

### Step 1: Blog Visual Improvements (2-3 hours)

1. ✅ Config system done
2. Copy SVGGenerator from demo
3. Create new BlogCard component
4. Update blog index page with hero + filters + grid
5. Update blog post page with flexible header + TOC

### Step 2: Docs Layout (1-2 hours)

1. Create DocsLayout with 3-column grid
2. Update docs pages to use TableOfContents on right
3. Add scroll spy to TOC
4. Test sticky positioning

### Step 3: Polish & Performance (1 hour)

1. Add framer-motion animations
2. Test mobile responsiveness
3. Optimize images
4. Test loading performance (user noted it's slow)

---

## Performance Fixes (User Noted Slow Loading)

### Demo Site Issues:

- Fetches all docs on page load
- No pagination
- Heavy SVG generation

### Our Improvements:

- ✅ API routes for on-demand loading
- ✅ Cached markdown processing
- Add lazy loading for blog cards
- Optimize SVG generation (cache patterns)
- Use Next.js Image component
- Implement pagination for blog

---

## Next Actions

1. **Copy SVGGenerator** from demo
2. **Create BlogCard** with all features
3. **Update blog index** with new layout
4. **Add TOC to docs** (the missing piece user noted)
5. **Test and iterate**

---

**Priority**: Blog first (user likes it), then add TOC to docs
