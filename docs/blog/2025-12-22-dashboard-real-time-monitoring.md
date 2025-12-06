---
slug: dashboard-real-time-monitoring
title: 'The Living Dashboard: Real-Time Visibility Into AI-Driven Development'
authors: [ianderrington]
tags:
  [
    dashboard,
    monitoring,
    visualization,
    real-time,
    developer-experience,
    supernal-coding,
  ]
---

# The Living Dashboard: Real-Time Visibility Into AI-Driven Development

When AI agents are autonomously modifying your codebase, you need more than git logs and test output. You need **real-time visibility** into what's happening: which requirements are being worked on, what tests are running, where coverage gaps exist, and whether the system is healthy.

Traditional development dashboards weren't designed for the speed and complexity of AI-assisted development. You need a **living dashboard** that updates in real-time and provides immediate insight into system state.

## The Visibility Problem

AI-driven development moves fast:

- **Multiple agents** working simultaneously
- **Rapid commits** to different branches
- **Continuous testing** across requirements
- **Dynamic requirements** that evolve during implementation
- **Complex dependencies** between features

Without visibility, you're flying blind:

- Which requirements are actually being worked on?
- Are tests passing or silently failing?
- Where are coverage gaps?
- What's the overall project health?
- Are any agents stuck or blocked?

<!--truncate-->

## The Supernal Coding Dashboard

The dashboard provides real-time visibility across your entire development lifecycle.

### 1. Requirements Overview

```
╔══════════════════════════════════════════════════════════╗
║              REQUIREMENTS DASHBOARD                       ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Total Requirements: 47                                  ║
║  ✓ Done: 32 (68%)                                       ║
║  ⚡ In Progress: 8 (17%)                                 ║
║  ⏱️  Pending: 7 (15%)                                     ║
║  ❌ Blocked: 0 (0%)                                       ║
║                                                          ║
║  By Priority:                                            ║
║    🚨 Critical: 5 (4 done, 1 in-progress)                ║
║    🔥 High: 18 (15 done, 3 in-progress)                  ║
║    📋 Medium: 24 (13 done, 4 in-progress, 7 pending)     ║
║                                                          ║
║  By Epic:                                                ║
║    🔒 Security: 12 requirements (10 done)                ║
║    📊 Analytics: 8 requirements (5 done)                 ║
║    🎨 UI/UX: 15 requirements (12 done)                   ║
║    ⚙️  Backend: 12 requirements (5 done)                  ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

Click any section for drill-down:

```
╔══════════════════════════════════════════════════════════╗
║         REQUIREMENTS IN PROGRESS                          ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  REQ-042: Audit Trail System                    [95%]    ║
║    Branch: feature/req-042-audit-trail                   ║
║    Agent: agent-001                                      ║
║    Started: 2025-11-19 10:30 UTC                        ║
║    Tests: ✓ 23/23 passing                               ║
║    Coverage: 96.5% (target: 95%)                        ║
║    Last Activity: 2 minutes ago                         ║
║    Status: Ready to merge                               ║
║                                                          ║
║  REQ-051: Two-Factor Authentication             [60%]    ║
║    Branch: feature/req-051-2fa                          ║
║    Agent: agent-002                                      ║
║    Started: 2025-11-18 14:20 UTC                        ║
║    Tests: ⚠️  18/20 passing (2 failing)                  ║
║    Coverage: 88.3% (target: 95%)                        ║
║    Last Activity: 15 minutes ago                        ║
║    Status: Needs attention                              ║
║                                                          ║
║  ... 6 more requirements ...                            ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### 2. Real-Time Test Status

```
╔══════════════════════════════════════════════════════════╗
║              TEST EXECUTION MONITOR                       ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🏃 Currently Running:                                   ║
║    REQ-051 Integration Tests        [████████░░] 80%    ║
║    REQ-042 E2E Tests               [Complete] ✓         ║
║                                                          ║
║  📊 Overall Status:                                      ║
║    Total Tests: 1,847                                    ║
║    ✓ Passing: 1,843 (99.8%)                             ║
║    ❌ Failing: 4 (0.2%)                                  ║
║    ⏭️  Skipped: 0                                        ║
║                                                          ║
║  ⚠️  Failing Tests:                                      ║
║    REQ-051: TOTP verification timeout (2 failures)      ║
║    REQ-051: Backup codes generation (2 failures)        ║
║                                                          ║
║  📈 Trend:                                               ║
║    Last 24h:  ✓ 98.5% → ✓ 99.8%  (↑ 1.3%)              ║
║    Last 7d:   ✓ 97.2% → ✓ 99.8%  (↑ 2.6%)              ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### 3. Coverage Heat Map

Visual representation of test coverage:

```
╔══════════════════════════════════════════════════════════╗
║           TEST COVERAGE BY REQUIREMENT                    ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  REQ-001: ██████████████████ 100%  ✓                    ║
║  REQ-002: ███████████████░░░  88%  ⚠️ (target: 95%)     ║
║  REQ-042: ██████████████████  96.5% ✓                   ║
║  REQ-051: ████████████░░░░░░  75%  ❌ (target: 95%)     ║
║  REQ-089: ███████████████████  98%  ✓                   ║
║                                                          ║
║  Color Legend:                                           ║
║    █ 95-100%: Meets target                              ║
║    █ 90-94%: Close to target                            ║
║    █ 80-89%: Needs improvement                          ║
║    █ <80%: Critical gap                                 ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### 4. Git Activity Stream

