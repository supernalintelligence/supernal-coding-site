---
title: CLI Reference
description: Complete reference for all sc CLI commands
---

# CLI Reference

Complete reference for all `sc` CLI commands.

## Commands

| Command | Description |
|---------|-------------|
| [`sc agent`](./commands/agent.md) | Agent workflow management |
| [`sc build`](./commands/build.md) | Unified build with docs generation and validation |
| [`sc business-plan`](./commands/business-plan.md) | Business plan management and tracking (alias: `bp`) |
| [`sc check-upgrade`](./commands/check-upgrade.md) | Check for available upgrades of supernal-code |
| [`sc cleanup`](./commands/cleanup.md) | Repository structure and documentation cleanup with staging queue |
| [`sc config`](./commands/config.md) | Manage Supernal Coding configuration and privacy settings |
| [`sc dashboard`](./commands/dashboard.md) | Project dashboard for requirements and progress tracking |
| [`sc deploy`](./commands/deploy.md) | Deploy project components |
| [`sc dev`](./commands/dev.md) | Development tools and utilities |
| [`sc docs`](./commands/docs.md) | Documentation management system |
| [`sc fix-frontmatter`](./commands/fix-frontmatter.md) | Auto-fix common frontmatter issues in requirement files |
| [`sc generate`](./commands/generate.md) | Generate project files and documentation |
| [`sc git-assess`](./commands/git-assess.md) | Comprehensive git repository assessment and analysis (alias: `assess`) |
| [`sc git-hooks`](./commands/git-hooks.md) | Git hooks management and installation |
| [`sc git-protect`](./commands/git-protect.md) | Install enhanced git workflow protection (prevents git add on main) |
| [`sc git-smart`](./commands/git-smart.md) | Smart git workflow utilities |
| [`sc git-validate`](./commands/git-validate.md) | Validate git workflow compliance (branch naming, commit messages) (alias: `git-check`) |
| [`sc github`](./commands/github.md) | GitHub integration and issue management |
| [`sc guard`](./commands/guard.md) | Development workflow guard and validation system |
| [`sc handoff`](./commands/handoff.md) | Manage agent handoffs with proper naming conventions |
| [`sc help`](./commands/help.md) | Show comprehensive help |
| [`sc init`](./commands/init.md) | Equip current repository with specific preset or content modules |
| [`sc init-req-tracking`](./commands/init-req-tracking.md) | Initialize git tracking metadata for all requirement markdown files (alias: `init-tracking`) |
| [`sc kanban`](./commands/kanban.md) | Kanban task management system |
| [`sc kanban-ref`](./commands/kanban-ref.md) | Reference-based Kanban board management (alias: `kb`) |
| [`sc mcp`](./commands/mcp.md) | Start the Supernal Coding MCP server |
| [`sc merge-safe`](./commands/merge-safe.md) | Safe merge with rebase and validation (alias: `merge`) |
| [`sc monitor`](./commands/monitor.md) | Monitor development status and CI/CD workflows with intelligent diagnostics (alias: `status`) |
| [`sc phase`](./commands/phase.md) | Development phase management and tracking |
| [`sc priority`](./commands/priority.md) | Priority management for requirements and tasks |
| [`sc requirement`](./commands/requirement.md) | Requirement management system with API-like interface (alias: `req`) |
| [`sc rules`](./commands/rules.md) | Discover and manage repository rules |
| [`sc suggest`](./commands/suggest.md) | Instantly create GitHub issues with context |
| [`sc sync`](./commands/sync.md) | Synchronize local repository state with global sc installation
Actions: check, report, update |
| [`sc test`](./commands/test.md) | Testing guidance and execution system
Actions: guide, setup, validate, plan, run, doctor, map, structure |
| [`sc test-map`](./commands/test-map.md) | Generate comprehensive test mapping and analysis (alias: `tmap`) |
| [`sc traceability`](./commands/traceability.md) | Traceability matrix for compliance and requirement tracking (alias: `trace`) |
| [`sc type-check`](./commands/type-check.md) | Detect and prevent TypeScript/JavaScript type duplications |
| [`sc update`](./commands/update.md) | Update the global sc package installation |
| [`sc upgrade`](./commands/upgrade.md) | Upgrade supernal-code to the latest version |
| [`sc validate-installation`](./commands/validate-installation.md) | Validate current installation (alias: `validate`) |
| [`sc workflow`](./commands/workflow.md) | Project workflow management |

