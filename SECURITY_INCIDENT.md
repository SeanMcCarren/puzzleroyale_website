# 🚨 API Key Security Incident - Action Plan

## Incident Summary

**Date**: October 5, 2025  
**Issue**: Google API key exposed in public GitHub repository  
**Key**: `AIzaSyC3H_rTy1lrdqPIKsFO1VhJLuwu2F68uh0`  
**Project**: puzzle (ID: puzzle-23861)  
**Status**: ✅ Repository cleaned, key needs rotation

## ✅ Actions Taken

1. **Removed sensitive files from repository**
   - Deleted `/app/` directory containing compiled Flutter code
   - Added `.gitignore` to prevent future commits
   - Force-pushed to GitHub to remove from history

2. **Updated documentation**
   - Changed deployment strategy to separate Cloudflare Pages projects
   - Created this security incident document

## 🔒 Required Actions (DO THESE NOW!)

### Step 1: Rotate the API Key (CRITICAL)

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Navigate to**: APIs & Services → Credentials
3. **Find the exposed key**: `AIzaSyC3H_rTy1lrdqPIKsFO1VhJLuwu2F68uh0`
4. **Click Edit** on the key
5. **Click "Regenerate Key"** button
6. **Copy the new key** - you'll need it for Step 2

### Step 2: Update Your Flutter App

1. **Open your Flutter project**: `c:\Users\mccar\OneDrive\Documents\gh\puzzle_app`

2. **Find where the API key is used** (likely in one of these places):
   - `android/app/src/main/AndroidManifest.xml`
   - `ios/Runner/AppDelegate.swift`
   - `lib/firebase_options.dart`
   - Environment variables or config files

3. **Replace the old key with the new one**

4. **Use environment variables** (recommended):
   ```dart
   // Create a dart_defines.json file (add to .gitignore!)
   {
     "GOOGLE_API_KEY": "your-new-key-here"
   }
   ```

   ```dart
   // In your code:
   const apiKey = String.fromEnvironment('GOOGLE_API_KEY', defaultValue: '');
   ```

### Step 3: Add API Key Restrictions

In Google Cloud Console:

1. **Application restrictions**:
   - Choose "HTTP referrers"
   - Add: `https://puzzleroyale.app/*`
   - Add: `https://*.pages.dev/*` (for Cloudflare Pages preview)

2. **API restrictions**:
   - Restrict to only the APIs you're actually using
   - Don't select "Don't restrict key"

### Step 4: Review Billing & Usage

1. **Check for unauthorized usage**:
   - Go to: Billing → Reports
   - Look for unusual spikes in the last few hours
   - Check which APIs were called

2. **Set up billing alerts**:
   - Go to: Billing → Budgets & alerts
   - Create alert at $10, $50, $100 thresholds

### Step 5: Secure Your Flutter Repository

Add this to `puzzle_app/.gitignore`:

```
# Secrets and API keys
.env
.env.local
dart_defines.json
google-services.json
GoogleService-Info.plist

# Build outputs (contain compiled secrets)
build/
.dart_tool/
```

## 📋 Prevention Checklist

- [ ] Rotated the exposed API key
- [ ] Updated Flutter app with new key
- [ ] Added API key restrictions in Google Cloud Console
- [ ] Reviewed billing for unauthorized usage
- [ ] Set up billing alerts
- [ ] Added proper `.gitignore` entries
- [ ] Moved to environment variables for secrets
- [ ] Set up separate Cloudflare Pages deployment (see below)

## 🏗️ Proper Flutter Deployment Strategy

### Option A: Separate Cloudflare Pages Projects (Recommended)

1. **Create a new Cloudflare Pages project** for your Flutter app
2. **Connect** your `puzzle_app` repository
3. **Build settings**:
   ```
   Build command: flutter build web --release
   Build output directory: build/web
   Root directory: /
   ```
4. **Deploy** to a subdomain like `app.puzzleroyale.app`
5. **Use Cloudflare Workers** to route traffic:
   - `puzzleroyale.app/` → Marketing site
   - `puzzleroyale.app/app/*` → Flutter app

### Option B: Firebase Hosting (Alternative)

Since you're already using Firebase:

1. **Deploy Flutter app to Firebase Hosting**
2. **Use custom domain**: `app.puzzleroyale.app`
3. **Use Cloudflare Workers** to route `/app/*` to Firebase

### Option C: Build Separately, Deploy to Cloudflare (Advanced)

1. **Use GitHub Actions** to build Flutter on every push
2. **Store environment variables** as GitHub Secrets
3. **Deploy build output** to Cloudflare Pages via API
4. **Never commit** `build/` directory

## 🔐 Security Best Practices

1. **Never commit**:
   - API keys
   - Service account credentials
   - Build outputs (they contain compiled secrets)
   - Environment files (`.env`, etc.)

2. **Always use**:
   - Environment variables
   - Secret management services (GitHub Secrets, Cloudflare Workers Secrets)
   - API key restrictions
   - Billing alerts

3. **For Flutter Web**:
   - API keys will be visible in compiled JavaScript
   - MUST use HTTP referrer restrictions
   - Consider using Firebase App Check for additional security
   - Use Cloud Functions for sensitive operations

## 📚 Additional Resources

- [Google Cloud API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Flutter Environment Variables](https://dartcode.org/docs/using-dart-define-in-flutter/)

## 🆘 If You See Unauthorized Usage

1. **Immediately disable the key** in Google Cloud Console
2. **Check what APIs were accessed**
3. **Review Firebase/Cloud logs** for suspicious activity
4. **Contact Google Cloud Support** if charges are significant
5. **File a dispute** for unauthorized charges

---

**Next Steps**: Follow Steps 1-5 above, then we'll set up proper deployment! 🔒
