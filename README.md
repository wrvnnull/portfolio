# Irvan Fauzi — Portfolio

Modern, animated one-page portfolio site. Pure HTML/CSS/JS, no build step, no framework, no dependencies.

## Features
- Dark / light theme toggle (remembers your choice, respects system preference)
- Circular profile photo with animated gradient ring
- Typing animation cycling through roles
- Scroll-triggered reveal animations, animated stat counters
- Fully responsive, mobile nav
- Full SEO: meta description/keywords, Open Graph, Twitter Card, canonical URL, JSON-LD Person schema, `robots.txt`, `sitemap.xml`
- Graceful degradation: content stays fully visible even if JavaScript fails to load

## Structure
```
index.html      — page content + SEO meta tags
style.css       — styling, theme tokens, animations
script.js       — theme toggle, reveal animations, typing effect, contact form
robots.txt      — search engine crawl rules
sitemap.xml     — sitemap for search engines
assets/
  irvan.jpg     — profile photo
  favicon.svg   — site icon
```

## Before deploying
Update the domain placeholder `https://irvanfauzi.pages.dev/` in `index.html`, `robots.txt`, and `sitemap.xml` once you know your final Cloudflare Pages URL or custom domain.

## Run locally
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Deploy to Cloudflare Pages

1. Push this folder to a new GitHub repo.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select your repo.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
5. **Save and Deploy**. You'll get a `*.pages.dev` URL.
6. (Optional) Add a custom domain under the Pages project → **Custom domains**.

No environment variables or build step required, it's a fully static site.

