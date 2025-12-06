---
slug: principles-driven-development
title: 'Supernal Coding Principles: Building Quality Software with AI Agents'
authors: [supernal]
tags: [principles, best-practices, ai-agents, quality]
image: /img/documentation.png
description: Explore the core principles that guide Supernal Coding's approach to AI-powered development - from planning as documentation to keeping code clean and tested.
---

# Supernal Coding Principles: Building Quality Software with AI Agents

At Supernal Intelligence, we've built Supernal Coding on a foundation of **seven core principles** that ensure AI agents and human developers deliver high-quality, maintainable code. These aren't just guidelines—they're the backbone of our entire development workflow system.

<!--truncate-->

## The Seven Principles

### 1. 📋 Planning is Documentation

**Why it matters**: When AI agents work on your codebase, they need clear context. Your planning documents become living documentation that guides both humans and AI.

**How Supernal Coding helps**:

- Requirement tracking with Gherkin syntax
- Automated traceability matrices
- Git integration that links commits to requirements

Learn more about requirement management at `/docs/cli-commands#requirement-management`

---

### 2. 👥 User's Needs are Primary

**Why it matters**: Features exist to serve users, not the other way around. Every line of code should trace back to a real user need.

**How Supernal Coding helps**:

- User story validation
- Acceptance criteria enforcement
- Direct mapping from requirements to implementation

Explore our workflow system (see CLI docs)

---

### 3. ✅ If It Isn't Tested, It Isn't Done

**Why it matters**: AI agents can generate code fast—but only tests prove it works. Testing is not optional; it's the definition of "done."

**How Supernal Coding helps**:

- Test generation from requirements
- Coverage tracking and reporting
- Pre-push hooks that enforce test quality

See testing strategy in the docs

---

### 4. 📝 Document It Appropriately

**Why it matters**: Over-documentation wastes time. Under-documentation wastes even more time later. Document what matters, when it matters.

**How Supernal Coding helps**:

- Auto-generated CLI documentation
- Requirement-based documentation system
- Code comments linked to requirements

View documentation standards at `/docs/documentation-standards`

---

### 5. 🏗️ Keep Needed Information Close to the Code

**Why it matters**: Context switching kills productivity. Build instructions, configuration, and documentation should live right next to the code that needs them.

**How Supernal Coding helps**:

- `BUILDME.sh` and `TESTME.sh` templates
- In-repo requirement tracking
- Configuration colocation

Learn about our file structure at `/docs/architecture/file-organization`

---

### 6. 🔗 Feature and Testing Mapping to Requirements

**Why it matters**: Compliance, auditability, and clarity all depend on knowing exactly which code implements which requirements.

**How Supernal Coding helps**:

- Automated traceability matrices
- Git branch naming conventions
- Requirement IDs in commit messages

Explore traceability features in the CLI

---

### 7. 🧹 Keep It Clean

**Why it matters**: Technical debt compounds. Legacy code spreads. Clean code is easier for AI agents to understand and modify safely.

**How Supernal Coding helps**:

- Linting and formatting enforcement
- Pre-commit quality checks
- Automated code review suggestions

See our quality standards at `/docs/code-quality`

---

## Putting It All Together

These principles aren't isolated—they work together to create a **development environment where AI agents and humans collaborate effectively**:

1. **Plan** with clear requirements
2. **Prioritize** user needs in every requirement
3. **Test** everything before marking it done
4. **Document** the right things at the right time
5. **Colocate** context near code
6. **Trace** features back to requirements
7. **Clean** up as you go

## Getting Started

Ready to build better software with these principles?

```bash
# Install Supernal Coding
npm install -g supernal-code

# Initialize in your project
sc init

# Create your first requirement
sc req new "User login with OAuth"
```

View full documentation (see getting started guide)

---

**About Supernal Intelligence**: We build AI-powered development tools that help teams deliver higher quality code faster. Supernal Coding is our flagship workflow system designed specifically for AI agent collaboration.

Try the live dashboard at `/dashboard-live` | [View on GitHub →](https://github.com/supernalintelligence/supernal-coding)
