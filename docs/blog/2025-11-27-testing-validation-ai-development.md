---
slug: testing-validation-ai-development
title: 'Testing AI-Generated Code: From Gherkin to Continuous Validation'
authors: [ianderrington]
tags:
  [
    testing,
    validation,
    gherkin,
    automation,
    quality,
    ai-development,
    supernal-coding,
  ]
---

# Testing AI-Generated Code: From Gherkin to Continuous Validation

AI agents can write code faster than humans, but how do you ensure that code actually works? More importantly, how do you validate it meets business requirements and regulatory standards? Traditional testing approaches weren't designed for AI-generated code at machine speed.

The solution lies in making tests as intelligent as the code they validate - automated, requirement-driven, and continuously evolving.

## The Challenge of AI-Generated Code

When AI agents write code, traditional testing approaches break down:

**Speed Mismatch**: AI generates code in seconds; humans write tests in hours

**Implicit Knowledge**: AI doesn't inherently know your business rules or edge cases

**Coverage Gaps**: Without guidance, AI may implement features but miss critical test scenarios

**Regression Risk**: Rapid changes can break existing functionality in subtle ways

**Compliance Requirements**: Regulated industries need traceability from requirements to tests to code

<!--truncate-->

## The Supernal Coding Approach

Our testing philosophy: **Requirements drive tests, tests validate code, everything is automated**.

### 1. Gherkin-Based Requirements

Every requirement includes executable test scenarios:

```gherkin
Feature: REQ-042: Audit Trail System
  As a compliance officer
  I want complete audit trails for data changes
  So that we maintain regulatory compliance

  @critical @audit @21-cfr-part-11
  Scenario: Record modification creates audit entry
    Given a patient record exists with ID "PAT-12345"
    And the record has field "medication" with value "Aspirin 100mg"
    When user "dr.smith" changes "medication" to "Aspirin 200mg"
    Then an audit entry must be created with:
      | timestamp      | Current UTC              |
      | user_id        | dr.smith                |
      | record_id      | PAT-12345               |
      | action         | MODIFY                  |
      | field          | medication              |
      | old_value      | Aspirin 100mg           |
      | new_value      | Aspirin 200mg           |
      | reason         | Dosage adjustment       |
    And the audit entry must be digitally signed
    And the audit entry must be immutable

  @security @audit
  Scenario: Unauthorized user cannot modify records
    Given a patient record exists with ID "PAT-12345"
    And user "clerk.jones" has "read-only" permissions
    When user "clerk.jones" attempts to modify the record
    Then the modification must be rejected
    And an audit entry must record the attempt
    And an alert must be sent to security team
```

These scenarios are:

- **Human-readable** for stakeholders
- **Machine-executable** by test frameworks
- **Requirement-linked** for traceability
- **Compliance-ready** for regulatory audits

### 2. Automated Test Generation

From Gherkin scenarios, generate test frameworks:

```bash
# Generate test structure from requirement
sc requirement generate-tests 042

# Creates:
# tests/requirements/req-042/
#   ├── req-042.e2e.test.js        # End-to-end tests
#   ├── req-042.integration.test.js # Integration tests
#   ├── req-042.unit.test.js       # Unit tests
#   ├── fixtures/                  # Test data
#   └── helpers/                   # Test utilities
```

Generated test framework:

