---
title: sc build
description: Unified build with docs generation and validation
---

# sc build

Unified build with docs generation and validation

## Usage

```bash
sc build [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--quiet` | CI mode (minimal output) |
| `--verbose` | Verbose output |
| `--skip-docs` | Skip CLI docs generation |
| `--skip-validate` | Skip template validation |
| `--no-colors` | Disable colored output |
| `--no-smoke-tests` | Skip smoke tests (BUILDME.sh only) |

## Examples

```bash
# Basic usage
sc build
```
