---
slug: vibe-coding-to-fix-vibe-coding
title: 'The Meta Irony: I''m Vibe Coding to Make Vibe Coding Compliant'
authors: [ianderrington]
tags:
  [
    supernal-coding,
    vibe-coding,
    ai-development,
    meta,
    developer-experience,
    compliance,
    open-source,
  ]
shareBlurbs:
  twitter: 'I''m using vibe coding to build tools that make vibe coding compliant. Yes, the irony is intentional. Here''s why eating your own dogfood matters when building AI dev tools. #VibeCoding #AIDevelopment #Supernal'
  facebook: "I spend my days vibe coding. Prompting Claude. Generating hundreds of files. Iterating at superhuman speed. And the whole point? Building tools that make vibe coding safe for production. The meta irony isn't lost on me. Here's what I've learned from using the very thing I'm trying to fix."
  linkedin: "**I'm Vibe Coding to Fix Vibe Coding**\n\nEvery day I:\n• Prompt Claude to generate code\n• Review AI output at high speed\n• Iterate through implementations\n• Ship features faster than ever\n\nAnd the whole point of this?\n\n**Building tools that make vibe coding safe for production.**\n\nThe irony is intentional. Here's why:\n\n1. **Dogfooding reveals truth** - I feel every pain point firsthand. When AI generates code that breaks compliance, I experience it. When traceability is missing, I'm the one scrambling.\n\n2. **Speed exposes gaps** - Vibe coding at production pace shows where guardrails are missing. Every \"oops\" becomes a feature requirement.\n\n3. **The tool must survive its own use** - If Supernal can't help ME code compliantly while building Supernal, it's not ready for anyone else.\n\n**What I've learned:**\n\n• AI is incredible AND dangerous\n• Structure isn't the enemy of speed\n• Guardrails enable, not restrict\n• The best tools are built by users who need them\n\nI'm not building compliance tools from an ivory tower. I'm building them from the trenches, using the exact workflow I'm trying to improve.\n\n---\n\nAre you building tools for a workflow you actually use? I'd argue you should be."
---

# The Meta Irony: I'm Vibe Coding to Make Vibe Coding Compliant

There's a certain absurdity to my daily workflow.

I open Cursor. I prompt Claude. I watch code materialize at speeds that would have seemed like science fiction five years ago. Files appear. Tests generate. Documentation writes itself.

And the entire point of all this vibe coding?

**Building tools that make vibe coding safe for production.**

The snake eating its own tail. The tool being used to build itself. The meta-irony that keeps me entertained through long debugging sessions.

But it's not just irony. It's strategy.

<!--truncate-->

## Why Build with What You're Building For

There's a principle in software called "dogfooding"—using your own product. Microsoft famously requires teams to use their own software internally. The idea is simple: you can't fix problems you don't feel.

I've taken this further. I'm not just using Supernal Coding to build Supernal Coding. I'm **vibe coding** to build tools for **vibe coding**.

Every pain point I'm trying to solve? I experience it daily.

Every gap in AI-assisted development? I fall into it regularly.

Every compliance failure mode? I've triggered them all.

## What a Day Looks Like

Here's my actual workflow building Supernal:

**8:00 AM**: "Claude, implement the compliance card validation system. Here's the requirement..."

**8:15 AM**: 47 files generated. Tests included. Documentation written.

**8:20 AM**: Git hooks catch 3 issues: missing requirement reference, a TODO placeholder that shouldn't ship, inconsistent naming convention.

**8:25 AM**: "Claude, fix these specific issues the hooks found."

**8:27 AM**: Fixed. Committed. Moving on.

**9:00 AM**: "Claude, refactor the requirement manager to support compliance card linking..."

**9:30 AM**: Realize the AI created a new abstraction that duplicates existing functionality.

**9:35 AM**: This is exactly the kind of problem Supernal should catch. Add it to the feature backlog.

**10:00 AM**: "Claude, add a hook that detects when AI generates duplicate abstractions..."

And so it goes.

## The Feedback Loop

```
I vibe code
    ↓
Something goes wrong
    ↓
I feel the pain directly
    ↓
I understand the failure mode
    ↓
I add a guardrail to Supernal
    ↓
The guardrail catches it next time
    ↓
I vibe code faster (because guardrails work)
    ↓
Repeat
```

