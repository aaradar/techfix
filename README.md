# TechFix — Computer Repair & Custom Builds

A service website for a computer repair and custom build shop, built as part of a UI/UX Design course at the University of Ottawa.

🔗 **Live site:** [https://aaradar.github.io/techfix/](https://aaradar.github.io/techfix/)

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, service overview, booking form |
| `/bookings` | Calendar view of submitted bookings |
| `/tickets` | Detailed ticket management |
| `/shop` | Drawing tablets — Wacom, XP-Pen, Huion |

## Tech Stack

- **React 18** + **React Router 6**
- **Vite** — build tool
- **CSS custom properties** — design tokens, no UI framework
- **localStorage** — persists booking tickets across pages
- **GitHub Pages** — hosting

## Running Locally

```bash
yarn install
yarn start
```

Opens at `http://localhost:5173/techfix/`

## Deploying

```bash
git add .
git commit -m "describe change"
git push
yarn deploy
```
