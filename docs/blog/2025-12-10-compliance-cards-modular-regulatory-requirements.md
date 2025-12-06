---
slug: compliance-cards-modular-regulatory-requirements
title: 'Compliance Cards: Breaking Down Regulatory Requirements into Reusable Building Blocks'
authors: [ianderrington]
tags:
  [
    supernal-coding,
    compliance,
    regulatory,
    gdpr,
    hipaa,
    iso27001,
    soc2,
    community,
    open-source,
  ]
---

# Compliance Cards: Breaking Down Regulatory Requirements into Reusable Building Blocks

Regulatory compliance is a maze. HIPAA has 63 specific requirements. ISO 27001 has 93 controls. GDPR has 21 articles with dozens of sub-requirements. And if you're a healthcare SaaS company? You need all three—plus SOC 2, FDA 21 CFR Part 11, and possibly more.

Here's the dirty secret of compliance: **80% of these requirements overlap**. Access control in HIPAA looks remarkably similar to access control in ISO 27001, which maps directly to SOC 2 CC6.1. Yet most organizations implement them as separate silos, duplicating effort, documentation, and cost.

**Compliance Cards** are our solution: modular, standardized documents that break down regulatory requirements into atomic, reusable building blocks—with built-in cross-framework mapping and community-driven updates.

<!--truncate-->

## The Problem with Traditional Compliance

Traditional compliance looks like this:

1. **Hire consultants** to interpret the regulation
2. **Create custom documentation** specific to that framework
3. **Build evidence collection** for that framework's auditors
4. **Repeat from step 1** for each additional framework

The result? Spreadsheets full of controls that nobody reads, documentation that goes stale immediately, and engineering teams that treat compliance as a checkbox exercise rather than actual security.

Worse, when regulations update—and they do constantly—organizations scramble to understand what changed and what needs updating.

## What Are Compliance Cards?

A Compliance Card is a structured, atomic document that captures everything needed to implement and prove compliance for a single regulatory requirement.

Each card contains:

- **Overview**: What the requirement is and why it matters
- **Acceptance Criteria**: Gherkin scenarios that define "done"
- **Technical Context**: Implementation interfaces and architecture
- **Evidence Requirements**: What auditors need to see
- **Cross-Framework Mapping**: Which requirements in other frameworks this card satisfies
- **Implementation Checklist**: Step-by-step implementation status

Here's what makes them powerful: **a single card can satisfy requirements across multiple frameworks**.

## Anatomy of a Compliance Card

Let's look at `comp-iso27001-001-information-security-policy`:

```markdown
# COMP-ISO27001-001: Information Security Policy

## Overview

**Purpose**: Establish and maintain information security policy  
**ISO 27001 Control**: A.5.1 - Policies for Information Security  
**Category**: organizational, governance  
**Priority**: High  
**Framework**: ISO 27001
```

The Gherkin acceptance criteria make the requirement testable:

```gherkin
Feature: Information Security Policy Management
  As an information security officer
  I want to maintain comprehensive security policies
  So that I can meet ISO 27001 A.5.1 requirements

  Scenario: Security Policy Creation
    Given information security requirements are identified
    When policy framework is developed
    And management approval is obtained
    Then policy shall define security objectives
    And policy shall be aligned with business objectives

  Scenario: Policy Review and Update
    Given security policy is in effect
    When annual review is conducted
    And regulatory changes are evaluated
    Then policy shall be updated as needed
    And changes shall be communicated
```

## Cross-Framework Mapping: The Multiplier Effect

Here's where it gets interesting. Each card includes a **Related Controls** section:

```markdown
## Related Controls

### Within ISO 27001
- comp-iso27001-002: Management Commitment
- comp-iso27001-003: Assignment of Security Responsibilities

### Cross-Framework
- comp-soc2-001: Access Control Policies (SOC2 CC6.1)
- comp-gdpr-018: Security of Processing (GDPR Art. 32)
- comp-hipaa-001: Security Management Process
```

Implement this single card, and you've made progress on **four different compliance frameworks** simultaneously.

