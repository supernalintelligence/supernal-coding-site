#!/bin/bash
set -euo pipefail

# BUILDME.sh - Build validation for docs-next
# Ensures the app builds successfully before deployment

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== docs-next Build Validation ==="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "❌ node_modules not found. Run: pnpm install"
  exit 1
fi

# Type check
echo "🔍 Running type check..."
if ! pnpm type-check; then
  echo "❌ Type check failed"
  exit 1
fi
echo "✅ Type check passed"
echo ""

# Build
echo "🏗️  Running production build..."
if ! pnpm build; then
  echo "❌ Build failed"
  exit 1
fi
echo "✅ Build succeeded"
echo ""

# Check for common issues
echo "🔍 Checking for common issues..."

# Check for missing dependencies in imports
echo "  Checking for missing dependencies..."
MISSING_DEPS=0

# Get all imported packages from source files
IMPORTS=$(grep -rh "from ['\"]" components/ app/ lib/ 2>/dev/null | \
  sed -n "s/.*from ['\"]\\([^'\"]*\\)['\"].*/\\1/p" | \
  grep -v "^\\." | \
  grep -v "^@/" | \
  sort -u || true)

for pkg in $IMPORTS; do
  # Extract package name (handle scoped packages)
  if [[ $pkg == @* ]]; then
    PKG_NAME=$(echo "$pkg" | cut -d'/' -f1-2)
  else
    PKG_NAME=$(echo "$pkg" | cut -d'/' -f1)
  fi
  
  # Check if package exists in package.json
  if ! grep -q "\"$PKG_NAME\"" package.json; then
    echo "  ⚠️  Potentially missing dependency: $PKG_NAME (imported as: $pkg)"
    MISSING_DEPS=1
  fi
done

if [ $MISSING_DEPS -eq 0 ]; then
  echo "  ✅ No missing dependencies detected"
else
  echo "  ⚠️  Potential missing dependencies detected (may be false positives)"
fi
echo ""

# Check for unused dependencies
echo "  Checking for potentially unused dependencies..."
UNUSED_COUNT=0
while IFS= read -r dep; do
  # Skip common build tools and next.js itself
  if [[ $dep == "next" ]] || \
     [[ $dep == "react" ]] || \
     [[ $dep == "react-dom" ]] || \
     [[ $dep == "@types/"* ]] || \
     [[ $dep == "typescript" ]] || \
     [[ $dep == "tailwindcss" ]] || \
     [[ $dep == "postcss" ]] || \
     [[ $dep == "autoprefixer" ]]; then
    continue
  fi
  
  # Check if dependency is used anywhere
  if ! grep -rq "$dep" components/ app/ lib/ 2>/dev/null; then
    echo "  ⚠️  Potentially unused: $dep"
    UNUSED_COUNT=$((UNUSED_COUNT + 1))
  fi
done < <(grep -o '"[^"]*":' package.json | grep -v '"scripts"\|"name"\|"version"\|"private"\|"dependencies"\|"devDependencies"' | tr -d '":' || true)

if [ $UNUSED_COUNT -eq 0 ]; then
  echo "  ✅ All dependencies appear to be used"
fi
echo ""

# Build size check
if [ -d ".next" ]; then
  echo "📦 Build output size:"
  du -sh .next
  echo ""
fi

echo "✅ All checks passed!"
exit 0




