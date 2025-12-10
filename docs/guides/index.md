---
title: Guides
description: Step-by-step guides for using Supernal Coding
sidebar_position: 1
---

# Guides

Comprehensive guides for getting the most out of Supernal Coding.

## Getting Started

- **[What You Get](./what-you-get)** - Everything installed by `sc init`
- **[Configuring](./configuring)** - Configure `supernal.yaml` and settings

## Development Workflow

- **[Planning](./planning)** - Epics, requirements, and milestones
- **[Building](./building)** - Implementation workflow with AI
- **[Testing](./testing)** - Test generation and validation

## Standards & Reference

- **[Build & Test Standards](./build-test-standards)** - BUILDME.sh, TESTME.sh, RUNME.sh
- **[Troubleshooting](./troubleshooting)** - Common issues and solutions

## Workflow Details

In-depth documentation for specific workflow aspects:

- **[Workflow Details](./workflow-details/)** - Requirements, git integration, agent handoffs, and more

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
