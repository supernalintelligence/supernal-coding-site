---
title: Configuration Management
description: How to configure Supernal Coding using supernal.yaml
---

Supernal Coding uses `supernal.yaml` as the central configuration file for managing project settings, workflows, and git hooks.

## Quick Start

Create a new configuration from template:

```bash
# Initialize with sc init (creates supernal.yaml)
sc init

# Or copy the template manually
cp supernal-code-package/templates/init/supernal.yaml.template supernal.yaml
```

## Configuration File Location

The configuration file is located at the project root:

```
supernal.yaml
```

## Viewing Configuration

### Show Full Configuration

```bash
sc config show
```

### Show Specific Section

```bash
sc config show --section git_hooks
sc config show --section documentation
```

### Show as JSON

```bash
sc config show --json
```

## Getting Configuration Values

```bash
# Get a specific value using dot notation
sc config get version
sc config get git_hooks.enabled
sc config get git_hooks.pre_commit.checks.markdown_links.enabled
```

## Setting Configuration Values

```bash
# Set a value using dot notation
sc config set git_hooks.enabled true
sc config set git_hooks.pre_commit.checks.markdown_links.enabled false
sc config set workflow agile-4

# Values are automatically parsed:
# - "true"/"false" → boolean
# - Numbers → number
# - JSON objects/arrays → parsed
# - Everything else → string
```

## Git Hooks Configuration

The git hooks system is fully configurable through `supernal.yaml`:

```bash
# View current hooks configuration
sc config hooks

# View detailed hooks configuration
sc config hooks --verbose

# Enable/disable entire hooks system
sc config set git_hooks.enabled true

# Enable/disable specific checks
sc config set git_hooks.pre_commit.checks.markdown_links.enabled true
sc config set git_hooks.pre_commit.checks.requirements_validation.enabled false

# Configure protected branches
sc config set git_hooks.pre_push.checks.branch_protection.protected_branches "main,master,production"
```

### Available Pre-Commit Checks

| Check                     | Description                                    | Skip Environment Variable    |
| ------------------------- | ---------------------------------------------- | ---------------------------- |
| `requirements_validation` | Validate requirement files structure and links | `SC_SKIP_REQ_VALIDATION`     |
| `markdown_links`          | Check for broken markdown links                | `SC_SKIP_DOC_VALIDATION`     |
| `feature_validation`      | Validate feature structure and status          | `SC_SKIP_FEATURE_VALIDATION` |
| `eslint`                  | Run ESLint on staged files                     | `SC_SKIP_ESLINT`             |

### Available Pre-Push Checks

| Check               | Description                          | Skip Environment Variable |
| ------------------- | ------------------------------------ | ------------------------- |
| `branch_protection` | Prevent pushes to protected branches | `SC_SKIP_BRANCH_PROTECT`  |
| `test_suite`        | Run full test suite                  | `SC_SKIP_TESTS`           |
| `build_validation`  | Ensure project builds                | `SC_SKIP_BUILD`           |

## Cursor Rules Configuration

Rules in `.cursor/rules/` guide AI agents. Key rules include:

- `avoid-anti-patterns.mdc` - Prevent common mistakes
- `git-smart.mdc` - Safe git operations
- `requirement-change.mdc` - Requirement workflow

## Compliance Frameworks Configuration

Select frameworks during init or add later:

```bash
sc init --compliance-frameworks hipaa,soc2,iso13485
```

Or configure in `supernal.yaml`:

```yaml
compliance:
  frameworks:
    - hipaa
    - soc2
    - iso13485
  audit:
    retention: 7y
    encryption: true
```
