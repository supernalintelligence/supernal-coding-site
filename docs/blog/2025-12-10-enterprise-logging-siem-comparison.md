---
title: "Navigating the SIEM Landscape: A Developer's Guide to Enterprise Logging"
date: 2025-12-10
author: Supernal Coding Team
tags: [compliance, siem, logging, security, observability, integrations]
description: "A comprehensive comparison of SIEM and log management platforms, plus how Supernal Coding helps teams forward audit logs to any destination."
---

# Navigating the SIEM Landscape: A Developer's Guide to Enterprise Logging

If you've ever tried to choose a logging or SIEM (Security Information and Event Management) platform for your team, you know the challenge: dozens of options, wildly different pricing models, and enterprise sales teams that won't give you a straight answer.

We recently did deep research into this space while building Supernal Coding's log forwarding capabilities. Here's what we learned—and how we're solving the "which SIEM should I use?" problem by letting you use **any of them**.

## The Two Worlds: Log Management vs. SIEM

First, let's clear up the confusion between log management and SIEM. They're often conflated, but serve different purposes:

| Aspect | Log Management | SIEM |
|--------|---------------|------|
| **Primary Purpose** | Store, search, analyze logs | Detect security threats in real-time |
| **Data Analysis** | Manual search and filtering | Automated correlation and anomaly detection |
| **Alerting** | Basic threshold alerts | Sophisticated threat detection rules |
| **Compliance** | Retention and audit trail | Active security monitoring |
| **Cost** | Generally lower | Generally higher |
| **Complexity** | Lower | Higher (requires security expertise) |

**Bottom line**: Most teams need *both*—log management for debugging and compliance, SIEM for security. The question is whether to get them from one vendor or mix and match.

## The Major Players: An Honest Comparison

### Enterprise SIEM Platforms

#### Splunk Enterprise Security

**The 800-pound gorilla of enterprise SIEM.**

| Criteria | Rating | Notes |
|----------|--------|-------|
| **Features** | ⭐⭐⭐⭐⭐ | Industry leader, ML/AI capabilities |
| **Scalability** | ⭐⭐⭐⭐⭐ | Handles petabytes |
| **Ease of Use** | ⭐⭐⭐ | Powerful but steep learning curve |
| **Pricing** | ⭐⭐ | $150-300/GB/day (gets expensive fast) |
| **Integration** | ⭐⭐⭐⭐⭐ | 2500+ integrations via Splunkbase |

**Best for**: Large enterprises with dedicated security teams and budgets to match.

**Integration method**: HTTP Event Collector (HEC)—simple token-based authentication over HTTPS.

```yaml
# Supernal configuration for Splunk
destinations:
  - id: splunk-security
    type: splunk-hec
    endpoint: https://splunk.company.com:8088
    token_env: SPLUNK_HEC_TOKEN
```

**References**: [Splunk HEC Documentation](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector)

---

#### Microsoft Sentinel

**The cloud-native choice for Azure shops.**

| Criteria | Rating | Notes |
|----------|--------|-------|
| **Features** | ⭐⭐⭐⭐ | AI-driven threat detection, Kusto queries |
| **Scalability** | ⭐⭐⭐⭐⭐ | Azure-scale, no infrastructure to manage |
| **Ease of Use** | ⭐⭐⭐⭐ | Great if you know Azure |
| **Pricing** | ⭐⭐⭐ | ~$2.76/GB ingested |
| **Integration** | ⭐⭐⭐⭐ | Native Office 365/Azure, growing 3rd party |

**Best for**: Organizations already invested in Microsoft/Azure ecosystem.

**Integration method**: Data Collector API with Workspace ID + Shared Key.

