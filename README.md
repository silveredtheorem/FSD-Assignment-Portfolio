# sharan deepak portfolio (react + express)

RECORDING (assignment 2) - https://drive.google.com/file/d/1I8D5X53u-uCOD_I-wbh65IOr_wFzH511/view?usp=sharing

Assignment 3 for CS1303 (Full Stack Development) — the React frontend from
assignment 2 now talks to a real Node.js/Express backend in [`/server`](server).
Navbar, routing, theme toggle, and page structure are unchanged; what changed
is the *data source*: the project list and the contact form no longer live
purely in the browser — they're served by, and persisted on, the API.

---

## running it locally (two servers, two terminals)

**1. backend** — from `/server`:

```bash
cd server
cp .env.example .env    # first time only
npm install
npm run dev              # http://localhost:5050
```

**2. frontend** — from the repo root:

```bash
cp .env.example .env     # first time only
npm install
npm run dev               # http://localhost:5173
```

Both `.env` files are already filled with working local defaults (backend on
port `5050`, frontend pointed at `http://localhost:5050`) — copying the
example files is enough, no values need editing to run locally. Port `5000`
is deliberately avoided since macOS reserves it for AirPlay Receiver.

Other frontend scripts:

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint        # oxlint
```

Other backend scripts (run from `/server`):

```bash
npm start     # node index.js, no auto-reload
npm run dev    # node --watch index.js
```

---

## backend (`/server`)

Plain Express, no framework beyond that. Configuration comes entirely from
environment variables loaded via `dotenv` — see
[`server/.env.example`](server/.env.example):

| Variable | Meaning | Local default |
|---|---|---|
| `PORT` | port the API listens on | `5050` |
| `ALLOWED_ORIGIN` | the one origin allowed to call the API (CORS) | `http://localhost:5173` |
| `BASE_URL` | base URL used to build absolute links to the statically-served project images | `http://localhost:5050` |
| `CONTACTS_DATA_FILE` | path to the JSON file contact submissions are persisted to | `./data/contacts.json` |

**Storage choice:** no database — project data is a plain JS array
([`server/data/projects.js`](server/data/projects.js)), and contact
submissions are persisted to a flat JSON file
([`server/data/contacts.json`](server/data/contacts.json)) read/written with
`fs`. That's sufficient for this assignment's scope and keeps `/server`
dependency-free beyond `express`, `cors`, and `dotenv`.

**`GET /api/contact` is intentionally unauthenticated.** It exists purely so
graders can verify that `POST /api/contact` submissions were actually
persisted, without needing DB access. There is no auth on this route — don't
put real secrets through this contact form.

### API reference

#### `GET /` — health check
```
curl -s http://localhost:5050/
→ 200 { "status": "ok" }
```

#### `GET /api/projects` — list all projects
```
curl -s http://localhost:5050/api/projects
→ 200 [ { "id": "melody-lab", "title": "melody lab", "techStack": [...], "image": "http://localhost:5050/images/melody-lab.svg", "links": {...}, ... }, ... ]
```

#### `GET /api/projects/:id` — one project
```
curl -s http://localhost:5050/api/projects/whale-sentry
→ 200 { "id": "whale-sentry", "title": "whale sentry", ... }

curl -s http://localhost:5050/api/projects/does-not-exist
→ 404 { "error": "Project not found" }
```

#### `POST /api/contact` — submit the contact form
```
curl -s -X POST http://localhost:5050/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com","message":"hi there"}'
→ 201 { "message": "thanks, your message has been received", "submission": { "id": "...", "name": "Jane Smith", "email": "jane@example.com", "message": "hi there", "receivedAt": "2026-09-14T18:18:42.472Z" } }
```

