---
title: Guides
description: Step-by-step guides for using Supernal Coding
---

Comprehensive guides for getting the most out of Supernal Coding.

## Getting Started

- **[What You Get](./what-you-get.md)** - Everything installed by `sc init`
- **[Configuring](./configuring.md)** - Configure `supernal.yaml` and settings

## Development Workflow

- **[Planning](./planning.md)** - Epics, requirements, and milestones
- **[Building](./building.md)** - Implementation workflow with AI
- **[Testing](./testing.md)** - Test generation and validation

## Standards & Reference

- **[Build & Test Standards](./build-test-standards.md)** - BUILDME.sh, TESTME.sh, RUNME.sh
- **[Troubleshooting](./troubleshooting.md)** - Common issues and solutions

## Quick Reference

### Daily Commands

```bash
# Start work on requirement
sc git-smart branch --branch REQ-001
sc req update REQ-001 --status=in-progress

# Validate your work
sc validate
npm test

# Complete and merge
sc req update REQ-001 --status=done
sc git-smart merge --push --delete-local
```

### Standardized Scripts

| Script | Purpose |
|--------|---------|
| `./BUILDME.sh` | Build the project |
| `./TESTME.sh` | Run tests |
| `./RUNME.sh` | Start dev server |
