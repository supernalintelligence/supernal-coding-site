---
title: sc docs
description: Documentation management system
---

# sc docs

Documentation management system

## Usage

```bash
sc docs [action] [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[action]` | (optional) |

## Options

| Option | Description |
|--------|-------------|
| `--build` | Build documentation |
| `--serve` | Serve documentation locally |
| `-p, --port <number>` | Port for serving (default: 3001) |
| `--cleanup` | Scan and cleanup documentation structure (ADR-001) |
| `--auto-fix` | Automatically fix documentation issues |
| `--interactive` | Review each change interactively |
| `--dry-run` | Show what would be done without making changes |

## Examples

```bash
# Basic usage
sc docs
```
