---
title: Git Hooks Configuration Example
description: Setting up quality gates with pre-commit and pre-push hooks
---

# Git Hooks Configuration Example

This example shows how to configure Git hooks for automated quality gates.

## Scenario

We want to ensure:
- Code passes linting before commit
- All files are properly tracked (WIP registry)
- Tests pass before push
- Requirements are validated before push

## Step 1: Install Git Hooks

```bash
sc git-hooks install
```

Output:
```
✅ Git hooks installed
   - pre-commit: Enabled
   - pre-push: Enabled
   - commit-msg: Enabled
```

## Step 2: Configure Pre-Commit Checks

Edit `supernal.yaml`:

```yaml
# supernal.yaml
git_hooks:
  pre_commit:
    enabled: true
    checks:
      # WIP Registry - ensure all files are tracked
      wip_registry_check:
        enabled: true
        threshold: 5  # Block if 5+ untracked files
        allow_bypass: true
      
      # Linting
      lint:
        enabled: true
        command: "npm run lint"
        fix_command: "npm run lint:fix"
      
      # Type checking
      type_check:
        enabled: true
        command: "npm run type-check"
      
      # Formatting
      format:
        enabled: true
        command: "npm run format:check"
        fix_command: "npm run format"
```

## Step 3: Configure Pre-Push Checks

```yaml
# supernal.yaml (continued)
git_hooks:
  pre_push:
    enabled: true
    checks:
      # Requirement validation
      requirement_validation:
        enabled: true
        command: "sc validate --requirements"
      
      # Full test suite
      tests:
        enabled: true
        command: "npm test"
        timeout: 300  # 5 minutes
      
      # Build verification
      build:
        enabled: true
        command: "npm run build"
```

## Step 4: Configure Commit Message Format

```yaml
# supernal.yaml (continued)
git_hooks:
  commit_msg:
    enabled: true
    pattern: "^(REQ-\\d+|CHORE|DOCS|FIX|FEAT|REFACTOR|TEST):\\s.+"
    examples:
      - "REQ-042: Implement user authentication"
      - "FIX: Resolve login redirect issue"
      - "DOCS: Update API documentation"
      - "CHORE: Update dependencies"
```

## Step 5: Test Pre-Commit Hook

Make changes and commit:

```bash
echo "test" > test-file.txt
git add test-file.txt
git commit -m "CHORE: Add test file"
```

Hook output:
```
🔍 Running pre-commit checks...

✅ WIP Registry Check
   Tracked files: 1
   Untracked files: 0

✅ Lint Check
   No issues found

✅ Type Check
   No errors

✅ Format Check
   All files formatted

✅ All pre-commit checks passed
```

## Step 6: WIP Registry in Action

When you have many untracked files:

```bash
touch experiment-1.ts experiment-2.ts experiment-3.ts
touch experiment-4.ts experiment-5.ts experiment-6.ts
git add README.md
git commit -m "DOCS: Update README"
```

Hook output:
```
🔍 Running pre-commit checks...

❌ WIP Registry Check FAILED
   Untracked files: 6 (threshold: 5)
   
   Untracked files:
     - experiment-1.ts
     - experiment-2.ts
     - experiment-3.ts
     - experiment-4.ts
     - experiment-5.ts
     - experiment-6.ts
   
   Solutions:
   1. Track files for WIP:
      sc wip register experiment-*.ts --feature=experiment
   
   2. Add to .gitignore:
      echo "experiment-*.ts" >> .gitignore
   
   3. Bypass once (not recommended):
      SC_SKIP_WIP_CHECK=true git commit -m "message"
```

## Step 7: Register WIP Files

```bash
sc wip register experiment-*.ts --feature=experimental-auth

git commit -m "DOCS: Update README"
```

Output:
```
✅ Registered 6 files for WIP tracking
   Feature: experimental-auth

🔍 Running pre-commit checks...
✅ All pre-commit checks passed
[main abc123] DOCS: Update README
```

## Step 8: Test Pre-Push Hook

```bash
git push origin main
```

Hook output:
```
🔍 Running pre-push checks...

✅ Requirement Validation
   Validated: 15 requirements
   Passed: 15
   Failed: 0

✅ Test Suite
   Tests: 142 passed, 0 failed
   Coverage: 87%

✅ Build Verification
   Build completed successfully

✅ All pre-push checks passed
Pushing to origin/main...
```

## Step 9: Handling Failures

When tests fail:

```bash
git push origin main
```

Output:
```
🔍 Running pre-push checks...

✅ Requirement Validation
   Validated: 15 requirements

❌ Test Suite FAILED
   Tests: 140 passed, 2 failed
   
   Failed tests:
     - UserProfile.test.ts: should display avatar
     - AccessControl.test.ts: should deny invalid role
   
   Fix the failing tests before pushing.
   
   To run tests locally:
     npm test
   
   To bypass (emergency only):
     SC_SKIP_ALL_CHECKS=true git push origin main

Push aborted.
```

## Step 10: View Hook Status

```bash
sc git-hooks status
```

Output:
```
📋 Git Hooks Status

Pre-Commit
├── WIP Registry Check     ✅ Enabled
├── Lint                   ✅ Enabled
├── Type Check             ✅ Enabled
└── Format                 ✅ Enabled

Pre-Push
├── Requirement Validation ✅ Enabled
├── Tests                  ✅ Enabled
└── Build                  ✅ Enabled

Commit-Msg
└── Format Validation      ✅ Enabled

Last Run: 2024-12-10 14:30:00
Checks Passed: 127
Checks Failed: 3
```

## Configuration Reference

Full configuration options:

```yaml
# supernal.yaml
git_hooks:
  pre_commit:
    enabled: true
    fail_fast: true  # Stop on first failure
    parallel: false  # Run checks in parallel
    checks:
      wip_registry_check:
        enabled: true
        threshold: 5
        allow_bypass: true
        bypass_variable: SC_SKIP_WIP_CHECK
      lint:
        enabled: true
        command: "npm run lint"
        fix_command: "npm run lint:fix"
        auto_fix: false  # Auto-fix and re-stage
      type_check:
        enabled: true
        command: "npm run type-check"
      format:
        enabled: true
        command: "npm run format:check"
        fix_command: "npm run format"
        auto_fix: false

  pre_push:
    enabled: true
    fail_fast: true
    checks:
      requirement_validation:
        enabled: true
        command: "sc validate --requirements"
      tests:
        enabled: true
        command: "npm test"
        timeout: 300
        coverage_threshold: 80
      build:
        enabled: true
        command: "npm run build"

  commit_msg:
    enabled: true
    pattern: "^(REQ-\\d+|CHORE|DOCS|FIX|FEAT|REFACTOR|TEST):\\s.+"
    max_length: 72
    require_body: false

bypass_variables:
  all: SC_SKIP_ALL_CHECKS
  wip_registry: SC_SKIP_WIP_CHECK
  lint: SC_SKIP_LINT
  tests: SC_SKIP_TESTS
```

## Summary

This example demonstrated:

1. **Installing** Git hooks with `sc git-hooks install`
2. **Configuring** pre-commit checks (lint, type, format, WIP)
3. **Configuring** pre-push checks (tests, validation, build)
4. **Configuring** commit message format
5. **Using** WIP registry for untracked files
6. **Handling** hook failures
7. **Monitoring** hook status


