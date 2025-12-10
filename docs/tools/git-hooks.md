---
title: Git Hooks
description: Automated quality gates with git hooks
---

# Git Hooks

Automated quality gates that run on commit and push.

## Installation

```bash
sc git-hooks install
```

## Pre-Commit Checks

Runs before every commit:

1. **WIP Registry** - Ensures files are tracked
2. **Linting** - Code style validation
3. **Type Checking** - TypeScript validation
4. **Formatting** - Code formatting

## Pre-Push Checks

Runs before every push:

1. **Requirement Validation** - Validates all requirements
2. **Test Suite** - Runs tests
3. **Compliance Check** - Validates compliance configuration

## Configuration

In `supernal.yaml`:

```yaml
git_hooks:
  pre_commit:
    enabled: true
    checks:
      wip_registry_check:
        enabled: true
        threshold: 5
      lint: true
      type_check: true
  pre_push:
    enabled: true
    checks:
      requirement_validation: true
      tests: true
```

## Bypassing Hooks

For emergencies only:

```bash
# Skip specific check
SC_SKIP_WIP_CHECK=true git commit -m "message"

# Skip all checks (emergency)
SC_SKIP_ALL_CHECKS=true git commit -m "message"
```

## Troubleshooting

```bash
# Check hook status
sc git-hooks status

# Reinstall hooks
sc git-hooks install --force
```

