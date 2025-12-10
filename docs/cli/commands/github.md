---
title: sc github
description: GitHub integration and issue management
---

# sc github

GitHub integration and issue management

## Usage

```bash
sc github [subcommand] [action] [...args] [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[subcommand]` | (optional) |
| `[action]` | (optional) |
| `[...args]` | (optional) |

## Options

| Option | Description |
|--------|-------------|
| `--issue <number>` | Check specific issue number |
| `--since <time>` | Only check issues updated since (e.g., "1h", "2d") |
| `--labels <labels>` | Comma-separated labels to filter |
| `--state <state>` | Issue state: open|closed|all (default: open) |
| `--limit <number>` | Maximum issues to check (default: 50) |
| `--json` | Output as JSON |
| `--export <path>` | Export results to JSON file |
| `-v, --verbose` | Verbose output |

## Examples

```bash
# Basic usage
sc github
```
