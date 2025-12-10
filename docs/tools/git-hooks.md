---
title: Git Hooks
description: Configure and manage Supernal Coding git hooks
sidebar_position: 3
---

# Git Hooks

Supernal Coding uses git hooks to automate validation, enforce quality standards, and ensure compliance at key points in your workflow.

## Overview

Git hooks are scripts that run automatically at specific points in the git workflow. Supernal Coding provides pre-configured hooks that integrate with the requirement system, testing framework, and compliance validation.

## Installing Hooks

### Initial Installation

```bash
sc git-hooks install
```

This installs all Supernal Coding hooks to `.husky/` in your repository.

### Check Status

```bash
sc git-hooks status
```

Shows which hooks are installed and their current state.

## Available Hooks

### Pre-commit Hook

Runs before each commit to validate changes:

- **Requirement Validation**: Ensures commit references valid requirements
- **Code Quality**: Runs linters and formatters
- **WIP Registry Check**: Validates untracked files

```bash
# Manual trigger
sc git-hooks pre-commit
```

### Pre-push Hook

Runs before pushing to remote:

- **Test Execution**: Runs test suite
- **Compliance Checks**: Validates compliance requirements
- **Build Validation**: Ensures project builds

```bash
# Manual trigger
sc git-hooks pre-push
```

### Commit-msg Hook

Validates commit message format:

- **REQ Reference**: Checks for requirement traceability
- **Format Standards**: Enforces conventional commit format
- **Length Limits**: Validates subject and body length

## Commit Message Format

### Standard Format

```
REQ-XXX: Brief description

Optional longer description explaining the change
in more detail if needed.
```

### Examples

```bash
# Good commit messages
git commit -m "REQ-001: Implement user authentication"
git commit -m "REQ-042: Fix validation edge case in login flow"
git commit -m "docs: Update README with new installation steps"

# Bad commit messages (will be rejected)
git commit -m "fix stuff"      # No requirement reference
git commit -m "WIP"            # Not descriptive
```

## Configuration

### supernal.yaml

Configure hooks in your `supernal.yaml`:

```yaml
git_hooks:
  pre_commit:
    enabled: true
    checks:
      wip_registry_check:
        enabled: true
        threshold: 5
      linting:
        enabled: true
      formatting:
        enabled: true
  
  pre_push:
    enabled: true
    checks:
      tests:
        enabled: true
        suite: "unit"
      build:
        enabled: true
  
  commit_msg:
    enabled: true
    require_req_reference: true
    format: "conventional"
```

### Bypass Options

For emergency situations, you can bypass hooks:

```bash
# Skip pre-commit
SC_SKIP_PRE_COMMIT=true git commit -m "message"

# Skip pre-push
SC_SKIP_PRE_PUSH=true git push

# Skip all checks (emergency only)
git commit --no-verify -m "message"
```

**Warning**: Use bypass sparingly. All bypassed commits should be reviewed.

## Troubleshooting

### Hooks Not Running

```bash
# Reinstall hooks
sc git-hooks install

# Check husky installation
ls -la .husky/

# Verify permissions
chmod +x .husky/*
```

### Hooks Blocking Valid Commits

```bash
# Check what's failing
sc git-hooks pre-commit --verbose

# Check WIP registry
sc wip status
```

### Performance Issues

If hooks are slow:

```bash
# Run targeted tests only
sc git-hooks pre-push --quick

# Skip heavy checks for minor changes
SC_QUICK_CHECK=true git push
```

## Integration with CI/CD

Hooks complement CI/CD by catching issues early:

```yaml
# GitHub Actions example
name: CI
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: sc git-hooks pre-push  # Same checks as local
```

## Best Practices

1. **Don't Disable Hooks**: They protect code quality
2. **Fix Root Causes**: If bypassing often, fix the underlying issue
3. **Keep Hooks Fast**: Slow hooks get bypassed
4. **Document Bypasses**: Note why hooks were bypassed in commit message
5. **Update Regularly**: Keep hooks in sync with `sc` version
