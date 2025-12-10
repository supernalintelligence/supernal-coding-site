---
title: Getting Started
description: Quick setup guide for Supernal Coding
---

# Getting Started

Get up and running with Supernal Coding in minutes.

## Prerequisites

- Node.js 18+ 
- Git
- A repository to equip

## Installation

### 1. Install the CLI

```bash
npm install -g @supernal/coding
```

### 2. Initialize Your Repository

```bash
cd your-project
sc init --standard
```

This installs:
- Cursor rules for AI agents
- Git hooks for quality gates
- Workflow templates
- Documentation structure

### 3. Verify Installation

```bash
sc health
```

## Quick Commands

```bash
# Create a requirement
sc requirement new "Feature Name" --epic=main --priority=high

# Check repository health
sc health

# Run validation
sc validate

# View workflow status
sc workflow status
```

## Next Steps

- [Configuring](./guides/configuring.md) - Customize your setup
- [Planning](./guides/planning.md) - Organize work with epics and requirements
- [Building](./guides/building.md) - Development workflow
- [Testing](./guides/testing.md) - Testing and validation

