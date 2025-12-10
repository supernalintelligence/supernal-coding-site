---
title: What is Supernal Coding?
description: A meta-repository system combining BDD, TDD, documentation-driven, and AI-driven development
---

# What is Supernal Coding?

Supernal Coding is a **meta-repository system** that equips any codebase with structured workflows, automated quality gates, and compliance infrastructure—designed for teams using AI agents in development.

## The Problem

Modern development teams face compounding challenges:

- **AI agents need structure** — Without clear conventions, AI tools produce inconsistent, hard-to-maintain code
- **Compliance is expensive** — Meeting SOC2, HIPAA, ISO 13485, or FDA requirements manually consumes significant engineering time
- **Traceability is hard** — Connecting requirements to code to tests to evidence requires discipline that's easy to lose
- **Quality degrades over time** — Without enforcement, technical debt accumulates and documentation drifts from reality

## Four Development Approaches, One System

Supernal Coding integrates four proven development methodologies into a cohesive workflow:

### 1. Behavior-Driven Development (BDD)

Requirements are expressed as Gherkin scenarios that both humans and machines can read. Every feature starts with a clear specification of expected behavior.

```gherkin
Feature: User Authentication
  Scenario: Successful login with valid credentials
    Given a registered user exists
    When they submit valid credentials
    Then they receive an authentication token
```

### 2. Test-Driven Development (TDD)

Tests are created *before* implementation. The `sc requirement` workflow generates test scaffolds from Gherkin specs, establishing clear acceptance criteria before a single line of code is written.

### 3. Documentation-Driven Development

Requirements, architecture decisions, and compliance evidence live alongside code—not in external wikis that drift out of sync. Changes to requirements trigger updates to tests. Changes to code trigger documentation reviews.

### 4. AI-Driven Analysis

Every artifact—requirements, tests, code, and documentation—is structured for AI comprehension. Cursor rules guide AI behavior. Automated validation catches inconsistencies. Health checks analyze coverage and traceability.

## What You Get

When you run `sc init`, your repository gains:

| Component | Purpose |
|-----------|---------|
| **SC CLI** | Commands for requirements, validation, health checks, and workflow management |
| **Cursor Rules** | Guidelines that shape how AI agents interact with your codebase |
| **Git Hooks** | Pre-commit and pre-push validation that prevents bad code from entering |
| **SOPs** | Standard operating procedures for a 12-phase development lifecycle |
| **Compliance Templates** | Pre-built frameworks for SOC2, ISO 13485, FDA 21 CFR Part 11, HIPAA, and GDPR |

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                     Development Workflow                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Requirement → Gherkin → Tests → Code → Validation → Evidence  │
│       ↑          ↑         ↑       ↑         ↑           ↑     │
│       └──────────┴─────────┴───────┴─────────┴───────────┘     │
│                    AI-assisted at every stage                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

1. **Create a requirement** — `sc req new "Feature" --epic=main`
2. **AI generates Gherkin** — Behavior specifications from natural language
3. **Generate test scaffolds** — `sc req generate-tests REQ-001`
4. **Implement with AI pair** — Cursor rules guide consistent implementation
5. **Validate before merge** — Git hooks enforce quality gates
6. **Evidence is automatic** — Traceability captured at every step

## Who It's For

**Regulated industries** — Healthcare, fintech, medtech, aerospace, and defense teams where compliance isn't optional

**AI-forward teams** — Organizations using Cursor, Copilot, or other AI tools who need guardrails and consistency

**Quality-focused engineering** — Teams that value traceability, documentation, and reproducible processes

## What It's Not

- **Not a replacement for judgment** — AI assists; humans decide
- **Not magic compliance** — You still need to do the work; this provides the structure
- **Not vendor lock-in** — Standard markdown, Git, and open formats throughout

## Next Steps

- [Getting Started](./getting-started.md) — Install and configure in 5 minutes
- [Guides](./guides/) — Deep dives into configuration, planning, building, and testing
- [Workflow](./workflow/) — The 12-phase development process and SOPs
