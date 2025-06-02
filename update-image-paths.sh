#!/bin/bash
find ./src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|/lovable-uploads/|/assets/images/|g'
