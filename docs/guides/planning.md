---
title: Planning
description: Plan work with epics, requirements, and milestones
---

Organize your work using the requirement-driven workflow.

## Hierarchy

```
Milestone
└── Epic
    └── Requirement
        └── Task (Kanban)
```

## Creating Requirements

```bash
# Create a new requirement
sc requirement new "User Authentication" \
  --epic=security \
  --priority=high \
  --request-type=feature

# List requirements
sc requirement list

# View a requirement
sc requirement show REQ-001
```

## Requirement Types

- `feature` - New functionality
- `bug` - Bug fix
- `enhancement` - Improvement to existing feature
- `maintenance` - Technical debt, refactoring

## Gherkin Format

Requirements use Gherkin for testable specifications:

```gherkin
Feature: User Authentication
  As a user
  I want to log in securely
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be redirected to the dashboard
```

## Workflow

1. **Create Requirement** - `sc requirement new`
2. **Create Branch** - `sc git-smart branch --branch REQ-001`
3. **Implement** - Code with traceability
4. **Test** - Automated validation
5. **Merge** - `sc git-smart merge --push`

## Priority Levels

| Priority | Use For |
|----------|---------|
| `critical` | Security issues, data loss |
| `high` | Core functionality |
| `medium` | Important features |
| `low` | Nice-to-haves |

## Epic Management

Epics group related requirements:

```bash
# List epics
sc epic list

# View epic details
sc epic show authentication

# Create epic
sc epic new "User Management" --description "All user-related features"
```

## Milestone Planning

Milestones collect epics for releases:

```bash
# Create milestone
sc milestone new "v1.0" --target-date 2024-03-01

# Add epic to milestone
sc epic update authentication --milestone v1.0

# View milestone progress
sc milestone show v1.0
```

## Kanban Tasks

Break requirements into tasks:

```bash
# Create task
sc kanban todo "Implement login form" --requirement REQ-001

# List tasks
sc kanban list

# Move task to in-progress
sc kanban move TASK-001 in-progress
```
