# Irvan Fauzi — Portfolio

Modern, animated one-page developer portfolio. Pure HTML/CSS/JS — no framework, no build step, no backend. Deployed on **Cloudflare Pages** with automatic CI quality checks.

## Why this stays static
A personal portfolio works best as a static site: it is free, instantly fast on the edge, secure by default (nothing to patch), and auto-deploys on every push. The "wow" factor here comes from polish + engineering hygiene, not from a backend you have to maintain while job-hunting.

## Features
- Dark / light theme toggle (remembers choice, respects system preference)
- Circular profile photo with animated conic-gradient ring
- Typing animation cycling through roles
- Scroll-triggered reveals, animated stat counters, animated skill-proficiency bars
- **Copy-email button** on the contact card
- **Save as CV (PDF)** — clean print stylesheet that strips nav/animations for a recruiter-ready PDF
- Fully responsive with mobile nav
- Full SEO: meta description/keywords, Open Graph, Twitter Card, canonical, JSON-LD Person schema, `robots.txt`, `sitemap.xml`
- Graceful degradation — content stays visible even if JavaScript fails
- **CI**: GitHub Actions lints HTML (`htmlhint`) and validates JS (`node --check`) on every push/PR

## Structure
```
index.html          — page content + SEO meta + Person schema
style.css           — theme tokens, layout, animations, print stylesheet
script.js           — theme, reveals, typing, counters, proficiency bars, copy, CV print
robots.txt          — crawl rules
sitemap.xml         — sitemap
assets/irvan.jpg    — profile photo
assets/favicon.svg  — site icon
.github/workflows/  — CI quality gate
```

## Local development
```bash
python3 -m http.server 8080      # preview at http://localhost:8080
npm install && npm run lint       # run the same checks CI runs
```

## Deploy
Hosted on Cloudflare Pages, connected to this GitHub repo.
- **Framework preset:** None
- **Build command:** (empty)
- **Build output directory:** `/`

Every push to `main` triggers a Cloudflare build + the GitHub Actions CI check. No manual steps.

## Editing content
- Experience / work: edit the `.timeline` and `.cards` blocks in `index.html`
- Skills: edit `.skill-group` and `.bar` (set `data-level` for the proficiency %) in `index.html`
- Contact: update email/phone/LinkedIn in the `#contact` section and the `mailto:`/form endpoint
