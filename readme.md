# Heck Holdings — Private LLM Consulting Website

This repository contains a static multi-page marketing website for **Heck Holdings AI Consulting**, focused on private LLM deployments and workflow automation for professional-services firms.

## Tech stack

- HTML5 (multi-page site)
- CSS3 (`styles.css`)
- Vanilla JavaScript (`script.js`)

## Project structure

- `index.html` — Home page
- `services.html` — Services and offering details
- `industries.html` — Industry-specific positioning
- `portfolio.html` — Case studies / outcomes
- `about.html` — Company and founder information
- `contact.html` — Contact page with front-end form behavior
- `styles.css` — Shared site styling and design system
- `script.js` — Shared interactions (mobile nav, reveal animations, active link, contact-form UX)

## Run locally

Because this is a static site, no build step is required.

### Option 1: Open directly
Open `index.html` in your browser.

### Option 2: Serve locally (recommended)
From the repository root:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Notes

- There are currently no configured lint, build, or automated test commands in this repository.
- The contact form behavior is front-end only (no backend submission endpoint in this repo).
