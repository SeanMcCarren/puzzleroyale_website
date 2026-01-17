# Flutter Web App Integration Guide

## ⚠️ IMPORTANT: Separate Repository Approach

**DO NOT commit Flutter build files to this repository!** 

Flutter compiled files contain API keys and sensitive configuration. Instead, we deploy your Flutter app using Cloudflare Pages with a separate project configuration.

## 📱 Overview

Your Flutter app is deployed at: `https://app.puzzleroyale.app/`

## 🏗️ Deployment Architecture

We use **two separate Cloudflare Pages projects**:
1. **puzzleroyale-marketing** (this repo) - Static marketing site at `puzzleroyale.app`
2. **puzzleroyale-app** (puzzle_app repo) - Flutter app at `app.puzzleroyale.app` (subdomain)

## 🔄 Deployment Workflow

### When you make changes to your Flutter app:

1. **Build the Flutter app:**
   ```powershell
   cd ..\puzzle_app
   flutter build web --release --base-href /
   ```

2. **Commit and push to puzzle_app repo:**
   ```powershell
   git add .
   git commit -m "Update Flutter app"
   git push origin main
   ```

3. **Automatic deployment:**
   - Cloudflare Pages will automatically build and deploy to `app.puzzleroyale.app`
   - Usually takes 1-2 minutes

## 🛠️ Quick Update Script

Save this as `deploy-app.ps1` in your puzzle_app directory:

```powershell
# Build Flutter app
flutter build web --release --base-href /

# Commit and push
git add .
git commit -m "Update Flutter app - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin main

Write-Host "✅ Flutter app pushed! Cloudflare will auto-deploy to app.puzzleroyale.app" -ForegroundColor Green
```

Run it with: `.\deploy-app.ps1`

## 📂 Repository Structure

**puzzleroyale_website/** (this repo - marketing site)
```
puzzleroyale_website/
├── index.html              # Marketing homepage
├── privacy/                # Legal pages
│   └── index.html
├── delete-account/         # Account deletion page
│   └── index.html
├── css/                    # Marketing site styles
└── js/                     # Marketing site scripts
```

**puzzle_app/** (separate repo - Flutter app)
```
puzzle_app/
├── lib/                    # Flutter source code
├── web/                    # Web-specific files
├── pubspec.yaml
└── ...
```

## 🔗 URL Structure

- `puzzleroyale.app/` → Marketing homepage
- `app.puzzleroyale.app/` → Flutter Web app (subdomain)
- `puzzleroyale.app/privacy/` → Legal pages
- `puzzleroyale.app/delete-account/` → Account deletion page

## ⚠️ Important Notes

1. **Base HREF**: Build with `--base-href /` since app is at root of subdomain
2. **Automatic Deployment**: Every push to puzzle_app main triggers Cloudflare Pages deployment
3. **Separate Repos**: Marketing site and Flutter app are in separate repositories
4. **DNS**: The `app.` subdomain is configured in Cloudflare to point to the puzzle_app Pages project

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
   ```powershell
   cd puzzle_app
   flutter run -d chrome
   ```

## 📊 Performance Tips

1. **Optimize build size:**
   ```powershell
   flutter build web --release --base-href / --web-renderer canvaskit
   ```

2. **Analyze bundle:**
   ```powershell
   flutter build web --release --analyze-size
   ```

3. **Use deferred loading** in your Flutter code for large features

---

**Questions?** Check the main README.md or CLOUDFLARE_DEPLOYMENT.md
