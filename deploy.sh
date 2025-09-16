#!/bin/bash

# Smash & Spice Deployment Script
echo "🚀 Deploying Smash & Spice to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Copy built files to root for GitHub Pages
echo "📁 Copying built files to root directory..."
cp -r dist/* .

# Add all files to git
echo "📁 Adding files to git..."
git add .

# Commit the build
echo "💾 Committing build..."
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Your website will be available at: https://YOUR_USERNAME.github.io/smash-and-spice"
echo ""
echo "📋 Next steps:"
echo "1. Update REPO_OWNER in src/services/githubApi.ts with your GitHub username"
echo "2. Create a GitHub Personal Access Token"
echo "3. Test the admin panel on your live website"
