# Domain Finalization Checklist

## Recommended final domain
`mehulmahrishi.com`

## You can launch before buying the domain
Cloudflare Pages will issue a free `*.pages.dev` address.

This allows you to:
- review the live website
- test on mobile
- send it privately for feedback
- continue content changes

The custom `.com` can be attached later without rebuilding the website.

## When the domain is ready

1. Point/manage DNS in Cloudflare.
2. Attach the domain to the Pages project.
3. Decide canonical hostname:
   - `mehulmahrishi.com` (recommended)
   - or `www.mehulmahrishi.com`
4. Redirect the non-canonical hostname.
5. Run:
   `python scripts/finalize_domain.py https://mehulmahrishi.com`
6. Push the changes.
7. Add the final domain to:
   - Google Scholar
   - ORCID
   - ResearchGate
   - LinkedIn
   - Vidwan
   - SKIT profile where appropriate
8. Add the domain to Google Search Console.
9. Submit `/sitemap.xml`.
10. Redirect/prominently link the old WordPress site to the new domain.
