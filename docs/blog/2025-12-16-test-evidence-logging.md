---
title: "Compliance-Ready Test Evidence Logging"
date: 2025-12-03
author: Supernal Coding Team
tags: [testing, compliance, cli, audit-trail]
---

# Compliance-Ready Test Evidence Logging

Today we shipped **REQ-106: Test Result Evidence Logger** - a new feature that makes proving you ran tests as simple as adding `sc test run` to your command.

## The Problem

In regulated industries (FDA, SOC2, ISO), you need to prove:

- **What** tests were run
- **When** they were run
- **Who** ran them
- **What code state** was tested
- **What the results were**

Typically this means manual test reports, screenshots, or expensive test management tools.

## The Solution

```bash
# Before: Just run the test
npm test

# After: Run with evidence logging
sc test run 'npm test'
```

That's it. One wrapper command gives you auditable test evidence.

## What Gets Logged

```json
{
  "id": "test-2025-12-03-001",
  "command": "npm test",
  "timestamp": "2025-12-03T10:30:00Z",
  "exit_code": 0,
  "duration_ms": 2341,
  "executor": "Ian Derrington",
  "git_branch": "main",
  "git_commit": "abc1234",
  "is_compliance_evidence": true,
  "evidence_reason": "main branch"
}
```

## Compliance-Aware Design

Not every test run needs to be kept forever. We distinguish:

| Test Type      | Auto-Cleanup | Use Case                          |
| -------------- | ------------ | --------------------------------- |
| **Routine**    | 30 days      | Dev iteration on feature branches |
| **Compliance** | Never        | Auditable proof on main/release   |

### What Triggers Compliance Evidence?

- `--req REQ-XXX` flag (links to requirement)
- `--compliance` or `--evidence` flag
- Running on `main` or `release/*` branches

```bash
# This is compliance evidence (linked to requirement)
sc test run 'npm test' --req REQ-101

# This is routine (feature branch, no flags)
sc test run 'npm test'
```

## Safeguards

Compliance evidence can only be deleted manually with explicit confirmation:

```bash
# This FAILS
sc test evidence cleanup --before 2024-01-01
# ERROR: requires --confirm flag

# This requires explicit confirmation
sc test evidence cleanup --before 2024-01-01 --confirm
# WARNING: This may violate regulatory requirements!
```

## Usage Examples

```bash
# Run test with evidence logging
sc test run 'npm test'

# Link to requirement
sc test run 'pnpm playwright test auth' --req REQ-042

# View results
sc test results

# Show specific result
sc test results show test-2025-12-03-001

# Export for compliance report
sc test results export --since 2025-12-01
```

## What's Next

This is Phase 1. Coming soon:

- **Phase 2**: Test invalidation (mark old results as stale when code changes)
- **Phase 3**: Remote storage (upload to S3/GCS for CI/CD)
- **Phase 4**: Audit trail integration (link tests to CHG documents)

## Try It

```bash
# Update to latest
npm update supernal-coding

# Run your first logged test
sc test run 'echo "Hello compliance!"'
```

---

_Part of the [Approval Workflow System](/docs/features/workflow-management/approval-workflow-system/) initiative._
