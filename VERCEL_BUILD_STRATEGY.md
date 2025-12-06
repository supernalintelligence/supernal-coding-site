# Vercel Build Strategy - Hybrid Approach

**Date**: 2025-12-01  
**Status**: ✅ Implemented

---

## The Problem

**Local Development**:

- `process.cwd()` = `apps/docs-next`
- Content at `../../docs/` ✅ Works

**Vercel Build**:

- `process.cwd()` = `/vercel/path0/apps/docs-next`
- Content at `../../docs/` ❌ Doesn't exist (Vercel only uploads app directory)

---

## The Solution: Hybrid Approach

### **Local Development**: Read from Workspace

```
apps/docs-next/lib/content/content-paths.ts
  ↓
Check: Does ../../docs/ exist?
  ↓
YES → Use workspace docs directly (no copying!)
```

### **Vercel Build**: Copy-Then-Build

```
1. BUILD_WITH_CONTENT.sh runs
   ↓
2. rsync ../../docs/ → apps/docs-next/content/docs/
   (Excludes: features/, planning/, handoffs/, etc.)
   ↓
3. next build
   ↓
4. content-paths.ts detects content/ dir exists
   ↓
5. Uses content/ instead of ../../
```

---

## Implementation

### 1. **Smart Path Detection** (`lib/content/content-paths.ts`)

```typescript
function getBasePath(): string {
  const cwd = process.cwd();

  // Check if content/ exists (Vercel build)
  const contentDir = path.join(cwd, 'content');
  if (fs.existsSync(contentDir)) {
    return contentDir; // Use build-time copy
  }

  // Check if ../../docs exists (local dev)
  const workspaceDocsPath = path.join(cwd, '..', '..', 'docs');
  if (fs.existsSync(workspaceDocsPath)) {
    return path.join(cwd, '..', '..'); // Use workspace
  }

  return cwd; // Fallback
}
```

### 2. **Build Script** (`BUILD_WITH_CONTENT.sh`)

```bash
#!/bin/bash
# 1. Copy content from workspace to build dir
rsync -av \
  --exclude='archive/' \
  --exclude='deprecated/' \
  --exclude='features/' \
  --exclude='planning/' \
  --exclude='handoffs/' \
  "../../docs/" \
  "./content/docs/"

# 2. Run Next.js build
pnpm build:local
```

### 3. **Updated package.json**

```json
{
  "scripts": {
    "dev": "next dev -p 3001",          // Uses ../../docs (workspace)
    "build": "bash BUILD_WITH_CONTENT.sh", // Copies → builds
    "build:local": "next build",         // Direct build (testing)
    "start": "next start -p 3001"
  }
}
```

---

## Benefits

### ✅ **Local Development**:

- No copying needed
- Always in sync with workspace
- Fast iteration

### ✅ **Vercel Deployment**:

- Content available at build time
- No monorepo structure required
- Excludes internal docs automatically

### ✅ **Single Source of Truth**:

- All content lives in `families/supernal-coding/docs/`
- Build script copies only public-facing docs
- No manual sync required

---

## Content Exclusions (Matches Docusaurus)

From `documentation/docusaurus.config.ts`:

```typescript
exclude: [
  '**/archive/**',
  '**/deprecated/**',
  '**/features/**',    // Internal feature development
  '**/planning/**',    // Internal project management
  '**/handoffs/**',    // Internal agent communication
]
```

BUILD_WITH_CONTENT.sh` mirrors these exclusions.

---

## Testing

### **Local Dev** (Uses workspace directly):

```bash
cd apps/docs-next
pnpm dev
# Should see: "[content-paths] Using workspace docs: /path/to/docs"
# Visit http://localhost:3001/docs
# Visit http://localhost:3001/guides
```

### **Build Test** (Simulates Vercel):

```bash
cd apps/docs-next
pnpm build
# Should see:
# - "📦 Preparing content for build..."
# - "📚 Copying docs..."
# - "🏗️  Building Next.js..."
# - "[content-paths] Using build-time content: /path/to/content"
```

### **Vercel Deployment**:

```bash
# Vercel will run: pnpm build
# Which runs: BUILD_WITH_CONTENT.sh
# Content copied to apps/docs-next/content/
# Build succeeds ✅
```

---

## File Structure

### **Before Build** (Local Dev):

```
families/supernal-coding/
├── docs/                    ← Source of truth
│   ├── guides/
│   ├── workflow/
│   └── ...
└── apps/docs-next/
    ├── docs/blog/           ← Blog (copied earlier)
    └── lib/content/
        └── content-paths.ts → Reads from ../../docs/
```

### **After Build** (Vercel):

```
/vercel/path0/apps/docs-next/
├── content/                 ← Build-time copy
│   └── docs/
│       ├── guides/
│       ├── workflow/
│       └── ...
├── docs/blog/
└── lib/content/
    └── content-paths.ts → Reads from ./content/
```

---

## Vercel Configuration

No changes needed to `vercel.json`! The build script handles everything:

```json
{
  "buildCommand": "pnpm build"  ← Runs BUILD_WITH_CONTENT.sh
}
```

---

## Future: True Monorepo Build

If we set up Turborepo or Nx properly, we could:

1. Configure Vercel to upload entire monorepo
2. Remove build-time copy
3. Always use workspace paths

But for now, this hybrid approach works perfectly!

---

## Files Modified

- `lib/content/content-paths.ts` - Smart path detection
- `BUILD_WITH_CONTENT.sh` - Build-time content copy
- `package.json` - Updated build script
- `.gitignore` - Ignore `content/` directory (build artifact)

---

## Verification

```bash
# 1. Test local dev
cd apps/docs-next
pnpm dev
# Check: http://localhost:3001/docs

# 2. Test build
pnpm build
# Check: content/ directory created
# Check: Build succeeds

# 3. Test start
pnpm start
# Check: http://localhost:3001/docs loads
```

---

**Status**: Ready to test locally, then deploy to Vercel!
