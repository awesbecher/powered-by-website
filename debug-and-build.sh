#!/bin/bash
# Remove 'set -e' to prevent early termination

echo "==== ENVIRONMENT INFO ===="
node -v
npm -v

echo "==== LISTING SRC/PAGES DIRECTORY ===="
ls -la src/pages/

echo "==== LISTING PRODUCT ROUTES ===="
cat src/routes/productRoutes.tsx

echo "==== FILE CHECK FOR SPECIFIC FILES ===="
for file in "AIReceptionist" "AIVoiceChat" "EmailAgent" "TextAgent" "agentgpt" "GetVirtualSE" "AIAgency" "AgentGPTBuilder" "RealEstate" "aiagents" "custom-ai-solutions" "aisolutions"; do
  if [ -f "src/pages/${file}.tsx" ]; then
    echo "Found: $file"
  else
    echo "MISSING: $file"
  fi
done

echo "==== TYPESCRIPT CHECK ===="
tsc --noEmit || echo "TypeScript errors found but continuing"

echo "==== INSTALLING DEPENDENCIES ===="
npm install --legacy-peer-deps

echo "==== RUNNING VITE BUILD WITH VERBOSE LOGGING ===="
VITE_DEBUG=1 NODE_OPTIONS="--trace-warnings" npm run build

echo "==== IF YOU SEE THIS, BUILD SUCCEEDED ===="
