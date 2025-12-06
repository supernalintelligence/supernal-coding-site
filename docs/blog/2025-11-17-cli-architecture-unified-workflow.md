---
slug: cli-architecture-unified-workflow
title: 'The CLI That Thinks: Unified Architecture for AI-Native Development'
authors: [ianderrington]
tags:
  [
    cli,
    architecture,
    automation,
    ai-development,
    developer-experience,
    supernal-coding,
  ]
---

# The CLI That Thinks: Unified Architecture for AI-Native Development

Most CLI tools are collections of disconnected commands. You run `git commit`, then `npm test`, then some custom deploy script. Each command operates in isolation, unaware of the others. This works fine for human developers who understand the bigger picture, but it's catastrophic for AI agents.

AI agents need a CLI that understands context, maintains state, and coordinates across the entire development lifecycle. They need a **unified command system** that thinks about your project holistically.

## The Problem with Traditional CLIs

Traditional development workflows involve dozens of tools:

```bash
# Version control
git checkout -b feature/new-feature
git add .
git commit -m "Add feature"
git push origin feature/new-feature

# Testing
npm test
npm run lint
npm run coverage

# Requirements
# ... probably a separate system (Jira? Docs?)

# Deployment
# ... custom scripts that live somewhere

# Documentation
# ... manual process
```

Problems:

- **No coordination** between commands
- **No shared context** across tools
- **No validation** that workflow steps are followed correctly
- **No traceability** from requirements to deployment
- **No AI guidance** on what to do next

<!--truncate-->

## Enter `sc`: The Unified CLI

Supernal Coding (`sc`) is a single command that orchestrates your entire development lifecycle:

```bash
# Everything through one interface
sc requirement new "User authentication"
sc requirement start-work 001
sc git-smart commit
sc test requirement 001
sc git-smart merge --push
sc docs generate
```

Each command understands:

- **Where you are** in the workflow
- **What you're working on** (which requirement)
- **What came before** (command history)
- **What should come next** (workflow state)
- **What's safe to do** (validation rules)

## Command Architecture

### 1. Requirement Lifecycle

```bash
# Create requirement
sc requirement new "Feature title" \
  --epic=security \
  --priority=high \
  --request-type=feature

# Outputs: REQ-042 created

# Validate requirement quality
sc requirement validate 042
# ✓ Structure correct
# ✓ Scenarios defined
# ✓ Acceptance criteria complete

# Generate test framework
sc requirement generate-tests 042
# Created: tests/requirements/req-042/

# Start development
sc requirement start-work 042
# Created branch: feature/req-042-feature-title
# Updated status: in-progress

# Update as you learn
sc requirement update 042 --prompt="Discovered edge case..."

# Mark complete
sc requirement set-status 042 --status=done
```

Each command updates shared state that other commands can use.

### 2. Git Workflow Integration

```bash
# Check current context
sc git-smart check-context
# Branch: feature/req-042-feature-title
# Requirement: REQ-042 (in-progress)
# Tests: passing
# Ready to commit: Yes

# Smart commit (auto-links requirement)
sc git-smart commit
# Suggested message: "REQ-042: Implement authentication"
# Commits with full context

# Check before merging
sc git-smart check-branch
# ✓ Working tree clean
# ✓ Tests passing
# ✓ No conflicts with main
# ✓ Requirement complete
# Safe to merge: Yes

# Intelligent merge
sc git-smart merge --push --delete-local
# Validates everything
# Merges safely
# Updates requirement status
# Cleans up branch
```

### 3. Testing Commands

```bash
# Run tests for specific requirement
sc test requirement 042

# Check coverage
sc test coverage 042
# Lines: 96.5% (Target: 95%) ✓
# Branches: 94.2% (Target: 85%) ✓

# View test map
sc test-map show 042
# Shows all tests related to requirement

# Enhance tests with AI
sc test enhance 042
# Suggests additional test scenarios
```

### 4. Documentation Commands

```bash
# Generate requirement docs
sc docs requirement 042

# Generate API docs
sc docs api

# Update all documentation
sc docs generate --all

# Validate documentation
sc docs validate
# ✓ All requirements documented
# ✓ API docs up to date
# ✓ No broken links
```

### 5. Audit & Compliance

```bash
# Export traceability matrix
sc audit export --format=html

# Generate compliance summary
sc audit compliance-summary

# Validate full project compliance
sc audit validate
# ✓ All requirements have tests
# ✓ All tests passing
# ✓ Coverage meets targets
# ✓ Documentation complete
```

## Context Awareness

The CLI maintains project context:

```javascript
// .supernal-code/context.json
{
  "currentRequirement": "042",
  "currentBranch": "feature/req-042-feature-title",
  "workflowState": "development",
  "lastCommand": "sc test requirement 042",
  "requirementStatus": {
    "042": "in-progress",
    "041": "done",
    "040": "validated"
  },
  "testStatus": {
    "042": {
      "unit": "passing",
      "integration": "passing",
      "e2e": "passing",
      "coverage": 96.5
    }
  }
}
```

Commands use this context:

```bash
# No need to specify requirement ID - CLI knows
sc test
# Tests REQ-042 (current requirement)

sc git-smart commit
# Auto-links to REQ-042

sc requirement validate
# Validates REQ-042
```

## Command Chaining

Commands can coordinate:

```bash
# Complete workflow in one command
sc workflow complete 042

# Internally executes:
# 1. sc requirement validate 042
# 2. sc test requirement 042
# 3. sc git-smart commit
# 4. sc git-smart check-branch
# 5. sc git-smart merge --push
# 6. sc requirement set-status 042 --status=done
# 7. sc docs generate

# With validation at each step
```

## AI Agent Integration

