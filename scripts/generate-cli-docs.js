#!/usr/bin/env node
/**
 * Generate CLI documentation from command-mapping.json
 * Output: content/docs/cli-commands/
 */

const fs = require('fs');
const path = require('path');

// Get paths from environment or use defaults
const mappingPath = process.argv[2] || path.join(__dirname, '../../..', 'supernal-code-package/lib/cli/command-mapping.json');
const outDir = process.argv[3] || path.join(__dirname, '../content/docs/cli-commands');

// Ensure output directory exists
fs.mkdirSync(outDir, { recursive: true });

// Load command mapping
if (!fs.existsSync(mappingPath)) {
  console.error(`Command mapping not found: ${mappingPath}`);
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
const commands = Object.entries(mapping.commands || {}).sort((a, b) => a[0].localeCompare(b[0]));

console.log(`Generating docs for ${commands.length} commands...`);

// Generate index
let index = `---
title: CLI Commands
description: Complete reference for Supernal Coding CLI commands
---

# CLI Commands Reference

All commands can be run with \`sc\` or \`supernal-coding\` prefix.

| Command | Description |
|---------|-------------|
`;

for (const [name, info] of commands) {
  index += `| [\`${name}\`](./${name}) | ${info.description} |\n`;
}

index += `
## Quick Start

\`\`\`bash
# Get help for any command
sc <command> --help

# Common workflow commands
sc kanban list          # View current tasks
sc validate --all       # Validate project
sc suggest "feedback"   # Quick GitHub issue
\`\`\`

*Generated from CLI command definitions.*
`;

fs.writeFileSync(path.join(outDir, 'index.md'), index);

// Generate individual command pages
for (const [name, info] of commands) {
  let content = `---
title: ${name}
description: ${info.description}
---

# \`${name}\`

${info.description}

## Usage

\`\`\`bash
sc ${name}`;

  if (info.options && info.options.length > 0) {
    content += ' ' + info.options.map(o => o.flags).join(' ');
  }
  content += `
\`\`\`
`;

  if (info.options && info.options.length > 0) {
    content += `
## Options

| Option | Description |
|--------|-------------|
`;
    for (const opt of info.options) {
      content += `| \`${opt.flags}\` | ${opt.description} |\n`;
    }
  }

  if (info.examples && info.examples.length > 0) {
    content += `
## Examples

\`\`\`bash
${info.examples.join('\n')}
\`\`\`
`;
  }

  content += `
*Generated from CLI command definitions.*
`;

  fs.writeFileSync(path.join(outDir, `${name}.md`), content);
}

console.log(`Generated ${commands.length + 1} CLI doc files`);

