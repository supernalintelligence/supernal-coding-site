---
title: Examples
description: Code examples, templates, and sample projects
sidebar_position: 1
---

# Examples & Templates

This section provides practical examples, templates, and sample projects to help you get started with Supernal Coding.

## Quick Start Examples

### Initialize a New Project

```bash
# Create and initialize a new compliant project
mkdir my-project
cd my-project
git init
sc init --standard
```

### Create Your First Requirement

```bash
# Create a requirement
sc req new "User authentication system" \
  --priority=high \
  --epic=auth \
  --compliance="iso-13485"

# View the requirement
sc req show REQ-001

# Start working on it
sc req start-work REQ-001
```

### Complete Development Cycle

```bash
# 1. Create feature branch
sc git-smart branch --req=REQ-001

# 2. Make changes
# ... implement your feature ...

# 3. Run tests
sc test run unit

# 4. Validate
sc req validate REQ-001

# 5. Complete requirement
sc req update REQ-001 --status=done

# 6. Merge safely
sc git-smart merge --push --delete-local
```

## Templates

### Requirement Templates

Templates are installed automatically during `sc init`. Common templates include:

- **Feature Requirement**: Standard feature implementation
- **Bug Fix**: Structured bug tracking
- **Compliance**: Compliance-specific requirements
- **Integration**: Third-party integrations

### Project Templates

```bash
# Initialize with specific templates
sc init --template=medical-device    # ISO 13485 focused
sc init --template=fintech          # SOC2/PCI focused
sc init --template=saas             # General SaaS
```

## Sample Configurations

### supernal.yaml

```yaml
project:
  name: "My Compliant App"
  version: "1.0.0"
  
requirements:
  default_priority: medium
  phases:
    - discovery
    - foundation
    - implementation
    - validation
    - compliance
    
compliance:
  frameworks:
    - iso-13485
    - fda-21-cfr
    
git_hooks:
  enabled: true
  pre_commit:
    linting: true
    tests: false
  pre_push:
    tests: true
    
dashboard:
  port: 3001
  auto_open: true
```

### .cursor/rules Example

```yaml
# AI agent rules for your project
- name: requirement-traceability
  description: Always reference requirements in commits
  pattern: "REQ-\\d+:"
  
- name: test-coverage
  description: Ensure test coverage for new code
  minimum: 80
```

## Workflow Examples

### Sprint Planning

```bash
# View all requirements
sc req list --status=pending

# Prioritize for sprint
sc priority set REQ-001 critical
sc priority set REQ-002 high

# Assign to team
sc req update REQ-001 --assignee=@developer1
```

### Compliance Audit Prep

```bash
# Generate compliance report
sc compliance report --framework=iso-13485

# Export audit trail
sc compliance export --format=pdf

# Validate all requirements have compliance tags
sc validate --compliance-tags
```

### Release Checklist

```bash
# Validate all requirements complete
sc req list --status=in-progress  # Should be empty

# Run full test suite
sc test run all

# Generate release notes
sc docs generate --release-notes

# Tag release
sc git-smart tag v1.0.0
```

## Integration Examples

### CI/CD Pipeline

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
      - run: npx supernal-coding validate --all
      - run: npx supernal-coding test run unit
```

### Pre-commit Hook

```bash
#!/bin/sh
# .husky/pre-commit
sc validate --staged
sc test run unit --changed-only
```

## More Resources

- [Getting Started Guide](/docs/getting-started) - Complete setup walkthrough
- [CLI Reference](/docs/tools/cli) - Full command documentation
- [Compliance Guide](/docs/compliance) - Framework implementation
