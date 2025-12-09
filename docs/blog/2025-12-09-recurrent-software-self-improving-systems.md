---
slug: recurrent-software-self-improving-systems
title: "Recurrent Software: Building Tools That Improve Themselves"
description: "How software that solves its own problems becomes exponentially more valuable to others"
authors: [ianderrington]
tags: [strategy, architecture, self-improvement, infrastructure, dogfooding]
date: 2025-12-09
---

# Recurrent Software: Building Tools That Improve Themselves

There's a pattern in successful infrastructure software that I've been thinking about for years. Call it **recurrent software**: systems that use themselves to build and improve themselves.

MkDocs Material documents itself with MkDocs Material. Supabase runs on Supabase. AWS uses AWS to run AWS. These aren't just clever marketing stunts - they represent a fundamentally different approach to building software that creates compounding returns.

At Supernal Coding, we've adopted this pattern deliberately. We build compliance and testing infrastructure that we use to compliantly build and test itself. And the results have been illuminating.

## The Pattern

Recurrent software has a distinctive structure:

```
┌─────────────────────────────────────┐
│     Software System S               │
│                                     │
│   ┌───────────────────────────┐     │
│   │  Uses S to:               │     │
│   │  - Build S                │     │
│   │  - Test S                 │     │
│   │  - Document S             │     │
│   │  - Deploy S               │     │
│   └───────────────────────────┘     │
│                                     │
│   Problems found → Improvements →   │
│   Better S → Better problems found  │
└─────────────────────────────────────┘
```

This creates a feedback loop that traditional software development can't match. Every problem you encounter while building your tool is a problem your users will encounter. Every improvement you make for yourself directly benefits everyone else.

<!--truncate-->

## Real-World Examples

### MkDocs Material

The MkDocs Material documentation theme is perhaps the most visible example. Visit their documentation site and you're looking at the product itself. Every feature they add gets immediately stress-tested on their own content. Every bug in the rendering system breaks their own docs first.

This creates a powerful alignment: the maintainers can't ship a broken release without immediately experiencing the pain. There's no "it works on my machine" - it either works on their production documentation or it doesn't.

### Supabase

Supabase uses Supabase for its own backend. Their authentication system, database, and real-time features are all tested in production on their own platform. When they build a new feature, they're both the builder and the first customer.

This gives them an unusual perspective: they understand the pain points of scaling a Supabase project because they've scaled a Supabase project. Their documentation is battle-tested because they wrote it while using the product.

### AWS

Perhaps the ultimate example. Amazon Web Services famously runs Amazon.com, one of the world's largest e-commerce platforms. Every Black Friday is a stress test for AWS infrastructure. Every recommendation you see on Amazon is powered by AWS services that have been refined through Amazon's own demanding requirements.

This creates a virtuous cycle: Amazon's retail needs push AWS to be more reliable, scalable, and cost-efficient. Those improvements then benefit every other AWS customer.

## Why This Matters

The recurrent pattern creates several advantages that compound over time:

### 1. Immediate Feedback

When you use your own tool, the feedback loop is instant. You don't need to wait for user reports or set up elaborate monitoring. The problems find you.

I remember a debugging session where I was trying to understand why our test validation was giving false negatives. The frustration of that experience led directly to better error messages, which then helped users who would have encountered the same confusion.

### 2. Authentic Documentation

Documentation written by people who actually use the tool reads differently. It addresses real workflows, anticipates real confusion, and provides examples that matter.

When your documentation system documents itself, you can't write theoretical examples. You have to write examples that work because you're literally looking at the rendered result.

### 3. Quality Pressure

There's nowhere to hide. If you ship a broken feature, you experience the breakage. If the API is awkward, you feel the awkwardness. If performance degrades, you notice.

This creates a quality floor that pure customer feedback can't achieve. Users might tolerate poor UX; you won't tolerate it in your own workflow.

### 4. Aligned Incentives

The team's daily experience is the product's quality. Every improvement to the internal workflow is automatically an improvement to the product. There's no friction between "what we need" and "what users need."

## How Supernal Coding Uses This Pattern

We build tools for compliant AI-accelerated development. And we use those tools to build and test themselves.

### Self-Testing Compliance

Our compliance validation system checks that code meets regulatory requirements. We run it on our own codebase, which means:

