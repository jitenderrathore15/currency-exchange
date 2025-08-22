# Simple Currency Exchange — GitHub Pages

**Live URL after deploy**: https://jitenderrathore15.github.io/currency-exchange/

## Quick deploy
1. Create a new repo: **currency-exchange** under **jitenderrathore15**.
2. Upload all files in this folder (or push with Git).
3. Go to **Settings → Pages** and set:
   - Source: **Deploy from a branch**
   - Branch: **main** (or master), folder: **/root**
4. Your site will be served at **https://jitenderrathore15.github.io/currency-exchange/**.

## Traffic experiment
- Share two links with UTMs:
  - `https://jitenderrathore15.github.io/currency-exchange/?utm_source=twitter&utm_campaign=launch`
  - `https://jitenderrathore15.github.io/currency-exchange/?utm_source=linkedin&utm_campaign=launch`
- Add analytics (pick one) by pasting the script into `index.html`:
  - **Plausible (recommended)**: create a site for `jitenderrathore15.github.io`, then use:
    ```html
    <script defer data-domain="jitenderrathore15.github.io" src="https://plausible.io/js/script.js"></script>
    ```
  - **GA4**: paste your gtag snippet and it will auto-track button events via `track.js`.

## Local preview
Just open `index.html` or run a static server:
```bash
python -m http.server 3000
```

## API
Client-only fetch to `https://api.exchangerate.host` for rates.