Real-time feed of repository activity:

```
╔══════════════════════════════════════════════════════════╗
║              GIT ACTIVITY STREAM                          ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  ⏰ 2 minutes ago                                        ║
║  agent-001 committed to feature/req-042-audit-trail      ║
║  "REQ-042: Add digital signature verification"          ║
║  +145 -23 lines                                         ║
║                                                          ║
║  ⏰ 15 minutes ago                                       ║
║  agent-002 committed to feature/req-051-2fa             ║
║  "REQ-051: Implement TOTP generation"                   ║
║  +256 -12 lines                                         ║
║                                                          ║
║  ⏰ 1 hour ago                                           ║
║  agent-001 merged feature/req-038-logging → main        ║
║  REQ-038 complete | Tests: ✓ 15/15 | Coverage: 97%     ║
║                                                          ║
║  ⏰ 2 hours ago                                          ║
║  human-dev created branch feature/req-055-performance   ║
║  REQ-055 started | Priority: high                       ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### 5. Agent Activity

Track what AI agents are doing:

```
╔══════════════════════════════════════════════════════════╗
║              ACTIVE AI AGENTS                             ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🤖 agent-001 (Active - 2m ago)                         ║
║    Working on: REQ-042 (Audit Trail)                    ║
║    Branch: feature/req-042-audit-trail                  ║
║    Activity: Running tests (23/23 passing)              ║
║    Progress: 95% complete                               ║
║    Next: Preparing to merge                             ║
║                                                          ║
║  🤖 agent-002 (Active - 15m ago)                        ║
║    Working on: REQ-051 (Two-Factor Auth)                ║
║    Branch: feature/req-051-2fa                          ║
║    Activity: Debugging test failures                    ║
║    Progress: 60% complete                               ║
║    Issues: 2 test failures in TOTP verification         ║
║                                                          ║
║  🤖 agent-003 (Idle - 4h ago)                           ║
║    Last worked on: REQ-038 (Logging)                    ║
║    Status: Merged to main                               ║
║    Available for new tasks                              ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### 6. Dependency Graph

Visualize requirement dependencies:

```
╔══════════════════════════════════════════════════════════╗
║           REQUIREMENT DEPENDENCIES                        ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  REQ-001 (✓ Done)                                       ║
║    ├─→ REQ-002 (✓ Done)                                 ║
║    │    └─→ REQ-042 (⚡ In Progress - 95%)              ║
║    └─→ REQ-038 (✓ Done)                                 ║
║         └─→ REQ-051 (⚡ In Progress - 60%)              ║
║                                                          ║
║  REQ-012 (✓ Done)                                       ║
║    └─→ REQ-055 (⏱️  Pending)                            ║
║         └─→ REQ-056 (⏱️  Blocked - waiting on 055)     ║
║                                                          ║
║  ⚠️  Blocked: REQ-056 waiting on REQ-055                ║
║  ⚠️  At Risk: REQ-051 has failing tests                 ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### 7. Metrics & Trends

Project health metrics:

```
╔══════════════════════════════════════════════════════════╗
║              PROJECT HEALTH METRICS                       ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  📊 Velocity (last 7 days)                              ║
║    Requirements completed: 5                             ║
║    Average completion time: 2.3 days                    ║
║    Tests written: 127                                    ║
║    Code coverage: +3.2%                                 ║
║                                                          ║
║  🎯 Quality Metrics                                      ║
║    Test pass rate: 99.8%                                ║
║    Coverage: 94.2% (target: 90%)                        ║
║    Code review approval: 100%                            ║
║    Deployment success: 98.5%                            ║
║                                                          ║
║  ⚡ Performance                                          ║
║    Avg test duration: 3.2s (↓ 0.3s)                    ║
║    CI/CD pipeline: 4.5min (↓ 1.2min)                   ║
║    Build time: 2.1min (↓ 0.5min)                       ║
║                                                          ║
║  📈 Trends                                               ║
║    Last 30 days:                                         ║
║      Requirements: 18 completed                         ║
║      Tests: +456 new tests                              ║
║      Coverage: 89.1% → 94.2%                            ║
║      Velocity: +23%                                      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

## Web Dashboard

Access via browser at `http://localhost:3000/dashboard` or the hosted documentation site:

### Interactive Features

**1. Filterable Requirements Table**

