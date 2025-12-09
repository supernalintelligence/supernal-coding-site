---
slug: taming-ai-document-sprawl
title: 'Taming AI Document Sprawl: Automated Repo Cleanup for Vibe Coders'
authors: [supernal]
tags:
  [
    supernal-coding,
    vibe-coding,
    ai-development,
    documentation,
    cleanup,
    organization,
    developer-experience,
  ]
draft: true
---

# Taming AI Document Sprawl: Automated Repo Cleanup for Vibe Coders

You're deep in a coding session with Claude. Features are flowing. Files are appearing. You're shipping at 10x speed.

Then you look at your repository root:

```
PLAN.md
QUICK_FIX.md
approach_v1.ts
approach_v2.ts
approach_v3_final.ts
approach_v4_actually_final.ts
test_experiment.js
DEPLOYMENT.md
TODO_URGENT.md
screenshot-2025-12-09.png
```

Sound familiar? Welcome to **AI document sprawl**—the inevitable side effect of vibe coding at production speed.

<!--truncate-->

## The Problem: AI Generates Faster Than Humans Organize

Traditional development has natural checkpoints. You write a file, you think about where it goes, you save it in the right place. The friction creates organization.

AI-assisted development removes that friction. In a single session, Claude might generate:
- 50+ files
- Multiple "approach" variants
- Documentation for features that may or may not ship
- Experimental code you wanted to "try real quick"
- Screenshots, PDFs, and downloads you asked it to reference

Without guardrails, your repository becomes an **experiment graveyard**.

### The Three Stages of AI Sprawl

**Stage 1: The Accumulation**
"I'll organize these later."

**Stage 2: The Confusion**
"Wait, which version did we actually use? Is `approach_v3_final.ts` or `approach_v4_actually_final.ts` the real one?"

**Stage 3: The Archaeology**
"This documentation references a feature that doesn't exist anymore. When did we delete it?"

## Why Existing Tools Don't Help

**Linters** check code quality, not file organization.

**Git hooks** typically validate syntax and run tests, not structure.

**Manual cleanup** gets postponed indefinitely because vibe coding is more fun.

**Periodic reviews** happen too late—by then the sprawl has fossilized into "the way things are."

What we need is **organization as a guardrail**—something that runs automatically and catches problems before they compound.

## The Solution: `sc cleanup`

Supernal Coding includes a cleanup system designed specifically for AI-assisted workflows:

```bash
# See what's wrong (without changing anything)
sc cleanup --dry-run

# Automatically fix issues
sc cleanup --auto-fix

# Stage uncertain files for manual review
sc cleanup --auto-stage
```

### What It Catches

| Issue Type | Example | Suggestion |
|----|----|----|
| Root violations | `DEPLOYMENT.md` in root | Move to `docs/guides/` |
| Experimental files | `temp_backup/` | Move to `cleanup-queue/` |
| Naming violations | Inconsistent file IDs | Fix frontmatter |
| Broken links | Deleted file still referenced | Remove or fix link |
| Orphaned docs | Nobody links to this | Archive or delete |

### Smart Suggestions

The cleanup system understands common patterns:

```bash
❌ Files in wrong location:
  /DEPLOYMENT.md → docs/guides/deployment.md
  /SC_DESIGN.md → docs/architecture/sc-design.md
  /HANDOFF-2025-12-09.md → docs/sessions/2025-12-09-handoff.md
```

Files with `PLAN` or `ROADMAP` in the name? Probably planning docs.
Files with `ADR` or `DECISION`? Architecture decision records.
Files with `SESSION` or `HANDOFF`? Session documentation.
Everything else? `archive/legacy-root-docs/` until you sort it out.

## Multiple Trigger Modes

### Manual: When You Want It

```bash
# Full scan
sc cleanup

# Documentation only
sc cleanup docs

# Folder structure only
sc cleanup folders
```

### On Commit: Automatic Guardrail

Add to your `supernal.yaml`:

```yaml
git_hooks:
  pre_commit:
    checks:
      repo_cleanup:
        enabled: true
        block_on_errors: false  # Warn only
        mode: docs
```

Now every commit runs a quick check:

```bash
$ git commit -m "Add new feature"
🧹 Checking documentation structure...
⚠️  2 files in wrong location (run sc cleanup --auto-fix)
✅ Commit allowed (warnings only)
```

### On Push: Stricter Validation

```yaml
git_hooks:
  pre_push:
    checks:
      repo_cleanup:
        enabled: true
        block_on_errors: true  # Block on issues
        mode: all
```

Before sharing code, ensure it's properly organized.

## The Staging Queue: When You're Not Sure

Not every file has an obvious home. That's where the staging queue comes in:

```bash
# Stage files for later review
sc cleanup --auto-stage

# Check what's waiting
sc cleanup status
```

Files move to `cleanup-queue/to-process/` with metadata about:
- Original location
- Suggested destination
- Why it was flagged

Process them when you have time, not in the middle of a coding session.

## Real-World Example

**Before** (after a day of vibe coding):

```
project/
├── README.md
├── DEPLOYMENT.md              # Should be in docs/
├── QUICK_FIX_AUTH.md         # What even is this?
├── approach_v1.ts            # Dead code
├── approach_v2.ts            # Dead code
├── approach_v3_final.ts      # Maybe current?
├── screenshot.png            # Literally why
├── temp_test/                # "Temporary" from 3 months ago
├── src/
└── docs/
```

**Run cleanup**:

```bash
$ sc cleanup --dry-run

📊 Cleanup Report

❌ Files in wrong location:
  /DEPLOYMENT.md → docs/guides/deployment.md
  /QUICK_FIX_AUTH.md → archive/legacy-root-docs/QUICK_FIX_AUTH.md

⚠️  Folders needing attention:
  temp_test → cleanup-queue/to-process
     Reason: Matches pattern /^temp_/

Summary:
  2 root violations
  1 folder issues
```

**After cleanup**:

```bash
$ sc cleanup --auto-fix

✓ Moved /DEPLOYMENT.md → docs/guides/deployment.md
✓ Moved /QUICK_FIX_AUTH.md → archive/legacy-root-docs/QUICK_FIX_AUTH.md
✅ Fixed 2 issues automatically
⚠️  Folder issues require manual review (or use --auto-stage)
```

## What's Coming: Watch Mode

We're working on continuous cleanup monitoring:

```bash
# Start background watcher
sc cleanup watch --daemon

# Real-time notifications when files land in wrong places
```

Imagine: Drop a file in the wrong location, get an instant notification with a quick-fix option. No waiting until commit time to discover problems.

And eventually: **VSCode/Cursor extension** with inline warnings and right-click "Move to correct location" actions.

## The Philosophy

AI-assisted development is incredibly powerful. But power without structure creates chaos.

The goal of `sc cleanup` isn't to slow you down—it's to let you vibe code with confidence. Generate files fast, organize them automatically, ship clean repositories.

**Structure enables speed.** Guardrails aren't restrictions—they're the reason you can move fast without breaking things.

## Get Started

```bash
# Install supernal-coding
npm install -g supernal-coding

# See your repo's current state
sc cleanup --dry-run

# Fix issues automatically
sc cleanup --auto-fix

# Add to your git hooks
# (edit supernal.yaml as shown above)
```

Your future self—the one doing archaeology in 6 months—will thank you.

---

*Supernal Coding is an open-source project focused on making AI-assisted development safe and compliant. [Learn more](https://github.com/supernalintelligence/supernal-coding)*

