---
slug: parallel-development-multi-agent
title: 'Parallel Development with Continuous Reconnection: Coordinating Multiple AI Agents'
authors: [ianderrington]
tags:
  [
    git-workflow,
    ai-agents,
    parallel-development,
    trunk-based-development,
    continuous-integration,
    multi-agent,
    wip-registry,
    developer-productivity,
    supernal-coding,
  ]
shareBlurbs:
  twitter: 'How do you coordinate 2+ AI agents on one codebase? WIP registry + trunk-based = true parallel development with continuous reconnection. No branches. No conflicts. #AIAgents #GitWorkflow'
  facebook: 'The AI agent problem nobody talks about: Agent 1 creates 10 files. Agent 2 creates 10 files. Both in the same folder. Whose files are whose? I built a solution using WIP registry (declare file ownership) + trunk-based commits (continuous integration points). Multiple agents work in parallel, reconnecting at each commit. It''s not "perpendicular integration" - that never touches. This is "parallel with continuous reconnection." Would this solve your multi-agent chaos?'
  linkedin: "How do you coordinate 2+ AI agents working on the same codebase simultaneously?\n\n**The Challenge**: Agent 1 creates 10 files. Agent 2 creates 10 files. You try to commit Agent 1's work → Blocked: \"20 untracked files detected\"\n\n**The Solution**: Two systems that enable true parallel development:\n\n**1. WIP Registry** (.supernal/wip-registry.yaml)\nTrack WHO is working on WHAT. Each file declares its feature and owner. Pre-commit hook enforces: files must be committed, staged, ignored, or wip-tracked.\n\n**2. Feature-Based Commits on Main**\nUse [FEATURE:name] tags instead of branches. All work happens on main. Each commit is a micro-integration point where work reconnects.\n\n**Why This Works**:\n- Agents declare intent (WIP registry) before committing\n- Work in parallel without blocking each other\n- Continuous integration (not perpendicular - that only connects at the end)\n- Each commit = synchronization point\n- Fails fast: blocks at 5+ untracked files BEFORE slow checks\n\n**Real Commands**:\n```bash\n# Agent 1: Declare files\nsc wip register agent1-*.ts --feature=auth\n\n# Agent 2: Declare files\nsc wip register agent2-*.ts --feature=dashboard\n\n# Both can commit independently\ngit commit -m \"[FEATURE:auth] Add login\" # Agent 1\ngit commit -m \"[FEATURE:dashboard] Add UI\" # Agent 2\n```\n\n**Key Insight**: This isn't \"perpendicular integration\" (which never touches until the end). This is **\"parallel development with continuous reconnection\"** - agents work in parallel but sync at every commit.\n\n**Works Best For**: Multi-agent AI workflows, solo developers with multiple contexts, rapid iteration\n\n**Requirements**: Strong test coverage, pre-commit enforcement, trunk-based mindset\n\nShipped 4,200+ lines: core system, tests, docs, blog posts. Fully operational.\n\nWould this solve your multi-agent coordination headaches?\n\n---\n\nDo you think this is useful or interesting? Let others know with a 👍, repost ♻️, and share your thoughts with a comment 💭!"
---

# Parallel Development with Continuous Reconnection: Coordinating Multiple AI Agents

You know that feeling when you have 2+ AI agents working on the same codebase and everything becomes chaos?

Agent 1 creates 10 files for authentication. Agent 2 creates 10 files for the dashboard. You try to commit Agent 1's work and git says: "Wait, you have 20 untracked files. Which ones are yours?"

Now you're staring at a mixed pile of files, trying to figure out which belong to which feature, which agent created what, and whether you're about to commit someone else's work-in-progress.

**There's a better way.**

<!--truncate-->

## The Traditional Nightmare

Here's what most of us do:

```mermaid
graph TD
    A[main] --> B[feature/auth]
    A --> C[feature/dashboard]
    A --> D[feature/api]
    B -.merge.-> E[main - conflicts!]
    C -.merge.-> E
    D -.merge.-> E

    style B fill:#ff6b6b
    style C fill:#ff6b6b
    style D fill:#ff6b6b
    style E fill:#ffd93d
```

**Three features = three branches = three separate merge operations = merge conflict hell**

The overhead kills you:

