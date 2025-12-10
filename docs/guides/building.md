---
title: Building
description: Development workflow and best practices
---

# Building with Supernal Coding

Development workflow that maintains traceability and quality.

## Development Workflow

### 1. Start from a Requirement

```bash
# Create or pick a requirement
sc requirement list --status=pending
sc requirement update REQ-001 --status=in-progress
```

### 2. Create Feature Branch

```bash
sc git-smart branch --branch REQ-001
# Creates: feature/req-001-description
```

### 3. Code with Traceability

Commits reference requirements:

```bash
git commit -m "REQ-001: Implement user authentication"
```

### 4. Use AI Agents Safely

Cursor rules ensure AI agents:
- Don't make unauthorized changes
- Follow coding standards
- Maintain traceability
- Test before committing

### 5. Pre-Commit Validation

Git hooks automatically check:
- Linting and formatting
- Type checking
- WIP registry compliance
- Requirement traceability

## Best Practices

### DRY (Don't Repeat Yourself)
```bash
# Reuse existing abstractions
# Avoid duplicating logic
# Use shared utilities
```

### No Hacks or Stubs
```bash
# Fix root causes
# Don't work around problems
# No temporary solutions that become permanent
```

### Test First
```bash
# Write tests before implementation
# Use Gherkin scenarios as test cases
# Validate continuously
```


