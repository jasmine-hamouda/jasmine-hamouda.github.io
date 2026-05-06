# Jasmine Hamouda — Portfolio & Resume Website

Personal portfolio and resume site for Jasmine Hamouda — IT student (Data Analytics & IoT) and HR & systems professional based in Brisbane, QLD.

**Live site:** https://jasmine-hamouda.github.io

---

## About

This site showcases my professional background, technical skills, and academic projects. It is built with vanilla HTML, CSS, and JavaScript — no frameworks or dependencies — following web best practices for accessibility, performance, and SEO.

---

## Features

- Responsive layout — works on mobile, tablet, and desktop
- Dark mode toggle with OS preference detection and localStorage persistence
- Scroll-reveal animations using IntersectionObserver
- Active navigation highlighting on scroll
- Contact form via Formspree (no backend required)
- SEO meta tags and Open Graph support
- WCAG AA accessible colour contrast throughout

---

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Structure  | HTML5 (semantic)    |
| Styling    | CSS3 (custom properties, grid, flexbox) |
| Behaviour  | Vanilla JavaScript (ES6+) |
| Fonts      | DM Sans + DM Serif Display (Google Fonts) |
| Forms      | Formspree           |
| Hosting    | GitHub Pages        |

---

## Project Structure

```
jasmine-hamouda.github.io/
├── index.html              # Main page
├── README.md               # This file
├── .gitignore              # Files excluded from Git
└── assets/
    ├── css/
    │   └── styles.css      # All styles, organised by section
    ├── js/
    │   └── main.js         # All JavaScript, organised by feature
    └── images/
        └── photo.png       # Profile photo
```

---

## Setup & Running Locally

No build tools or installs required. Just open `index.html` in a browser:

```bash
# Clone the repo
git clone https://github.com/jasmine-hamouda/jasmine-hamouda.github.io.git

# Open in browser
open index.html
# or drag index.html into your browser
```

---

## Activating the Contact Form

The contact form uses [Formspree](https://formspree.io) — free for personal use.

1. Sign up at formspree.io
2. Create a new form
3. Copy your form ID (looks like `xabcdefg`)
4. In `index.html`, find this line and replace `YOUR_FORM_ID`:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

---

## Adding / Updating Your Photo

1. Name your photo `photo.png` (or `photo.jpg`)
2. Place it in `assets/images/`
3. Upload both to your GitHub repo
4. The `index.html` already references `assets/images/photo.png`

---

## Deployment

This site is hosted via **GitHub Pages** and deploys automatically on every push to `main`.

To deploy:
1. Push changes to the `main` branch
2. GitHub Actions builds and publishes automatically
3. Changes are live at https://jasmine-hamouda.github.io within ~1 minute

---

## Commit Convention

This project follows conventional commits:

```
feat: add new section or feature
fix: fix a bug or broken element
update: update existing content
style: visual or design changes
refactor: restructure code without changing behaviour
docs: update README or comments
chore: housekeeping, file moves, renames
```

---

## Licence

© 2026 Jasmine Hamouda. All rights reserved.