Failure cases (all `400`, one field-specific error each):
```
curl -s -X POST http://localhost:5050/api/contact -H "Content-Type: application/json" -d '{"email":"jane@example.com","message":"hi"}'
→ 400 { "error": "name is required" }

curl -s -X POST http://localhost:5050/api/contact -H "Content-Type: application/json" -d '{"name":"Jane","message":"hi"}'
→ 400 { "error": "email is required" }

curl -s -X POST http://localhost:5050/api/contact -H "Content-Type: application/json" -d '{"name":"Jane","email":"not-an-email","message":"hi"}'
→ 400 { "error": "email must be a valid email address" }

curl -s -X POST http://localhost:5050/api/contact -H "Content-Type: application/json" -d '{"name":"Jane","email":"jane@example.com"}'
→ 400 { "error": "message is required" }
```

#### `GET /api/contact` — list all submissions (open endpoint, see note above)
```
curl -s http://localhost:5050/api/contact
→ 200 [ { "id": "...", "name": "Jane Smith", "email": "jane@example.com", "message": "hi there", "receivedAt": "..." }, ... ]
```

#### Cross-cutting: 404s and server errors
```
curl -s http://localhost:5050/api/doesnotexist
→ 404 { "error": "Route not found: GET /api/doesnotexist" }

curl -s -X POST http://localhost:5050/api/contact -H "Content-Type: application/json" -d '{bad json'
→ 400 { "error": "malformed JSON in request body" }
```
Every response above is JSON — the catch-all 404 handler and the global
error-handling middleware in [`server/middleware`](server/middleware) mean
no route ever falls through to Express's default HTML error page, and no
thrown error crashes the process.

Every command above is also collected in one runnable script,
[`server/curl-examples.sh`](server/curl-examples.sh) — the actual curl-commands
deliverable for B1–B7 (including one failure case per validated endpoint).
Run it with the server up:

```bash
cd server && npm run dev &
./curl-examples.sh
```

---

## folder structure

```
server/                     — Express API, see "backend" section above
├── index.js                  — entry point: loads .env, starts app.listen
├── app.js                     — express app: cors, json body parsing, routes, error handling
├── routes/
│   ├── projects.routes.js       — GET /api/projects, GET /api/projects/:id
│   └── contact.routes.js        — POST /api/contact, GET /api/contact
├── middleware/
│   ├── notFound.js               — catch-all 404 JSON handler
│   └── errorHandler.js           — global error-handling middleware
├── data/
│   ├── projects.js                — the 3 projects, now the backend's single source of truth
│   └── contacts.json              — flat-file storage for contact submissions
└── public/images/*.svg       — project banners, served statically at /images/*

src/
├── main.jsx              — mounts <App/> inside <BrowserRouter>
├── App.jsx                — route table + ThemeProvider
├── index.css               — design tokens, reset, shared .btn/.section classes
├── lib/
│   └── api.js               — fetch wrapper: fetchProjects, fetchProject, submitContactForm
├── context/
│   └── ThemeContext.jsx    — dark/light state, lifted above the router
├── components/             — reusable, prop-driven pieces
│   ├── Layout.jsx           — Navbar + <Outlet/> + Footer, shared across every route
│   ├── Navbar.jsx / .css
│   ├── Footer.jsx / .css
│   ├── ThemeToggle.jsx / .css
│   ├── ProjectCard.jsx / .css
│   ├── TechStackList.jsx    — grandchild of ProjectCard, see prop drilling below
│   ├── Skills.jsx / .css
│   └── ContactForm.jsx / .css
├── pages/                  — one file per route
│   ├── Home.jsx / .css       — fetches the featured project from the API for its teaser card
│   ├── About.jsx / .css
│   ├── Projects.jsx           — fetches the full project list from the API
│   ├── ProjectDetail.jsx / .css — fetches one project by :projectId from the API
│   ├── Contact.jsx
│   └── NotFound.jsx / .css
└── assets/
    └── hero-bg.jpg           — same photo as assignment 1 (project banners now live in /server/public/images)
```

---

## component tree & why state lives where it does