The CLI is designed for AI agents:

```bash
# Agent asks: "What should I work on next?"
sc requirement next

# Output:
# Next recommended requirement: REQ-043
# Title: Password Reset Flow
# Priority: high
# Dependencies: REQ-001 (complete) ✓
# Estimated complexity: medium
# Suggested command: sc requirement start-work 043

# Agent can directly execute the suggestion
```

Agents get structured output:

```bash
sc requirement list --format=json
```

```json
{
  "requirements": [
    {
      "id": "042",
      "title": "User Authentication",
      "status": "in-progress",
      "priority": "high",
      "tests": "passing",
      "coverage": 96.5,
      "branch": "feature/req-042-user-auth",
      "nextActions": ["sc test requirement 042", "sc git-smart merge --push"]
    }
  ]
}
```

## Safety & Validation

Every command includes safety checks:

```bash
sc git-smart merge --push

# Pre-merge validation:
# ✓ Working tree clean
# ✓ All tests passing
# ✓ Coverage meets requirements
# ✓ No merge conflicts
# ✓ Requirement status: done
# ✓ Code review approved (if configured)
# ✓ CI/CD passing
#
# Proceed? [y/N]: y
```

Commands prevent mistakes:

```bash
sc requirement start-work 042

# Error: REQ-042 already in progress
# Current branch: feature/req-042-user-auth
# Started by: agent-001
# Started at: 2025-11-19 10:30 UTC
#
# Options:
# 1. Continue on existing branch
# 2. Create dependent branch
# 3. Force restart (dangerous)
```

## Configuration Management

```bash
# Interactive setup
sc init

# Prompts for:
# - Project name
# - Git workflow preferences
# - Testing framework
# - Coverage targets
# - Compliance requirements

# Configure specific aspects
sc config set testing.coverage.critical 95
sc config set git.branchPrefix "feature/req-"

# View configuration
sc config list
```

## Multi-Repository Support

```bash
# Initialize multi-repo family
sc multi-repo init

# Add repository
sc multi-repo add api --path=./api

# Execute commands across repos
sc multi-repo exec "sc test"

# Coordinate requirements across repos
sc requirement new "API + Frontend sync" --repos=api,frontend
```

## Extensibility

Add custom commands:

```javascript
// .supernal-code/commands/custom-deploy.js
module.exports = {
  name: 'deploy',
  description: 'Deploy to production',

  async execute(args, context) {
    // Access full context
    const currentReq = context.currentRequirement;

    // Run validations
    await context.validate([
      'tests-passing',
      'requirement-complete',
      'approval-received',
    ]);

    // Execute deployment
    await deployToProduction();

    // Update tracking
    await context.updateDeployment({
      requirement: currentReq,
      timestamp: new Date(),
      environment: 'production',
    });
  },
};
```

Usage:

```bash
sc deploy
# Uses custom command with full context
```

## Help System

Context-aware help:

```bash
# General help
sc --help

# Command-specific help
sc requirement --help
sc git-smart merge --help

# Context-aware suggestions
sc help

# Based on current state, suggests:
# You're on feature/req-042-user-auth
# Tests are passing
#
# Suggested next steps:
# 1. sc git-smart check-branch
# 2. sc git-smart merge --push
# 3. sc requirement set-status 042 --status=done
```

## Real-World Example: Full Development Cycle

```bash
# Day 1: Start new feature
sc requirement new "Two-factor authentication" \
  --epic=security \
  --priority=critical

# Created: REQ-050

sc requirement validate 050
# ⚠ Warning: No test scenarios defined
# Edit: requirements/req-050-two-factor-authentication.md

# ... add Gherkin scenarios ...

sc requirement validate 050
# ✓ All validations pass

sc requirement generate-tests 050
# Created test framework

sc requirement start-work 050
# Created branch: feature/req-050-two-factor-authentication
# Status: in-progress

# Day 2-5: Development

# ... implement feature ...

sc test requirement 050
# Running tests...
# ✓ 23/23 tests passing
# Coverage: 94.2%

sc requirement update 050 --prompt="Implemented TOTP support"

# Day 6: Complete

sc git-smart check-branch
# ✓ All checks pass
# Ready to merge

sc git-smart merge --push --delete-local
# Merged successfully
# Branch deleted
# Requirement status: done

sc audit export
# Generated compliance report
```

## The Future: Predictive Commands

We're building commands that anticipate needs:

```bash
sc next

# Based on project analysis:
# - 3 requirements ready to start
# - 2 requirements need testing
# - 1 requirement ready to merge
# - 0 failed tests
#
# Recommended: sc requirement start-work 051
# Reason: Highest priority, all dependencies met
```

AI agents can just ask:

```bash
sc suggest

# Analyzes:
# - Current project state
# - Requirement dependencies
# - Test status
# - Coverage gaps
# - Documentation completeness
#
# Suggests:
# 1. Fix coverage gap in REQ-042 (91% vs 95% target)
# 2. Start work on REQ-051 (dependencies met)
# 3. Update documentation for REQ-048 (stale)
```

## Conclusion

A unified CLI isn't just convenient - it's essential for AI-native development:

- **Single source of truth** for project state
- **Coordinated workflows** across tools
- **Automated validation** at every step
- **AI-friendly** structured output
- **Context-aware** suggestions
- **Safe by default** with validation

When your CLI understands the entire development lifecycle, AI agents can navigate it safely and effectively.

---

_Next in this series: The dashboard that visualizes everything - real-time monitoring of requirements, tests, and development progress._

## Resources

- CLI Commands Reference (see `/docs/cli-commands`)
- Command Architecture at `/docs/architecture/cli`
- Custom Commands Guide at `/docs/cli-commands/custom`
