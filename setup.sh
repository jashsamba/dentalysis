#!/usr/bin/env bash
# Clean installation
rm -rf node_modules
rm -f package-lock.json

# Install with legacy peer deps
npm install --legacy-peer-deps 