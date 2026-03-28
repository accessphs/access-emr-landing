# Access EMR Landing

React landing page for Access EMR (Electronic Medical Records), built with Vite + TypeScript.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`.

## Project structure

- `src/pages/LandingPage.tsx` — main landing page (move your content here)
- `src/App.tsx` — app shell and routes
- `src/index.css` — global styles
- Use `@/` to import from `src/` (e.g. `import { X } from '@/components/X'`)

## Tech stack

- **React 18** + TypeScript
- **Vite** for dev server and build
- **React Router** for routing (add more routes in `App.tsx` as needed)
