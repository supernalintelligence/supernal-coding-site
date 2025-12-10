---
title: Troubleshooting
description: Common issues and solutions for Supernal Coding
---

Solutions to common issues when using Supernal Coding.

## Fixing Broken Documentation Links

### Quick Fix

```bash
# Auto-fix what can be fixed
sc docs links --fix

# Preview changes first
sc docs links --fix --dry-run

# Check specific files
sc docs links --file docs/path/to/file.md
```

### Pre-commit Protection

The pre-commit hook automatically checks for broken links in staged documentation files. If broken links are found:

1. **Auto-fixable links**: Run `sc docs links --fix` to fix them
2. **Missing files**: You'll need to either:
   - Remove the broken link
   - Create the missing file
   - Update the link to point to the correct location

### Skip validation (not recommended):

```bash
SC_SKIP_DOC_VALIDATION=true git commit -m "message"
```

## Understanding Link Reports

When you run `sc docs links`, you'll see:

### Auto-fixable Links

These files exist but have wrong relative paths. The tool can fix these automatically.

```bash
sc docs links --fix
```

### Missing Files

These files don't exist anywhere in the project. You'll need to:

1. **Remove the link** if the file is no longer needed
2. **Create the file** if it should exist
3. **Update the link** to point to the replacement file

## Common Issues

### "Too many broken links" Error

If you see overwhelming broken links:

1. **Start with auto-fix**:

   ```bash
   sc docs links --fix
   ```

2. **Check remaining count**:

   ```bash
   sc docs links | grep "Found.*broken links"
   ```

3. **Focus on your changes**:
   ```bash
   git diff --name-only | xargs -I {} sc docs links --file {}
   ```

### Git Hook Failures

When pre-commit hooks fail:

```bash
# See what's broken
sc validate

# Fix auto-fixable issues
sc docs links --fix

# Stage fixed files
git add .

# Commit again
git commit -m "message"
```

### WIP Registry Issues

If commit is blocked due to untracked files:

```bash
# Register files as WIP
sc wip register file.ts --feature=my-feature

# Or add to .gitignore
echo "temp-file.ts" >> .gitignore

# Or bypass once
SC_SKIP_WIP_CHECK=true git commit -m "message"
```

### Build Failures

When builds fail:

```bash
# Check build
./BUILDME.sh

# Clean build
./BUILDME.sh --clean

# View build logs
./BUILDME.sh --verbose
```

### Test Failures

When tests fail:

```bash
# Run full test suite
./TESTME.sh

# Run specific test
./TESTME.sh specific REQ-001

# Generate test map
./TESTME.sh map
```

## Best Practices

### When Creating New Documentation

1. **Use relative paths from the current file**:

   ```markdown
   [Related Doc](../other-dir/file.md)
   ```

2. **Check links before committing**:

   ```bash
   sc docs links
   ```

3. **Fix auto-fixable links**:
   ```bash
   sc docs links --fix
   ```

### When Moving Files

1. **Use git mv** to preserve history:

   ```bash
   git mv old/path/file.md new/path/file.md
   ```

2. **Run link fixer after moving**:

   ```bash
   sc docs links --fix
   ```

3. **Check for remaining broken links**:
   ```bash
   sc docs links
   ```

## Related Commands

```bash
# Full documentation validation
sc validate --docs

# Structure validation only
sc docs validate --structure

# Template validation only
sc docs validate --template

# Auto-fix template issues
sc docs validate --fix
```


