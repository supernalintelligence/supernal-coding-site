---
slug: documentation-driven-development
title: 'Documentation-Driven Development: Write the Plan, Generate the Code'
authors: [ianderrington]
tags:
  [
    supernal-coding,
    documentation,
    ai-development,
    workflow,
    automation,
    developer-experience,
  ]
---

# Documentation-Driven Development: Write the Plan, Generate the Code

What if instead of writing code and then documenting it, you documented your implementation plan and the system created the files for you? This is **Documentation-Driven Development** (DDD), and it's one of the development toolshow Supernal Coding bridges the gap between planning and implementation.

## The Traditional Problem

Software development typically follows this pattern:

1. **Discuss** the feature in meetings
2. **Write** tickets or user stories
3. **Implement** code in isolation
4. **Document** (if there's time)
5. **Discover** misalignment during code review

Documentation, if it exists at all, is an afterthought. By the time you document, the code has drifted from the original intent. Requirements live in Jira, code lives in Git, and the two are connected only by human memory.

<!--truncate-->

## The Documentation-Driven Approach

Supernal Coding inverts this workflow:

1. **Document** the implementation plan with exact code blocks
2. **Review** the plan (with AI, team, or both)
3. **Process** the documentation to create files
4. **Iterate** on the generated code
5. **Ship** with documentation already complete

The key insight: **planning documents ARE implementation specs**.

## How It Works

### The Pattern

Use this format in your markdown:

````markdown
**File**: `src/services/auth.ts`

```typescript
export class AuthService {
  async login(email: string, password: string): Promise<Token> {
    // Validate credentials
    const user = await this.userRepo.findByEmail(email);
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
      throw new AuthError('Invalid credentials');
    }

    // Generate token
    return this.generateToken(user);
  }
}
````

````

### The Command

```bash
sc docs process docs/features/auth/planning/implementation-plan.md
````

### The Result

```
📖 Processing documentation file...
   File: docs/features/auth/planning/implementation-plan.md

📋 Found 3 code blocks to process
📄 Found code block: src/services/auth.ts (TO IMPLEMENT)
📄 Found code block: src/types/auth.ts (TO IMPLEMENT)
📄 Found code block: tests/services/auth.test.ts (TO IMPLEMENT)

✨ Created new file: /workspace/src/services/auth.ts
✨ Created new file: /workspace/src/types/auth.ts
✨ Created new file: /workspace/tests/services/auth.test.ts

📝 Updated documentation file

✅ Documentation processing completed successfully!
   3 file(s) processed
```

The documentation is automatically updated:

```markdown
**File IMPLEMENTED**: `src/services/auth.ts`
```

The code block is removed—because the code now lives in the actual file, not the documentation (DRY principle).

## Why This Matters for AI Development

### 1. AI Agents Generate Better Plans Than Random Code

When you ask an AI to "implement authentication," it generates code without context. When you ask it to "write an implementation plan for authentication," it produces structured, reviewable documentation.

The plan can be reviewed, refined, and approved before any files are touched.

### 2. Atomic File Creation

Instead of watching an AI create and modify files one at a time (with potential conflicts), the Documentation Processor creates all files at once from an approved plan.

### 3. Natural Checkpoint

The documentation serves as a natural approval checkpoint:

```
Human: Review this implementation plan
AI: *generates plan.md with code blocks*
Human: *reviews, suggests changes*
AI: *updates plan*
Human: "Approved, process it"
→ sc docs process plan.md
→ All files created
```

### 4. Built-in Documentation

Your implementation plan IS your documentation. When someone asks "why did we structure auth this way?", the answer lives in `docs/features/auth/planning/implementation-plan.md`.

## Conflict Detection

Real codebases have existing code. The processor handles this:

```
⚠️ CONFLICT: src/services/auth.ts - existing file differs from documentation

The processor won't overwrite without explicit approval.
```

You get:

- **Similarity scores**: How different is the existing code?
- **Conflict markers**: Documentation is marked for manual review
- **Resolution guidance**: Clear instructions on how to resolve

## Integration with Feature-Based Development

Documentation-Driven Development fits naturally into the feature-based workflow:

```
docs/features/
  auth/
    README.md                    # Feature overview
    planning/
      implementation-plan.md     # ← Process this
    requirements/
      req-auth-001.gherkin       # Formal requirements
```

The flow:

1. `sc feature create auth` → Creates folder structure
2. Write `implementation-plan.md` with code blocks
3. `sc docs process ...implementation-plan.md` → Creates files
4. `sc requirement generate-tests REQ-AUTH-001` → Creates test scaffolding
5. `sc test` → Run validation

## When to Use It

### ✅ Good Fit

- Large features spanning multiple files
- Architecture changes with clear structure
- Refactors that touch many files
- Migration plans with step-by-step changes
- AI-generated implementation plans

### ❌ Not Ideal

- Quick single-file fixes
- Exploratory prototyping
- One-line changes
- Code that needs heavy iteration

## The Command Reference

```bash
# Process a documentation file
sc docs process <path-to-markdown>

# See what's available
sc docs --help

# Validate documentation structure first
sc docs validate docs/features/auth/
```

## Conclusion

Documentation-Driven Development isn't about writing more documentation—it's about making documentation do more work. When your implementation plan generates the implementation, documentation stops being a burden and becomes a tool.

The `sc docs process` command is just 500 lines of code, but it fundamentally changes how features go from idea to code.

**Try it**: Write your next feature as a plan with code blocks. Run `sc docs process`. Watch the files appear.

---

_Ready to try Documentation-Driven Development? See the [documentation-processor feature guide](/docs/features/developer-tooling/documentation-processor/) for full details._
