#!/usr/bin/env bash
# Test installation script for Dentalysis

# Print banner
echo "===================================="
echo "DENTALYSIS TEST INSTALLATION SCRIPT"
echo "===================================="
echo

# Run clean installation
echo "Step 1: Running clean installation..."
bash setup.sh
if [ $? -ne 0 ]; then
    echo "❌ Clean installation failed"
    exit 1
else
    echo "✅ Clean installation succeeded"
fi

# Build the application
echo
echo "Step 2: Building the application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
else
    echo "✅ Build succeeded"
fi

# Run linting
echo
echo "Step 3: Running linting..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed (some errors may be expected)"
    echo "   Review errors to determine if they're critical"
else
    echo "✅ Linting succeeded"
fi

# Start dev server
echo
echo "Step 4: Starting development server..."
echo "   Press Ctrl+C after confirming server starts correctly"
npm run dev 