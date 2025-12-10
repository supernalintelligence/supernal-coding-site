#!/bin/bash
set -euo pipefail

# TESTME.sh - Test suite for docs-next
# Runs all validation checks before allowing commits

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== docs-next Test Suite ==="
echo ""

EXIT_CODE=0

# 1. Dependency check (fast, fails early)
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "❌ node_modules not found. Run: pnpm install"
  exit 1
fi
echo "✅ Dependencies installed"
echo ""

# 2. Lint check
echo "🔍 Running linter..."
if ! pnpm lint; then
  echo "❌ Lint failed"
  EXIT_CODE=1
else
  echo "✅ Lint passed"
fi
echo ""

# 3. Type check
echo "🔍 Running type check..."
if ! pnpm type-check; then
  echo "❌ Type check failed"
  EXIT_CODE=1
else
  echo "✅ Type check passed"
fi
echo ""

# 4. Build check (most comprehensive)
echo "🏗️  Running build check..."
if ! ./BUILDME.sh; then
  echo "❌ Build check failed"
  EXIT_CODE=1
else
  echo "✅ Build check passed"
fi
echo ""

# 5. File structure validation
echo "📁 Checking file structure..."
REQUIRED_FILES=(
  "package.json"
  "next.config.js"
  "tsconfig.json"
  "tailwind.config.ts"
  "app/layout.tsx"
  "app/page.tsx"
)

MISSING_FILES=0
for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "  ❌ Missing required file: $file"
    MISSING_FILES=1
    EXIT_CODE=1
  fi
done

if [ $MISSING_FILES -eq 0 ]; then
  echo "✅ All required files present"
fi
echo ""

# Summary
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ All tests passed!"
else
  echo "❌ Some tests failed"
fi

exit $EXIT_CODE




