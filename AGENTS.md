# StudyGenie Agent Notes

## Workspace

- `Frontend/` and `Backend/` are independent npm projects with separate `package.json` and lockfiles. The repository root has no package scripts or workspace manifest.
- Run package commands with the package directory as the working directory. Backend `dotenv.config()` reads `.env` from the process working directory, so do not launch `Backend/src/server.ts` from the repository root.
- Frontend entrypoints are under `Frontend/src/app` (Next.js App Router); API calls belong in `Frontend/src/services`.
- Backend startup is `Backend/src/server.ts`; Express middleware is wired in `Backend/src/app.ts`, and routes are mounted under `/api/v1` in `Backend/src/routes/index.ts`.

## Commands

Run these from `Frontend/`:

```text
npm ci
npm run dev       # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
npm start         # requires a successful build
```

Run these from `Backend/`:

```text
npm ci
npm run dev       # tsx watch, http://localhost:5000
npm run lint
npm run typecheck
npm run build
npm start         # serves dist/server.js
```

- Neither package defines a test script or test runner. Use `docs/15-Test-Cases.md` for the manual test matrix and start MongoDB plus both dev servers for integration/auth testing.
- The backend must connect to MongoDB before it listens. Missing configuration or a failed database connection exits the process.
- Verify backend availability at `GET http://localhost:5000/api/v1/health`.

## Environment

- Create `Backend/.env` from `Backend/.env.example`. `Backend/src/config/env.ts` requires `PORT`, `CLIENT_URL`, `MONGODB_URI`, `DATABASE_NAME`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `GEMINI_API_KEY` at startup.
- Google OAuth is enabled only when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set. `GEMINI_API_KEY` is still required even when working on non-AI routes.
- Frontend API configuration is `NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:5000/api/v1`; local frontend settings belong in `Frontend/.env.local`.
- `Frontend/.gitignore` ignores all `.env*` files, including `.env.example`; do not assume a frontend example file is tracked. Never commit secrets.

## API And Auth

- The frontend must call the Express API and must never call Gemini directly. Backend AI integrations belong behind API routes and keep credentials server-side.
- Better Auth is mounted at `/api/v1/auth`. The frontend currently uses `/sign-up/email`, `/sign-in/email`, `/sign-in/social`, `/get-session`, and `/sign-out`, not the placeholder `/register` and `/login` paths shown in older API prose.
- Auth is cookie-based. Keep Axios `withCredentials: true`, Express CORS `credentials: true`, and matching `CLIENT_URL` when changing auth or API code.
- Current route wiring exposes health, Better Auth, and material routes. `Backend/src/routes/material.routes.ts` currently implements public `GET /materials` and `GET /materials/:id`; do not assume planned CRUD, AI, chat, analytics, or user routes exist without checking source.
- Material list query validation accepts `page`, `limit`, `search`, `subject`, `difficulty` (`Beginner`, `Intermediate`, `Advanced`), and `sort` (`newest`, `oldest`, `az`, `za`).
- Backend validation uses Zod middleware and responses use the `success`, `message`, `data`/`errors` shape from `Backend/src/utils/api-response.ts`.

## Documentation And Conventions

- Treat package scripts and source route wiring as the executable source of truth. `docs/06-API.md` and the roadmap include planned endpoints that may not be implemented yet.
- Read the relevant document before changing behavior: `docs/04-Architecture.md`, `docs/06-API.md`, `docs/14-Development-Phases.md`, `docs/15-Test-Cases.md`, or `docs/16-Environment.md`.
- Preserve the frontend/backend boundary: UI components render, frontend services fetch, and backend routes/controllers own validation and business behavior.
- TypeScript is strict in both packages; backend additionally rejects unused locals/parameters at typecheck time and rejects explicit `any` in ESLint.
- Do not commit `.env` files, build output, `.next/`, `dist/`, dependencies, or logs. Update API/environment documentation when implementation changes those contracts.
- When changing Next.js code, also follow `Frontend/AGENTS.md` and read the relevant guide under `Frontend/node_modules/next/dist/docs/` before relying on Next-specific behavior.
