---
title: sc test
description: Testing guidance and execution system
Actions: guide, setup, validate, plan, run, doctor, map, structure
---

# sc test

Testing guidance and execution system
Actions: guide, setup, validate, plan, run, doctor, map, structure

## Usage

```bash
sc test [action] [target] [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[action]` | (optional) |
| `[target]` | (optional) |

## Options

| Option | Description |
|--------|-------------|
| `--framework <framework>` | Testing framework to use (playwright, jest, cypress) |
| `--watch` | Watch mode |
| `--coverage` | Generate coverage report |
| `--fix` | Auto-fix test issues where possible |
| `-v, --verbose` | Verbose output |

## Examples

```bash
# Basic usage
sc test
```
