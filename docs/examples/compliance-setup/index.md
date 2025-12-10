---
title: Compliance Setup Example
description: Setting up compliance frameworks for a regulated application
---

# Compliance Setup Example

This example demonstrates setting up HIPAA and SOC2 compliance for a healthcare application.

## Scenario

We're building a patient data management system that requires:
- HIPAA compliance for healthcare data
- SOC2 compliance for security practices

## Step 1: Initialize with Compliance Frameworks

```bash
sc init --standard --compliance-frameworks hipaa,soc2
```

This creates:
```
docs/
├── compliance/
│   ├── frameworks/
│   │   ├── hipaa/
│   │   │   ├── index.md
│   │   │   ├── access-controls.md
│   │   │   ├── audit-logging.md
│   │   │   ├── encryption.md
│   │   │   └── breach-notification.md
│   │   └── soc2/
│   │       ├── index.md
│   │       ├── security.md
│   │       ├── availability.md
│   │       └── confidentiality.md
│   └── evidence/
└── requirements/
    └── compliance/
```

## Step 2: Review Compliance Requirements

Each framework generates requirements that must be met:

```bash
sc compliance status
```

Output:
```
📋 Compliance Status

HIPAA (Healthcare)
├── ✅ Access Controls       - Configured
├── ⚠️  Audit Logging        - Partial (need encryption)
├── ❌ Encryption at Rest   - Not configured
├── ❌ Encryption in Transit - Not configured
└── ⚠️  Breach Notification  - Policy needed

SOC2 (Security)
├── ✅ Security Policies    - In place
├── ⚠️  Access Management   - MFA needed
├── ✅ Change Management    - Git hooks active
└── ⚠️  Monitoring          - Partial coverage
```

## Step 3: Implement Access Controls

Create access control implementation:

```typescript
// src/auth/accessControl.ts
import { User, Resource, Permission } from '@/types';
import { auditLog } from '@/audit';

export async function checkAccess(
  user: User,
  resource: Resource,
  permission: Permission
): Promise<boolean> {
  // Log all access attempts (HIPAA requirement)
  await auditLog.record({
    type: 'ACCESS_CHECK',
    userId: user.id,
    resourceId: resource.id,
    permission,
    timestamp: new Date(),
  });

  // Check role-based permissions
  const hasPermission = user.roles.some(role => 
    role.permissions.includes(permission) &&
    role.resourceTypes.includes(resource.type)
  );

  // Log result
  await auditLog.record({
    type: 'ACCESS_RESULT',
    userId: user.id,
    resourceId: resource.id,
    permission,
    granted: hasPermission,
    timestamp: new Date(),
  });

  return hasPermission;
}
```

## Step 4: Configure Audit Logging

```typescript
// src/audit/logger.ts
import { AuditEvent } from '@/types';
import { encrypt } from '@/crypto';

export const auditLog = {
  async record(event: AuditEvent): Promise<void> {
    // Encrypt sensitive data before storage (HIPAA)
    const encryptedEvent = {
      ...event,
      metadata: event.metadata 
        ? await encrypt(JSON.stringify(event.metadata))
        : undefined,
    };

    // Store in tamper-evident log (SOC2)
    await db.auditEvents.create({
      data: encryptedEvent,
      // Include hash chain for tamper evidence
      previousHash: await this.getLastEventHash(),
    });
  },

  async getLastEventHash(): Promise<string> {
    const lastEvent = await db.auditEvents.findFirst({
      orderBy: { timestamp: 'desc' },
    });
    return lastEvent?.hash ?? 'GENESIS';
  },
};
```

## Step 5: Configure Encryption

```yaml
# supernal.yaml
compliance:
  frameworks:
    - hipaa
    - soc2
  
  encryption:
    at_rest:
      enabled: true
      algorithm: AES-256-GCM
      key_rotation: 90d
    in_transit:
      enabled: true
      min_tls_version: "1.3"
  
  audit:
    retention: 7y  # HIPAA requires 6 years minimum
    encryption: true
    tamper_evident: true
```

## Step 6: Create Compliance Tests

```typescript
// tests/compliance/hipaa-access-controls.test.ts
import { checkAccess } from '@/auth/accessControl';
import { auditLog } from '@/audit';

describe('HIPAA: Access Controls', () => {
  it('should log all access attempts', async () => {
    const logSpy = vi.spyOn(auditLog, 'record');
    
    await checkAccess(testUser, patientRecord, 'READ');
    
    expect(logSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ACCESS_CHECK',
        userId: testUser.id,
      })
    );
  });

  it('should deny access without proper role', async () => {
    const result = await checkAccess(
      userWithoutMedicalRole, 
      patientRecord, 
      'READ'
    );
    
    expect(result).toBe(false);
  });

  it('should allow access with proper role', async () => {
    const result = await checkAccess(
      physician, 
      patientRecord, 
      'READ'
    );
    
    expect(result).toBe(true);
  });
});
```

## Step 7: Generate Compliance Evidence

```bash
sc test run --evidence
```

Creates:
```
docs/compliance/evidence/
├── 2024-12-10T14-30-00/
│   ├── test-results.json
│   ├── coverage-report.html
│   ├── audit-log-sample.json
│   └── signature.json
```

## Step 8: Verify Compliance Status

```bash
sc compliance status --detailed
```

Output:
```
📋 Compliance Status (Detailed)

HIPAA Compliance: 85% ✅
├── §164.312(a)(1) Access Controls      ✅ Implemented
├── §164.312(b) Audit Controls          ✅ Implemented
├── §164.312(c)(1) Integrity Controls   ✅ Implemented
├── §164.312(d) Authentication          ✅ Implemented
├── §164.312(e)(1) Transmission Security ✅ Configured
└── §164.308(a)(6) Breach Notification  ⚠️  Policy document needed

SOC2 Compliance: 90% ✅
├── CC6.1 Security Policies             ✅ In place
├── CC6.2 Access Controls               ✅ Implemented
├── CC6.3 Authentication                ✅ MFA enabled
├── CC7.1 Change Management             ✅ Git hooks active
├── CC7.2 Testing                       ✅ Evidence collected
└── CC8.1 Incident Response             ✅ Procedures documented

Evidence Generated: 12 artifacts
Last Audit: 2024-12-10
```

## Summary

This example demonstrated:

1. **Initializing** with compliance frameworks
2. **Reviewing** compliance requirements
3. **Implementing** access controls with audit logging
4. **Configuring** encryption for data protection
5. **Creating** compliance-specific tests
6. **Generating** audit evidence
7. **Verifying** compliance status

