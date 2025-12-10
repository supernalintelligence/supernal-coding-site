---
title: CLI Reference
description: Complete reference for the sc command-line interface
---

# CLI Reference

The `sc` command provides all Supernal Coding functionality.

## Installation

```bash
npm install -g @supernal/coding
```

## Core Commands

### `sc init`
Initialize a repository with Supernal Coding.

```bash
sc init --standard           # Standard preset
sc init --minimal            # Minimal preset
sc init --full               # Full preset
sc init --interactive        # Interactive setup
```

### `sc requirement`
Manage requirements.

```bash
sc requirement new "Title" --epic=main --priority=high
sc requirement list
sc requirement show REQ-001
sc requirement validate REQ-001
sc requirement update REQ-001 --status=in-progress
```

### `sc git-smart`
Safe git operations with context awareness.

```bash
sc git-smart branch --branch REQ-001
sc git-smart check-context
sc git-smart merge --push --delete-local
```

### `sc validate`
Run validation checks.

```bash
sc validate                  # All validations
sc validate --docs           # Documentation only
sc validate --requirements   # Requirements only
```

### `sc health`
Check repository health.

```bash
sc health                    # Overview
sc health features           # Feature health
sc health requirements       # Requirement health
```

## Git Hooks Commands

```bash
sc git-hooks install         # Install hooks
sc git-hooks status          # Check hook status
```

## Workflow Commands

```bash
sc workflow status           # Current workflow state
sc kanban list               # View kanban tasks
sc kanban todo "Task"        # Create task
```


