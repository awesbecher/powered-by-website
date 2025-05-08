#!/bin/bash
set -e

echo "==== ENVIRONMENT INFO ===="
node -v
npm -v

echo "==== LISTING SRC/PAGES DIRECTORY ===="
ls -la src/pages/

echo "==== CHECKING IMPORT STATEMENTS ===="
# Find all import statements in the src directory
grep -r "import.*from.*@/pages" src/ --include="*.tsx" --include="*.ts" || echo "No import patterns found"

echo "==== INSTALLING DEPENDENCIES ===="
npm install --legacy-peer-deps

echo "==== RUNNING BUILD WITH VERBOSE LOGGING ===="
npm run build

echo "==== IF YOU SEE THIS, BUILD SUCCEEDED ===="
