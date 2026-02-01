#!/bin/bash
# Deploy script for GitHub Pages
# This builds the site and copies files to root for GitHub Pages deployment

set -e  # Exit on error

echo "🚀 Starting deployment build..."
echo ""

# Step 1: Build the site
echo "📦 Step 1/3: Building site with Jinja2..."
cd "$(dirname "$0")"  # cd to tools/ directory
python3 build.py

if [ $? -eq 0 ]; then
    echo "   ✅ Build successful"
else
    echo "   ❌ Build failed"
    exit 1
fi

echo ""

# Step 2: Copy generated files to root
echo "📋 Step 2/3: Copying files to deployment location..."
cd ..  # Back to root

# Copy main index.html
if [ -f "output/index.html" ]; then
    cp output/index.html index.html
    echo "   ✅ Copied index.html"
else
    echo "   ❌ output/index.html not found"
    exit 1
fi

# Copy pages directory if it exists
if [ -d "output/pages" ]; then
    cp -r output/pages/* pages/ 2>/dev/null || echo "   ℹ️  No pages to copy"
fi

# Note: CSS, images, js are already in place (not regenerated)

echo ""

# Step 3: Show git status
echo "📊 Step 3/3: Git status..."
git status --short

echo ""
echo "✨ Deployment build complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Review changes: git diff"
echo "   2. Stage files: git add index.html tools/"
echo "   3. Commit: git commit -m 'Update site'"
echo "   4. Deploy: git push origin main"
echo ""
echo "🌐 GitHub Pages will automatically deploy your changes!"
