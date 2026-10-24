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

## Stack

React, Vite, Tailwind CSS 4, Framer Motion, and custom CSS variables for the two visual systems.
