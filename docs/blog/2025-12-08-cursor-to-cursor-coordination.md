---
slug: cursor-to-cursor-coordination
title: "Cursor-to-Cursor Coordination: AI Agents Working Together via GitHub Issues"
authors: [supernal]
tags: [ai-development, automation, multi-agent, github, cursor]
---

# Cursor-to-Cursor Coordination: AI Agents Working Together via GitHub Issues

What if your AI coding assistant could delegate tasks to other AI agents and coordinate their responses? We've built exactly that—a system where Cursor agents can file GitHub issues, request help from other agents, and poll for responses.

<!--truncate-->

## The Problem: AI Agents Work in Isolation

Today's AI coding assistants are powerful but isolated. When you're working with Cursor on a complex task, you might need:

- Another agent to implement a feature in a different part of the codebase
- Background validation while you continue working
- Parallel implementation of related features
- Asynchronous code review from another agent perspective

The traditional approach? Manual coordination. Copy context, switch windows, wait, copy results back. Tedious and error-prone.

## The Solution: GitHub Issues as an Agent Communication Protocol

We've implemented a coordination system using GitHub issues as the message bus:

```bash
# File an issue for another Cursor agent to address
sc github issue create "Implement user validation for REQ-042" \
  --cursor-request \
  --template feature

# Poll for responses
sc monitor await --issue 42 --interval 2m --timeout 30m
```

### How It Works

1. **Issue Filing with `--cursor-request`**
   - Automatically syncs local changes to remote (agents need to see your code)
   - Creates issue with `@cursor` mention to trigger agent response
   - Applies appropriate labels and templates

2. **Response Detection**
   - Monitors issue comments for substantive responses
   - Detects code blocks, implementation markers, and status updates
   - Classifies responses: code implementation, status update, question, completion

3. **Polling with Configurable Timeouts**
   ```bash
   sc monitor await --issue 42 --interval 5m --timeout 1h --on-response notify
   ```

## The `sc monitor` Daemon

For continuous coordination across multiple repositories:

```bash
# Start background monitoring
sc monitor start --daemon

# Check status
sc monitor status

# View logs
sc monitor logs --follow
```

### Configuration in `supernal.yaml`

```yaml
monitor:
  repos:
    - path: .
      watch: [commits, issues, ci]
      actions: [validate, notify]
    - path: ../related-project
      watch: [issues]
      actions: [sync-status]
  pollInterval: 60000
```

## Real-World Workflow

### Scenario: Parallel Feature Implementation

You're implementing authentication (REQ-042) and need the API team to implement the endpoint:

```bash
# File issue for API implementation
sc github issue create "Implement /api/auth endpoint for REQ-042" \
  --cursor-request \
  --template feature \
  --labels api,auth,req-042

# Continue your work while agent picks it up
# ... implement frontend components ...

# Check for responses periodically
sc github issue check-responses --since 1h

# Or await with polling
sc monitor await --issue 123 --interval 5m
```

### Scenario: Background Validation

Need comprehensive test coverage while you continue development:

```bash
sc github issue create "Generate comprehensive tests for auth module" \
  --cursor-request \
  --template testing

# The other agent will:
# 1. Analyze the auth module
# 2. Generate test cases
# 3. Post implementation to the issue
# 4. You can review and merge
```

## Response Detection Patterns

The system recognizes several response patterns:

| Pattern | Detection |
|---------|-----------|
| Code blocks | Triple backticks with code |
| Implementation markers | "implemented", "completed", "done" |
| File references | `**File**: \`path/to/file\`` |
| Status updates | "in progress", "reviewing", "blocked" |
| Questions | Interrogative patterns requiring response |

## Integration with Existing Tools

### Works with `sc test` and `sc build`

Agents responding to issues can validate their work:

```bash
# Agent runs before responding
sc test --requirement REQ-042
sc build --quiet
```

### Works with `sc git-smart`

Agents can create branches and PRs:

```bash
sc git-smart branch --branch feature/req-042-api-endpoint
# ... implement ...
sc git-smart merge --push
```

## Security Considerations

- Issues are created in your repository—you control access
- Agent responses go through your normal PR review process
- No external services beyond GitHub
- All coordination is visible and auditable

## What's Next

We're exploring:

- **Template library**: Pre-built issue templates for common tasks
- **Response routing**: Automatic PR creation from agent responses
- **Multi-repo orchestration**: Coordinate changes across multiple repositories
- **CI integration**: Trigger agent responses based on CI results

## Try It Today

```bash
# Install/update supernal-coding
npm install -g supernal-coding

# File your first agent-coordination issue
sc github issue create "Your task description" --cursor-request
```

The future of AI-assisted development isn't a single agent—it's a coordinated team of specialized agents working together. GitHub issues provide the perfect protocol: asynchronous, auditable, and already integrated into every developer's workflow.

---

*Supernal Coding is an open-source project focused on AI-assisted software development workflows. [Learn more](https://github.com/supernalintelligence/supernal-coding)*

