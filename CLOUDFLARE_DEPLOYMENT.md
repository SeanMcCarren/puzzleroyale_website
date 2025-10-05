# Cloudflare Pages Deployment Guide

## 🚀 Quick Setup

### Step 1: Access Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Log in to your account
3. Click **"Pages"** in the left sidebar
4. Click **"Create a project"**

### Step 2: Connect Your Repository

1. Click **"Connect to Git"**
2. Choose **GitHub**
3. Authorize Cloudflare to access your GitHub account
4. Select repository: **`SeanMcCarren/puzzleroyale_website`**
5. Click **"Begin setup"**

### Step 3: Configure Build Settings

```
Project name: puzzleroyale-website (or your preference)
Production branch: main
```

**Build settings:**
```
Framework preset: None
Build command: (leave empty)
Build output directory: /
Root directory: (leave empty, or /)
```

**Environment variables:** None needed

Click **"Save and Deploy"**

### Step 4: Set Up Custom Domain

After first deployment:

1. Go to your project in Cloudflare Pages
2. Click **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter: `puzzleroyale.app`
5. Cloudflare will guide you through DNS setup

**DNS Configuration:**
- If your domain is already on Cloudflare (it is via your CNAME), this will be automatic
- Cloudflare will create the necessary DNS records
- SSL/TLS will be automatic

### Step 5: Verify Deployment

1. Wait for build to complete (~30 seconds)
2. Click the provided `*.pages.dev` URL to test
3. Verify all pages work:
   - Homepage: `https://your-project.pages.dev`
   - Privacy: `https://your-project.pages.dev/privacy/`

### Step 6: Update DNS for Custom Domain

Since you're currently using GitHub Pages with Cloudflare:

1. In Cloudflare Dashboard → DNS
2. Find your current CNAME record for `puzzleroyale.app`
3. Cloudflare Pages will automatically update this when you add the custom domain
4. Or manually update to point to your Pages project

## 🎯 Future: Adding Flutter Web App

Once your marketing site is live, we'll add your Flutter app:

**Structure will be:**
```
puzzleroyale.app/          → Marketing site (current)
puzzleroyale.app/app/      → Flutter Web app (coming soon)
puzzleroyale.app/privacy/  → Legal pages
```

**To add Flutter later:**
1. We'll create a separate build command for Flutter
2. Deploy Flutter build output to `/app` directory
3. Use Cloudflare Pages Functions for routing if needed

## 📋 Checklist

- [ ] Repository connected to Cloudflare Pages
- [ ] First deployment successful
- [ ] Custom domain (puzzleroyale.app) configured
- [ ] SSL certificate active (automatic)
- [ ] Homepage loads correctly
- [ ] Privacy page loads correctly
- [ ] Theme toggle works
- [ ] All links work

## 🔄 Automatic Deployments

After setup, every time you push to GitHub:
- **main branch** → Deploys to production (puzzleroyale.app)
- **Other branches** → Creates preview deployment

## 🆘 Troubleshooting

### Issue: 404 on privacy page
**Solution:** Cloudflare Pages should handle this automatically. If not, create a `_redirects` file.

### Issue: Custom domain not working
**Solution:** Wait 5-10 minutes for DNS propagation, or check DNS settings in Cloudflare dashboard.

### Issue: Old GitHub Pages content showing
**Solution:** Clear cache, or wait for DNS to fully propagate (up to 24h max, usually 5-10 min).

## 📊 Performance Benefits

Compared to GitHub Pages:
- ✅ Faster global CDN
- ✅ Better caching
- ✅ Automatic SSL
- ✅ Instant cache purging
- ✅ Better analytics
- ✅ Support for modern frameworks (for future Flutter integration)

---

**Ready to deploy?** Follow the steps above! 🚀