The mapping isn't superficial. Each cross-reference indicates:

- Which specific control/article in the other framework
- How much overlap exists (full, partial, foundational)
- What additional elements might be needed for the other framework

## Why Gherkin for Compliance?

Using Gherkin (Given/When/Then) scenarios for compliance requirements might seem unusual. Here's why it works:

### 1. Auditable Clarity

Traditional compliance language:

> "The organization shall establish and maintain information security policies appropriate to the organization's needs."

Gherkin version:

```gherkin
Scenario: Security Policy Creation
  Given information security requirements are identified
  When policy framework is developed
  And management approval is obtained
  Then policy shall define security objectives
  And policy shall be aligned with business objectives
```

The Gherkin version is unambiguous. You either have management approval or you don't. The policy either defines security objectives or it doesn't.

### 2. Executable Specifications

Gherkin scenarios can drive automated testing:

```typescript
describe('Information Security Policy - ISO 27001 A.5.1', () => {
  test('Policy document exists and is approved', () => {
    const policy = getPolicyDocument('information-security');
    expect(policy).toBeDefined();
    expect(policy.approvedBy).toInclude('CEO');
    expect(policy.effectiveDate).toBeLessThan(Date.now());
  });
});
```

Your compliance documentation becomes your test suite.

### 3. Living Documentation

Because the scenarios are testable, they stay current. When implementation changes, tests fail. When tests fail, documentation updates.

## Community-Driven Updates

Compliance cards aren't static templates—they're designed for continuous improvement through community feedback:

### Update Vectors

1. **Regulatory Changes**: When ISO 27001:2022 updated from 2013, each affected card gets versioned updates with clear migration paths

2. **Implementation Feedback**: When organizations discover better evidence collection methods or more efficient implementation patterns, those improvements propagate to all users

3. **Auditor Insights**: Real-world audit findings inform what evidence actually satisfies auditors, not just what the regulation technically requires

4. **Industry Patterns**: Healthcare implementations of access control look different from fintech implementations—domain-specific patterns emerge and get documented

### The Feedback Loop

```
Organization implements card
    ↓
Auditor reviews implementation
    ↓
Feedback captured (what worked, what didn't)
    ↓
Card updated with learnings
    ↓
All organizations benefit from improved card
```

This isn't theoretical. When one organization discovers that auditors want to see specific log retention evidence for ISO 27001 A.8.15, that insight gets incorporated into the card. The next organization implementing that card benefits immediately.

## The Library Structure

Our compliance card library is organized by framework:

```
docs/compliance/frameworks/
├── gdpr/
│   ├── overview/
│   └── templates/
│       ├── comp-gdpr-001-lawful-basis-for-processing.md
│       ├── comp-gdpr-002-data-minimization.md
│       └── ... (21 cards)
├── hipaa/
│   └── templates/
│       ├── comp-hipaa-001-security-management-process.md
│       └── ... (63 cards)
├── iso27001/
│   └── templates/
│       ├── comp-iso27001-001-information-security-policy.md
│       └── ... (93 cards)
├── iso27701/
│   └── templates/
│       └── ... (62 cards)
├── soc2/
│   └── templates/
│       └── ... (19 cards)
├── fda21cfr11/
│   └── templates/
│       └── ... (14 cards)
└── en18031/
    └── templates/
        └── ... (40 cards - AI-specific)
```

**Over 300 compliance cards** across major regulatory frameworks, with cross-references mapping overlap between them.

## The Overlap Matrix

When you visualize the cross-framework relationships, patterns emerge:

| Control Area | ISO 27001 | SOC 2 | HIPAA | GDPR |
|-------------|-----------|-------|-------|------|
| Access Control | A.9.x (13 cards) | CC6.x | §164.312 | Art. 32 |
| Incident Response | A.16.x (7 cards) | CC7.x | §164.308(a)(6) | Art. 33-34 |
| Data Retention | A.8.10 | CC6.5 | §164.530(j) | Art. 5(1)(e) |
| Encryption | A.10.x (2 cards) | CC6.7 | §164.312(a)(2)(iv) | Art. 32(1)(a) |

