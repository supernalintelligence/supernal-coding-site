---
title: Build and Test Standards
description: BUILDME.sh, TESTME.sh, and RUNME.sh standards for Supernal Coding
---

Standardized build, test, and run interfaces for consistent development workflows.

## Overview

The `BUILDME.sh` and `TESTME.sh` scripts provide standardized, agent-friendly interfaces for building and testing across all supernal coding projects.

| Script | Purpose |
|--------|---------|
| `BUILDME.sh` | Build and setup the project |
| `TESTME.sh` | Run the test suite |
| `RUNME.sh` | Start development services |

## BUILDME.sh Standard

### Standard Interface

```bash
./BUILDME.sh              # Default build
./BUILDME.sh --help       # Show help and options
./BUILDME.sh --quiet      # Silent mode for automation
./BUILDME.sh --validate   # Build + validation
./BUILDME.sh --clean      # Clean build
./BUILDME.sh --production # Production build
```

### Why Use It

| Without BUILDME.sh | With BUILDME.sh |
|-------------------|-----------------|
| `npm run build` (varies by project) | `./BUILDME.sh` (consistent) |
| Manual error handling | Intelligent error handling |
| No validation | Built-in validation |
| Technology-specific | Technology-agnostic |

## TESTME.sh Standard

### Standard Interface

```bash
./TESTME.sh                    # Run all tests
./TESTME.sh unit              # Unit tests only
./TESTME.sh e2e               # E2E tests only
./TESTME.sh requirements      # Requirements tests
./TESTME.sh specific REQ-011  # Specific requirement
./TESTME.sh map               # Generate test map
./TESTME.sh --help            # Show comprehensive help
```

### Test Map Output

```bash
./TESTME.sh map
```

```
📊 Comprehensive Test Mapping Report
====================================

📈 Summary Statistics
   Test Files: 27
   Test Cases: 156
   Requirements Coverage: 11/29 (38%)

🔧 Test Frameworks
   jest: 25 files
   playwright: 2 files

📋 Requirements Test Coverage
   ✅ REQ-011: 2 test files (comprehensive)
   ✅ REQ-003: 2 test files (comprehensive)
   ❌ REQ-001: 0 test files (none)
```

## RUNME.sh Standard

### Standard Interface

```bash
./RUNME.sh              # Start default dev server
./RUNME.sh --help       # Show help and options
./RUNME.sh --kill       # Kill port conflicts first
./RUNME.sh --port 3001  # Use specific port
```

## Swiss Cheese Quality Model

Multi-layer defense for quality assurance:

### Quality Layers

| Layer | What It Catches | Automation |
|-------|-----------------|------------|
| Requirements | Logic errors, missing features | Manual/AI |
| Tests | Functional bugs, regressions | Automated |
| Pre-commit | Style, basic errors | Automated |
| Pre-push | Build failures, test failures | Automated |
| CI/CD | Integration failures | Automated |
| Reviews | Architecture issues, security | Manual |
| Monitoring | Production issues | Automated |

### Implementation

```bash
sc git-hooks install          # Pre-commit/push hooks
sc workflow setup             # CI/CD workflows
sc monitor enable             # Monitoring setup
sc test validate              # Test quality validation
sc requirement validate       # Requirements validation
```

## Configuration

### BUILDME.sh Environment Variables

```bash
BUILD_MODE=production     # development, testing, production
BUILD_VERBOSE=false       # Enable verbose output
BUILD_CLEAN=false         # Clean build
BUILD_VALIDATE=true       # Run validation
BUILD_TIMEOUT=600         # Build timeout in seconds
```

### TESTME.sh Environment Variables

```bash
COVERAGE_THRESHOLD=80     # Coverage threshold percentage
PARALLEL_TESTS=true       # Enable parallel execution
RUN_E2E=false            # Include E2E tests by default
VERBOSE=false            # Enable verbose output
BAIL_ON_FAILURE=true     # Stop on first failure
TEST_TIMEOUT=300         # Test timeout in seconds
GENERATE_REPORTS=true    # Generate test reports
```

## Agent Integration

### For Building

```bash
if [[ -f "./BUILDME.sh" ]]; then
    ./BUILDME.sh --quiet --validate
else
    npm run build 2>/dev/null || echo "No standard build method"
fi
```

### For Testing

```bash
if [[ -f "./TESTME.sh" ]]; then
    ./TESTME.sh map
    ./TESTME.sh specific REQ-011
else
    npm test 2>/dev/null || echo "No standard test method"
fi
```

## Getting Started

```bash
# Install supernal-coding globally
npm install -g supernal-coding

# Initialize project with standards
sc init --include-build-scripts

# Or copy templates manually
cp templates/mescripts/BUILDME.sh ./
cp templates/mescripts/TESTME.sh ./
cp templates/mescripts/RUNME.sh ./
chmod +x BUILDME.sh TESTME.sh RUNME.sh
```


