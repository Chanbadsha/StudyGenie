# StudyGenie Agent Notes

## Workspace

- `Frontend/` and `Backend/` are independent npm projects. The repository root has no package scripts or workspace manifest.
- Run package commands with the package directory as the working directory. Backend `dotenv.config()` reads `.env` from the process working directory, so do not launch from the repo root.
- Frontend entrypoints: `Frontend/src/app` (Next.js App Router). API calls live in `Frontend/src/services`, client instance at `Frontend/src/services/api.ts` (Axios, `withCredentials: true`).
- Backend entrypoints: `Backend/src/server.ts` → `Backend/src/app.ts` → routes mounted under `/api/v1` in `Backend/src/routes/index.ts`.

## Commands

Run these from `Frontend/`:

```text
npm ci                          # install
npm run dev                     # next dev, http://localhost:3000
npm run lint                    # eslint
npx tsc --noEmit                # typecheck only
npm run build                   # full production build
npm start                       # serve built app
```

Run these from `Backend/`:

```text
npm ci
npm run dev                     # tsx watch src/server.ts, http://localhost:5000
npm run lint                    # eslint src
npm run typecheck               # tsc --noEmit (also checks unused locals/params)
npm run build                   # tsc → dist/
npm start                       # node dist/server.js
npm run seed                    # tsx src/seed.ts — seed database
```

- No test runner configured. Use `docs/15-Test-Cases.md` for manual test matrix. Start MongoDB + both dev servers for integration/auth testing.
- Backend connects to MongoDB before listening; exits on failure. Health: `GET /api/v1/health`.
- Backend uses **in-memory** rate limiting (`Backend/src/middlewares/rate-limit.middleware.ts`) and response caching (`Backend/src/middlewares/cache.middleware.ts`). No Redis. Cache and rate-limit state are per-process and lost on restart.

## Environment

- Create `Backend/.env` from `Backend/.env.example`. Required at startup: `PORT`, `CLIENT_URL`, `MONGODB_URI`, `DATABASE_NAME`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GEMINI_API_KEY`.
- Google OAuth is enabled only when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set.
- Frontend API base: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5000/api/v1` in `Frontend/src/constants/api.ts`). Local frontend env in `Frontend/.env.local`.
- `Frontend/.gitignore` ignores all `.env*` files, including `.env.example`. Never commit secrets.

## API / Routes

All routes mount under `/api/v1`:

| Prefix | Auth | Implemented endpoints |
|--------|------|-----------------------|
| `/auth` | — | Better Auth handler (email sign-up/in, Google OAuth, session, sign-out) |
| `/ai` | required | `POST /notes`, `GET /history`, `DELETE /history/:id` |
| `/chat` | required | `POST /sessions`, `GET /sessions`, `GET /sessions/:id`, `POST /messages`, `DELETE /sessions/:id` |
| `/materials` | mixed | `GET /` (public, paginated), `GET /mine` (auth), `GET /:id` (public), `POST /` (auth), `DELETE /:id` (auth) |
| `/analytics` | required | `GET /dashboard`, `GET /subjects`, `GET /progress` |
| `/blog` | — | `GET /`, `GET /:slug` |

- Frontend auth endpoints used (`auth.service.ts`): `/auth/sign-up/email`, `/auth/sign-in/email`, `/auth/sign-in/social`, `/auth/get-session`, `/auth/sign-out`.
- Query params for `GET /materials` and `GET /materials/mine`: `page`, `limit` (positive ints), `search` (max 100 chars), `subject` (max 50), `difficulty` (`Beginner`|`Intermediate`|`Advanced`), `sort` (`newest`|`oldest`|`az`|`za`).
- Validation: Zod middleware (`Backend/src/middlewares/validate.middleware.ts`). Responses use `{ success, message, data?, errors? }` shape from `Backend/src/utils/api-response.ts`.
- Rate limits applied per-route: e.g. AI notes 20/hr, chat messages 60/hr, materials 30-60/min. Auth routes 30/min.

## Conventions

- Treat package scripts and route source (`Backend/src/routes/`) as executable truth over `docs/` prose. `docs/06-API.md` and `docs/14-Development-Phases.md` describe planned endpoints that may not match current wiring.
- UI renders, frontend services fetch, backend owns validation + business logic. Frontend never calls Gemini directly.
- Backend TypeScript: strict, `noUnusedLocals`, `noUnusedParameters`, `noImplicitAny`, ESLint `no-explicit-any` error. Frontend: strict but less restrictive lint.
- Ignored by `.gitignore` (root and package-local): `.env*`, `node_modules/`, `.next/`, `dist/`, `*.log`, build output.
- When changing Next.js code, also read `Frontend/AGENTS.md` and check `Frontend/node_modules/next/dist/docs/` for API changes.
