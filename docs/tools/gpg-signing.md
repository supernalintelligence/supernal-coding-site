---
title: GPG Signing
description: Configure GPG signing for verified commits
sidebar_position: 4
---

# GPG Signing

GPG signing provides cryptographic verification of commits, ensuring authenticity and non-repudiation for compliance-critical codebases.

## Why Sign Commits?

### Compliance Requirements

Many compliance frameworks require verified authorship:

- **FDA 21 CFR Part 11**: Electronic signatures
- **SOC2**: Access control verification
- **ISO 13485**: Traceability requirements

### Security Benefits

- **Authenticity**: Proves who made the commit
- **Integrity**: Detects tampering
- **Non-repudiation**: Cannot deny authorship

## Quick Setup

### 1. Check Existing Keys

```bash
sc gpg status
```

### 2. Generate a New Key

```bash
sc gpg setup
```

This interactively guides you through:
- Key generation
- Git configuration
- GitHub/GitLab integration

### 3. Configure Signing

```bash
# Enable signing for all commits
git config --global commit.gpgsign true

# Set your signing key
git config --global user.signingkey YOUR_KEY_ID
```

## Manual Setup

### Generate GPG Key

```bash
# Generate a new key pair
gpg --full-generate-key

# Choose:
# - RSA and RSA (default)
# - 4096 bits
# - Key does not expire (or set expiration)
# - Your real name and email
```

### Find Your Key ID

```bash
gpg --list-secret-keys --keyid-format=long

# Output shows:
# sec   rsa4096/XXXXXXXXXXXXXXXX 2024-01-01
#       XXXXXXXXXXXXXXXX is your key ID
```

### Configure Git

```bash
# Set your signing key
git config --global user.signingkey XXXXXXXXXXXXXXXX

# Enable signing by default
git config --global commit.gpgsign true

# Configure GPG program (if needed)
git config --global gpg.program gpg
```

### Export Public Key

```bash
# Export for GitHub/GitLab
gpg --armor --export your.email@example.com
```

Copy the output and add to your Git hosting provider.

## Platform Setup

### GitHub

1. Go to Settings → SSH and GPG keys
2. Click "New GPG key"
3. Paste your public key
4. Save

### GitLab

1. Go to User Settings → GPG Keys
2. Paste your public key
3. Click "Add key"

### Bitbucket

1. Personal settings → GPG keys
2. Add key
3. Paste public key

## Verification

### Check Signed Commits

```bash
# Show signature info
git log --show-signature

# Verify specific commit
git verify-commit HEAD
```

### GitHub Verified Badge

Signed commits show a "Verified" badge on GitHub when:
- GPG key is added to your account
- Email in key matches commit email
- Key is not expired or revoked

## Troubleshooting

### "gpg failed to sign the data"

```bash
# Test GPG
echo "test" | gpg --clearsign

# If TTY issues
export GPG_TTY=$(tty)
echo 'export GPG_TTY=$(tty)' >> ~/.zshrc
```

### "secret key not available"

```bash
# List available keys
gpg --list-secret-keys

# Check key ID in git config
git config user.signingkey
```

### macOS: "Inappropriate ioctl for device"

```bash
# Install pinentry-mac
brew install pinentry-mac

# Configure GPG agent
echo "pinentry-program $(which pinentry-mac)" >> ~/.gnupg/gpg-agent.conf

# Restart agent
gpgconf --kill gpg-agent
```

### Key Expired

```bash
# Edit key
gpg --edit-key YOUR_KEY_ID

# At gpg> prompt:
expire
# Set new expiration
save
```

## CI/CD Integration

### GitHub Actions

```yaml
jobs:
  sign:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Import GPG key
        uses: crazy-max/ghaction-import-gpg@v6
        with:
          gpg_private_key: ${{ secrets.GPG_PRIVATE_KEY }}
          passphrase: ${{ secrets.GPG_PASSPHRASE }}
          git_user_signingkey: true
          git_commit_gpgsign: true
```

### Environment Variables

```bash
# For automated signing
export GPG_TTY=$(tty)
export GNUPGHOME=/path/to/.gnupg
```

## Best Practices

1. **Use Strong Keys**: 4096-bit RSA minimum
2. **Set Expiration**: 1-2 years, then rotate
3. **Backup Keys**: Store securely offline
4. **Use Passphrases**: Protect private key
5. **Regular Rotation**: Update keys periodically
6. **Revocation Certificate**: Generate and store safely

## Supernal Coding Integration

### Automatic Verification

```bash
# Check signing status
sc gpg status

# Verify all recent commits
sc gpg verify --commits=10
```

### Compliance Reports

GPG signing information is included in compliance reports:

```bash
sc compliance report --include-signatures
```

