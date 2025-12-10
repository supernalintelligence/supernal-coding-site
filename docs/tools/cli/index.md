---
title: CLI Reference
description: Complete reference for the sc command-line interface
sidebar_position: 1
---

# CLI Reference

The `sc` command-line interface is the primary tool for interacting with Supernal Coding. All commands can be run with either `sc` or `supernal-coding` prefix.

## Installation

```bash
npm install -g supernal-coding
```

Verify installation:

```bash
sc --version
sc --help
```

## Command Categories

### Project Setup

| Command | Description |
|---------|-------------|
| [`init`](./init-req-tracking) | Initialize Supernal Coding in a repository |
| [`doctor`](./validate) | Check system compatibility |

### Requirements Management

| Command | Description |
|---------|-------------|
| [`req`](./init-req-tracking) | Requirement lifecycle management |
| [`kanban`](./kanban) | Kanban board and task management |
| [`priority`](./priority) | Priority management for requirements |
| [`validate`](./validate) | Validate requirements and structure |

### Git Workflow

| Command | Description |
|---------|-------------|
| [`git-smart`](./git-smart) | Smart git workflow utilities |
| [`git-hooks`](./git-hooks) | Git hooks management |

### Development Tools

| Command | Description |
|---------|-------------|
| [`agent`](./agent) | Agent workflow management |
| [`dev`](./dev) | Development tools and utilities |
| [`deploy`](./deploy) | Deploy project components |
| [`workflow`](./workflow) | Workflow state tracking |

### Documentation

| Command | Description |
|---------|-------------|
| [`docs`](./docs) | Documentation management |
| [`generate`](./generate) | Generate project files |
| [`map`](./map) | Generate command mappings |

### Utilities

| Command | Description |
|---------|-------------|
| [`help`](./help) | Show comprehensive help |
| [`suggest`](./suggest) | Create GitHub issues with context |
| [`date-validate`](./date-validate) | Fix hardcoded dates |
| [`fix-frontmatter`](./fix-frontmatter) | Fix frontmatter issues |

## Quick Start

```bash
# Get help for any command
sc <command> --help

# Initialize a new project
sc init --standard

# Create a requirement
sc req new "Feature description" --priority=high

# Start work on a requirement
sc req start-work REQ-001

# View kanban board
sc kanban list

# Validate project
sc validate --all

# Safe merge
sc git-smart merge --push --delete-local
```

## Global Options

All commands support these global options:

```bash
--help          Show help for command
--version       Show version number
--verbose       Enable verbose output
--quiet         Suppress non-essential output
--no-color      Disable colored output
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SC_CONFIG` | Custom config file path |
| `SC_QUIET` | Suppress output (CI mode) |
| `SC_NO_COLOR` | Disable colors |
| `SC_SKIP_HOOKS` | Skip git hooks |

## Configuration

Commands are configured via `supernal.yaml` or `supernal-code.config.toml` in your project root.

```yaml
# supernal.yaml example
project:
  name: "My Project"
  
requirements:
  default_priority: medium
  
git_hooks:
  enabled: true
```