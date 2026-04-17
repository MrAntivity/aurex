# Aurex Medical Website

Professional, minimal blue-themed static website for **Aurex Medical** with:

- Product/industry credibility sections
- Request a Quote / Demo form
- GitHub Pages deployment workflow

## Email forwarding setup

The form uses [FormSubmit](https://formsubmit.co/) to forward submissions to:

- `aurexmed@gmail.com`

On first form submission, FormSubmit sends an activation email to confirm forwarding.

## Deploy via GitHub Pages

1. Push this repo to GitHub.
2. Ensure your default branch is `main` (or update `.github/workflows/deploy.yml`).
3. In GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push changes to `main`; the workflow will publish the site.
