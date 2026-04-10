# Vascular Hemodynamics Lab Website Template

This repository now contains a simple static website proof of concept for a lab website.

## What is in this repo?

- `index.html`: the page structure and text content
- `styles.css`: the visual design, layout, colors, and responsive behavior
- `script.js`: a small amount of interactivity for the mobile menu and scroll-in animations

## Why this approach?

This version uses plain HTML, CSS, and JavaScript, which is a good starting point when you are new to coding because:

- it is easy to host on GitHub Pages
- there is no build step
- each file has a clear purpose
- you can learn by editing the text and styles directly

## How to preview the site

### Option 1: Open the file directly

Open `index.html` in your browser. This is the fastest way to preview the template.

### Option 2: Use a local server

If you want a more realistic preview, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## How to publish on GitHub Pages

1. Push these files to your GitHub repository.
2. Open your repository on GitHub.
3. Go to **Settings**.
4. Click **Pages** in the left sidebar.
5. Under **Build and deployment**, choose:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
6. Save the settings.
7. Wait a minute or two for GitHub to publish the site.

GitHub will then give you a public website URL.

## Good next steps

- Replace placeholder names, email addresses, and research descriptions
- Add your university branding, logo, and real team members
- Add a separate publications page later if your list gets long
- Add images from your lab, figures, or diagrams

## Beginner editing tips

- If you want to change wording, edit `index.html`
- If you want to change colors or spacing, edit `styles.css`
- If you want to avoid JavaScript for now, you can keep `script.js` as-is and ignore it until later