```
main.jsx
└── BrowserRouter
    └── App (ThemeProvider wraps everything)
        └── Layout          — Navbar, <Outlet/>, Footer live here so they
        │                      persist across every route change
        ├── Home
        ├── About
        │   └── Skills
        ├── Projects
        │   └── ProjectCard × 3
        │       └── TechStackList
        ├── ProjectDetail (reads :projectId via useParams)
        │   └── TechStackList
        ├── Contact
        │   └── ContactForm
        └── NotFound
```

**Theme state lives in `App`** (technically in `ThemeContext`, provided just
above the router) because both the navbar's toggle button and every page's
background color need it, and those are siblings — lifting to a common
ancestor is the only way that works without threading a prop through `Layout`,
`Outlet`, and six page components. Context was the right call here since it's
truly global, unlike the other two state pieces below, which are local to a
single form or a single card.

**Contact form state stays inside `ContactForm`.** Nothing else in the app
needs to know what's currently typed in the message box, so lifting it
anywhere would just be extra plumbing for no benefit.

**The "view details" toggle stays inside each `ProjectCard` instance.** This
one's a deliberate demonstration: three `<ProjectCard>` elements get rendered
from the same array in `Projects.jsx`, but expanding card #1 doesn't touch
cards #2 or #3, because `useState` inside a component is scoped per instance,
not per component definition.

**Prop drilling, two levels deep:** `Projects.jsx` (page) fetches the project
array from `GET /api/projects` and spreads each project object as props into
`<ProjectCard>` (child). `ProjectCard` doesn't use `techStack` itself — it
just forwards it one level further into `<TechStackList techStack={...}>`
(grandchild), which is the thing that actually renders the tag pills. Same
pattern reused on the `ProjectDetail` page.

---

## useEffect hooks, and why each one exists

| Where | What it does | Why it needs `useEffect` |
|---|---|---|
| `pages/Home.jsx` | On mount, `fetchProjects()` to find the featured project for the teaser card; flips a `loading` boolean while pending | Real network request replaces the old fake `setTimeout` — the loading screen now reflects an actual fetch, not a simulated delay. Guards state updates with a `cancelled` flag so a fast nav-away doesn't call `setState` after unmount. |
| `pages/Projects.jsx` | On mount, `fetchProjects()`; tracks `loading` and `error` state | Backs the loading spinner (F1) and the error message shown if the API is unreachable (F2). Same `cancelled`-flag cleanup pattern. |
| `pages/ProjectDetail.jsx` | Re-runs whenever `projectId` changes; `fetchProject(projectId)` | Navigating between two project detail URLs must re-fetch — this is the one effect in the app with a non-empty dependency array. A `null` result (404) renders "not found"; a thrown error renders a distinct error message. |
| `context/ThemeContext.jsx` | Runs whenever `theme` changes; sets `data-theme` on `<html>` and writes it to `localStorage` | Theme is read back on the *next* load via a lazy `useState` initializer (`getInitialTheme`), and persisted on every change here so a refresh doesn't reset to dark. |
| `components/Navbar.jsx` | Adds a `resize` listener on mount, empty `[]` dep array; closes the mobile menu if the viewport grows past 768px | Needed so the hamburger menu can't get stuck open if someone rotates a tablet or resizes the window with it open. Removes the listener on unmount — this is the one required to have cleanup, and it does. |

---

## responsive breakpoints

Same two as assignment 1: tablet at `768px`, mobile at `480px`. The navbar
additionally collapses into a hamburger menu below 768px, driven by the
`resize`-listener effect above.

---

## accessibility

Carried forward from assignment 1: skip link, one `<h1>` per page, `aria-*`
labelling on nav/sections/forms, `:focus-visible` rings everywhere, and
`rel="noopener noreferrer"` on every external link. Colors are the same
tokens from the original stylesheet (verified WCAG AA there), duplicated into
a light theme with contrast checked the same way.

---

## known gaps (intentional, for this assignment)

- No database and no auth on any route, `GET /api/contact` included — see
  "storage choice" and the open-endpoint note in the backend section above.
  Both are explicitly out of scope for this assignment.