- Sort by priority, status, coverage
- Filter by epic, agent, date range
- Search by title or description
- Click for detailed view

**2. Live Test Execution**

- Real-time test runner output
- Filter by requirement, status, duration
- Click to see failure details
- Rerun failed tests

**3. Coverage Visualization**

- Heat map of coverage by file
- Drill down to function level
- Identify untested code paths
- Track coverage over time

**4. Git Branch Visualization**

- Interactive branch graph
- See merge conflicts early
- Track feature progress
- Identify stale branches

**5. Compliance Reports**

- Generate on-demand
- Export as PDF/HTML/CSV
- Filter by date range
- Include test evidence

## Real-Time Updates

Dashboard updates via WebSocket:

```javascript
// Dashboard connects to live data
const dashboard = new SupernalDashboard({
  wsUrl: 'ws://localhost:3001',
  updateInterval: 1000, // 1 second
});

// Receives real-time events
dashboard.on('test:complete', (event) => {
  // Update test status display
});

dashboard.on('requirement:updated', (event) => {
  // Update requirement card
});

dashboard.on('commit:pushed', (event) => {
  // Add to activity stream
});
```

## CLI Dashboard

Access dashboard in terminal:

```bash
# Launch interactive terminal dashboard
sc dashboard

# Or specific view
sc dashboard requirements
sc dashboard tests
sc dashboard coverage
sc dashboard agents
```

Interactive terminal interface with:

- Real-time updates
- Keyboard navigation
- Drill-down views
- Search and filter
- Export capabilities

## Alerts & Notifications

Configure alerts for important events:

```json
// .supernal-code/alerts.json
{
  "alerts": [
    {
      "name": "Test Failures",
      "condition": "testFailureCount > 0",
      "channels": ["slack", "email"],
      "severity": "high"
    },
    {
      "name": "Coverage Below Target",
      "condition": "coverage < requirement.targetCoverage",
      "channels": ["dashboard"],
      "severity": "medium"
    },
    {
      "name": "Requirement Blocked",
      "condition": "status == 'blocked'",
      "channels": ["slack", "dashboard"],
      "severity": "high"
    },
    {
      "name": "Agent Stuck",
      "condition": "lastActivity > 2hours && status == 'in-progress'",
      "channels": ["slack", "email"],
      "severity": "critical"
    }
  ]
}
```

Dashboard displays active alerts:

```
╔══════════════════════════════════════════════════════════╗
║              ACTIVE ALERTS                                ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🔴 CRITICAL                                             ║
║    Agent agent-002 may be stuck on REQ-051              ║
║    Last activity: 2h 15m ago                            ║
║    Action: Review logs, restart if necessary            ║
║                                                          ║
║  🟡 MEDIUM                                               ║
║    REQ-002 coverage below target (88% < 95%)            ║
║    Action: Add more test scenarios                      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

## Integration with CI/CD

Dashboard embeds in CI/CD pipelines:

```yaml
# .github/workflows/dashboard-update.yml
name: Update Dashboard

on:
  push:
  pull_request:
  workflow_run:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Update dashboard data
        run: |
          sc dashboard update \
            --tests=${{ github.event.test_results }} \
            --coverage=${{ github.event.coverage }} \
            --commit=${{ github.sha }}

      - name: Post status to dashboard
        run: |
          sc dashboard post-status \
            --requirement=$REQ_ID \
            --status=ci-passing \
            --url=${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

## Mobile-Friendly

Access dashboard on mobile devices:

- Responsive design
- Touch-friendly interface
- Push notifications
- Quick actions

## Export & Reporting

Generate reports from dashboard:

```bash
# Weekly status report
sc dashboard export --format=pdf --period=week

# Compliance report
sc dashboard export --format=html --type=compliance

# CSV for spreadsheet analysis
sc dashboard export --format=csv --data=metrics
```

## Future Enhancements

We're building:

**Predictive Analytics**: "REQ-051 is at risk of missing deadline based on current velocity"

**AI Insights**: "Coverage is consistently lower in authentication modules - suggest additional test scenarios"

**Automated Response**: "Test failure detected - automatically creating issue and assigning to agent"

**Natural Language Queries**: "Show me all critical requirements blocked by dependencies"

## Conclusion

The dashboard transforms development visibility from reactive monitoring to proactive insight:

- **Real-time updates** keep everyone informed
- **Visual clarity** makes complex state understandable
- **Actionable alerts** prevent problems from escalating
- **Historical trends** inform future planning
- **AI-friendly data** enables automated decision-making

When AI agents are driving development, visibility isn't optional - it's essential infrastructure.

---

_Try it yourself: `sc dashboard` or visit `/dashboard-live`_

## Resources

- Dashboard Setup Guide at `/docs/dashboard/setup`
- Dashboard API Reference at `/docs/dashboard/api`
- Alert Configuration at `/docs/dashboard/alerts`
