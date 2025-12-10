---
title: Dashboard
description: Visual monitoring and management interface
sidebar_position: 5
---

# Dashboard

The Supernal Coding Dashboard provides a visual interface for monitoring project progress, requirement status, and compliance coverage.

## Launching the Dashboard

```bash
sc dashboard
```

Opens at `http://localhost:3001` by default.

### Options

```bash
sc dashboard --port=3002      # Custom port
sc dashboard --no-open        # Don't auto-open browser
sc dashboard --host=0.0.0.0   # Allow external connections
```

## Dashboard Views

### Requirements Overview

The main dashboard shows all requirements organized by:

- **Status**: pending, in-progress, done, blocked
- **Priority**: critical, high, medium, low
- **Phase**: discovery, foundation, implementation, validation, compliance
- **Epic**: grouped by feature area

### Requirement Cards

Each requirement displays:

- **ID and Title**: REQ-XXX with description
- **Status Badge**: Current state
- **Priority Indicator**: Color-coded priority
- **Compliance Tags**: Associated frameworks
- **Test Coverage**: Linked test results
- **Assignment**: Who's working on it

Click any card to view full details.

### Compliance Monitor

Track compliance framework coverage:

- **Framework Progress**: Percentage complete per framework
- **Gap Analysis**: Missing requirements
- **Audit Status**: Ready for audit indicators
- **Evidence Links**: Connected documentation

### Test Results

Real-time test status:

- **Unit Tests**: Pass/fail counts
- **Integration Tests**: API and integration results
- **E2E Tests**: End-to-end coverage
- **Coverage Reports**: Code coverage metrics

## Filtering and Search

### Quick Filters

```
status:in-progress         # By status
priority:high              # By priority
epic:authentication        # By epic
phase:implementation       # By phase
assignee:@username         # By assignee
```

### Combined Filters

```
status:in-progress priority:high epic:auth
```

### Search

Search across:
- Requirement titles
- Descriptions
- IDs
- Tags

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search |
| `n` | New requirement |
| `r` | Refresh |
| `?` | Show help |
| `Esc` | Close modal |

## Configuration

### supernal.yaml

```yaml
dashboard:
  port: 3001
  auto_open: true
  theme: "dark"  # or "light"
  
  views:
    requirements:
      default_group: "phase"
      show_completed: false
    
    compliance:
      frameworks:
        - iso-13485
        - fda-21-cfr
        - gdpr
```

### Environment Variables

```bash
SC_DASHBOARD_PORT=3002
SC_DASHBOARD_THEME=dark
```

## Integration

### With CI/CD

Generate dashboard data for CI environments:

```bash
sc dashboard export --format=json > dashboard-data.json
```

### With External Tools

The dashboard exposes a local API:

```bash
# Get requirements
curl http://localhost:3001/api/requirements

# Get compliance status
curl http://localhost:3001/api/compliance

# Get test results
curl http://localhost:3001/api/tests
```

## Troubleshooting

### Dashboard Won't Start

```bash
# Check if port is in use
lsof -i :3001

# Try different port
sc dashboard --port=3002

# Check for errors
sc dashboard --verbose
```

### Data Not Updating

```bash
# Force refresh
sc dashboard --refresh

# Check state files
ls -la .supernal/state/

# Rebuild state
sc state rebuild
```

### Slow Performance

```bash
# Check requirement count
sc req list --count

# Archive old requirements
sc req archive --older-than=90d

# Clear cache
sc dashboard --clear-cache
```

## Best Practices

1. **Regular Monitoring**: Check dashboard daily
2. **Keep Updated**: Refresh before standups
3. **Use Filters**: Focus on current work
4. **Track Trends**: Monitor completion rates
5. **Share Views**: Use for team visibility
