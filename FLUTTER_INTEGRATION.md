# Flutter Web App Integration Guide

## 📱 Overview

Your Flutter app is deployed at: `https://puzzleroyale.app/app/`

## 🔄 Deployment Workflow

### When you make changes to your Flutter app:

1. **Build the Flutter app:**
   ```powershell
   cd ..\puzzle_app
   flutter build web --release --base-href /app/
   ```

2. **Copy to website repo:**
   ```powershell
   Copy-Item -Path ".\build\web\*" -Destination "..\puzzleroyale_website\app\" -Recurse -Force
   ```

3. **Commit and push:**
   ```powershell
   cd ..\puzzleroyale_website
   git add app/
   git commit -m "Update Flutter app build"
   git push origin main
   ```

4. **Automatic deployment:**
   - Cloudflare Pages will automatically deploy your changes
   - Usually takes 30-60 seconds

## 🛠️ Quick Update Script

Save this as `update-app.ps1` in your puzzle_app directory:

```powershell
# Build Flutter app
flutter build web --release --base-href /app/

# Copy to website repo
Copy-Item -Path ".\build\web\*" -Destination "..\puzzleroyale_website\app\" -Recurse -Force

# Navigate to website repo
cd ..\puzzleroyale_website

# Commit and push
git add app/
git commit -m "Update Flutter app - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin main

Write-Host "✅ Flutter app updated and deployed!" -ForegroundColor Green
```

Run it with: `.\update-app.ps1`

## 📂 Repository Structure

```
puzzleroyale_website/
├── index.html              # Marketing homepage
├── privacy/                # Legal pages
│   └── index.html
├── app/                    # Flutter Web app (built files)
│   ├── index.html
│   ├── main.dart.js
│   ├── flutter.js
│   ├── assets/
│   └── ...
├── css/                    # Marketing site styles
└── js/                     # Marketing site scripts
```

## 🔗 URL Structure

- `puzzleroyale.app/` → Marketing homepage
- `puzzleroyale.app/app/` → Flutter Web app
- `puzzleroyale.app/privacy/` → Legal pages

## ⚠️ Important Notes

1. **Base HREF**: Always build with `--base-href /app/` so assets load correctly
2. **Automatic Deployment**: Every push to main triggers Cloudflare Pages deployment
3. **Build Directory**: The `/app` folder contains compiled Flutter code (not source)
4. **Source Control**: Keep your Flutter source in the `puzzle_app` repo

## 🚀 Future Enhancements

### Option 1: Automated Build with GitHub Actions
- Set up a GitHub Action to build Flutter on every push
- Automatically commit build to website repo

### Option 2: Cloudflare Workers for Routing
- Use Workers to route between static site and Flutter app
- Enables advanced features like A/B testing

### Option 3: Monorepo Approach
- Move Flutter source into website repo
- Single deployment with build step

## 🧪 Testing Locally

1. **Test marketing site:**
   ```powershell
   cd puzzleroyale_website
   python -m http.server 8000
   ```
   Visit: `http://localhost:8000`

2. **Test Flutter app:**
   Visit: `http://localhost:8000/app/`

## 📊 Performance Tips

1. **Optimize build size:**
   ```powershell
   flutter build web --release --base-href /app/ --web-renderer canvaskit
   ```

2. **Analyze bundle:**
   ```powershell
   flutter build web --release --analyze-size
   ```

3. **Use deferred loading** in your Flutter code for large features

---

**Questions?** Check the main README.md or CLOUDFLARE_DEPLOYMENT.md
