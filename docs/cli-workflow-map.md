---
title: CLI Workflow Map
description: Map of all sc CLI commands to their SOP documentation
---

# CLI Workflow Map

The CLI Workflow Map provides a comprehensive view of all `sc` commands and how they connect to our Standard Operating Procedures (SOPs).

## Why This Matters

When using Supernal Coding, understanding which commands support which workflows is essential for:

- **AI Agents**: Knowing which commands to use for specific tasks
- **Developers**: Finding the right command for their workflow
- **Documentation**: Ensuring SOPs reference the correct commands

## Generating the Map

The CLI workflow map is generated directly from the source code, ensuring it's always up-to-date:

```bash
# ASCII tree view (quick reference)
sc cli workflow-map

# Full markdown with SOP references
sc cli workflow-map --format markdown

# JSON for programmatic use
sc cli workflow-map --format json

# Save to file
sc cli workflow-map --format markdown --output docs/reference/CLI-COMMAND-TREE.md
```

## Command Categories

### Requirements Management

| Command                         | Description               | Primary SOP |
| ------------------------------- | ------------------------- | ----------- |
| `sc requirement new`            | Create new requirement    | SOP-5.01    |
| `sc requirement validate`       | Validate requirement      | SOP-5.01    |
| `sc requirement start-work`     | Start work on requirement | SOP-T.01    |
| `sc requirement generate-tests` | Generate test scaffolding | SOP-6.01    |

### Git Workflow

| Command                      | Description               | Primary SOP |
| ---------------------------- | ------------------------- | ----------- |
| `sc git-smart branch`        | Create feature branch     | SOP-0.1.12  |
| `sc git-smart check-context` | Check readiness for merge | SOP-0.1.12  |
| `sc git-smart merge`         | Safe merge with cleanup   | SOP-0.1.12  |
| `sc git-hooks install`       | Install git hooks         | SOP-0.1.07  |

### Documentation

| Command                   | Description                         | Primary SOP |
| ------------------------- | ----------------------------------- | ----------- |
| `sc docs validate`        | Validate documentation              | SOP-0.1.10  |
| `sc docs merge-templates` | Sync templates preserving approvals | SOP-0.1.13  |
| `sc docs links`           | Check and fix broken links          | SOP-0.1.10  |

### Quality & Testing

| Command         | Description                | Primary SOP |
| --------------- | -------------------------- | ----------- |
| `sc test`       | Run test guidance          | SOP-6.01    |
| `sc type-check` | Detect type duplications   | SOP-6.01    |
| `sc validate`   | Validate project structure | SOP-0.1.04  |

### Feature Management

| Command               | Description                | Primary SOP |
| --------------------- | -------------------------- | ----------- |
| `sc feature create`   | Create feature structure   | SOP-T.06    |
| `sc feature validate` | Validate feature lifecycle | SOP-T.06    |
| `sc fbc add`          | Add feature to registry    | SOP-T.07    |

### WIP Management

| Command           | Description                    | Primary SOP |
| ----------------- | ------------------------------ | ----------- |
| `sc wip register` | Register work-in-progress file | SOP-T.07    |
| `sc wip status`   | Check WIP registry status      | SOP-T.07    |
| `sc wip cleanup`  | Clean up old WIP entries       | SOP-T.07    |

## Full Command Tree

Run `sc cli workflow-map` to see the complete tree:

```
sc
├── requirement (alias: req)
│       📚 SOPs: SOP-0.1.18, SOP-0.1.17, SOP-5.01, SOP-3.03
├── validate
│       📚 SOPs: SOP-0.1.18, SOP-0.1.17, SOP-3.03
├── feature
│   ├── create
│   ├── validate
│   ├── move
│   └── sync
│       📚 SOPs: SOP-T.06
├── git-smart
│       📚 SOPs: SOP-11.01, SOP-T.01, SOP-T.07, SOP-0.1.12, ...
├── wip (alias: w)
│   ├── register
│   ├── unregister
│   ├── list
│   └── ...
│       📚 SOPs: SOP-T.07, SOP-0.1.18
└── ... (23 total commands)
```

## Viewing in Dashboard

The CLI Workflow Map is also available in the dashboard:

1. Navigate to the **CLI** section in the sidebar
2. Select **Workflow Map**
3. Search and explore all commands interactively

## Programmatic Access

For tooling and automation, use the JSON output:

```javascript
// Load CLI map data
const cliMap = await fetch('/api/current-repo/cli-map').then(r => r.json());

// Find commands for a specific SOP
const gitSmartRefs = cliMap.commands['git-smart'].sopReferences;
console.log(`git-smart is referenced in ${gitSmartRefs.length} SOPs`);

// Get all commands with their actions
Object.entries(cliMap.commands).forEach(([name, cmd]) => {
  console.log(`sc ${name}: ${cmd.actions.length} actions`);
});
```

## Keeping Updated

The CLI workflow map is generated from the actual source code. To regenerate after CLI changes:

```bash
# Update the reference files
sc cli workflow-map --format markdown --output docs/reference/CLI-COMMAND-TREE.md
sc cli workflow-map --format json --output docs/reference/cli-command-tree.json

# Commit the updates
git add docs/reference/
git commit -m "docs: Update CLI workflow map"
```

## Related Documentation

- [SOP-T.01: Using sc CLI](/docs/workflow/sops/tools/SOP-T.01-using-sc-cli) - Comprehensive CLI guide
- [SOP-0.1: AI-Accelerated Workflow](/docs/workflow/sops/SOP-0.1-ai-accelerated-workflow-overview) - Workflow overview
- [CLI Commands Reference](/docs/cli-commands) - Individual command docs
