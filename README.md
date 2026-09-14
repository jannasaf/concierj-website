# Concierj — Marketing Site & Azure Bluff Demo

The public marketing website for Concierj, plus the Azure Bluff demo
environment (a fictional boutique hotel used to show what Concierj
feels like on a real hotel website).

This is a plain, dependency-free static site — HTML, CSS, and a
little vanilla JavaScript. No build step, no framework, no Node
required to edit or preview it.

## Structure

```
index.html              Concierj homepage
about.html               About / founder story
demo/index.html          Azure Bluff — the fictional demo hotel
styles/
  tokens.css              Shared design tokens (color, type, spacing)
  base.css                Reset + shared primitives (buttons, layout)
  home.css                Concierj marketing site styles
  demo.css                Azure Bluff styles (overrides tokens for its own palette)
  widget.css              ConcierjWidget component (launcher + panel)
scripts/
  nav.js                  Shared: mobile nav toggle, scroll-reveal, sticky header
  home.js                 Plan My Stay simulated conversation (homepage only)
  concierj-widget.js       ConcierjWidget placeholder logic
assets/
  images/concierj/         Concierj brand imagery
  images/azure-bluff/      Azure Bluff demo imagery (Unsplash — see CREDITS.md)
  icons/favicon.svg
CNAME                     Custom domain for GitHub Pages (concierj.co)
robots.txt, sitemap.xml   SEO
```

## Editing

Everything is plain HTML/CSS/JS — open any file and edit directly.
Shared styles live in `styles/tokens.css` and `styles/base.css`;
page-specific styles live in `home.css` / `demo.css`. There's
nothing to compile.

## Previewing locally

Any static file server works. For example, with Python (preinstalled
on macOS):

```bash
cd concierj-website
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## The ConcierjWidget component

`demo/index.html` includes a `[data-concierj-widget]` block (styled by
`styles/widget.css`, wired by `scripts/concierj-widget.js`). It's a
placeholder shell only — a floating "Plan your stay" launcher and a
panel with a static welcome message and a few suggestion chips.

When the real Concierj chat product is ready, replace the contents of
`[data-concierj-body]` (and wire up the input at the bottom of the
panel) with the actual embed. The launcher, open/close behavior, and
responsive layout are already built and don't need to change.

## Swapping images

Azure Bluff currently uses licensed Unsplash photography as
placeholder imagery (credits in `assets/images/azure-bluff/CREDITS.md`).
To replace an image, drop a new file into the same folder and update
the `background-image` / `src` reference — paths are centralized in
`demo/index.html` and easy to find.

## Deploying to GitHub Pages

1. Create a new, empty GitHub repository (e.g. `concierj-website`).
2. Push this folder to it:
   ```bash
   git remote add origin https://github.com/<your-username>/concierj-website.git
   git add -A
   git commit -m "Initial Concierj site"
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages** → under "Build and deployment,"
   set **Source** to "Deploy from a branch," branch `main`, folder `/ (root)`.
4. Under **Settings → Pages → Custom domain**, enter `concierj.co` and save.
   GitHub will detect the `CNAME` file already in this repo (already
   set to `concierj.co`) — you don't need to create it again.
5. Once DNS (below) is in place and propagated, check **Enforce HTTPS**
   in the same settings panel.

No GitHub Actions workflow is needed — there's no build step, so
GitHub Pages serves the files directly from the branch.

## Pointing concierj.co at GitHub Pages

At your domain registrar (wherever `concierj.co` is currently
managed), update DNS to point at GitHub Pages:

**Apex domain (`concierj.co`)** — add four `A` records pointing to
GitHub's Pages IP addresses:
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

**`www` subdomain** — add a `CNAME` record:
```
CNAME    www    <your-username>.github.io.
```

Squarespace-specific DNS records (their A records, ALIAS records, or
verification `TXT` records) can be removed once these are in place.
DNS changes can take anywhere from a few minutes to 24–48 hours to
propagate. Once GitHub confirms the domain in **Settings → Pages**,
enable **Enforce HTTPS**.

I'm not making these DNS changes for you — they need to happen at
your registrar. Let me know once you're ready and I can walk through
it with you.

## SEO

Each page has its own `<title>`, meta description, and Open Graph
tags. `sitemap.xml` lists the two indexable pages (home, about).
`robots.txt` and a `noindex` meta tag keep the Azure Bluff demo out of
search results, since it's a fictional property, not a real business.
