# Free Deployment — Cloudflare Pages + GitHub

This V5 package is optimized for a $0/month hosting setup.

## Recommended architecture

Domain (optional at first)
→ Cloudflare DNS
→ Cloudflare Pages
→ GitHub public repository

The website is intentionally static and does **not** use Pages Functions, so ordinary page and asset traffic stays in Cloudflare Pages' static hosting path.

## Phase 1 — Launch completely free with a pages.dev address

1. Create a new public GitHub repository, e.g.
   `mehul-mahrishi-academic-website`

2. Upload the contents of this folder to the repository root.

3. In Cloudflare:
   Workers & Pages → Create → Pages → Connect to Git

4. Select the GitHub repository.

5. Deployment settings:
   - Framework preset: None
   - Build command: leave blank
   - Build output directory: `/` or repository root, depending on the dashboard field
   - Production branch: `main`

6. Deploy.

Cloudflare will provide a free address similar to:
`your-project.pages.dev`

## Phase 2 — Add the custom domain later

When `mehulmahrishi.com` is registered:

1. Add the domain to Cloudflare.
2. In the Pages project, choose Custom domains.
3. Add `mehulmahrishi.com`.
4. If you also use `www.mehulmahrishi.com`, choose one canonical hostname and redirect the other.
5. Run locally before the final production push:

   `python scripts/finalize_domain.py https://mehulmahrishi.com`

6. Commit the generated SEO changes and push them.

## Automatic updates

Cloudflare Pages' Git integration deploys again whenever `main` is updated.

The included GitHub Actions workflow checks local links before/alongside updates.

## Contact form

V5 intentionally does not depend on:
- Netlify Forms
- paid server hosting
- a database
- a third-party form processor

The Contact page prepares a structured email to `mehul@skit.ac.in` using the visitor's mail application.

This keeps hosting and form infrastructure at $0/month and avoids sending visitor messages to another form platform.

If you later want a true browser-side "Send" button, add a dedicated form/email service at that point.

## Cloudflare-specific files

- `_headers` — security and caching headers
- `_redirects` — WordPress migration redirects
- `404.html` — custom not-found page
- `site.webmanifest` — site metadata
- `robots.txt`
- `sitemap.template.xml`

## Important: old WordPress URLs

Before the final migration, verify every old WordPress URL and add its mapping to `_redirects`.

Do this before changing the old site's primary links or removing content.
