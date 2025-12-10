---
title: Compliance
description: Regulatory compliance frameworks and automation
---

# Compliance

Built-in support for regulatory compliance frameworks.

## Supported Frameworks

- **HIPAA** - Healthcare data protection
- **SOC 2** - Security and availability
- **ISO 13485** - Medical device quality management
- **ISO 27001** - Information security
- **FDA 21 CFR Part 11** - Electronic records
- **GDPR** - Data protection (EU)
- **ISO 27701** - Privacy management

## How It Works

### 1. Select Frameworks

```bash
sc init --compliance-frameworks hipaa,soc2
```

### 2. Automatic Traceability

Requirements automatically trace to:
- Test cases
- Evidence
- Audit logs

### 3. Evidence Collection

```bash
sc test run --evidence
```

Creates timestamped, signed evidence for audits.

### 4. Compliance Reports

```bash
sc compliance report
```

Generate compliance status reports.

## Framework Details

See [Frameworks](./frameworks/) for detailed requirements per framework.