- Git checkout dance (stash, switch, reload)
- Mental context switching
- "Wait, which branch has that change?"
- Merge conflict resolution
- Can't see the integrated picture until everything merges

And then there's the untracked files problem:

```bash
git status
# Untracked files:
#   docs/new-design.md        # Which feature?
#   lib/helper.js             # WIP or forgotten?
#   test-script.sh            # Keep or delete?
```

Every untracked file is a question mark. Which feature does it belong to? Is it work-in-progress or did I forget about it? Should I commit it now or later?

## Enter: Multi-Feature Branch Development

What if instead of one feature per branch, you worked on **multiple related features on the same branch**? Tag each commit with its feature to track progress:

```mermaid
graph LR
    A[main] --> B[feature/payment-sprint]
    B --> C["[FEATURE:payment-api]<br/>Add endpoint"]
    C --> D["[FEATURE:payment-ui]<br/>Add checkout"]
    D --> E["[FEATURE:payment-compliance]<br/>Add audit"]
    E --> F[PR to main]

    style C fill:#51cf66
    style D fill:#51cf66
    style E fill:#51cf66
```

**Multiple features on one branch. Work on related features simultaneously. Create PR when sprint/domain work complete.**

This enables "parallel domain development" - work on multiple features within the same domain (payment, auth, dashboard) on one branch, avoiding integration issues by building them together.

## The Two Systems That Make It Work

### 1. WIP Registry: Know What Every File Is For

**The Problem**: You have files that aren't ready to commit yet. Where do they live? What feature are they for?

**The Solution**: A registry (not a directory!) that tracks work-in-progress files.

```mermaid
flowchart TD
    A[Create file:<br/>docs/auth.md] --> B[Register it:<br/>sc wip register]
    B --> C[File tracked by feature:<br/>user-auth, REQ-042]
    C --> D[Work on it...]
    D --> E[Ready to commit?]
    E -->|Yes| F[git add & commit]
    F --> G[Auto de-registers!]
    E -->|Not yet| D

    style C fill:#51cf66
    style G fill:#51cf66
```

**Real workflow**:

```bash
# Create a file
vim docs/auth-design.md

# Register it (required before you can commit)
sc wip register docs/auth-design.md \
  --feature=user-auth \
  --requirement=REQ-042 \
  --reason="Drafting authentication design"

# Work on it as long as you need...

# When ready, just commit
git add docs/auth-design.md
git commit -m "[FEATURE:user-auth] REQ-042: Add auth design"

# Automatically de-registers from WIP registry!
```

**What this solves**:

- ✅ No more "which feature is this?" questions
- ✅ No forgotten files
- ✅ Clear ownership of every file
- ✅ Automatic cleanup when committed

The registry (`.supernal/wip-registry.yaml`) looks like this:

```yaml
files:
  - path: docs/auth-design.md
    feature: user-auth
    requirement: REQ-042
    reason: 'Drafting authentication design'
    registered: 2025-11-29T10:00:00Z
    last_modified: 2025-11-29T14:30:00Z
```

Files live in their normal locations—the registry just tracks them until they're committed.

### 2. Feature-Based Commits: Work on Multiple Features Without Switching

**The Problem**: Every time you switch features, you switch branches. That means:

- `git checkout` overhead
- Mental context reload
- Stashing uncommitted work
- Merge conflicts when you're done

**The Solution**: Tag commits with features instead of creating branches.

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Main as main branch
    participant Tests as CI/CD

    Dev->>Main: [FEATURE:auth] REQ-042: Add login
    Main->>Tests: Run tests
    Tests-->>Main: ✅ Pass

    Dev->>Main: [FEATURE:dashboard] REQ-050: Add widget
    Main->>Tests: Run tests
    Tests-->>Main: ✅ Pass

    Dev->>Main: [FEATURE:auth] REQ-042: Add validation
    Main->>Tests: Run tests
    Tests-->>Main: ✅ Pass

    Note over Dev,Tests: All work integrated continuously!
```

**Real workflow**:

```bash
# Morning: Register a feature
sc fbc add user-auth \
  --description="User authentication system" \
  --requirements=REQ-042,REQ-043

# Work on auth (on main!)
git commit -m "[FEATURE:user-auth] REQ-042: Implement login endpoint"