```javascript
// tests/requirements/req-042/req-042.e2e.test.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { AuditService } = require('../../../src/audit');
const { expect } = require('chai');

describe('REQ-042: Audit Trail System', () => {
  describe('Scenario: Record modification creates audit entry', () => {
    let patientRecord;
    let auditEntry;

    beforeEach(async () => {
      // Given: a patient record exists
      patientRecord = await createPatientRecord({
        id: 'PAT-12345',
        medication: 'Aspirin 100mg',
      });
    });

    it('should create complete audit entry when record is modified', async () => {
      // When: user changes medication
      await AuditService.modifyRecord({
        userId: 'dr.smith',
        recordId: 'PAT-12345',
        field: 'medication',
        newValue: 'Aspirin 200mg',
        reason: 'Dosage adjustment',
      });

      // Then: audit entry is created
      auditEntry = await AuditService.getLatestEntry('PAT-12345');

      expect(auditEntry).to.exist;
      expect(auditEntry.user_id).to.equal('dr.smith');
      expect(auditEntry.record_id).to.equal('PAT-12345');
      expect(auditEntry.action).to.equal('MODIFY');
      expect(auditEntry.field).to.equal('medication');
      expect(auditEntry.old_value).to.equal('Aspirin 100mg');
      expect(auditEntry.new_value).to.equal('Aspirin 200mg');
      expect(auditEntry.timestamp).to.be.a('date');
    });

    it('should digitally sign the audit entry', async () => {
      await AuditService.modifyRecord({
        userId: 'dr.smith',
        recordId: 'PAT-12345',
        field: 'medication',
        newValue: 'Aspirin 200mg',
      });

      auditEntry = await AuditService.getLatestEntry('PAT-12345');
      expect(auditEntry.signature).to.exist;

      const isValid = await AuditService.verifySignature(auditEntry);
      expect(isValid).to.be.true;
    });

    it('should make audit entry immutable', async () => {
      await AuditService.modifyRecord({
        userId: 'dr.smith',
        recordId: 'PAT-12345',
        field: 'medication',
        newValue: 'Aspirin 200mg',
      });

      auditEntry = await AuditService.getLatestEntry('PAT-12345');

      // Attempt to modify audit entry
      await expect(
        AuditService.updateAuditEntry(auditEntry.id, { action: 'DELETE' })
      ).to.be.rejected;
    });
  });

  describe('Scenario: Unauthorized user cannot modify records', () => {
    it('should reject modification attempt by read-only user', async () => {
      const result = await AuditService.modifyRecord({
        userId: 'clerk.jones',
        recordId: 'PAT-12345',
        field: 'medication',
        newValue: 'Different value',
      });

      expect(result.success).to.be.false;
      expect(result.error).to.include('insufficient permissions');
    });

    it('should log unauthorized access attempt', async () => {
      await AuditService.modifyRecord({
        userId: 'clerk.jones',
        recordId: 'PAT-12345',
        field: 'medication',
        newValue: 'Different value',
      });

      const auditEntry = await AuditService.getLatestEntry('PAT-12345');
      expect(auditEntry.action).to.equal('ATTEMPT_UNAUTHORIZED_MODIFY');
      expect(auditEntry.user_id).to.equal('clerk.jones');
    });

    it('should alert security team', async () => {
      const alertSpy = jest.spyOn(SecurityService, 'sendAlert');

      await AuditService.modifyRecord({
        userId: 'clerk.jones',
        recordId: 'PAT-12345',
        field: 'medication',
        newValue: 'Different value',
      });

      expect(alertSpy).toHaveBeenCalledWith({
        type: 'UNAUTHORIZED_ACCESS',
        userId: 'clerk.jones',
        recordId: 'PAT-12345',
      });
    });
  });
});
```

### 3. Test Mapping

Map requirements to their test files:

```json
// test-map.json
{
  "REQ-042": {
    "requirement": "requirements/req-042-audit-trail.md",
    "tests": {
      "e2e": ["tests/requirements/req-042/req-042.e2e.test.js"],
      "integration": ["tests/requirements/req-042/req-042.integration.test.js"],
      "unit": [
        "tests/audit/logger.test.js",
        "tests/audit/signature.test.js",
        "tests/audit/immutability.test.js"
      ]
    },
    "implementation": [
      "src/audit/logger.js",
      "src/audit/signature.js",
      "src/audit/storage.js"
    ],
    "coverage": {
      "lines": 96.5,
      "branches": 94.2,
      "functions": 100,
      "statements": 96.8
    },
    "status": "passing",
    "lastRun": "2025-11-19T10:30:00Z"
  }
}
```

Query test status:

