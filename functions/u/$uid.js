// Cloudflare Pages Function to handle /u/:uid routes
// Redirects the browser to the static `/u/index.html?uid={uid}` page

export async function onRequest(context) {
    const url = new URL(context.request.url);
    // Extract the UID from the pathname (/u/{uid} or /u/{uid}/...)
    const parts = url.pathname.split('/').filter(Boolean);
    const uid = parts[1] || '';

    if (!uid) {
        return new Response('Missing UID', { status: 400 });
    }

    // Redirect to the static page which will read ?uid= from query params
    const target = `/u/index.html?uid=${encodeURIComponent(uid)}`;
    return Response.redirect(target, 302);
}
