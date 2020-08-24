#!/bin/bash

echo "Moving typings for web..."

# Kill existing directories
find ./web -type d -maxdepth 1 ! -path ./web ! -path ./web/source -print0 | xargs -0 rm -r

# Kill existing .ts files
find ./web -type f -name "*.d.ts" -maxdepth 1 -delete

# # Move source dir contents up
mv ./web/source/* ./web/
rm -r ./web/source

# # Rename index definitions
mv ./web/index.web.d.ts ./web/index.d.ts