## Quick Reference by Category

### Setup & Configuration

- [`sc config`](./commands/config.md) - Manage Supernal Coding configuration and privacy settings
- [`sc init`](./commands/init.md) - Equip current repository with specific preset or content modules
- [`sc init-req-tracking`](./commands/init-req-tracking.md) - Initialize git tracking metadata for all requirement markdown files
- [`sc validate-installation`](./commands/validate-installation.md) - Validate current installation

### Requirements & Planning

- [`sc kanban`](./commands/kanban.md) - Kanban task management system
- [`sc kanban-ref`](./commands/kanban-ref.md) - Reference-based Kanban board management
- [`sc priority`](./commands/priority.md) - Priority management for requirements and tasks
- [`sc requirement`](./commands/requirement.md) - Requirement management system with API-like interface
- [`sc traceability`](./commands/traceability.md) - Traceability matrix for compliance and requirement tracking

### Git & Version Control

- [`sc git-assess`](./commands/git-assess.md) - Comprehensive git repository assessment and analysis
- [`sc git-hooks`](./commands/git-hooks.md) - Git hooks management and installation
- [`sc git-protect`](./commands/git-protect.md) - Install enhanced git workflow protection (prevents git add on main)
- [`sc git-smart`](./commands/git-smart.md) - Smart git workflow utilities
- [`sc git-validate`](./commands/git-validate.md) - Validate git workflow compliance (branch naming, commit messages)
- [`sc github`](./commands/github.md) - GitHub integration and issue management
- [`sc merge-safe`](./commands/merge-safe.md) - Safe merge with rebase and validation

### Testing & Validation

- [`sc check-upgrade`](./commands/check-upgrade.md) - Check for available upgrades of supernal-code
- [`sc test`](./commands/test.md) - Testing guidance and execution system
Actions: guide, setup, validate, plan, run, doctor, map, structure
- [`sc test-map`](./commands/test-map.md) - Generate comprehensive test mapping and analysis
- [`sc type-check`](./commands/type-check.md) - Detect and prevent TypeScript/JavaScript type duplications

### Documentation

- [`sc docs`](./commands/docs.md) - Documentation management system

### Development Tools

- [`sc build`](./commands/build.md) - Unified build with docs generation and validation
- [`sc dashboard`](./commands/dashboard.md) - Project dashboard for requirements and progress tracking
- [`sc deploy`](./commands/deploy.md) - Deploy project components
- [`sc dev`](./commands/dev.md) - Development tools and utilities

### Other

- [`sc agent`](./commands/agent.md) - Agent workflow management
- [`sc business-plan`](./commands/business-plan.md) - Business plan management and tracking
- [`sc cleanup`](./commands/cleanup.md) - Repository structure and documentation cleanup with staging queue
- [`sc fix-frontmatter`](./commands/fix-frontmatter.md) - Auto-fix common frontmatter issues in requirement files
- [`sc generate`](./commands/generate.md) - Generate project files and documentation
- [`sc guard`](./commands/guard.md) - Development workflow guard and validation system
- [`sc handoff`](./commands/handoff.md) - Manage agent handoffs with proper naming conventions
- [`sc help`](./commands/help.md) - Show comprehensive help
- [`sc mcp`](./commands/mcp.md) - Start the Supernal Coding MCP server
- [`sc monitor`](./commands/monitor.md) - Monitor development status and CI/CD workflows with intelligent diagnostics
- [`sc phase`](./commands/phase.md) - Development phase management and tracking
- [`sc rules`](./commands/rules.md) - Discover and manage repository rules
- [`sc suggest`](./commands/suggest.md) - Instantly create GitHub issues with context
- [`sc sync`](./commands/sync.md) - Synchronize local repository state with global sc installation
Actions: check, report, update
- [`sc update`](./commands/update.md) - Update the global sc package installation
- [`sc upgrade`](./commands/upgrade.md) - Upgrade supernal-code to the latest version
- [`sc workflow`](./commands/workflow.md) - Project workflow management
