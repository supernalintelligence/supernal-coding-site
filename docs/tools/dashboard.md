---
title: Dashboard
description: Visual interface for requirement and compliance tracking
---

# Dashboard

Visual interface for managing requirements, compliance, and workflow.

## Features

### Requirement Tracking
- View all requirements by status
- Filter by epic, priority, type
- Track progress and traceability

### Compliance Monitoring
- Framework compliance status
- Evidence collection status
- Audit trail visualization

### Workflow Visualization
- Kanban board view
- Milestone progress
- Team activity

## Access

The dashboard is available at:

```
http://localhost:3000/dashboard
```

Or deployed at your organization's URL.

## Integration

Connect your repository:

```bash
sc dashboard connect
```

## API

The dashboard exposes an API for integration:

```bash
# Get requirements
GET /api/[repoId]/requirements

# Get compliance status
GET /api/[repoId]/compliance

# Get workflow state
GET /api/[repoId]/workflow
```

