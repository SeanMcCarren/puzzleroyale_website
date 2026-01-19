# Deep Link Profile Sharing - Implementation Guide

This document describes how to implement profile sharing with deep links that redirect mobile users to the native app.

## Overview

When a user shares their profile, they share a URL like:
```
https://app.puzzleroyale.app/u/abc123xyz
```

When someone clicks this link:
- **Mobile users**: Get redirected to the native app (if installed) or shown app store links
- **Desktop users**: Can view the profile in the web app or download the app

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     User clicks shared link                      │
│            https://app.puzzleroyale.app/u/{uid}                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Marketing Website                             │
│                (app.puzzleroyale.app/u/:uid)                    │
│                                                                  │
│  • Detects mobile vs desktop                                    │
│  • Mobile: Attempts to open native app via Intent/Universal Link │
│  • Shows fallback UI with app store links                       │
│  • "Continue in browser" links to Flutter web app               │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
        ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
        │  Native App │ │  App Store  │ │  Web App    │
        │  (Android/  │ │  (Play/App  │ │  (Flutter   │
        │   iOS)      │ │   Store)    │ │   Web)      │
        └─────────────┘ └─────────────┘ └─────────────┘
```

## Part 1: Marketing Website Implementation

### Option A: Static HTML Page (Simplest)

Create a file at `/u/index.html` on your marketing website that handles all `/u/:uid` routes.

#### File: `u/[uid].html` (or use your framework's routing)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>View Profile - Puzzle Royale</title>
  
  <!-- Open Graph tags for link previews -->
  <meta property="og:title" content="View Profile on Puzzle Royale">
  <meta property="og:description" content="Check out this player's profile on Puzzle Royale!">
  <meta property="og:image" content="https://app.puzzleroyale.app/images/og-profile.png">
  <meta property="og:url" content="https://app.puzzleroyale.app/u/">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="View Profile on Puzzle Royale">
  <meta name="twitter:description" content="Check out this player's profile on Puzzle Royale!">
  <meta name="twitter:image" content="https://app.puzzleroyale.app/images/og-profile.png">
  
  <!-- iOS Smart App Banner (shows native "Open in App" banner on iOS Safari) -->
  <!-- Replace YOUR_IOS_APP_ID with your actual App Store ID -->
  <meta name="apple-itunes-app" content="app-id=YOUR_IOS_APP_ID">
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .container {
      background: white;
      border-radius: 24px;
      padding: 48px 32px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 24px;
    }
    
    h1 {
      font-size: 24px;
      color: #1a1a2e;
      margin-bottom: 12px;
    }
    
    p {
      color: #666;
      margin-bottom: 32px;
      line-height: 1.5;
    }
    
    .store-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .store-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px 24px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .store-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
    
    .store-button img {
      height: 24px;
      margin-right: 12px;
    }
    
    .play-store {
      background: #1a1a2e;
      color: white;
    }
    
    .app-store {
      background: #007AFF;
      color: white;
    }
    
    .web-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    
    .web-link:hover {
      text-decoration: underline;
    }
    
    .loading {
      display: none;
      margin-bottom: 24px;
    }
    
    .loading.active {
      display: block;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .content.hidden {
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Loading state (shown while attempting to open app) -->
    <div class="loading" id="loading">
      <div class="spinner"></div>
      <p>Opening Puzzle Royale...</p>
    </div>
    
    <!-- Main content -->
    <div class="content" id="content">
      <!-- Replace with your app logo -->
      <img src="/images/app-icon.png" alt="Puzzle Royale" class="logo">
      
      <h1>View this profile in the app</h1>
      <p>Get the best experience with the Puzzle Royale app!</p>
      
      <div class="store-buttons">
        <a href="#" id="play-store-link" class="store-button play-store">
          <img src="/images/google-play-icon.svg" alt="">
          Get it on Google Play
        </a>
        <a href="#" id="app-store-link" class="store-button app-store">
          <img src="/images/app-store-icon.svg" alt="">
          Download on App Store
        </a>
      </div>
      
      <a href="#" id="web-link" class="web-link">Continue in browser →</a>
    </div>
  </div>

  <script>
    // ============================================
    // CONFIGURATION - Update these values!
    // ============================================
    const CONFIG = {
      // Your Android package name (from android/app/build.gradle)
      androidPackage: 'com.tombo.puzzle_royale',
      
      // Your iOS App Store ID (numeric ID from App Store Connect)
      iosAppId: 'YOUR_IOS_APP_ID',
      
      // Play Store URL
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tombo.puzzle_royale',
      
      // App Store URL
      appStoreUrl: 'https://apps.apple.com/app/idYOUR_IOS_APP_ID',
      
      // Flutter web app base URL
      webAppUrl: 'https://app.puzzleroyale.app/app',
      
      // Deep link path pattern (hash-based routing)
      // The uid will be appended as a query parameter
      deepLinkPath: '/#/profile'
    };

    // ============================================
    // Helper Functions
    // ============================================
    function getUidFromUrl() {
      // Assumes URL pattern: /u/{uid}
      const pathParts = window.location.pathname.split('/');
      const uIndex = pathParts.indexOf('u');
      if (uIndex !== -1 && pathParts[uIndex + 1]) {
        return pathParts[uIndex + 1];
      }
      // Also check query params as fallback
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('uid');
    }

    function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function isAndroid() {
      return /Android/i.test(navigator.userAgent);
    }

    function isIOS() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function buildWebAppUrl(uid) {
      return `${CONFIG.webAppUrl}${CONFIG.deepLinkPath}?uid=${uid}`;
    }

    function buildAndroidIntentUrl(uid) {
      // Android Intent URL format:
      // intent://host/path#Intent;scheme=https;package=com.example.app;S.browser_fallback_url=encoded_url;end
      const fallbackUrl = encodeURIComponent(window.location.href);
      return `intent://app.puzzleroyale.app/app/profile?uid=${uid}#Intent;scheme=https;package=${CONFIG.androidPackage};S.browser_fallback_url=${fallbackUrl};end`;
    }

    function buildIOSUniversalLink(uid) {
      // iOS Universal Links work with regular HTTPS URLs
      // Make sure your apple-app-site-association file is properly configured
      return `${CONFIG.webAppUrl}${CONFIG.deepLinkPath}?uid=${uid}`;
    }

    function showLoading() {
      document.getElementById('loading').classList.add('active');
      document.getElementById('content').classList.add('hidden');
    }

    function showContent() {
      document.getElementById('loading').classList.remove('active');
      document.getElementById('content').classList.remove('hidden');
    }

    // ============================================
    // Main Logic
    // ============================================
    function init() {
      const uid = getUidFromUrl();
      
      if (!uid) {
        console.error('No UID found in URL');
        showContent();
        return;
      }

      // Set up links
      const webAppUrl = buildWebAppUrl(uid);
      document.getElementById('web-link').href = webAppUrl;
      document.getElementById('play-store-link').href = CONFIG.playStoreUrl;
      document.getElementById('app-store-link').href = CONFIG.appStoreUrl;

      // If on mobile, try to open the app
      if (isMobile()) {
        showLoading();

        if (isAndroid()) {
          // Android: Use Intent URL
          const intentUrl = buildAndroidIntentUrl(uid);
          
          // Set a timeout to show fallback content if app doesn't open
          const timeout = setTimeout(() => {
            showContent();
          }, 2500);

          // Attempt to open the app
          window.location.href = intentUrl;
          
          // If the page is still visible after a short delay, app probably didn't open
          document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
              clearTimeout(timeout);
            }
          });

        } else if (isIOS()) {
          // iOS: Try Universal Link first
          const universalLink = buildIOSUniversalLink(uid);
          
          // Set a timeout to show fallback content
          const timeout = setTimeout(() => {
            showContent();
          }, 2500);

          // The Smart App Banner (meta tag) will also help on iOS Safari
          // For programmatic opening, we redirect to the universal link
          window.location.href = universalLink;

          document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
              clearTimeout(timeout);
            }
          });
        }
      } else {
        // Desktop: Just show the content
        showContent();
      }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  </script>
