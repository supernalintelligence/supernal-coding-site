# Vercel Deployment Options

**Date**: 2025-12-01

---

## Two Deployment Strategies

### **Option A: Monorepo Build** (Recommended - "Supernal building on itself")

**Builds from repository root, reads docs directly from workspace**

**Config**: `vercel-docs-next.json` (at repo root)

**Vercel Dashboard Setup**:

1. Create new project or update existing
2. **Root Directory**: Leave empty or set to `.`
3. **Build Command**: Override with config
4. **Framework Preset**: Other
5. **Link Config**: Point to `vercel-docs-next.json`

**Advantages**:

- ✅ No copying - reads `../../docs/` directly
- ✅ Always in sync with workspace
- ✅ Shows "Supernal building on itself"
- ✅ Can reference any workspace file
- ✅ True monorepo integration

**Command**:

```bash
vercel --local-config vercel-docs-next.json
```

---

### **Option B: Standalone Build**

**Builds from `apps/docs-next` subdirectory with content copy**

**Config**: `apps/docs-next/vercel.json`

**Vercel Dashboard Setup**:

1. Create new project
2. **Root Directory**: `apps/docs-next`
3. **Build Command**: `pnpm build` (runs BUILD_WITH_CONTENT.sh)
4. **Framework Preset**: Next.js
5. **Config**: Auto-detected from `apps/docs-next/vercel.json`

**Advantages**:

- ✅ Self-contained deployment
- ✅ Works with restricted root directory
- ✅ Can deploy standalone
- ❌ Requires build-time content copy

**Command**:

```bash
cd apps/docs-next
vercel
```

---

## How Vercel Handles Multiple Configs

**No conflicts!** Vercel projects are linked individually:

```
Repository: supernal-coding
├── vercel.json                    → Docusaurus (current)
├── vercel-docs-next.json          → Next.js docs (Option A)
├── apps/docs-next/vercel.json     → Next.js docs (Option B)
├── apps/dashboard-v2/vercel.json  → Dashboard
└── apps/api/vercel.json           → API
```

**Each is a separate Vercel project**:

- `code.supernal.ai` → Uses `vercel.json` (Docusaurus, current)
- `docs.supernal.ai` → Can use `vercel-docs-next.json` (Next.js, Option A)
- Or standalone → Use `apps/docs-next/vercel.json` (Option B)

---

## Setup Instructions

### **For Option A (Monorepo - Recommended)**

1. **Create New Vercel Project**:

   ```bash
   vercel --local-config vercel-docs-next.json
   ```

2. **Or via Dashboard**:
   - Import repository
   - Select `supernal-coding`
   - Override settings:
     - Root Directory: `.` (or leave empty)
     - Build Command: `cd apps/docs-next && pnpm install && pnpm run build:local`
     - Output Directory: `apps/docs-next/.next`
     - Install Command: `pnpm install --frozen-lockfile`

3. **Environment Variables**: None needed!

4. **Domain**: Assign `docs.supernal.ai` or similar

---

### **For Option B (Standalone)**

1. **Create New Vercel Project**:

   ```bash
   cd apps/docs-next
   vercel
   ```

2. **Or via Dashboard**:
   - Import repository
   - Select `supernal-coding`
   - Override settings:
     - Root Directory: `apps/docs-next`
     - Build Command: `pnpm build` (auto-detected)
     - Framework: Next.js (auto-detected)

3. **Domain**: Assign to project

---

## Path Resolution (Automatic)

The code in `lib/content/content-paths.ts` **automatically detects** which mode:

```typescript
function getBasePath(): string {
  // Option B: content/ exists (standalone with copy)
  if (fs.existsSync('./content')) {
    return './content'; // ✅ Uses copied content
  }

  // Option A: ../../docs exists (monorepo)
  if (fs.existsSync('../../docs')) {
    return '../..'; // ✅ Uses workspace docs
  }

  // Local dev
  return process.cwd();
}
```

**No configuration needed** - it just works! 🎉

---

## Testing

### **Test Option A (Monorepo)**:

```bash
# Simulate monorepo build
cd /Users/ianderrington/git/supernal-nova/families/supernal-coding
cd apps/docs-next && pnpm run build:local

# Check logs
# Should see: "[content-paths] Using workspace docs: /path/to/docs"
```

### **Test Option B (Standalone)**:

```bash
cd apps/docs-next
pnpm build  # Runs BUILD_WITH_CONTENT.sh

# Check logs
# Should see: "📦 Preparing content for build..."
# Should see: "[content-paths] Using build-time content: /path/to/content"
```

---

## Switching Between Options

**No code changes needed!** Just choose which Vercel config to use:

```bash
# Deploy as monorepo
vercel --local-config vercel-docs-next.json

# Deploy as standalone
cd apps/docs-next && vercel
```

---

## Recommendation

**Use Option A (Monorepo)** for `code.supernal.ai` or main docs site:

- Shows Supernal's philosophy: "Build on yourself"
- No sync issues ever
- True monorepo showcase
- Faster builds (no copying)

**Use Option B (Standalone)** for:

- Customer deployments
- Isolated instances
- When you want self-contained artifacts

---

## Files Structure

```
families/supernal-coding/
├── vercel.json                     # Docusaurus (keep as-is)
├── vercel-docs-next.json           # Next.js Option A (NEW)
├── apps/docs-next/
│   ├── vercel.json                 # Next.js Option B (NEW)
│   ├── BUILD_WITH_CONTENT.sh       # Used by Option B
│   ├── package.json
│   │   └── build: "bash BUILD_WITH_CONTENT.sh"
│   │   └── build:local: "next build"  # Used by Option A
│   └── lib/content/
│       └── content-paths.ts        # Auto-detects mode
```

---

## Current Status

- ✅ Both configs created
- ✅ Path resolution works for both
- ✅ Build scripts ready
- ✅ No conflicts with other Vercel projects
- ⏳ Ready to deploy!

---

**Next Steps**:

1. Test locally: `cd apps/docs-next && pnpm dev`
2. Test build: `pnpm run build:local` (Option A) or `pnpm build` (Option B)
3. Deploy: Choose your option and deploy to Vercel!
