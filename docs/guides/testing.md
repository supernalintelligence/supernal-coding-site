---
title: Testing
description: Testing strategy and validation
---

# Testing with Supernal Coding

Comprehensive testing that validates requirements.

## Test Types

### Unit Tests
Test individual functions and modules.

```bash
npm test
# or
sc test run
```

### Integration Tests
Test component interactions.

### End-to-End Tests
Test complete user workflows.

### Compliance Tests
Validate regulatory requirements.

## Gherkin-Based Testing

Requirements define test scenarios:

```gherkin
Scenario: Password complexity validation
  Given I am registering a new account
  When I enter a password "weak"
  Then I should see "Password must be at least 8 characters"
```

Generate test framework:

```bash
sc requirement generate-tests REQ-001
```

## Validation Commands

```bash
# Validate all requirements
sc validate

# Validate specific requirement
sc requirement validate REQ-001

# Run test suite
npm test

# Check test coverage
sc test-coverage
```

## Evidence Collection

For compliance, tests generate evidence:

```bash
sc test run --evidence
# Creates timestamped evidence in docs/evidence/
```

## Continuous Validation

Git hooks run validation on:
- **Pre-commit**: Lint, type-check
- **Pre-push**: Requirement validation, tests


