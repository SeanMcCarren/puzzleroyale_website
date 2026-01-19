// ============================================
// CONFIGURATION - Update these values!
// ============================================
const CONFIG = {
    // Your Android package name (from android/app/build.gradle)
    androidPackage: 'com.mccarrenapps.puzzleroyale',

    // Your iOS App Store ID (numeric ID from App Store Connect)
    // TODO: Update this when iOS app is published
    iosAppId: 'YOUR_IOS_APP_ID',

    // Play Store URL
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mccarrenapps.puzzleroyale',

    // App Store URL
    // TODO: Update this when iOS app is published
    appStoreUrl: 'https://apps.apple.com/app/idYOUR_IOS_APP_ID',

    // Flutter web app base URL
    webAppUrl: 'https://app.puzzleroyale.app',

    // Deep link path pattern (hash-based routing)
    // The uid will be appended as a query parameter
    deepLinkPath: '/#/profile'
};

// ============================================
// Helper Functions
// ============================================

/**
 * Extract UID from URL path
 * Assumes URL pattern: /u/{uid}
 */
function getUidFromUrl() {
    // Prefer query parameter `uid` (used when we redirect to /u/index.html?uid=...)
    const urlParams = new URLSearchParams(window.location.search);
    const uidFromQuery = urlParams.get('uid');
    if (uidFromQuery) return uidFromQuery;

    // Fallback to path-based uid: /u/{uid}
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const uIndex = pathParts.indexOf('u');
    if (uIndex !== -1 && pathParts[uIndex + 1] && pathParts[uIndex + 1] !== 'index.html') {
        return pathParts[uIndex + 1];
    }

    return null;
}

/**
 * Check if user is on a mobile device
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Check if user is on Android
 */
function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

/**
 * Check if user is on iOS
 */
function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Build the Flutter web app URL with profile path
 */
function buildWebAppUrl(uid) {
    return `${CONFIG.webAppUrl}${CONFIG.deepLinkPath}?uid=${uid}`;
}

/**
 * Build Android Intent URL for deep linking
 * This will try to open the app, and fallback to the current page if not installed
 */
function buildAndroidIntentUrl(uid) {
    // Android Intent URL format:
    // intent://host/path#Intent;scheme=https;package=com.example.app;S.browser_fallback_url=encoded_url;end
    const fallbackUrl = encodeURIComponent(buildWebAppUrl(uid));
    // Use the marketing domain host (puzzleroyale.app) so Android App Links (assetlinks.json)
    // hosted at that domain will match the incoming URL and verify the app.
    return `intent://puzzleroyale.app/u/${uid}#Intent;scheme=https;package=${CONFIG.androidPackage};S.browser_fallback_url=${fallbackUrl};end`;
}

/**
 * Build iOS Universal Link
 * iOS Universal Links work with regular HTTPS URLs when properly configured
 */
function buildIOSUniversalLink(uid) {
    return `${CONFIG.webAppUrl}${CONFIG.deepLinkPath}?uid=${uid}`;
}

/**
 * Show loading spinner
 */
function showLoading() {
    document.getElementById('loading').classList.add('active');
}

/**
 * Hide loading spinner and show main content
 */
function showContent() {
    document.getElementById('loading').classList.remove('active');
}

// ============================================
// Main Logic
// ============================================
function init() {
    const uid = getUidFromUrl();

    if (!uid) {
        console.warn('No UID found in URL');
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

            // If the page becomes hidden, the app probably opened successfully
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
        } else {
            // Other mobile device
            showContent();
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