</body>
</html>
```

### Option B: Using a JavaScript Framework (Next.js, Astro, etc.)

If your marketing website uses a framework, create a dynamic route:

#### Next.js Example: `pages/u/[uid].tsx`

```tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const CONFIG = {
  androidPackage: 'com.tombo.puzzle_royale',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tombo.puzzle_royale',
  appStoreUrl: 'https://apps.apple.com/app/idYOUR_IOS_APP_ID',
  webAppUrl: 'https://app.puzzleroyale.app/app',
};

export default function ProfileRedirect() {
  const router = useRouter();
  const { uid } = router.query;
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!uid || typeof uid !== 'string') return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isMobile) {
      const timeout = setTimeout(() => setShowFallback(true), 2500);

      if (isAndroid) {
        const intentUrl = `intent://app.puzzleroyale.app/app/profile?uid=${uid}#Intent;scheme=https;package=${CONFIG.androidPackage};end`;
        window.location.href = intentUrl;
      } else {
        // iOS Universal Link
        window.location.href = `${CONFIG.webAppUrl}/#/profile?uid=${uid}`;
      }

      const handleVisibilityChange = () => {
        if (document.hidden) clearTimeout(timeout);
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        clearTimeout(timeout);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } else {
      setShowFallback(true);
    }
  }, [uid]);

  const webAppUrl = `${CONFIG.webAppUrl}/#/profile?uid=${uid}`;

  return (
    <>
      <Head>
        <title>View Profile - Puzzle Royale</title>
        <meta name="apple-itunes-app" content="app-id=YOUR_IOS_APP_ID" />
      </Head>
      
      <div className="container">
        {!showFallback ? (
          <div className="loading">
            <div className="spinner" />
            <p>Opening Puzzle Royale...</p>
          </div>
        ) : (
          <div className="content">
            <h1>View this profile in the app</h1>
            <p>Get the best experience with the Puzzle Royale app!</p>
            
            <div className="store-buttons">
              <a href={CONFIG.playStoreUrl}>Get it on Google Play</a>
              <a href={CONFIG.appStoreUrl}>Download on App Store</a>
            </div>
            
            <a href={webAppUrl}>Continue in browser →</a>
          </div>
        )}
      </div>
    </>
  );
}
```

---

## Part 2: Flutter App Changes

### Update the Deep Link URL

In `lib/src/common_ui/pages/routes.dart`, update `profileDeepLinkUrl` to point to your marketing website:

```dart
/// Creates a shareable profile URL that goes through the marketing website
/// for smart app redirection.
String profileDeepLinkUrl(String uid) {
  return "https://app.puzzleroyale.app/u/$uid";
}
```

### Simplify the Router (Optional)

Since the marketing website now handles the redirect logic, you can simplify the Flutter router to just show the `ProfilePage` directly:

```dart
GoRoute(
  path: routeProfile,
  builder: (context, state) {
    String? uid = state.uri.queryParameters['uid'];
    return ProfilePage(uid: uid);
  },
),
```

You can remove or keep the `OpenProfileInAppPage` - it won't be needed if users always go through the marketing website first.

---

## Part 3: Android Deep Link Configuration

Ensure your `AndroidManifest.xml` is configured to handle the deep links:

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" />
    <data android:host="app.puzzleroyale.app" />
    <data android:pathPrefix="/app" />
</intent-filter>
```

