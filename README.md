# Aurex Medical Website

Professional, minimal blue-themed static website for **Aurex Medical** with:

- Product and industry credibility sections
- Request a Quote / Demo form
- Simple GitHub Pages hosting (no workflow required)

## Email forwarding setup

The form uses [FormSubmit](https://formsubmit.co/) to forward submissions to:

- `aurexmed@gmail.com`

On first form submission, FormSubmit sends an activation email to confirm forwarding.

## Host on GitHub Pages (recommended fix)

This repository is plain static files (`index.html`, `styles.css`, `script.js`), so the most reliable setup is GitHub's branch-based Pages hosting.

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**, then click **Save**.
5. Wait ~1-2 minutes; your live URL will appear on the same Pages settings screen.

> Why this fix: the previous Actions workflow used the Pages API and can fail with `Get Pages site failed / HttpError: Not Found` when Pages is not preconfigured. Branch deploy avoids that failure path.
