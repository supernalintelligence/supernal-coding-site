---
title: sc merge-safe
description: Safe merge with rebase and validation
---

# sc merge-safe

Safe merge with rebase and validation

**Alias:** `sc merge`

## Usage

```bash
sc merge-safe [branch] [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[branch]` | (optional) |

## Options

| Option | Description |
|--------|-------------|
| `--no-rebase` | Skip rebase step |
| `--force` | Force merge even with conflicts |
| `-v, --verbose` | Verbose output |

## Examples

```bash
# Basic usage
sc merge-safe

# Using alias
sc merge
```
