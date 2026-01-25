// ============================================
// Daily redirect script - mirrors profile-redirect behavior
// ============================================
const DAILY_CONFIG = {
    androidPackage: 'com.mccarrenapps.puzzleroyale',
    iosAppId: 'YOUR_IOS_APP_ID',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mccarrenapps.puzzleroyale',
    appStoreUrl: 'https://apps.apple.com/app/idYOUR_IOS_APP_ID',
    webAppUrl: 'https://app.puzzleroyale.app',
    deepLinkPath: '/#/daily'
};

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromQuery = urlParams.get('id') || urlParams.get('daily_id') || urlParams.get('uid');
    if (idFromQuery) return idFromQuery;

    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const dIndex = pathParts.indexOf('daily');
    if (dIndex !== -1 && pathParts[dIndex + 1] && pathParts[dIndex + 1] !== 'index.html') {
        return pathParts[dIndex + 1];
    }
    return null;
}

function isMobile() { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); }
function isAndroid() { return /Android/i.test(navigator.userAgent); }
function isIOS() { return /iPhone|iPad|iPod/i.test(navigator.userAgent); }

function buildWebAppUrl(id) {
    return `${DAILY_CONFIG.webAppUrl}${DAILY_CONFIG.deepLinkPath}?id=${id}`;
}

function buildAndroidIntentUrl(id) {
    const fallbackUrl = encodeURIComponent(buildWebAppUrl(id));
    return `intent://puzzleroyale.app/daily/${id}#Intent;scheme=https;package=${DAILY_CONFIG.androidPackage};S.browser_fallback_url=${fallbackUrl};end`;
}

function buildIOSUniversalLink(id) {
    return `${DAILY_CONFIG.webAppUrl}${DAILY_CONFIG.deepLinkPath}?id=${id}`;
}

function showLoading() { document.getElementById('loading').classList.add('active'); }
function showContent() { document.getElementById('loading').classList.remove('active'); }

function initDaily() {
    const id = getIdFromUrl();
    if (!id) { console.warn('No daily ID found'); showContent(); return; }

    const webAppUrl = buildWebAppUrl(id);
    document.getElementById('web-link').href = webAppUrl;
    document.getElementById('play-store-link').href = DAILY_CONFIG.playStoreUrl;
    document.getElementById('app-store-link').href = DAILY_CONFIG.appStoreUrl;

    if (isMobile()) {
        showLoading();
        if (isAndroid()) {
            const intentUrl = buildAndroidIntentUrl(id);
            console.log('[daily-redirect] Android intentUrl=', intentUrl);
            const timeout = setTimeout(() => { showContent(); }, 2500);
            document.addEventListener('visibilitychange', () => { if (document.hidden) clearTimeout(timeout); });
            try { window.location.href = intentUrl; } catch (e) { console.warn(e); }
            setTimeout(() => {
                try { const a = document.createElement('a'); a.href = intentUrl; a.style.display = 'none'; document.body.appendChild(a); a.click(); a.remove(); } catch (e) {/*no-op*/ }
            }, 150);
            setTimeout(() => {
                try { const ifr = document.createElement('iframe'); ifr.style.display = 'none'; ifr.src = intentUrl; document.body.appendChild(ifr); setTimeout(() => ifr.remove(), 2000); } catch (e) { }
            }, 300);
        } else if (isIOS()) {
            const u = buildIOSUniversalLink(id);
            const timeout = setTimeout(() => { showContent(); }, 2500);
            document.addEventListener('visibilitychange', () => { if (document.hidden) clearTimeout(timeout); });
            window.location.href = u;
        } else { showContent(); }
    } else { showContent(); }
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initDaily); } else { initDaily(); }
