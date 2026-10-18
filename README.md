# AUREX Medical

Responsive static medical-product website. HTML, CSS, and vanilla JavaScript; no build dependencies.

## Preview

Run `python3 -m http.server 8080` from this directory and open `http://localhost:8080`.

## Features

- Product categories and product-specific quote selection
- Orange, white, and black identity using the supplied AUREX logo
- Scroll-triggered section reveals, scroll-linked illustration movement, and reading progress
- A pinned brand section with scroll-controlled logo movement, scale, rotation, and sliding typography
- Reduced-motion preference support, keyboard navigation, and a mobile menu
- Quote-only inquiry form; no account or portal functionality
- Original decorative product illustrations (not product specifications)

## Quote form

The form posts to FormSubmit for `aurexmed@gmail.com`. The mailbox owner must complete FormSubmit's activation if it has not already been activated. CAPTCHA and a honeypot help reduce spam. Validate delivery with a real, authorized inquiry before relying on the inbox workflow. No form submission is sent by local UI checks.

## Deployment

The existing `.github/workflows/deploy.yml` publishes the repository to GitHub Pages on pushes to `main`. In repository Settings → Pages, set the source to GitHub Actions. No build step is required.

## U-100 product listing

`u100-insulin-syringes.html` contains the product gallery, specifications, reported testing results, and embedded PDF. The Amazon button intentionally links to the Amazon homepage until the product listing URL is available. Bulk-pricing links preselect U100 in the home-page quote form. Replace the labeled illustration with supplied product photography when available. The unmodified source PDF is stored in `assets/documents/`.