Implement access control well *once*, with proper documentation, and you've addressed requirements in all four frameworks. The compliance cards make that mapping explicit.

## Evidence Collection: Built In

Each card specifies exactly what evidence to collect:

```yaml
evidence:
  - type: policy
    title: 'Information Security Policy v2.1'
    status: approved
    lastReview: 2024-11-15
    nextReview: 2025-11-15
    coverage: 100%

  - type: training
    title: 'Security Policy Awareness Training'
    completion: 98%
    lastUpdated: 2024-11-01

  - type: acknowledgment
    title: 'Policy Acknowledgment Forms'
    collected: 147/150
    percentage: 98%
```

No more guessing what auditors want to see. The evidence requirements are specified, with file paths for where to store artifacts.

## Implementation: From Card to Compliance

Using compliance cards follows a predictable flow:

### 1. Select Applicable Cards

```bash
# See which cards apply to your frameworks
sc compliance cards --framework=hipaa,soc2,iso27001

# Get overlap analysis
sc compliance overlap --frameworks=hipaa,soc2,iso27001
```

### 2. Initialize Evidence Structure

```bash
# Generate evidence directories and tracking files
sc compliance init --card=comp-iso27001-001
```

### 3. Implement and Track

Each card has a checklist:

```markdown
## Status

- [x] Policy drafted
- [x] Management approval obtained
- [ ] Policy distributed to organization
- [ ] Training materials created
- [ ] Acknowledgments collected
- [ ] Annual review scheduled
```

### 4. Generate Audit Packages

```bash
# Generate evidence package for auditor
sc compliance evidence --framework=iso27001 --output=audit-2024/
```

## AI-Specific Compliance: EN 18031

Emerging AI regulations need the same treatment. Our EN 18031 cards cover:

- `comp-en18031-001`: AI Governance Framework
- `comp-en18031-016`: Model Development Lifecycle
- `comp-en18031-020`: Model Explainability
- `comp-en18031-030`: Prompt Injection Prevention
- ... (40 cards total)

These cards reference existing security frameworks where overlap exists (model access control → ISO 27001 A.9.x) and introduce AI-specific requirements where they don't (model drift detection, prompt injection prevention).

## The Vision: Compliance as Code

Compliance cards are the documentation layer of a larger vision: **compliance as code**.

When requirements are:

- **Structured** (consistent format across all cards)
- **Testable** (Gherkin acceptance criteria)
- **Linked** (cross-framework references)
- **Versioned** (git-tracked changes)
- **Evidence-aware** (specified artifacts)

...then compliance becomes something engineering teams can reason about, automate, and maintain—not a separate universe managed by consultants.

The goal isn't to eliminate compliance work. It's to eliminate *duplicated* compliance work, *ambiguous* compliance requirements, and *stale* compliance documentation.

## Getting Started

The compliance cards are available as an open-source package:

**GitHub**: [github.com/ianderrington/compliance-cards](https://github.com/ianderrington/compliance-cards)

### Install via npm

```bash
npm install github:ianderrington/compliance-cards
```

### Use the CLI

```bash
# List all frameworks
npx compliance-cards list

# List HIPAA cards
npx compliance-cards list hipaa

# Get a specific card
npx compliance-cards get comp-hipaa-043-access-control

# Search across all cards
npx compliance-cards search "encryption"

# Analyze framework overlap
npx compliance-cards overlap hipaa iso27001
```

### Or use with Supernal Coding

```bash
# Initialize a project with compliance frameworks
sc init --compliance-frameworks=hipaa,soc2
```

---

Compliance doesn't have to mean reinventing the wheel for every framework. With standardized, community-maintained compliance cards, organizations can implement once and satisfy many—while maintaining clear, auditable evidence that adapts as regulations evolve.

_Interested in contributing compliance cards or improving existing ones? Visit the [GitHub repository](https://github.com/ianderrington/compliance-cards) or see the [compliance documentation](/docs/compliance/COMPLIANCE_INDEX) for contribution guidelines._

