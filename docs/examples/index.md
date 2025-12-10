---
title: Examples
description: Working examples demonstrating Supernal Coding features
icon: Code
---

# Examples

Practical examples showing how to use Supernal Coding in real projects.

## Available Examples

### [Requirement Workflow](./requirement-workflow/)
Complete example of creating, implementing, and completing a requirement from start to finish.

### [Compliance Setup](./compliance-setup/)
Setting up compliance frameworks for a healthcare application.

### [Git Hooks Configuration](./git-hooks-config/)
Configuring pre-commit and pre-push hooks for quality gates.

## Quick Code Snippets

### Initialize Repository

```bash
# Standard initialization with compliance frameworks
sc init --standard --compliance-frameworks hipaa,soc2

# Verify installation
sc health
```

### Create Requirement

```bash
# Create feature requirement
sc requirement new "User Authentication" \
  --epic=security \
  --priority=high \
  --request-type=feature

# Validate it
sc requirement validate REQ-001
```

### Feature Branch Workflow

```bash
# Start work on requirement
sc git-smart branch --branch REQ-001

# ... implement feature ...

# Merge when complete
sc git-smart merge --push --delete-local
```

## Project Templates

Templates are installed via `sc init`:

| Template | Description |
|----------|-------------|
| `--standard` | Full setup with docs, compliance, hooks |
| `--minimal` | Essential files only |
| `--full` | Everything including all compliance frameworks |
