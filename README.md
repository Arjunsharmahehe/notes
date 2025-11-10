# Notes

A next-level note-taking experience — featuring a rich text editor, rock-solid authentication, and seamless cloud sync. Designed for creators who live on the keyboard and crave a distraction-free workflow.

![Notes dashboard and editor preview](/public/notes-full-page.png)

---

## Table of Contents

* [Highlights](#highlights)
* [Tech Stack](#tech-stack)
* [Feature Tour](#feature-tour)
* [Architecture Overview](#architecture-overview)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Project Structure](#project-structure)
* [Development Workflow](#development-workflow)
* [Deployment Notes](#deployment-notes)
* [Troubleshooting](#troubleshooting)

---

## Highlights

* **Minimal yet powerful writing experience** — powered by TipTap with elegant typography, hotkeys, and autosave that quietly kicks in after a short pause.
* **Notebook-centric organization** — pin, filter, and fly through your content with real-time updates and buttery-smooth UI transitions.
* **Secure, modern onboarding** — full email verification, password resets, and session management driven by Better Auth.
* **Cloud-first storage** — Drizzle ORM + Neon Postgres keeps everything consistent, type-safe, and lightning-fast.
* **Inclusive design system** — Tailwind 4, Radix UI, and Lucide icons combine for a clean, accessible, and scalable design language.

---

## Tech Stack

| Layer          | Tools & Libraries                                                                |
| -------------- | -------------------------------------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router)                                   |
| Language       | TypeScript + React 19                                                            |
| Styling        | Tailwind CSS 4, custom SCSS tokens, smooth motion animations                     |
| Editor         | [TipTap](https://tiptap.dev/) with curated, production-ready extensions          |
| Auth           | [Better Auth](https://www.better-auth.com/) for email/password with verification |
| Database & ORM | Neon Serverless Postgres + [Drizzle ORM](https://orm.drizzle.team/)              |
| Email Delivery | [Resend](https://resend.com/) using React-based templates                        |
| Notifications  | [Sonner](https://sonner.emilkowal.ski/) toast system                             |
| Tooling        | pnpm, ESLint 9, TypeScript 5, Drizzle Kit migrations                             |

---

## Feature Tour

* **Rich text editor**

  * Built with TipTap — supports headings, lists, code blocks, highlights, callouts, text alignment, and intuitive shortcuts.
  * Autosaves your notes automatically after a couple seconds of inactivity, so you never lose a thought.

* **Notebook & note management**

  * Create, rename, and delete notebooks or notes effortlessly.
  * Pin your favorites — pinned items stay on top and update instantly without a reload.
  * Enjoy an ultra-responsive interface thanks to optimistic UI and animated feedback.

* **Authentication & security**

  * Email/password auth with full verification and reset flow powered by Better Auth.
  * Server-side sessions stored with Drizzle and protected by Postgres constraints for maximum reliability.

* **Responsive dashboard**

  * A smart layout that adapts to every screen size — mobile, tablet, or desktop.
  * Global theming built on shadcn-style tokens with a clean light/dark mode toggle.

* **Operational tooling**

  * End-to-end type safety via Drizzle schema inference.
  * Reusable server actions for CRUD operations with structured, graceful error handling.

---

## Architecture Overview

* **Next.js App Router** orchestrates routing, layouts, and server actions.
* **Server actions** inside `server/` handle note and notebook CRUD logic through Drizzle queries.
* **Client islands** manage instant interactions (like pinning) with zero lag.
* **Drizzle ORM** schemas live in `db/schema.ts`, enabling fully typed queries.
* **Better Auth** integrates via `lib/auth.ts` (server) and `lib/auth-client.ts` (client) with header-based session introspection.
* **Resend** delivers transactional emails using React templates in `components/emails/`.

```text
app/
├─ layout.tsx          # Root layout, theming, and providers
├─ page.tsx            # Landing page marketing site
├─ dashboard/          # Authenticated experience
│  ├─ page.tsx         # Notebook overview (server component)
│  ├─ notebook/[id]/   # Notes scoped to a specific notebook
│  └─ notes/[id]/      # Individual note editor
components/
├─ sections/             # Landing page UI blocks
├─ emails/               # React email templates
├─ dashboard-*-list.tsx  # Client components for pinning UX
├─ forms/                # Auth forms (React Hook Form + Zod)
├─ tiptap-*              # TipTap extensions and editor UI
server/
├─ notebook.ts           # Notebook CRUD actions
└─ note.ts               # Note CRUD actions
```

---

## Getting Started

1. **Install dependencies** (Node 18.18+ required):

   ```bash
   pnpm install
   ```

2. **Set environment variables** (see [Environment Variables](#environment-variables)).

3. **Run database migrations** (Neon or your Postgres setup):

   ```bash
   pnpm exec drizzle-kit generate
   pnpm exec drizzle-kit push
   ```

4. **Start the dev server**:

   ```bash
   pnpm run dev
   ```

5. Visit `http://localhost:3000` to check it out — the dashboard sits behind authentication.

---

## Environment Variables

Create a `.env` file (and `.env.local` for local overrides). Required variables:

| Variable               | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | Secret key for Better Auth.                                                  |
| `BETTER_AUTH_URL`      | Base URL of your deployment.                                                 |
| `DATABASE_URL`         | Connection string for your Postgres DB (Neon recommended).                   |
| `RESEND_API_KEY`       | API key for Resend.                                                          |
| `NEXT_PUBLIC_BASE_URL` | Public base URL for the Better Auth client (e.g. `https://your-domain.com`). |

> **Note:** Make sure all URLs in production are HTTPS — mixing HTTP with HTTPS will break session fetching. (Yeah… learned that the hard way during a demo 😅.)

---

## Project Structure

* `app/` – Routes, layouts, and server components.
* `components/` – Reusable UI elements, forms, TipTap extensions, and email templates.
* `server/` – Server actions wrapping database logic for notes & notebooks.
* `db/` – Drizzle schema, migrations, and Postgres client setup.
* `hooks/` – Custom React hooks for refined UX (refs, throttling, viewport, etc.).
* `lib/` – Auth configuration, TipTap helpers, and Better Auth integration.
* `styles/` – Global SCSS variables and animation keyframes (generated via TipTap).
* `public/` – Static assets and screenshots.

---

## Development Workflow

* **Linting**

  ```bash
  pnpm lint
  ```

* **Type checking**
  (Next.js handles this automatically on build, but you can run it manually:)

  ```bash
  pnpm exec tsc --noEmit
  ```

* **Production build**

  ```bash
  pnpm build
  ```

* **Run production server**

  ```bash
  pnpm start
  ```

---

## Deployment Notes

* Set all environment variables in your hosting provider (Vercel, Netlify, etc.) before deployment.
* Double-check that your Better Auth URLs are HTTPS — mixed content will break session calls.
* Run Drizzle migrations on the production database before the first deploy.
* Configure Resend with your custom domain and branded templates for a polished look.

---

## Troubleshooting

* **Mixed-content errors (session fetch failures)**
  Make sure both `NEXT_PUBLIC_BASE_URL` and Better Auth URLs use your HTTPS domain in production.

* **Emails not arriving**
  Verify your Resend domain is active and that `RESEND_API_KEY` has full send permissions.

* **Local migration issues**
  Check that your `DATABASE_URL` points to a reachable database and has proper privileges.

If anything else breaks, open an issue or drop a PR — contributions and curiosity are always welcome.
Happy note-taking boys!

