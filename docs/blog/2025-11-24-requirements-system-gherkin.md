---
slug: requirements-system-gherkin
title: 'Building Self-Validating Codebases: The Requirements System'
authors: [ianderrington]
tags:
  [
    supernal-coding,
    requirements,
    validation,
    gherkin,
    testing,
    automation,
    compliance,
  ]
---

# Building Self-Validating Codebases: The Requirements System

One of the most critical challenges in AI-assisted development is ensuring that code changes maintain compliance with requirements, especially in regulated environments. How do you know an AI agent hasn't inadvertently broken a critical business rule while implementing a feature? How do you maintain traceability between requirements, code, and tests?

The answer lies in making requirements machine-readable, version-controlled, and automatically validated.

## The Problem with Traditional Requirements

Traditional requirements management suffers from several fundamental problems:

**Disconnection**: Requirements live in separate documents (Word, Confluence, Jira) that become stale the moment code changes.

**Manual Validation**: Testing against requirements is a manual process prone to human error and interpretation differences.

**Poor Traceability**: When code changes, tracking which requirements are affected requires manual detective work.

**Context Loss**: AI agents can't understand requirements documents written in natural language prose.

<!--truncate-->

## Requirements as Code

Supernal Coding treats requirements as first-class code artifacts using Gherkin syntax:

```gherkin
Feature: REQ-001: User Authentication
  As a system administrator
  I want secure user authentication
  So that only authorized users can access the system

  Background:
    Given the authentication system is configured
    And the database contains valid user credentials

  Scenario: Successful login with valid credentials
    Given a user with username "testuser" and password "ValidPass123!"
    When the user attempts to login
    Then the login should succeed
    And a valid session token should be generated
    And the user should be redirected to the dashboard

  Scenario: Failed login with invalid credentials
    Given a user with username "testuser" and password "WrongPass"
    When the user attempts to login
    Then the login should fail
    And an error message "Invalid credentials" should be displayed
    And no session token should be generated
```

This format is:

- **Human-readable**: Stakeholders can review and understand it
- **Machine-readable**: AI agents and tools can parse and validate it
- **Executable**: Test frameworks can run scenarios directly
- **Version-controlled**: Changes are tracked via Git with full history

## Automated Validation Pipeline

Every requirement file automatically triggers validation:

```bash
# Git pre-commit hook validates requirements
sc git-hooks install

# Validate specific requirement
sc requirement validate 001

# Generate test framework from requirement
sc requirement generate-tests 001
```

The validation checks:

- **Structural integrity**: Proper Gherkin syntax and required sections
- **Completeness**: All mandatory fields (title, scenarios, acceptance criteria)
- **Traceability**: Links to related requirements and implementation files
- **Test coverage**: Associated test files exist and pass

## Living Traceability

Requirements maintain bidirectional traceability:

```yaml
---
id: req-001
title: User Authentication System
epic: security
priority: critical
status: implemented
---

## Implementation Files
- `/src/auth/login.js`
- `/src/auth/session.js`

## Test Files
- `/tests/requirements/req-001/req-001.e2e.test.js`

## Related Requirements
- REQ-002: Session Management
- REQ-003: Password Policy

## Git Tracking
branch: feature/req-001-user-auth
commits:
  - abc123: "REQ-001: Implement login endpoint"
  - def456: "REQ-001: Add session token generation"
```

## AI Agent Integration

When an AI agent works on a requirement:

```bash
# Agent starts work
sc requirement start-work 001

# Creates feature branch: feature/req-001-user-auth
# Updates requirement status to "in-progress"
# Provides agent with full requirement context
```

The agent receives:

- Complete requirement specification
- Related requirements and dependencies
- Existing test scenarios to maintain
- Implementation constraints and patterns

## Automated Documentation Export

Requirements automatically generate compliance documentation:

```bash
# Export traceability matrix
sc audit export --format=html

# Generate compliance reports
sc audit compliance-summary
```

Output includes:

- Requirement-to-test mapping
- Implementation status
- Coverage metrics
- Change history with Git commits

## Real-World Example

Here's how a pharmaceutical company uses this for FDA 21 CFR Part 11 compliance:

```gherkin
Feature: REQ-042: Audit Trail for Electronic Records
  As a compliance officer
  I want complete audit trails for all electronic record changes
  So that we maintain FDA 21 CFR Part 11 compliance

  @critical @audit-trail @21-cfr-part-11
  Scenario: Record modification generates audit entry
    Given an electronic record exists with ID "REC-12345"
    And the record contains patient data
    When user "jane.smith" modifies the record field "dosage"
    Then an audit entry must be created with:
      | Field          | Value                    |
      | timestamp      | Current UTC time         |
      | user_id        | jane.smith              |
      | action         | MODIFY                  |
      | record_id      | REC-12345               |
      | field_changed  | dosage                  |
      | old_value      | <original value>        |
      | new_value      | <new value>             |
    And the audit entry must be immutable
    And the audit entry must be digitally signed
```

The test framework automatically validates:

- Audit entry creation
- Data completeness
- Immutability
- Digital signature verification

## The Power of Integration

This requirements system integrates with every aspect of Supernal Coding:

**Git Workflow**: Branch naming follows requirements (`feature/req-001-auth`)

**Commit Messages**: Traceable to requirements (`REQ-001: Implement login`)

**Dashboard**: Real-time status of requirements implementation

**CI/CD**: Automated validation on every commit

**Documentation**: Auto-generated traceability reports

## Getting Started

Initialize requirements tracking in your project:

```bash
# Initialize Supernal Coding
npm install -g supernal-code
sc init

# Create new requirement
sc requirement new "User Authentication" \
  --epic=security \
  --priority=critical \
  --request-type=feature

# Edit the generated Gherkin file
# /requirements/req-001-user-authentication.md

# Validate requirement
sc requirement validate 001

# Start implementation
sc requirement start-work 001
```

## The Future: Self-Evolving Requirements

We're working toward requirements that can:

**Self-Update**: When implementation diverges from spec, suggest requirement updates

**Generate Tests**: Automatically create test scenarios from acceptance criteria

**Validate Themselves**: AI agents check if implemented features meet requirements

**Learn Patterns**: Identify common requirement patterns and suggest improvements

## Conclusion

Requirements-as-code transforms compliance from a documentation burden into an automated, continuous validation process. When requirements live in version control, are machine-readable, and integrate with development workflows, you get:

- **Always up-to-date traceability**
- **Automated compliance validation**
- **AI agents that understand business rules**
- **Reduced regulatory audit overhead**

For regulated industries or any project where correctness matters, this approach ensures that AI-assisted development enhances rather than threatens compliance.

---

_Next in this series: How Git becomes the nervous system of intelligent codebases, enabling distributed AI collaboration while maintaining safety and traceability._

## Resources

- Requirements System Documentation (see workspace docs)
- Gherkin Syntax Guide at `/docs/testing/gherkin-guide`
- Compliance Export Tools at `/docs/cli-commands#audit`
