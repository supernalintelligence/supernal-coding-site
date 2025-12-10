---
title: Testing
description: Testing strategies and practices with Supernal Coding
---

Testing is integral to Supernal Coding's compliance-first approach. Tests provide evidence of requirement fulfillment.

## Test Generation

Generate tests from requirements:

```bash
# Generate tests for a specific requirement
sc requirement generate-tests REQ-001

# Generate tests for all requirements
sc requirement generate-tests --all
```

## Test Structure

Tests are organized to match requirements:

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/            # End-to-end tests
└── compliance/     # Compliance validation tests
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/unit/auth.test.js

# Run with coverage
npm test -- --coverage
```

## TESTME.sh Standard

Use the standardized test interface:

```bash
./TESTME.sh                    # Run all tests
./TESTME.sh unit              # Unit tests only
./TESTME.sh e2e               # E2E tests only
./TESTME.sh requirements      # Requirements tests
./TESTME.sh specific REQ-011  # Specific requirement
./TESTME.sh map               # Generate test map
./TESTME.sh --help            # Show comprehensive help
```

## Test-Requirement Traceability

Each test should trace to a requirement:

```javascript
/**
 * @requirement REQ-001
 * @description User authentication validation
 */
describe('User Authentication', () => {
  test('should authenticate valid users', () => {
    // Test implementation
  });
});
```

## Validation

### Requirement Validation

```bash
# Validate a specific requirement
sc requirement validate REQ-001

# Validate all requirements
sc requirement validate --all
```

### Compliance Validation

```bash
# Run compliance checks
sc validate

# Generate compliance report
sc compliance report
```

## Signed Commits

For audit compliance, use GPG-signed commits:

```bash
# Configure GPG signing
git config commit.gpgsign true

# Sign commits automatically
git commit -S -m "REQ-001: Implement feature"
```

See [GPG Signing](../tools/gpg-signing.md) for setup instructions.

## Test Mapping and Discovery

### Test Mapper Integration

The test mapping system:

- **Discovers all test files** across the project
- **Categorizes tests** by type, framework, and requirement
- **Maps requirements to tests** for traceability
- **Generates execution commands** for different scenarios
- **Provides recommendations** for test improvements

### Example Test Map Output

```bash
./TESTME.sh map
```

```
📊 Comprehensive Test Mapping Report
====================================

📈 Summary Statistics
   Test Files: 27
   Test Cases: 156
   Requirements Coverage: 11/29 (38%)

🔧 Test Frameworks
   jest: 25 files
   playwright: 2 files

📋 Requirements Test Coverage
   ✅ REQ-011: 2 test files (comprehensive)
   ✅ REQ-003: 2 test files (comprehensive)
   ❌ REQ-001: 0 test files (none)
```

## CI/CD Integration

Tests integrate with CI/CD pipelines:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: ./TESTME.sh --coverage-threshold 80
```