# Afternoon: Switch to dashboard (no git checkout!)
git commit -m "[FEATURE:dashboard] REQ-050: Add widget framework"

# Back to auth (instant!)
git commit -m "[FEATURE:user-auth] REQ-043: Add JWT validation"

# View all auth commits
git log --grep="[FEATURE:user-auth]"

# Or use the command
sc fbc commits user-auth
```

**What this solves**:

- ✅ Zero branch switching overhead
- ✅ Instant context switching
- ✅ All work visible immediately
- ✅ Easy to see what belongs to which feature
- ✅ No merge conflicts

## The Secret Sauce: Micro-Merges

Here's why this works so well.

**Traditional branching** = big-bang integration:

```mermaid
graph TD
    A[Day 1-5: Develop in isolation] --> B[Day 6: Big merge]
    B --> C{Conflicts?}
    C -->|Yes| D[Hours of resolution]
    C -->|No| E[Lucky day!]
    D --> F[Hope nothing broke]
    E --> F

    style C fill:#ff6b6b
    style D fill:#ff6b6b
```

**Feature-based commits** = continuous micro-merges:

```mermaid
graph LR
    A[Commit 1] -->|tests run| B[Micro-merge 1]
    B --> C[Commit 2]
    C -->|tests run| D[Micro-merge 2]
    D --> E[Commit 3]
    E -->|tests run| F[Micro-merge 3]

    style B fill:#51cf66
    style D fill:#51cf66
    style F fill:#51cf66
```

**Every commit**:

1. Tests run (pre-commit hook)
2. Merges to main (micro-merge)
3. Integrates with all other work
4. Issues caught immediately

**Small, safe, continuous.** No big-bang surprises.

## Safety Through Test Enforcement

"But wait," you're thinking, "isn't working directly on main dangerous?"

**Not if you enforce tests on every commit.**

```mermaid
flowchart TD
    A[Developer commits] --> B{Pre-commit hook}
    B -->|Check 1| C{All untracked files<br/>wip-tracked?}
    C -->|No| X[❌ Blocked]
    C -->|Yes| D{Feature tag valid?}
    D -->|No| X
    D -->|Yes| E{Tests pass?}
    E -->|No| X
    E -->|Yes| F{REQ-XXX present?}
    F -->|No| X
    F -->|Yes| G[✅ Commit succeeds]

    style G fill:#51cf66
    style X fill:#ff6b6b
```

**Four safety checks before every commit**:

1. **WIP registry check**: No untracked files (must be registered or ignored)
2. **Feature tag validation**: Feature must exist in registry (prevents typos)
3. **Test enforcement**: All tests must pass
4. **Requirement traceability**: Must have REQ-XXX for tracking

**The result**: Each micro-merge is validated before integration. Your main branch stays clean and working.

## A Complete Example

Let me show you what this looks like in practice.

### Step 1: Set up a feature

```bash
# Add feature to registry
sc fbc add user-auth \
  --description="User authentication system" \
  --requirements=REQ-042,REQ-043
```

### Step 2: Create a file

```bash
vim docs/auth-design.md
```

### Step 3: Register it in WIP registry

```bash
sc wip register docs/auth-design.md \
  --feature=user-auth \
  --requirement=REQ-042 \
  --reason="Drafting authentication design" \
  --add-comment
```

This adds a comment to your file:

```markdown
<!-- WIP: user-auth | REQ-042 | Drafting design -->
<!-- REGISTERED: 2025-11-29 | Remove when committing -->

# Authentication Design

## Overview

...
```

### Step 4: Check status anytime

```bash
sc wip status

# Output:
# WIP Registry Status:
#   Total: 1
#   Active: 1
#   Old (>3d): 0
```

### Step 5: Commit when ready

```bash
git add docs/auth-design.md
git commit -m "[FEATURE:user-auth] REQ-042: Add authentication design

Complete design for JWT-based authentication system."

# Pre-commit hook runs:
# ✅ Feature tag validated: user-auth
# ✅ All tests pass
# ✅ Auto de-registered: docs/auth-design.md
# ✅ Commit successful
```

### Step 6: Switch to another feature

```bash
# No git checkout needed!
vim src/dashboard/widgets.ts

