---
title: Requirement Workflow Example
description: Complete walkthrough of the requirement lifecycle
---

# Requirement Workflow Example

This example walks through the complete lifecycle of a requirement from creation to completion.

## Scenario

We'll implement a "User Profile Display" feature for a web application.

## Step 1: Create the Requirement

```bash
sc requirement new "User Profile Display" \
  --epic=user-management \
  --priority=high \
  --request-type=feature
```

Output:
```
✅ Created requirement REQ-042
   Path: docs/requirements/req-042-user-profile-display.md
```

## Step 2: Define the Gherkin Specification

Edit the generated file:

```gherkin
Feature: User Profile Display
  As a logged-in user
  I want to view my profile information
  So that I can verify my account details

  Background:
    Given I am logged in as "testuser@example.com"

  Scenario: View profile page
    When I navigate to "/profile"
    Then I should see my display name
    And I should see my email address
    And I should see my account creation date

  Scenario: Profile shows avatar
    Given I have uploaded a profile picture
    When I navigate to "/profile"
    Then I should see my profile picture

  Scenario: Profile handles missing avatar
    Given I have not uploaded a profile picture
    When I navigate to "/profile"
    Then I should see the default avatar
```

## Step 3: Validate the Requirement

```bash
sc requirement validate REQ-042
```

Output:
```
✅ REQ-042 validation passed
   - Has title: User Profile Display
   - Has scenarios: 3
   - Has acceptance criteria: Yes
   - Linked to epic: user-management
```

## Step 4: Generate Test Framework

```bash
sc requirement generate-tests REQ-042
```

Creates test stubs:
```typescript
// tests/features/req-042-user-profile-display.test.ts
import { describe, it, expect } from 'vitest';

describe('REQ-042: User Profile Display', () => {
  describe('View profile page', () => {
    it('should show display name', async () => {
      // TODO: Implement
    });

    it('should show email address', async () => {
      // TODO: Implement
    });

    it('should show account creation date', async () => {
      // TODO: Implement
    });
  });

  describe('Profile shows avatar', () => {
    it('should show profile picture when uploaded', async () => {
      // TODO: Implement
    });
  });

  describe('Profile handles missing avatar', () => {
    it('should show default avatar when none uploaded', async () => {
      // TODO: Implement
    });
  });
});
```

## Step 5: Create Feature Branch

```bash
sc git-smart branch --branch REQ-042
```

Output:
```
✅ Created branch: feature/req-042-user-profile-display
   Switched to new branch
```

## Step 6: Implement the Feature

```typescript
// src/components/UserProfile.tsx
import { User } from '@/types';
import { Avatar } from '@/components/Avatar';
import { formatDate } from '@/utils/date';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="profile-container">
      <Avatar 
        src={user.avatarUrl} 
        fallback={user.initials}
      />
      <h1>{user.displayName}</h1>
      <p className="email">{user.email}</p>
      <p className="joined">
        Member since {formatDate(user.createdAt)}
      </p>
    </div>
  );
}
```

## Step 7: Implement Tests

```typescript
// tests/features/req-042-user-profile-display.test.ts
import { render, screen } from '@testing-library/react';
import { UserProfile } from '@/components/UserProfile';

const mockUser = {
  displayName: 'Test User',
  email: 'testuser@example.com',
  createdAt: new Date('2024-01-15'),
  avatarUrl: null,
  initials: 'TU'
};

describe('REQ-042: User Profile Display', () => {
  describe('View profile page', () => {
    it('should show display name', () => {
      render(<UserProfile user={mockUser} />);
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    it('should show email address', () => {
      render(<UserProfile user={mockUser} />);
      expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
    });

    it('should show account creation date', () => {
      render(<UserProfile user={mockUser} />);
      expect(screen.getByText(/Member since/)).toBeInTheDocument();
    });
  });

  describe('Profile handles missing avatar', () => {
    it('should show default avatar when none uploaded', () => {
      render(<UserProfile user={mockUser} />);
      expect(screen.getByText('TU')).toBeInTheDocument();
    });
  });
});
```

## Step 8: Commit with Traceability

```bash
git add src/components/UserProfile.tsx tests/features/req-042-user-profile-display.test.ts
git commit -m "REQ-042: Implement user profile display component"
```

## Step 9: Update Requirement Status

```bash
sc requirement update REQ-042 --status=done
```

## Step 10: Merge to Main

```bash
sc git-smart merge --push --delete-local
```

Output:
```
✅ Merged feature/req-042-user-profile-display into main
   Pushed to origin
   Deleted local branch
```

## Summary

This example demonstrated:

1. **Creating** a requirement with proper metadata
2. **Defining** testable Gherkin specifications
3. **Validating** requirement quality
4. **Generating** test framework from scenarios
5. **Implementing** code with requirement traceability
6. **Testing** against the specification
7. **Committing** with requirement reference
8. **Completing** the requirement lifecycle