```bash
# Check requirement test coverage
sc test requirement 042

# Output:
# REQ-042: Audit Trail System
# Status: ✓ All tests passing
#
# Coverage:
#   Lines: 96.5% (Target: 90%)
#   Branches: 94.2% (Target: 85%)
#   Functions: 100% (Target: 90%)
#
# Tests:
#   ✓ 15/15 scenarios passing
#   ✓ 42/42 unit tests passing
#   ✓ 8/8 integration tests passing
#   ✓ 5/5 e2e tests passing
#
# Last run: 2 minutes ago
# Duration: 3.2s
```

### 4. Continuous Validation

Tests run automatically at every stage:

```bash
# Pre-commit hook
sc git-hooks install

# On git commit:
# ✓ Unit tests for modified files
# ✓ Integration tests for affected modules
# ✓ Requirement validation
# ✓ Code coverage check

# Pre-push hook:
# ✓ Full test suite
# ✓ E2E tests
# ✓ Requirement scenarios
# ✓ Security scans

# CI/CD pipeline:
# ✓ All tests across environments
# ✓ Performance benchmarks
# ✓ Compliance validation
# ✓ Regression tests
```

### 5. AI-Driven Test Enhancement

AI agents can improve tests based on implementation:

```bash
# AI agent implements feature
sc requirement start-work 042

# ... implementation code ...

# AI analyzes implementation and suggests additional tests
sc test enhance 042

# Suggestions:
# 1. Edge case: Empty medication field
# 2. Security: SQL injection in record ID
# 3. Performance: Bulk record modifications
# 4. Concurrency: Simultaneous modifications
# 5. Data integrity: Invalid field names
#
# Generate suggested tests? [y/N]: y
#
# Generated 5 additional test scenarios
# Added to: tests/requirements/req-042/req-042-enhanced.test.js
```

## Real-World Example: FDA Validation

A medical device company uses this for FDA 510(k) submission:

```gherkin
Feature: REQ-089: Device Calibration Verification
  As a quality engineer
  I want automated calibration verification
  So that devices meet FDA accuracy requirements

  @critical @fda @510k @calibration
  Scenario: Calibration within tolerance
    Given a glucose meter device with serial "GM-12345"
    And the device was last calibrated 90 days ago
    And the calibration standard is 100 mg/dL
    When I perform calibration verification
    And the device reads 98 mg/dL to 102 mg/dL
    Then the verification must pass
    And the result must be logged with timestamp
    And the device must be marked "CALIBRATED"
    And the next calibration date must be set to +180 days

  @critical @fda @510k @out-of-tolerance
  Scenario: Calibration outside tolerance triggers rejection
    Given a glucose meter device with serial "GM-12345"
    When I perform calibration verification
    And the device reads 89 mg/dL (>2% error)
    Then the verification must fail
    And the device must be marked "OUT_OF_CALIBRATION"
    And an alert must be sent to quality team
    And the device must be prevented from use
    And a deviation report must be created automatically
```

Test implementation includes:

- Automated device simulation
- Tolerance calculations
- Timestamp verification
- Audit trail validation
- Deviation report generation
- Traceability matrix updates

## Coverage Requirements

Enforce minimum coverage by requirement priority:

```javascript
// supernal-code.config.json
{
  "testing": {
    "coverage": {
      "critical": {
        "lines": 95,
        "branches": 90,
        "functions": 100
      },
      "high": {
        "lines": 90,
        "branches": 85,
        "functions": 95
      },
      "medium": {
        "lines": 80,
        "branches": 75,
        "functions": 85
      }
    }
  }
}
```

Validation enforces these:

```bash
# Pre-merge validation
sc git-smart merge --validate

# Coverage check:
# REQ-042 (critical): 96.5% lines ✓ (required: 95%)
# REQ-089 (critical): 97.2% lines ✓ (required: 95%)
# REQ-103 (high): 88.3% lines ✗ (required: 90%)
#
# Error: REQ-103 does not meet coverage requirements
# Cannot merge until coverage improves
```

## Performance Testing

Requirements can include performance criteria:

```gherkin
Feature: REQ-055: Real-Time Data Processing
  As a system operator
  I want real-time data processing
  So that alerts are generated within SLA

  @performance @critical
  Scenario: Alert generation within SLA
    Given the system is receiving sensor data
    And the alert threshold is 150 units
    When a sensor reports 175 units
    Then an alert must be generated within 500ms
    And the alert must be delivered to operators within 1 second
    And system CPU usage must remain below 70%
    And memory usage must remain below 2GB
```

