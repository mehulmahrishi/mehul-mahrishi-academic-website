# V4 Production & Migration Guide

## What V4 adds
- Structured publication data in `data/publications.json`
- Individual publication pages for selected records
- Dedicated pages for the three main research themes
- Dedicated OBEXcel project page
- Search/filter-ready publications page
- JSON-LD Person and ScholarlyArticle metadata
- Open Graph / Twitter metadata
- Accessible skip navigation and focus states
- privacy-friendly contact composer with no hosting backend
- 404 page
- Web app manifest
- Cloudflare Pages security/cache headers
- Migration redirect file
- Sitemap template and domain-finalization utility

## Google Scholar
Google Scholar remains the primary public source for:
- the complete publication record
- citation counts
- h-index
- i10-index
- citing articles

The website stores selected structured publication records locally so it is fast, searchable and stable without scraping Scholar on every page load.

## Final domain
The new production domain has not yet been supplied, so V4 intentionally does not invent one.

After choosing the domain, run:
`python scripts/finalize_domain.py https://YOUR-DOMAIN`

Then add absolute canonical and `og:url` values if required by your deployment workflow.

## Primary deployment: Cloudflare Pages

See `CLOUDFLARE_DEPLOYMENT.md`.

V5 removes the Netlify dependency and is designed to deploy as a static Cloudflare Pages project connected to GitHub.

## Other hosts
The site is plain HTML/CSS/JavaScript and works on any static host.
For the contact form on non-Netlify hosting, connect `contact.html` to your preferred form endpoint.

## Migration from WordPress
The `_redirects` file contains initial redirects for known/likely legacy academic sections. Verify the exact historic URLs before DNS cutover, especially for Editorials, Affiliations and any old page slugs not currently indexed.

## Content updates
- Publications: `data/publications.json`
- Profile: `data/profile.json`
- Projects: `data/projects.json`
- Main visual styles: `assets/style.css`
- Interactions: `assets/site.js`
