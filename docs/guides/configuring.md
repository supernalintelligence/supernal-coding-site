---
title: Configuring
description: Configure Supernal Coding for your project
---

# Configuring Supernal Coding

Customize Supernal Coding to match your project's needs.

## Configuration File

The main configuration lives in `supernal.yaml` at your project root.

```yaml
# supernal.yaml
project:
  name: my-project
  type: full-stack

paths:
  docs: docs
  requirements: docs/requirements
  features: docs/features

git_hooks:
  pre_commit:
    enabled: true
    checks:
      - lint
      - type-check
      - wip-registry
  pre_push:
    enabled: true
    checks:
      - requirement-validation
```

## Cursor Rules

Rules in `.cursor/rules/` guide AI agents. Key rules include:

- `avoid-anti-patterns.mdc` - Prevent common mistakes
- `git-smart.mdc` - Safe git operations
- `requirement-change.mdc` - Requirement workflow

## Git Hooks

Configure in `supernal.yaml` under `git_hooks`:

```yaml
git_hooks:
  pre_commit:
    checks:
      wip_registry_check:
        enabled: true
        threshold: 5
```

## Compliance Frameworks

Select frameworks during init or add later:

```bash
sc init --compliance-frameworks hipaa,soc2,iso13485
```

