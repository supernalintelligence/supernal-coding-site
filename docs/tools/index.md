---
title: Tools Reference
description: Complete reference for Supernal Coding tools and CLI
sidebar_position: 1
---

# Tools Reference

Supernal Coding provides a comprehensive set of tools for AI-accelerated, compliant development. This section covers all available tools and their usage.

## The `sc` CLI

The `sc` command-line interface is the primary way to interact with Supernal Coding. It provides commands for:

- **Project Setup**: Initialize and configure repositories
- **Requirements Management**: Create, track, and validate requirements
- **Git Workflows**: Smart branching, merging, and hooks
- **Testing**: Run and validate tests
- **Compliance**: Generate compliance reports and artifacts
- **Dashboard**: Launch visual monitoring interfaces

[View CLI Reference →](/docs/tools/cli)

## Git Hooks

Supernal Coding installs git hooks to automate validation and enforce quality standards:

- **Pre-commit**: Validates changes before committing
- **Pre-push**: Runs tests and checks before pushing
- **Commit-msg**: Enforces commit message standards

[View Git Hooks Guide →](/docs/tools/git-hooks)

## GPG Signing

Configure GPG signing for signed commits:

- **Setup Guide**: Step-by-step GPG configuration
- **Key Management**: Generate and manage signing keys
- **CI/CD Integration**: Automated signing in pipelines

[View GPG Signing Guide →](/docs/tools/gpg-signing)

## Dashboard

The visual dashboard provides real-time project monitoring:

- **Requirements View**: Track requirement status and progress
- **Compliance Monitor**: View compliance coverage
- **Test Results**: Visual test reporting

[View Dashboard Guide →](/docs/tools/dashboard)

## Quick Reference

### Essential Commands

```bash
# Project setup
sc init --standard          # Initialize with standard features
sc doctor                   # Check system compatibility

# Requirements
sc req new "Description"    # Create requirement
sc req list                 # List all requirements
sc req show REQ-001        # View requirement details

# Git operations
sc git-smart branch         # Create feature branch
sc git-smart merge          # Safe merge with validation
sc git-hooks install        # Install git hooks

# Testing
sc test guide              # Show testing guidance
sc test run unit           # Run unit tests

# Dashboard
sc dashboard               # Launch dashboard
```

### Getting Help

```bash
sc --help                  # Show all commands
sc <command> --help        # Help for specific command
sc docs                    # Open documentation
```
