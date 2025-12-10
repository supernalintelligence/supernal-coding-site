---
title: sc init
description: Equip current repository with specific preset or content modules
---

# sc init

Equip current repository with specific preset or content modules

## Usage

```bash
sc init [directory] [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[directory]` | (optional) |

## Options

| Option | Description |
|--------|-------------|
| `--minimal` | Install minimal preset (just essentials) |
| `--standard` | Install standard preset (recommended) |
| `--full` | Install full preset (complete ecosystem) |
| `--development` | Install development preset (for contributors) |
| `--interactive` | Interactive setup mode |
| `--guides` | Install guides/tutorials to docs/guides/ |
| `--compliance` | Install compliance templates to docs/compliance/ |
| `--workflow` | Install workflow/SOPs to docs/workflow/ |
| `--dry-run` | Show what would be installed without doing it |
| `--overwrite` | Overwrite existing files without confirmation |
| `--skip-upgrade-check` | Skip checking for package upgrades |
| `--merge` | Merge with existing installation |
| `--yes` | Skip confirmations and use defaults |
| `--name <name>` | Project name |
| `--alias <alias>` | Command alias |
| `-t, --template <name>` | Template to use |
| `--force` | Overwrite existing files |
| `-v, --verbose` | Verbose output |
| `--framework <frameworks>` | Compliance frameworks (comma-separated): iso13485,fda21cfr11,gdpr,soc2 |

## Examples

```bash
# Basic usage
sc init
```
