# Kausthub Satluri — Personal Website

Portfolio site built with **React 19 + Vite**, deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint     # eslint
```

The dev server always shows the live site (the maintenance gate is bypassed in dev).

## Project structure

```
src/
├── App.jsx              Routes + the "Under Repair" maintenance gate
├── main.jsx             App entry point
├── index.css           Global styles + design tokens (CSS variables) + buttons
├── components/
│   ├── Layout.jsx       Page shell: textured hero background + Header + Footer
│   ├── Header.jsx       Sticky nav (Home / Projects)
│   ├── Footer.jsx       Copyright + social links
│   └── Maintenance.jsx  "Under Repair" screen
├── pages/
│   ├── Home.jsx         Hero + featured projects grid
│   ├── Projects.jsx     Full project list
│   └── ProjectDetail.jsx  Single project (/projects/:id)
└── data/
    └── projects.json   Project content — edit this to add/change projects
```

Each component has a sibling `.css` file. Colors, spacing, and typography are
driven by CSS variables defined at the top of `src/index.css`.

## Content

Projects are data-driven: add an entry to `src/data/projects.json` (with a
unique numeric `id`) and it shows up on both the home page and `/projects`
automatically — no component changes needed.

## Maintenance mode

`src/App.jsx` has a `MAINTENANCE_MODE` flag. While `true`, the live site shows
the "Under Repair" screen. Flip it to `false` to go live. On the live site,
`?preview` bypasses the gate (and remembers you); `?live` re-enables it.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. `public/404.html` handles SPA routing so
deep links (e.g. `/projects/2`) resolve correctly.