- If a false positive is annoying, we fix it immediately
- If a real issue gets missed, we discover it ourselves
- If the validation is too slow, we feel the pain in our own CI

The system that validates other codebases validates itself first. Every compliance gap we find in our own code becomes a test case for the validator.

### Self-Documenting Requirements

Our requirements management system tracks what needs to be built and why. We use it to track our own requirements:

```gherkin
Feature: Requirement Validation
  As a development team using Supernal Coding
  I need requirements to be validated automatically
  So that compliance evidence is generated as I work

  @regulation:internal-quality
  Scenario: Self-validating requirements
    Given a new requirement is created
    When the requirement is processed
    Then it must pass format validation
    And it must have acceptance criteria
    And it must link to relevant regulations
```

This isn't theoretical - it's how we actually track our work. The requirement system's requirements are managed by the requirement system.

### Self-Testing Test Framework

Our testing infrastructure validates test coverage and traceability. We apply it to our own tests:

- Test-to-requirement mapping is enforced on our test suite
- Coverage thresholds apply to our own code
- Evidence logging captures our own test runs

When the test framework has a bug, our own test runs reveal it. When coverage is insufficient, we fail our own CI.

## The Compounding Effect

The recurrent pattern creates compounding returns that are hard to appreciate until you've experienced them.

**Month 1:** Building the tool is slow because the tool is immature.

**Month 3:** Problems you encountered in Month 1 are fixed. Building is faster.

**Month 6:** The accumulated improvements make building noticeably smoother. You start to forget what the early days felt like.

**Month 12:** The tool is substantially better than any tool you didn't build yourself, because it's been refined against your exact needs for a year.

**Month 24:** Users start remarking that the tool seems to "understand" their workflows. It does - because those workflows are your workflows.

## Implementation Considerations

Building recurrent software isn't free. There are real costs and constraints:

### The Bootstrap Problem

You can't use a tool that doesn't exist yet. The first version has to be built without the benefit of recurrence. This is often the hardest phase, and it's tempting to skip the recurrent step and ship something "good enough."

Resist this temptation. The bootstrap phase is an investment that pays dividends indefinitely.

### The Complexity Trap

Not every feature benefits from recurrence. If you're building a payment processing system, you probably don't need to process payments to build it.

The pattern works best when:
- The tool is general-purpose
- The team's workflow is representative of user workflows
- The domain is one the team works in daily

### The Bias Risk

Eating your own cooking can create blind spots. If your team has unusual needs or unusual patience, you might optimize for edge cases that don't matter to most users.

Counterbalance this with external feedback. The recurrent pattern augments user research; it doesn't replace it.

## A Strategic Choice

At Supernal Coding, we made a deliberate choice: before we can help others build compliant software reliably, we must be able to build compliant software reliably ourselves.

Our compliance infrastructure validates itself. Our testing framework tests itself. Our documentation system documents itself.

This means:
- Our customers don't encounter problems we haven't encountered
- Our improvements come from real pain, not hypothetical requirements
- Our tools are battle-tested before anyone else sees them

When we ship a feature, we've already been using it. When we fix a bug, we've already felt its impact. When we write documentation, we've already needed to read it.

## Building for Recurrence

If you're building infrastructure software, consider whether the recurrent pattern applies:

1. **Can your tool build itself?** If you're building a build system, can it build itself?

2. **Can your tool test itself?** If you're building testing infrastructure, can it test itself?

3. **Can your tool document itself?** If you're building documentation tools, can it document itself?

4. **Can your tool deploy itself?** If you're building deployment infrastructure, can it deploy itself?

If the answer is yes, you have an opportunity to create compounding value. The investment in making your tool work for your workflow pays returns in every future development cycle.

## The Deeper Principle

Recurrent software embodies a deeper principle: **eat what you cook**.

Tools built by people who use them are different from tools built by people who only build them. The difference is subtle but pervasive - it shows up in error messages, in API design, in documentation tone, in the things that get fixed quickly versus the things that linger.

The best infrastructure software isn't just tested by its users. It's built by its users, for its users, using itself.

That's the recurrent advantage.

---

_Supernal Coding builds compliance and testing infrastructure for AI-accelerated development. We use our tools to build our tools, and we think you should too._