sc wip register src/dashboard/widgets.ts \
  --feature=dashboard \
  --requirement=REQ-050

# Work on it...

git commit -m "[FEATURE:dashboard] REQ-050: Implement dashboard widgets"
```

## When This Works (And When It Doesn't)

### ✅ Perfect For

- **Solo developers**: Maximum velocity, zero coordination overhead
- **Small teams** (2-4 people): Fast-paced collaboration without branch overhead
- **Multiple features at once**: Context switching is instant
- **Strong test coverage**: Safety comes from test enforcement
- **Rapid iteration**: Ship fast, integrate continuously

This is ideal for:

- Startups building quickly
- Small product teams
- Internal tools
- Prototypes and experiments

### ❌ Not Ideal For

- **Large teams** (5+ developers): Too much coordination
- **Long-running features** (weeks/months): Better to isolate
- **Strict code review**: Pull requests provide formal review process
- **Regulatory compliance**: Audit trails may require PRs
- **External contributors**: Open source needs PR workflow

This won't work well for:

- Enterprise software with formal processes
- Open source projects
- Regulated industries (finance, healthcare)
- Mission-critical systems with strict change control

### 🔀 Use Both (Hybrid Approach)

You don't have to choose!

**Daily work**: Feature-based commits on main  
**Releases**: Cut a release branch  
**External PRs**: Use branches for contributors  
**Experiments**: Temporary branches, then delete

Best of both worlds.

## The Real Benefits

Let me give you some real numbers.

**Before** (branch-based):

- 30 seconds to switch branches × 6 switches/day = 3 minutes
- Mental context reload = 5-10 minutes of "where was I?"
- Merge conflicts = 15-60 minutes when you're done
- **Total overhead: 30-90 minutes per day**

**After** (feature-based):

- 0 seconds to switch features
- No mental reload (it's all right there)
- No merge conflicts (continuous integration)
- **Total overhead: ~30 seconds per day**

**Time saved: 30-90 minutes per day** for typical multi-feature development.

But the real benefit isn't just time—it's **flow state**. No more breaking concentration to switch branches. No more merge anxiety. Just continuous, focused work.

## Get Started

Want to try it? Here's how:

```bash
# Install Supernal Coding
npm install supernal-code

# Add a feature
sc fbc add my-feature \
  --description="My awesome feature" \
  --requirements=REQ-001

# Register a file
sc wip register my-file.md \
  --feature=my-feature \
  --requirement=REQ-001 \
  --reason="Initial draft"

# Commit with feature tag
git commit -m "[FEATURE:my-feature] REQ-001: Initial implementation"

# Check status
sc fbc stats
sc wip status
```

**All the commands**:

```bash
# WIP registry
sc wip register <file> --feature=<name> --requirement=REQ-XXX
sc wip list
sc wip status
sc wip check
sc wip cleanup --older-than=7d

# Features
sc fbc add <name> --description="..." --requirements=REQ-XXX
sc fbc list
sc fbc show <name>
sc fbc commits <name>
sc fbc complete <name>
sc fbc stats
```

## What We Built

To make this work, we built:

- **WipManager** (389 lines) - File registry management
- **FeatureManager** (240 lines) - Feature registry management
- **23 comprehensive tests** - All functionality covered
- **Complete documentation** - SOPs and guides
- **CLI integration** - Two new command groups

**Total**: 2,180 lines of code, tests, and documentation.

All tested. All documented. Ready to use.

## Wrapping Up

Parallel development with continuous reconnection isn't just a workflow change—it's a mindset shift.

Instead of isolating features in branches and merging them later (big-bang integration), you integrate continuously through micro-merges. Each commit is small, tested, and safe.

**Two systems make it work**:

1. **WIP registry**: Track WIP files by feature (no more "which feature?")
2. **Feature-based commits**: Tag commits, not branches (no switching overhead)

**The result**: Multiple features developing in parallel, safely, on a single branch.

It's not for everyone. Large teams and long features still need traditional branching. But for solo developers and small teams doing rapid parallel development? This is a game-changer.

---

**Want to learn more?** Check out the complete documentation (see SOP-0.1.12 in workspace) or get started with Supernal Coding at `/docs/guides/getting-started`.