This loop is why Supernal exists. Not because I sat down and theorized about what AI coding needs. Because I **live** in AI-assisted development and keep stubbing my toe on the same problems.

## Real Problems I've Encountered (And Now Solve)

### The Experiment Graveyard

Early on, I'd ask Claude to "try a few approaches" for a problem. It would generate:
- `approach_v1.ts`
- `approach_v2.ts`
- `approach_v3_final.ts`
- `approach_v4_actually_final.ts`

I'd commit everything because I wasn't sure which one we landed on.

Result: A graveyard of dead code.

**Solution**: WIP registry and experimental file detection. Now hooks warn when experimental-looking files are staged.

### The Traceability Black Hole

"Claude, implement user authentication."

Done. 30 files. Works great.

Two weeks later: "Why did we implement it this way? What requirement was this for?"

Answer: ¯\\\_(ツ)\_/¯

**Solution**: Requirement-linked development. Every commit references a REQ-XXX. Every requirement has acceptance criteria. Traceability is automatic.

### The Compliance Documentation Gap

Built a whole feature. Shipped it. Worked perfectly.

Audit time: "Show us the evidence that this meets HIPAA access control requirements."

Me: "Here's... the code?"

Auditor: "That's not evidence."

**Solution**: Compliance cards with evidence checklists, automated evidence collection, audit trail logging.

### The Style Drift

Monday Claude uses camelCase. Wednesday Claude uses snake_case. Friday Claude gets creative with PascalCase for functions.

Codebase becomes an archaeological dig of AI personality shifts.

**Solution**: Linting + formatting enforced by hooks, style guides in context, consistent conventions checked before commit.

## Why This Matters

I could build compliance tools without using AI coding.

I could theorize about what vibe coders need from a distance.

I could interview users and synthesize their problems into requirements.

But there's something irreplaceable about **being** the user while building the product.

When I spend an hour tracking down why AI generated duplicate code, I don't just file a bug report. I feel the frustration. I understand the cognitive load. I know exactly how the guardrail should work because I know exactly when I needed it.

When my own commit gets blocked by a hook I wrote, I experience whether the error message is helpful or annoying.

When I generate a compliance evidence package for a feature I just built, I know whether the workflow makes sense or is bureaucratic nonsense.

## The Uncomfortable Truth

Here's what I've learned vibe coding every day:

**AI is incredibly powerful.** I ship 10x faster than I could without it. Features that would take days take hours. The productivity gains are real.

**AI is incredibly dangerous.** Left unchecked, it generates plausible garbage. Code that looks professional but isn't. Abstractions that solve problems that don't exist. Duplications and inconsistencies that compound into maintenance nightmares.

**Structure isn't the enemy of speed.** The guardrails I've built don't slow me down—they speed me up. I vibe code with confidence because I know the hooks will catch my (and Claude's) mistakes.

**The best tools come from pain.** Every feature in Supernal exists because I needed it. Not because it seemed like a good idea. Because I hit a wall and had to build a ladder.

## The Vision

I'm building Supernal so that vibe coding can be:

- **Fast** (it already is)
- **Safe** (guardrails catch problems)
- **Compliant** (evidence generates automatically)
- **Maintainable** (structure prevents chaos)
- **Trustworthy** (you can rely on AI output)

The goal isn't to slow down AI coding. It's to make AI coding reliable enough for production. For regulated industries. For software that matters.

And the only way I know how to build that is to use it myself, every day, on real problems.

## The Meta Continues

As I write this blog post, I'm in Cursor. Claude helped draft sections. The compliance hooks will verify this markdown doesn't contain anything it shouldn't. The git commit will be traced to the documentation epic.

Turtles all the way down.

If you're building tools for AI-assisted development, I'd argue you should be using AI-assisted development. Not just to test your tools, but to feel what your users feel. To understand the workflow from the inside.

The meta irony isn't a bug. It's the whole point.

---

_Want to see the tools I'm building while vibe coding? Check out [Supernal Coding on GitHub](https://github.com/supernal-ai/supernal-coding) or the [documentation site](/docs/) for the full picture._


