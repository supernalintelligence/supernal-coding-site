---
title: What You Get
description: Deep dive into everything you get with sc init
---

When you run `sc init` in any git repository, you get a complete compliance infrastructure. Here's what each component does and why it matters.

## SC CLI

The `sc` command-line interface is your primary tool for managing compliant development.

### Key Commands

```bash
# Requirements lifecycle
sc req new "Feature name" --epic=core --priority=high
sc req validate REQ-001
sc req update REQ-001 --status=in-progress
sc req list --filter=in-progress

# Git workflow
sc git-smart branch --branch feature/req-001-auth
sc git-smart merge --push --delete-local
sc git-hooks install

# Validation
sc validate-installation --all
sc test-map

# Dashboard
sc dashboard
```

### What It Does

| Command Group | Purpose | Result |
|---------------|---------|--------|
| `sc req` | Requirements management | Full lifecycle from creation to validation |
| `sc git-smart` | Intelligent git operations | Clean branches, automated merges |
| `sc git-hooks` | Quality automation | Pre-commit/pre-push validation |
| `sc test-map` | Test discovery | Maps tests to requirements |
| `sc dashboard` | Visual interface | Real-time project status |

## Cursor Rules

AI agents need context to be useful. Cursor Rules provide that context automatically.

### What Gets Installed

```
.cursor/rules/
├── supernal-coding-commands.mdc    # CLI command reference
├── supernal-coding-workflow.mdc    # Development workflow
├── project-specific.mdc            # Your project context
└── coding-standards.mdc            # Code conventions
```

### Why It Matters

| Without Cursor Rules | With Cursor Rules |
|----------------------|-------------------|
| AI guesses at your conventions | AI follows your standards |
| Generic suggestions | Context-aware suggestions |
| Manual context explaining | Automatic context loading |
| Inconsistent outputs | Consistent, project-aligned outputs |

The rules are automatically synced when you commit, keeping AI context up-to-date.

## SOPs (Standard Operating Procedures)

A 12-phase development workflow that provides process without overhead.

### The Phases

| Phase | Name | What Happens |
|-------|------|--------------|
| 1 | Discovery | Problem identification, stakeholder analysis |
| 2 | Research | User stories, domain modeling |
| 3 | Design | Architecture, compliance, security design |
| 4 | Planning | Feature breakdown, task estimation |
| 5 | Requirements | Detailed requirements, acceptance criteria |
| 6 | Tests | Test creation and validation strategy |
| 7 | Build | Implementation and unit testing |
| 8 | Integration | Feature integration, E2E testing |
| 9 | Milestone | Epic integration into milestones |
| 10 | Staging | Staging deployment and validation |
| 11 | Production | Production deployment |
| 12 | Operations | Monitoring and maintenance |

### Simplified Views

For daily work, use the 5-phase dashboard view:

| Dashboard Phase | SOP Phases | Use For |
|-----------------|------------|---------|
| Discovery | 1-2 | Finding and defining problems |
| Foundation | 3-5 | Planning and requirements |
| Implementation | 6-7 | Building and testing |
| Integration | 8-9 | Bringing features together |
| Release | 10-12 | Deploying and operating |

## Compliance Templates

Ready-to-use frameworks for major regulations.

### Available Frameworks

| Framework | Industry | Coverage |
|-----------|----------|----------|
| **HIPAA** | Healthcare | 52 controls for patient data protection |
| **SOC 2** | SaaS/Enterprise | Trust service criteria coverage |
| **ISO 27001** | Information Security | 93 controls for security management |
| **GDPR** | EU Data Privacy | 45 articles for data protection |
| **FDA 21 CFR Part 11** | Life Sciences | Electronic records compliance |
| **ISO 13485** | Medical Devices | Quality management for medical software |

### How It Works

```bash
# Add compliance framework to your project
sc compliance add hipaa

# Check compliance status
sc compliance status

# Generate audit report
sc compliance report --format=pdf
```

## Git Hooks

Automated quality gates that run on every commit and push.

### Pre-Commit Hook

Runs before every commit:

| Check | What It Does | Bypass |
|-------|--------------|--------|
| Branch protection | Prevents direct commits to main | `--no-verify` |
| Type checking | Scans for TypeScript duplicates | `SC_SKIP_TYPE_CHECK=true` |
| Date validation | Validates document timestamps | `SC_SKIP_DATE_VALIDATION=true` |
| Documentation org | Validates doc file locations | `SC_SKIP_DOC_VALIDATION=true` |

### Pre-Push Hook

Runs before every push:

| Check | What It Does | Bypass |
|-------|--------------|--------|
| Full test suite | All tests must pass | `--no-verify` |
| Build validation | Project must build | `SC_SKIP_PRE_PUSH=true` |
| Cosmetic audit | Detects display-only assertions | `SC_SKIP_COSMETIC_AUDIT=true` |

### Installation

```bash
# Install all hooks
sc git-hooks install

# Check status
sc git-hooks status

# Bypass for emergency (use sparingly)
git commit --no-verify -m "Emergency fix"
```

## Quick Command Reference

### Daily Workflow

```bash
# Start work on a requirement
sc git-smart branch --branch feature/req-001-auth
sc req update REQ-001 --status=in-progress

# During development
sc test                    # Run tests
sc validate-installation   # Check everything

# Complete work
sc req update REQ-001 --status=done
sc git-smart merge --push --delete-local
```

### Shortcuts

| Long Command | Shortcut | Description |
|--------------|----------|-------------|
| `sc requirement` | `sc req` | Requirements management |
| `sc git-smart` | - | Git workflow automation |
| `./TESTME.sh` | - | Run all tests |
| `./BUILDME.sh` | - | Build project |


