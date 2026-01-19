// Cloudflare Pages Function to serve the profile redirect page
// This handles /u/:uid routes

export async function onRequest(context) {
    // Fetch the static HTML file
    const url = new URL(context.request.url);
    const htmlUrl = `${url.origin}/u/index.html`;

    const response = await fetch(htmlUrl);

    if (!response.ok) {
        return new Response('Profile page not found', { status: 404 });
    }

    const html = await response.text();

    return new Response(html, {
        headers: {
            'Content-Type': 'text/html;charset=UTF-8',
        },
    });
}
