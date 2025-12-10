---
id: approval-workflow-user-guide
title: Document Approval Workflow Guide
sidebar_label: Approval Workflow
sidebar_position: 5
---

# Document Approval Workflow Guide

This guide explains how to use the document approval workflow system for compliance-tracked changes.

## Overview

The approval workflow system uses **Git as the primary audit trail** for document changes. Key features:

- **Signed commits** for identity verification (GPG)
- **Document registry** to declare controlled paths
- **CLI commands** for history and compliance checking
- **Dashboard integration** for visual tracking

## Quick Start

### 1. Setup GPG Signing

```bash
# Interactive setup (recommended)
sc gpg setup

# Check current status
sc gpg status

# Test your configuration
sc gpg test
```

### 2. View Document History

```bash
# Show change history for any document
sc doc history docs/workflow/sops/general/SOP-0.1.13-change-control.md

# Filter by date or author
sc doc history <file> --since=2025-01-01
sc doc history <file> --author="Jane"

# Show only signed commits
sc doc history <file> --signed-only
```

### 3. Check Document Registry

```bash
# Check if staged files are in controlled paths
sc doc check

# Check a specific file
sc doc registry check docs/compliance/policy.md

# List all controlled paths
sc doc registry list
```

### 4. Create Change Documents

For complex changes affecting 10+ controlled files:

```bash
# Create a CHG document
sc change new "Major SOP restructuring" --type=documentation

# List existing change documents
sc change list

# Show a specific change
sc change show CHG-000001
```

## Controlled Documents

The following paths require signed commits:

| Path Pattern | Purpose |
|--------------|---------|
| `docs/workflow/sops/**/*.md` | Standard Operating Procedures |
| `docs/compliance/**/*.md` | Compliance documentation |
| `docs/architecture/**/*.md` | Architecture decisions |

## Making Changes

### Standard Change (< 10 files)

```bash
# 1. Make your changes
vim docs/workflow/sops/general/SOP-0.1.05.md

# 2. Commit with signature
git commit -S -m "[DOC] Update requirements planning process"

# 3. Push
git push
```

### Large Change (10+ files)

```bash
# 1. Create CHG document first
sc change new "Update all SOPs for new process"

# 2. Make your changes
# ...

# 3. Commit with CHG reference
git commit -S -m "[DOC] Update SOPs for new process

CHG-000003: Major process restructuring
Approved-by: @tech-lead"
```

## Commit Message Format

Use standardized messages for audit clarity:

```
[TYPE](SCOPE): Brief description (50 chars)

Body explaining what changed and why.

REQ-XXX: Related requirement
CHG-NNNNNN: Change document reference
Approved-by: @username
```

**Types:**
- `DOC` - Documentation changes
- `FEAT` - New features
- `FIX` - Bug fixes
- `REFACTOR` - Code restructuring

## Dashboard

Access the Approvals dashboard to:

- **Pending** - View documents awaiting approval
- **Contributors** - Manage team members and approvers
- **History** - Browse document change history

Navigate to: Dashboard → Approvals

## Team Management

Define team members in `.supernal/people.yaml`:

```yaml
contributors:
  - id: jane-doe
    name: "Jane Doe"
    email: "jane@example.com"
    github: "@janedoe"
    role: approver
    gpgKeyId: "ABC123..."
    canApprove:
      - "docs/workflow/sops/**"
      - "docs/compliance/**"
```

## Troubleshooting

### GPG Signing Fails

```bash
# Check GPG status
sc gpg status

# Ensure GPG_TTY is set
export GPG_TTY=$(tty)

# Re-run setup
sc gpg setup
```

### "Unsigned commit on controlled document" Warning

```bash
# Option 1: Sign the commit
git commit --amend -S

# Option 2: Bypass (not recommended for compliance)
SC_SKIP_DOC_REGISTRY_CHECK=true git commit -m "..."
```

### View Signature Status

```bash
# Check if a commit is signed
git log --show-signature -1

# View history with signature status
sc doc history <file>
```

## Related Documentation

- [GPG Setup Guide](/docs/guides/gpg-signed-commits-setup)
- [SOP-0.1.13: Change Control](/docs/workflow/sops/general/SOP-0.1.13-change-control)
- [ADR-002: Git-Native Change Tracking](/docs/features/workflow-management/approval-workflow-system/design/adr-002-git-native-change-tracking)

---

*For more details, see the [Consolidated Plan](/docs/features/workflow-management/approval-workflow-system/planning/consolidated-plan).*

