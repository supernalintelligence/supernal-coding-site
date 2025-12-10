---
title: Building
description: How to build with Supernal Coding - AI rules, testing, implementation
---

Building with Supernal Coding means test-first, requirement-driven development with AI assistance.

## Test-First Development

Generate tests before implementation:

```bash
# Generate tests from requirement
sc requirement generate-tests REQ-001

# Run tests
npm test
```

## Cursor Rules

Supernal Coding includes AI rules in `.cursor/rules/` that help AI agents:

- Understand project structure
- Follow coding standards
- Maintain compliance requirements
- Generate appropriate tests

## Implementation Workflow

### 1. Start Work on a Requirement

```bash
# Create feature branch
sc git-smart branch --requirement=REQ-001

# Mark requirement as in-progress
sc requirement update REQ-001 --status=in-progress
```

### 2. Implement with AI Assistance

The Cursor rules provide context for AI agents:

- Project conventions
- Testing patterns
- Compliance requirements
- Code style guidelines

### 3. Validate Implementation

```bash
# Run tests
npm test

# Validate requirement
sc requirement validate REQ-001

# Check compliance
sc validate
```

### 4. Complete and Merge

```bash
# Mark complete
sc requirement update REQ-001 --status=done

# Merge with validation
sc git-smart merge --push --delete-local
```

## Code Quality

### Pre-commit Checks

Git hooks automatically run:

- Linting
- Formatting
- Type checking
- Basic validation

### Pre-push Checks

More comprehensive validation:

- Full test suite
- Compliance validation
- Requirement traceability

## Documentation

Keep documentation close to code:

- README files in feature directories
- Inline code comments
- Requirement references in commit messages

## BUILDME.sh Standard

Use the standardized `BUILDME.sh` interface:

```bash
# Basic usage
./BUILDME.sh              # Default build
./BUILDME.sh --help       # Show help and options
./BUILDME.sh --quiet      # Silent mode for automation
./BUILDME.sh --validate   # Build + validation
./BUILDME.sh --clean      # Clean build
./BUILDME.sh --production # Production build
```

### Agent Usage Guidelines

**Agents should prefer `BUILDME.sh` over direct commands** like `npm run build` because:

- Consistent interface across all projects
- Intelligent error handling and reporting
- Environment detection and optimization
- Validation integration
- Standardized output for parsing
