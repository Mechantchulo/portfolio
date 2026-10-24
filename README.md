# Erick Mutua portfolio

A single-page React portfolio with two persistent visual modes: an interactive cybersecurity terminal and a stark builder layout. Both modes use the same content in `src/content.js`.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with `npm run build`. Preview it with `npm run preview`.

## Personalize

Edit `src/content.js` to refine the project and experience entries. Each project has a `title`, `category`, `description`, `tags`, and optional public `url`. The site includes Erick's email, LinkedIn, and GitHub links. The hero links to the PDF at `public/cv/erick_cv.pdf` with a download button.

The credentials carousel reads the `certificates` array in the same file. It shows the Connected Africa Summit 2026 CTF award and AI Summit 2025 Hackathon participation certificate. Both images are stored in `public/certificates/`.

The terminal supports `help`, `whoami`, `ls projects`, `cat skills.txt`, `history`, `nmap me`, `sudo su`, `cat flag.txt`, `clear`, `reboot`, and `startx`. The port scan is a timed simulation and makes no network requests. The project and skills output read from the same data as the rest of the page. `reboot` and `startx` animate into Builder Mode. The selected mode is saved in local storage.

## Search and verification

`index.html` contains page metadata, structured data, and a static content fallback so crawlers without JavaScript can read the biography and projects. When project details change in `src/content.js`, update the fallback in `index.html` too. Files in `public/` are copied to the deployment root, including `robots.txt`, `sitemap.xml`, `404.html`, and `googlea261ac5bdd112ac0.html` for Google Search Console verification.

Before sharing the site, add a real 1200×630 `public/og.png` featuring Erick's name and photo. The current social and Person structured-data image URLs point to that path. The `google-site-verification` meta value is deliberately `PASTE_TOKEN_HERE`; use the included HTML file for verification or replace the value with a token from Search Console. Enable Vercel Web Analytics in the project dashboard for its script to collect data. Update the sitemap's `lastmod` when the page content changes.

## Stack

React, Vite, Tailwind CSS 4, Framer Motion, and custom CSS variables for the two visual systems.
