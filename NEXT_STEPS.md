# 🚀 Next Steps: Deploy Flutter App to Cloudflare Pages

## ✅ What We Just Did

1. ✅ Created deployment configuration for Flutter app
2. ✅ Added `_redirects` file for client-side routing
3. ✅ Updated Firebase Android app ID to match your package
4. ✅ Committed everything to GitHub
5. ✅ Added routing configuration to marketing site

## 📋 What You Need to Do Now

### Step 1: Create Cloudflare Pages Project for Flutter

1. **Go to**: https://dash.cloudflare.com
2. **Navigate to**: "Workers & Pages" (left sidebar)
3. **Click the "Pages" tab** at the top
4. **Click**: "Create application" or "Create a project"
5. **Click**: "Connect to Git"
6. **Select**: GitHub
7. **Choose repository**: `SeanMcCarren/puzzle_app`
8. **Click**: "Begin setup"

### Step 2: Configure Build Settings

**Project name**: `puzzleroyale-app` (or whatever you prefer)
**Production branch**: `main`

**Build configuration**:
```
Framework preset: None (Flutter not in list, we'll configure manually)
Build command: flutter build web --release
Build output directory: build/web
Root directory: (leave empty)
```

**Environment variables** (REQUIRED for Flutter):

Click "Add variable" and add:
```
Name: FLUTTER_VERSION
Value: stable
```

Or for a specific version:
```
Name: FLUTTER_VERSION
Value: 3.24.0
```

Optional but recommended:
```
Name: FLUTTER_WEB_CANVASKIT_URL
Value: auto
```

**Click**: "Save and Deploy"

### Step 3: Wait for Build to Complete

- First build takes ~3-5 minutes
- You'll see a URL like: `https://puzzleroyale-app.pages.dev`
- Test it to make sure your app loads!

### Step 4: Update the Redirect URL

After deployment, you'll get a Cloudflare Pages URL. We need to update the redirect:

1. **Copy** your Cloudflare Pages URL (e.g., `https://puzzleroyale-app.pages.dev`)

2. **Open** `puzzleroyale_website/_redirects`

3. **Replace** the placeholder URL:
   ```
   # Change this line:
   /app/* https://puzzleroyale-app.pages.dev/:splat 200
   
   # To your actual URL (if different):
   /app/* https://YOUR-ACTUAL-PROJECT-NAME.pages.dev/:splat 200
   ```

4. **Commit and push** the update

### Step 5: Test Everything

Once both deployments are complete:

1. **Marketing site**: https://puzzleroyale.app/ ✅
2. **Privacy page**: https://puzzleroyale.app/privacy/ ✅
3. **Flutter app**: https://puzzleroyale.app/app/ ✅ (redirects to Cloudflare Pages)

## 🎯 Benefits of This Setup

✅ **No API keys in git** - Build happens on Cloudflare's secure servers
✅ **Automatic deployments** - Push to git = automatic deploy
✅ **Preview deployments** - Every PR gets a preview URL
✅ **Fast global CDN** - Both sites served from Cloudflare's edge network
✅ **Separate concerns** - Marketing site and app deployed independently

## 🔧 Troubleshooting

### Build fails with "Flutter not found"

Make sure you added the environment variable:
```
FLUTTER_VERSION=stable
```
This tells Cloudflare to install Flutter before building.

### App loads but 404 on refresh

The `web/_redirects` file we added should fix this. Make sure it was included in the build.

### Assets not loading (404 errors)

Check the browser console. If you see errors about base href, the build command might need adjustment.

## 📊 Future Workflow

**When you update your Flutter app**:
1. Make changes in `puzzle_app` repository
2. Commit and push to GitHub
3. Cloudflare Pages automatically builds and deploys
4. Live in ~2-3 minutes

**When you update your marketing site**:
1. Make changes in `puzzleroyale_website` repository
2. Commit and push to GitHub
3. Cloudflare Pages automatically deploys
4. Live in ~30 seconds

---

**Ready?** Follow the steps above and let me know when you've completed the Cloudflare Pages setup! 🚀
