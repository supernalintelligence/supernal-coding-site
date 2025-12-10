---
title: sc cleanup
description: Repository structure and documentation cleanup with staging queue
---

# sc cleanup

Repository structure and documentation cleanup with staging queue

## Usage

```bash
sc cleanup [action] [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[action]` | (optional) |

## Options

| Option | Description |
|--------|-------------|
| `--auto-fix` | Automatically fix issues |
| `--auto-stage` | Move problematic files to cleanup-queue for review |
| `--interactive` | Review each change interactively |
| `--dry-run` | Show what would be done without making changes |
| `--skip-docs` | Skip documentation structure checks |
| `--skip-structure` | Skip directory structure validation |
| `--validate-naming` | Enable file naming validation (REQ-VALIDATION-001) |
| `--check-links` | Check for broken markdown links |
| `--find-orphans` | Find orphaned files with no references |
| `--all` | Enable all checks |

## Examples

```bash
# Basic usage
sc cleanup
```
