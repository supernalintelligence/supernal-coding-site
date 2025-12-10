---
title: Getting Started
description: Install and configure Supernal Coding in 5 minutes
---

# Getting Started

Get your repository equipped with Supernal Coding in under 5 minutes.

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org/)
- **Git** — Repository must be initialized
- **A project** — Any existing codebase or new repository

## Installation

### Step 1: Install the CLI

```bash
npm install -g @supernal/coding
```

Verify installation:

```bash
sc --version
```

### Step 2: Initialize Your Repository

Navigate to your project and run:

```bash
cd your-project
sc init --standard
```

You'll be prompted to select options:

```
? Select features to install:
  ◉ Cursor Rules (AI agent guidelines)
  ◉ Git Hooks (pre-commit validation)
  ◉ SOPs (standard operating procedures)
  ◉ Documentation Structure
  ◯ Compliance: SOC2
  ◯ Compliance: HIPAA
  ◯ Compliance: ISO 13485
```

### Step 3: Verify Setup

```bash
sc health
```

Expected output:

```
✓ SC CLI installed
✓ Git hooks active
✓ Cursor rules present
✓ Documentation structure valid
```

## What Was Installed

After initialization, your repository contains:

```
your-project/
├── .cursor/
│   └── rules/           # AI agent behavior rules
├── .husky/
│   ├── pre-commit       # Quality gate before commits
│   └── pre-push         # Validation before pushes
├── docs/
│   ├── requirements/    # Gherkin specifications
│   ├── workflow/        # SOPs and processes
│   └── epics/           # Feature groupings
├── supernal.yaml        # Configuration file
└── ...your existing code
```

## Your First Requirement

Create a requirement to see the workflow in action:

```bash
sc req new "Add user login" --epic=authentication --priority=high
```

This creates a requirement file with:

- Unique ID (e.g., `REQ-001`)
- Gherkin scenario template
- Traceability metadata
- Status tracking

View your requirements:

```bash
sc req list
```

## Essential Commands

| Command | What It Does |
|---------|--------------|
| `sc req new "Title"` | Create a new requirement |
| `sc req validate REQ-001` | Check requirement quality |
| `sc req generate-tests REQ-001` | Create test scaffolds |
| `sc health` | Check repository status |
| `sc validate` | Run all validations |
| `sc config show` | View current configuration |

## Configuration

Your `supernal.yaml` controls behavior:

```yaml
# supernal.yaml
project:
  name: your-project
  
git_hooks:
  pre_commit:
    enabled: true
    checks:
      - lint
      - format
      - test
      
requirements:
  auto_increment_id: true
  default_priority: medium
```

Edit with:

```bash
sc config set git_hooks.pre_commit.enabled true
```

## Using with AI Agents

If you're using Cursor or another AI coding tool:

1. **Rules are automatic** — Cursor rules in `.cursor/rules/` guide AI behavior
2. **Commit messages follow conventions** — `REQ-001: Description` format
3. **Tests come first** — AI is guided to write tests before implementation

## Troubleshooting

### "Command not found: sc"

Ensure npm global bin is in your PATH:

```bash
npm config get prefix
# Add {prefix}/bin to your PATH
```

### Git hooks not running

Reinstall hooks:

```bash
sc git-hooks install
```

### Health check failures

Run with verbose output:

```bash
sc health --verbose
```

## Next Steps

Now that you're set up:

1. **[Configuring](./guides/configuring.md)** — Customize `supernal.yaml` for your needs
2. **[Planning](./guides/planning.md)** — Organize work with epics and milestones
3. **[Building](./guides/building.md)** — The test-first implementation workflow
4. **[Testing](./guides/testing.md)** — Validation and quality gates
