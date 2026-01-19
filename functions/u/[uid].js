// Cloudflare Pages Function to handle /u/:uid routes
// Redirects the browser to the static `/u/index.html?uid={uid}` page

export async function onRequest(context) {
    const url = new URL(context.request.url);
    // Extract the UID from the pathname (/u/{uid} or /u/{uid}/...)
    const parts = url.pathname.split('/').filter(Boolean);
    const uid = parts[1] || '';

    const q = url.searchParams.get('uid');
    const resolvedUid = q || uid;

    if (!resolvedUid) {
        return new Response(JSON.stringify({ error: 'missing_uid' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const target = `/u/index.html?uid=${encodeURIComponent(resolvedUid)}`;
    return Response.redirect(target, 302);
}
