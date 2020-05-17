#!/bin/bash

./node_modules/.bin/tsc 
sed -i '' 's/.js"/"/g' dist/index.d.ts
sed -i '' 's/module "index.common"/module "buttercup"/' dist/index.d.ts
sed -i '' 's/module "index.web"/module "buttercup\/web"/' dist/index.d.ts
sed -i '' 's/module "index.node"/module "buttercup\/node"/' dist/index.d.ts
