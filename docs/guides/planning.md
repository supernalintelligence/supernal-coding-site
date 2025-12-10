---
title: Planning
description: Plan work with epics, requirements, and milestones
---

# Planning with Supernal Coding

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