**References**: [Microsoft Sentinel Data Connectors](https://learn.microsoft.com/en-us/azure/sentinel/connect-data-sources)

---

#### Google Chronicle

**Google's security analytics platform with massive scale.**

| Criteria | Rating | Notes |
|----------|--------|-------|
| **Features** | ⭐⭐⭐⭐ | Petabyte-scale, 1-year retention included |
| **Scalability** | ⭐⭐⭐⭐⭐ | It's Google—scale is not a problem |
| **Ease of Use** | ⭐⭐⭐ | Google search-like interface |
| **Pricing** | ⭐⭐⭐ | ~$0.50/GB, but complex pricing tiers |
| **Integration** | ⭐⭐⭐⭐ | Strong Google Workspace integration |

**Best for**: Google Cloud customers, especially those with Google Workspace.

**Integration method**: Cloud Logging API with Service Account authentication.

**References**: [Google Cloud Logging](https://cloud.google.com/logging/docs)

---

### Cloud Observability Platforms

#### Datadog

**The DevOps darling—monitoring, APM, and logs in one.**

| Criteria | Rating | Notes |
|----------|--------|-------|
| **Features** | ⭐⭐⭐⭐ | APM, logs, metrics, synthetics in one |
| **Scalability** | ⭐⭐⭐⭐ | Cloud-native, scales well |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | Best-in-class UX |
| **Pricing** | ⭐⭐⭐ | ~$0.10/GB indexed (but watch host costs) |
| **Integration** | ⭐⭐⭐⭐⭐ | 600+ integrations |

**Best for**: DevOps teams who want one platform for everything.

**Gotcha**: Pricing seems cheap until you add APM ($31/host), infrastructure ($15/host), and other modules. Read the fine print.

**Integration method**: Logs API with API Key.

**References**: [Datadog Logs API](https://docs.datadoghq.com/api/latest/logs/)

---

#### New Relic

**Full-stack observability with a generous free tier.**

| Criteria | Rating | Notes |
|----------|--------|-------|
| **Features** | ⭐⭐⭐⭐ | APM, logs, infrastructure, browser |
| **Scalability** | ⭐⭐⭐⭐ | Cloud-scale |
| **Ease of Use** | ⭐⭐⭐⭐ | Good UX, NRQL is powerful |
| **Pricing** | ⭐⭐⭐⭐ | 100GB/month free, ~$0.30/GB after |
| **Integration** | ⭐⭐⭐⭐ | OpenTelemetry native |

**Best for**: Teams wanting observability without massive upfront commitment.

**Integration method**: Log API or OpenTelemetry (OTLP).

---

### Open Source / Self-Hosted

#### Elastic Security (ELK Stack)

**The most popular open-source logging platform.**

| Criteria | Rating | Notes |
|----------|--------|-------|
| **Features** | ⭐⭐⭐⭐ | Search, visualize, alert, SIEM |
| **Scalability** | ⭐⭐⭐⭐ | Scales with hardware investment |
| **Ease of Use** | ⭐⭐⭐ | Kibana is great, ops can be complex |
| **Pricing** | ⭐⭐⭐⭐⭐ | Free (self-hosted) or Elastic Cloud |
| **Integration** | ⭐⭐⭐⭐⭐ | Beats, Logstash, OpenTelemetry |

**Best for**: Teams with ops expertise who want control and no vendor lock-in.

**Consideration**: Self-hosting requires cluster management expertise. Elastic Cloud removes that burden but adds cost.

**Integration method**: Elasticsearch API with API Key or Basic Auth.

**References**: [Elastic Common Schema (ECS)](https://www.elastic.co/guide/en/ecs/current/index.html)

---

#### Grafana Stack (Loki + Tempo)

**Our recommended starting point—powerful, free, and flexible.**

| Criteria | Rating | Notes |
|----------|--------|-------|
| **Features** | ⭐⭐⭐⭐ | Logs (Loki), traces (Tempo), metrics (Prometheus) |
| **Scalability** | ⭐⭐⭐⭐ | Object storage backend scales well |
| **Ease of Use** | ⭐⭐⭐⭐ | Grafana dashboards are excellent |
| **Pricing** | ⭐⭐⭐⭐⭐ | Free self-hosted, Cloud has generous free tier |
| **Integration** | ⭐⭐⭐⭐⭐ | OpenTelemetry native, works with everything |

**Best for**: Teams starting out, budget-conscious orgs, or anyone who wants to avoid vendor lock-in.

**Why we chose this for Supernal**: Grafana Cloud's free tier (50GB logs, 50GB traces per month) covers most small-to-medium teams. When you need enterprise SIEM, you can forward the same data to Splunk/Datadog without changing anything.

**Integration method**: OpenTelemetry (OTLP) or Loki Push API.

**References**: [Grafana Loki](https://grafana.com/oss/loki/), [Grafana Tempo](https://grafana.com/oss/tempo/)

---

## Pricing Reality Check

Let's be honest about costs. Here's what you'll actually pay:

| Platform | Ingestion | Storage | 10GB/day Cost |
|----------|-----------|---------|---------------|
| **Splunk** | $150-300/GB/day | Included | ~$45,000/year |
| **Datadog** | $0.10/GB | Included (15d) | ~$365/year + hosts |
| **New Relic** | $0.30/GB (after 100GB free) | Included | ~$1,095/year |
| **Elastic Cloud** | $0.95/GB | ~$0.02/GB/mo | ~$3,470/year |
| **Grafana Cloud** | 50GB/mo free | 14d retention | **$0** (under 50GB) |
| **AWS CloudWatch** | $0.50/GB | $0.03/GB/mo | ~$1,825/year |
| **Self-hosted Grafana** | $0 | Infrastructure cost | ~$500-2000/year (servers) |

**The uncomfortable truth**: Enterprise SIEM is expensive because it works. But you don't always need the full power of Splunk for every use case.

## The OpenTelemetry Revolution

Here's the game-changer: **OpenTelemetry (OTLP)** has become the universal standard for logs, traces, and metrics.

Why this matters:
- **Write once, send anywhere**: Instrument your code with OpenTelemetry, forward to any backend
- **No vendor lock-in**: Switch from Grafana to Datadog without changing application code
- **Future-proof**: Every major platform now supports OTLP

```yaml
# OpenTelemetry can forward to ANY of these
exporters:
  - otlp/grafana   # Grafana Cloud
  - otlp/datadog   # Datadog
  - otlp/newrelic  # New Relic
  - splunk_hec     # Splunk
  - elasticsearch  # Elastic
```

**References**: [OpenTelemetry Specification](https://opentelemetry.io/docs/specs/)

## How Supernal Coding Fits In

We built Supernal Coding's log forwarding with one principle: **You choose your SIEM, we'll send your logs there.**

### What We Do

1. **Unified Log Collection**: All Supernal events (CLI, Dashboard, API, Workers) emit structured logs
2. **OpenTelemetry Native**: OTLP is our primary export format
3. **Multi-Destination Routing**: Send different log types to different destinations
4. **Compliance-Ready**: ISO 27001 (A.8.15), SOC 2 (CC7.2) compliant event schema

### Configuration Example

```yaml
# supernal.yaml
logging:
  forwarding:
    enabled: true
    
    destinations:
      # Free tier: Grafana Cloud for everything
      - id: grafana-cloud
        type: otlp
        endpoint: https://otlp-gateway.grafana.net/otlp
        headers:
          Authorization: "Basic ${GRAFANA_OTLP_TOKEN}"
      
      # When customer requires Splunk
      - id: customer-splunk
        type: splunk-hec
        endpoint: https://splunk.customer.com:8088
        token_env: CUSTOMER_SPLUNK_TOKEN
        filters:
          log_types: [security, compliance]
      
      # Local archive for compliance
      - id: compliance-archive
        type: file
        path: /var/log/supernal/compliance
        rotation:
          max_files: 365  # 1 year retention
```

### Why This Matters for Compliance

When auditors ask "where are your audit logs?", you can answer:
- **Primary**: Grafana Cloud (or your SIEM of choice)
- **Backup**: Local encrypted archive
- **Customer-specific**: Their own SIEM via forwarding

One log schema, multiple destinations, complete flexibility.

## Our Recommendation

### For Startups / Small Teams
**Start with Grafana Cloud free tier.**

- 50GB logs/month is enough for most small teams
- No credit card required
- Upgrade to enterprise SIEM when (if) you need it

### For Mid-Size / Compliance-Heavy
**Grafana Cloud + compliance archive.**

- Use Grafana for day-to-day observability
- Archive compliance events locally (encrypted)
- Add Splunk/Sentinel when customer contracts require it

### For Enterprise
**Multi-destination with OpenTelemetry.**

- Forward to whatever SIEM your security team uses
- Keep a backup destination for redundancy
- Use filters to reduce costs (not everything needs 1-year retention)

## Acceptance Criteria for Evaluating SIEM Platforms

When evaluating platforms for your team, consider:

### Must-Have (P0)
- [ ] **TLS 1.2+ for transport** - Non-negotiable
- [ ] **Structured JSON log support** - For queryability
- [ ] **API-based ingestion** - For automation
- [ ] **Retention period meets compliance** - Usually 1 year minimum
- [ ] **Access control / RBAC** - Who can see what

### Should-Have (P1)
- [ ] **OpenTelemetry (OTLP) support** - Future-proofing
- [ ] **Real-time alerting** - For security events
- [ ] **Query language** - To actually find things
- [ ] **SOC 2 / ISO 27001 attestation** - For enterprise customers
- [ ] **Reasonable pricing at your scale** - Do the math

### Nice-to-Have (P2)
- [ ] **ML/AI anomaly detection** - Helpful but not essential
- [ ] **Pre-built dashboards** - Saves time
- [ ] **Self-hosted option** - For data sovereignty
- [ ] **Free tier** - For experimentation

## Conclusion

The SIEM market is crowded and confusing, but the emergence of OpenTelemetry has made one thing clear: you don't have to choose just one platform forever.

**Our approach with Supernal Coding**:
1. Emit structured, compliance-ready logs
2. Use OpenTelemetry as the universal format
3. Forward to whatever destination(s) you need
4. Start cheap (Grafana), scale expensive (Splunk) when required

Your logs, your choice, no lock-in.

---

*Building a compliance-ready development workflow? [Check out Supernal Coding](/docs/introduction) to see how we handle audit trails, test evidence, and requirement traceability.*

## References

- [Splunk HTTP Event Collector](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector)
- [Google Cloud Logging](https://cloud.google.com/logging/docs)
- [Datadog Logs API](https://docs.datadoghq.com/api/latest/logs/)
- [Microsoft Sentinel Data Connectors](https://learn.microsoft.com/en-us/azure/sentinel/connect-data-sources)
- [OpenTelemetry Specification](https://opentelemetry.io/docs/specs/)
- [Elastic Common Schema](https://www.elastic.co/guide/en/ecs/current/index.html)
- [Grafana Loki](https://grafana.com/oss/loki/)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)


