---
title: sc dashboard
description: Project dashboard for requirements and progress tracking
---

# sc dashboard

Project dashboard for requirements and progress tracking

## Usage

```bash
sc dashboard [action] [ports...] [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[action]` | (optional) |
| `[ports...]` | (optional) |

## Options

| Option | Description |
|--------|-------------|
| `-p, --port <number>` | Port number (default: 3000) |
| `--open` | Open browser automatically |
| `--no-browser` | Don't open browser |
| `--kill-conflicts` | Kill processes using conflicting ports before starting |
| `--docs-port <port>` | Port for documentation server (default: 3003) |
| `--api-port <port>` | Port for API server (default: 3001) |
| `--dashboard-port <port>` | Port for dashboard server (default: 3002) |
| `--host <host>` | Host to bind server to (default: localhost) |
| `-y, --yes` | Skip prompts and use defaults |
| `--force` | Overwrite existing dashboard files |
| `--upgrade` | Upgrade existing dashboard to latest template version |
| `--dry-run` | Show what would change without making changes |
| `--template <type>` | Dashboard template type: "static" (default) or "supernal-dashboard" (Next.js) |
| `--disable-embedded` | Disable embedded dashboard in documentation (for deployments) |
| `--github-pages` | Deploy to GitHub Pages |
| `--vercel` | Deploy to Vercel |
| `--output <dir>` | Output directory (default: docs) |

## Examples

```bash
# Basic usage
sc dashboard
```