Performance tests run automatically:

```javascript
describe('REQ-055: Performance Requirements', () => {
  it('should generate alert within 500ms', async () => {
    const start = Date.now();

    await DataProcessor.processSensorData({
      sensorId: 'SENS-123',
      value: 175,
    });

    const duration = Date.now() - start;
    expect(duration).to.be.below(500);
  });

  it('should maintain resource limits under load', async () => {
    const initialMemory = process.memoryUsage().heapUsed;

    // Process 10,000 sensor readings
    for (let i = 0; i < 10000; i++) {
      await DataProcessor.processSensorData({
        sensorId: `SENS-${i}`,
        value: Math.random() * 200,
      });
    }

    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = (finalMemory - initialMemory) / (1024 * 1024 * 1024);

    expect(memoryIncrease).to.be.below(2); // Less than 2GB
  });
});
```

## Compliance Reports

Generate comprehensive validation reports:

```bash
# Generate validation report
sc audit export --format=pdf --include-tests

# Generated report includes:
# - Requirement traceability matrix
# - Test execution results
# - Coverage metrics
# - Performance benchmarks
# - Security scan results
# - Change history
# - Digital signatures
```

Report structure:

```
Validation Report: REQ-042
Generated: 2025-11-19 10:30:00 UTC
Status: VALIDATED

1. Requirement Specification
   - ID: REQ-042
   - Title: Audit Trail System
   - Priority: Critical
   - Compliance: 21 CFR Part 11

2. Test Coverage
   - Scenarios: 5/5 passing
   - Unit Tests: 42/42 passing
   - Integration Tests: 8/8 passing
   - E2E Tests: 5/5 passing
   - Coverage: 96.5% (Target: 95%)

3. Execution History
   - Total Runs: 147
   - Success Rate: 100%
   - Average Duration: 3.2s
   - Last Failure: None

4. Traceability
   - Requirements: REQ-001, REQ-038, REQ-042
   - Implementation Files: 8
   - Test Files: 12
   - Git Commits: 23

5. Sign-Off
   - Developer: agent-001 (2025-11-19)
   - Reviewer: human-reviewer (2025-11-19)
   - QA: qa-engineer (2025-11-19)
   - Status: APPROVED FOR PRODUCTION
```

## The Future: Self-Testing Code

We're building toward code that can:

**Generate Its Own Tests**: Based on implementation, create comprehensive test scenarios

**Identify Coverage Gaps**: "Function `handleEdgeCase` has no test coverage"

**Suggest Test Data**: "Based on your validation logic, test with: empty string, null, undefined, very long string"

**Auto-Fix Failures**: "Test failing due to incorrect mock data - fixing..."

## Best Practices

### For AI Agents

1. **Always read requirement scenarios** before implementing
2. **Run tests continuously** during development
3. **Generate additional tests** for edge cases discovered
4. **Update tests** when requirements change
5. **Validate coverage** before committing

### For Human Developers

1. **Write Gherkin scenarios first** - they drive everything else
2. **Review AI-generated tests** for completeness
3. **Add domain-specific test cases** that AI might miss
4. **Validate compliance requirements** manually
5. **Monitor test trends** over time

## Conclusion

Testing AI-generated code requires a fundamental shift from reactive to proactive validation:

- **Requirements drive tests** (not the other way around)
- **Tests are generated automatically** (not written manually)
- **Validation is continuous** (not a separate phase)
- **Coverage is enforced** (not optional)
- **Compliance is automated** (not manual audit prep)

This approach ensures that AI agents produce not just working code, but **validated, compliant, production-ready** code.

---

_Next in this series: The CLI architecture that makes all of this possible - how commands coordinate across the entire development lifecycle._

## Resources

- Testing Guide (see workspace docs)
- Gherkin Syntax at `/docs/testing/gherkin-guide`
- Coverage Requirements at `/docs/testing/coverage`
- Compliance Reports at `/docs/audit/reports`