### Asset Links File (Required for Android App Links)

For Android App Links to work (automatic app opening without a chooser dialog), you need to host a Digital Asset Links file at:

```
https://app.puzzleroyale.app/.well-known/assetlinks.json
```

Content:
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.tombo.puzzle_royale",
      "sha256_cert_fingerprints": [
        "YOUR_SHA256_FINGERPRINT_HERE"
      ]
    }
  }
]
```

To get your SHA256 fingerprint:
```bash
# For debug keystore
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# For release keystore
keytool -list -v -keystore your-release-key.keystore -alias your-alias
```

---

## Part 4: iOS Universal Links Configuration

### 1. Apple App Site Association File

Host this file at:
```
https://app.puzzleroyale.app/.well-known/apple-app-site-association
```

**Important:** This file must be served with `Content-Type: application/json` and **without** a `.json` extension in the URL.

Content:
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.tombo.puzzle_royale",
        "paths": [
          "/app/*",
          "/u/*"
        ]
      }
    ]
  }
}
```

Replace `TEAMID` with your Apple Developer Team ID.

### 2. Xcode Configuration

In your iOS project:

1. Open `ios/Runner.xcworkspace` in Xcode
2. Select the Runner target
3. Go to "Signing & Capabilities"
4. Add the "Associated Domains" capability
5. Add your domain:
   ```
   applinks:app.puzzleroyale.app
   ```

### 3. Info.plist

Add to `ios/Runner/Info.plist`:
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>puzzleroyale</string>
    </array>
  </dict>
</array>
```

---

## Part 5: Testing

### Testing Android Deep Links

```bash
# Test intent URL handling
adb shell am start -W -a android.intent.action.VIEW -d "https://app.puzzleroyale.app/app/#/profile?uid=testuser123" com.tombo.puzzle_royale

# Verify asset links
adb shell pm get-app-links com.tombo.puzzle_royale
```

### Testing iOS Universal Links

1. Install the app on a real device (simulator doesn't support Universal Links)
2. Send yourself the link via Messages or Notes
3. Long-press the link to see "Open in Puzzle Royale" option
4. Tap the link to test automatic opening

### Online Verification Tools

- **Android:** https://developers.google.com/digital-asset-links/tools/generator
- **iOS:** https://search.developer.apple.com/appsearch-validation-tool/

---

## Summary Checklist

### Marketing Website
- [ ] Create `/u/:uid` route with redirect logic
- [ ] Add iOS Smart App Banner meta tag
- [ ] Style fallback page with app store links
- [ ] Add "Continue in browser" link to Flutter web app

### Android
- [ ] Configure `AndroidManifest.xml` intent filters
- [ ] Host `assetlinks.json` at `/.well-known/`
- [ ] Verify with Google's Asset Links tool

### iOS  
- [ ] Host `apple-app-site-association` at `/.well-known/`
- [ ] Add Associated Domains capability in Xcode
- [ ] Test on real device

### Flutter App
- [ ] Update `profileDeepLinkUrl()` to use marketing website URL
- [ ] Ensure profile route handles `uid` query parameter
- [ ] Test deep link navigation works correctly

---

## Troubleshooting

### Android: App doesn't open from intent URL
- Verify package name matches exactly
- Check if app is installed
- Test with `adb shell` command
- Verify assetlinks.json is accessible and valid

### iOS: Universal Links not working
- Must test on real device, not simulator
- Check apple-app-site-association is valid JSON
- Verify TEAMID is correct
- Ensure Associated Domains capability is added
- Links from same domain might not work (Apple limitation)

### Web: Redirect not happening
- Check browser console for JavaScript errors
- Verify UID is being parsed correctly
- Test mobile detection logic
