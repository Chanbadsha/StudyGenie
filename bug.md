# StudyGenie — Full Codebase Bug Report

> Comprehensive bug, error, and issue audit of the entire StudyGenie codebase.
> Generated from a full read of all 92 source files (22 Backend + 70 Frontend).

---

## Table of Contents

1. [Backend Bugs](#backend-bugs)
2. [Frontend Bugs](#frontend-bugs)
3. [Security Issues](#security-issues)
4. [Architecture / Missing Implementation Issues](#architecture--missing-implementation-issues)
5. [Minor / Code Quality Issues](#minor--code-quality-issues)

---

## Backend Bugs

### BUG-B01: Database event handlers registered AFTER connection
**File:** `Backend/src/config/database.ts:16-22`  
**Severity:** Medium  
**Description:** The `mongoose.connection.on('error')` and `on('disconnected')` event handlers are registered AFTER `await mongoose.connect()` completes. If the connection fails, the error handlers won't catch it.  
**Solution:** Move the event handler registrations ABOVE the `await mongoose.connect()` call, so they are in place before any connection attempt.

```ts
// BEFORE (buggy)
export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.mongodbUri, { dbName: env.databaseName });
    logger.info('Connected to MongoDB');
  } catch (error) { ... }
  // Too late — connection already succeeded or failed
  mongoose.connection.on('error', (error) => { ... });
  mongoose.connection.on('disconnected', () => { ... });
}

// AFTER (fixed)
export async function connectDatabase(): Promise<void> {
  mongoose.connection.on('error', (error) => { ... });
  mongoose.connection.on('disconnected', () => { ... });
  try {
    await mongoose.connect(env.mongodbUri, { dbName: env.databaseName });
    logger.info('Connected to MongoDB');
  } catch (error) { ... }
}
```

---

### BUG-B02: ObjectId validation/cast uses fragile double-cast
**File:** `Backend/src/utils/object-id.ts:4,8`  
**Severity:** Low  
**Description:** The `isValid` and `toObjectId` functions use complex `unknown` casts that are unnecessary and fragile. Mongoose 8 exposes `isValid` and ObjectId constructors directly.  
**Solution:** Replace with direct Mongoose methods:

```ts
import mongoose from 'mongoose';

export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export function toObjectId(id: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}
```

---

### BUG-B03: Material routes missing POST and DELETE handlers
**File:** `Backend/src/routes/material.routes.ts`  
**Severity:** High  
**Description:** Frontend `material.service.ts` calls `api.post('/materials')` for creating and `api.delete('/materials/:id')` for deleting, but the backend only defines GET routes. These will 404.  
**Solution:** Add the missing routes:

```ts
import { requireAuth } from '../middlewares/auth.middleware';

router.post('/', requireAuth, asyncHandler(createMaterial));
router.delete('/:id', requireAuth, asyncHandler(deleteMaterial));
```

---

### BUG-B04: No AI, Chat, or Analytics routes exist in backend
**File:** Backend `routes/` directory  
**Severity:** High  
**Description:** Frontend services call these non-existent endpoints:
- `ai.service.ts`: `POST /ai/notes`, `GET /ai/history`, `DELETE /ai/history/:id`
- `chat.service.ts`: `GET /chat/sessions`, `GET /chat/sessions/:id`, `POST /chat/sessions`, `POST /chat/messages`, `DELETE /chat/sessions/:id`
- `analytics.service.ts`: `GET /analytics/dashboard`, `GET /analytics/charts`

All will 404.  
**Solution:** Implement these route files and controllers as specified in the project docs.

---

### BUG-B05: Auth middleware trusts client-supplied header (CRITICAL SECURITY)
**File:** `Backend/src/middlewares/auth.middleware.ts:9`  
**Severity:** Critical  
**Description:** `requireAuth` reads `x-user-id` from request headers. Any client can forge this header to impersonate any user. Per AGENTS.md: "Never trust client-provided user IDs. Always derive the authenticated user from the verified session."  
**Solution:** Replace with Better Auth session verification:

```ts
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = getAuth();
  // Use Better Auth to verify the session from cookies
  // Extract userId from the verified session, not from headers
}
```

---

### BUG-B06: Regex injection vulnerability in search
**File:** `Backend/src/controllers/material.controller.ts:22-25`  
**Severity:** Medium  
**Description:** User-provided `search` string is passed directly to MongoDB `$regex` without escaping special characters. Attackers can inject regex patterns to cause ReDoS or unexpected matches.  
**Solution:** Escape regex special characters before using in query:

```ts
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (search) {
  const escaped = escapeRegex(search);
  filter.$or = [
    { title: { $regex: escaped, $options: 'i' } },
    { shortDescription: { $regex: escaped, $options: 'i' } },
  ];
}
```

---

### BUG-B07: Rate limiter memory leak and prevent-exit
**File:** `Backend/src/middlewares/rate-limit.middleware.ts:13-20`  
**Severity:** Medium  
**Description:** 
1. `setInterval` runs forever without `unref()` — can prevent Node.js process from exiting gracefully.
2. The `store` Map grows unbounded between cleanup intervals.
**Solution:**

```ts
const interval = setInterval(() => { ... }, CLEANUP_INTERVAL);
interval.unref(); // Don't prevent process exit
```

---

### BUG-B08: Better Auth session handler bypasses standard response format
**File:** `Backend/src/routes/auth.routes.ts:7-14`  
**Severity:** Medium  
**Description:** `toNodeHandler(auth)(req, res)` sends raw Better Auth responses, not the standard `{ success, message, data }` format. Frontend `getSession()` expects a consistent response structure.  
**Solution:** Wrap the auth handler or ensure frontend correctly handles the raw response format.

---

### BUG-B09: No input validation on any backend routes
**File:** `Backend/src/routes/material.routes.ts`  
**Severity:** Medium  
**Description:** No validation middleware is applied to any routes. Query parameters (page, limit, search, etc.) are not validated. No rate limiting is applied to any routes.  
**Solution:** Add `validate()` middleware and `rateLimit()` to routes.

---

### BUG-B10: `noUnusedLocals`/`noUnusedParameters` may fail on backend
**File:** `Backend/tsconfig.json:17-18`  
**Severity:** Low  
**Description:** `noUnusedLocals: true` and `noUnusedParameters: true` are strict settings. The `_req` and `_next` parameters in error middleware use underscore prefix convention to suppress warnings, but this only works if ESLint is configured to respect it. Should verify backend compiles cleanly.  
**Solution:** Run `npm run typecheck` in Backend to verify.

---

## Frontend Bugs

### BUG-F01: Material details page type mismatch — unwrapping wrong level
**File:** `Frontend/src/app/materials/[id]/page.tsx:28-31`  
**Severity:** High  
**Description:** `materialService.getById(id)` returns `response.data` which is `{ success, message, data: material }`. The query does `return response.data` which is the material object. But the type `StudyMaterial` expects `id` field — Mongoose returns `_id`. The `id` virtual may or may not be present depending on Mongoose config.  
**Solution:** Either:
1. Use `response.data.data` in the service to unwrap the API envelope
2. Or add `toJSON: { virtuals: true }` to the Material model (already default in Mongoose 8)

Actually, `response.data` from axios is the full JSON body `{ success, message, data: material }`. So `response.data.data` gives the actual material. The current code `return response.data` returns `{ success, message, data: material }` — NOT the material itself. This is a bug.

**Fix in `material.service.ts`:**
```ts
async getById(id: string) {
  const response = await api.get(`/materials/${id}`);
  return response.data.data; // Unwrap the API envelope
},
```

Same fix needed for `getAll`:
```ts
async getAll(params?: MaterialQueryParams) {
  const response = await api.get('/materials', { params });
  return response.data.data; // Unwrap: { materials, pagination }
},
```

---

### BUG-F02: `useStudyMaterials` response unwrapping is wrong
**File:** `Frontend/src/hooks/useStudyMaterials.ts:21-24`  
**Severity:** High  
**Description:** `materialService.getAll(params)` currently returns the full API response `{ success, message, data: { materials, pagination } }`. The hook does `return response.data` which would be the API response object, not `{ materials, pagination }`.  
**Solution:** Fix `materialService.getAll` to unwrap the envelope (see BUG-F01 fix), or fix the hook to use `response.data.data`.

---

### BUG-F03: Popular materials section type mismatch
**File:** `Frontend/src/components/sections/popular-materials-section.tsx:17-25`  
**Severity:** Medium  
**Description:** `materialService.getAll` returns the full API response. `data?.materials` would be undefined because `data` is `{ success, message, data: { materials, pagination } }`.  
**Solution:** Fix `materialService.getAll` to unwrap the envelope.

---

### BUG-F04: Dashboard hardcodes all stats to 0
**File:** `Frontend/src/app/dashboard/page.tsx:91-115`  
**Severity:** Medium  
**Description:** Study Materials, AI Notes, and AI Chats counts are hardcoded to `0`. Should fetch from analytics API.  
**Solution:** Use `analyticsService.getDashboard()` to fetch real stats.

---

### BUG-F05: Dashboard RECENT_MATERIALS is always empty array
**File:** `Frontend/src/app/dashboard/page.tsx:39-44`  
**Severity:** Medium  
**Description:** `RECENT_MATERIALS` is hardcoded as `[]`. Should fetch recent materials from API.  
**Solution:** Use `materialService.getAll({ limit: 5, sort: 'newest' })` to fetch.

---

### BUG-F06: Dashboard links to non-existent pages
**File:** `Frontend/src/app/dashboard/page.tsx:20-36, 142`  
**Severity:** Medium  
**Description:** Quick actions link to routes that don't exist yet:
- `/materials/add` — no page
- `/ai/notes` — no page
- `/ai/chat` — no page
- `/materials/manage` — no page  
**Solution:** Implement these pages or remove the links until they're ready.

---

### BUG-F07: Contact form is a dummy — no API call
**File:** `Frontend/src/app/contact/page.tsx:87-108`  
**Severity:** Low  
**Description:** `handleSubmit` just waits 1 second and shows success. No actual API call is made.  
**Solution:** Implement a backend endpoint (e.g., `POST /contact`) or use a third-party service, then call it from the form.

---

### BUG-F08: Newsletter form is a dummy — no API call
**File:** `Frontend/src/components/sections/newsletter-section.tsx:13-18`  
**Severity:** Low  
**Description:** `handleSubmit` only sets local state `submitted = true`. No API call.  
**Solution:** Implement a backend endpoint (e.g., `POST /newsletter/subscribe`) or use a third-party mailing list service.

---

### BUG-F09: Blog page category filters are non-functional
**File:** `Frontend/src/app/blog/page.tsx:73-83`  
**Severity:** Low  
**Description:** Category filter buttons are rendered but have no `onClick` handler. Clicking them does nothing.  
**Solution:** Add state for selected category and filter `BLOG_POSTS` accordingly.

---

### BUG-F10: `prose` class requires `@tailwindcss/typography` plugin
**File:** `Frontend/src/app/materials/[id]/page.tsx:116`  
**Severity:** Medium  
**Description:** `<div className="prose prose-sm prose-gray ...">` uses Tailwind Typography plugin classes. The plugin is not in `package.json`.  
**Solution:** Either install `@tailwindcss/typography` or replace `prose` classes with custom styles.

---

### BUG-F11: Auth session query may cause infinite redirect loop
**File:** `Frontend/src/services/api.ts:12-22`  
**Severity:** High  
**Description:** The axios interceptor redirects to `/login` on any 401 response. The `useSession` hook calls `authService.getSession()` on every page load. If Better Auth returns 401 for unauthenticated users, this triggers the interceptor, which redirects to `/login`, where `useSession` is called again — creating an infinite redirect loop.  
**Solution:** Either:
1. Exclude the `/auth/get-session` endpoint from the 401 interceptor
2. Or ensure Better Auth returns 200 with null data (not 401) for missing sessions

```ts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isSessionRequest = error.config?.url?.includes('/auth/get-session');
    if (error.response?.status === 401 && !isSessionRequest) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

---

### BUG-F12: Protected route flashes null content
**File:** `Frontend/src/components/auth/protected-route.tsx:17-35`  
**Severity:** Low  
**Description:** `useEffect` runs after render, so there's a brief flash where `user` is null before the redirect happens.  
**Solution:** Use Next.js middleware for route protection instead of client-side checks, or show a loading state during the redirect.

---

### BUG-F13: `useLogout` uses `queryClient.clear()` — too aggressive
**File:** `Frontend/src/hooks/useAuth.ts:78`  
**Severity:** Low  
**Description:** `queryClient.clear()` removes ALL cached queries, not just the session. This could cause unnecessary refetches for other data.  
**Solution:** Use `queryClient.removeQueries({ queryKey: ['session'] })` instead.

---

### BUG-F14: `authService.getSession` may not match Better Auth response format
**File:** `Frontend/src/services/auth.service.ts:45-48`  
**Severity:** Medium  
**Description:** `response.data` is typed as `BetterAuthSession | null`, but Better Auth may return the session in a different structure (e.g., `{ data: { user, session } }`).  
**Solution:** Verify Better Auth's actual response format and adjust the type/interface accordingly.

---

### BUG-F15: Google login endpoint may be wrong
**File:** `Frontend/src/services/auth.service.ts:33-43`  
**Severity:** Medium  
**Description:** `api.post('/auth/sign-in/social', {...})` — Better Auth may use a different endpoint or method for social sign-in. Need to verify against Better Auth docs.  
**Solution:** Check Better Auth's social sign-in API and update the endpoint.

---

### BUG-F16: Material card `authorName` never passed from explore/popular sections
**File:** `Frontend/src/components/cards/study-material-card.tsx:68-73`  
**Severity:** Low  
**Description:** `authorName` prop is optional and never passed from `explore/page.tsx` or `popular-materials-section.tsx`. Author name is never displayed on material cards.  
**Solution:** Extract `authorName` from the populated `createdBy` field and pass it as a prop.

---

## Security Issues

### SEC-S01: Auth middleware trusts client headers (CRITICAL)
**See:** BUG-B05

### SEC-S02: Regex injection in search
**See:** BUG-B06

### SEC-S03: No input validation on routes
**See:** BUG-B09

### SEC-S04: `.env` file committed to repository
**File:** `Backend/.env`  
**Severity:** High  
**Description:** The `Backend/.env` file contains real secrets (API keys, MongoDB URI, auth secret). If this is committed to git, all secrets are exposed.  
**Solution:** Ensure `.env` is in `.gitignore` and rotate all secrets immediately if they were ever committed.

### SEC-S05: No rate limiting applied to any routes
**File:** `Backend/src/routes/`  
**Severity:** Medium  
**Description:** The `rateLimit` middleware exists but is never applied to any route. All endpoints are unprotected against abuse.  
**Solution:** Apply rate limiting to all routes, especially auth and AI endpoints.

---

## Architecture / Missing Implementation Issues

### IMPL-I01: Missing backend route files
The following route files referenced by frontend services do not exist:
- `POST /materials` and `DELETE /materials/:id` (create/delete)
- `POST /ai/notes`, `GET /ai/history`, `DELETE /ai/history/:id`
- `GET /chat/sessions`, `POST /chat/sessions`, `POST /chat/messages`, etc.
- `GET /analytics/dashboard`, `GET /analytics/charts`
- `POST /contact` (contact form)
- `POST /newsletter/subscribe`

### IMPL-I02: Missing frontend pages
The following pages linked from dashboard don't exist:
- `/materials/add`
- `/materials/manage`
- `/ai/notes`
- `/ai/chat`
- `/analytics`
- `/profile`

### IMPL-I03: Empty directories — services, repositories, validators, prompts, types
Multiple backend directories are empty:
- `Backend/src/services/`
- `Backend/src/repositories/`
- `Backend/src/validators/`
- `Backend/src/prompts/`
- `Backend/src/types/constants/`
- `Backend/src/types/interfaces/`

---

## Minor / Code Quality Issues

### MINOR-M01: Duplicate `BookOpen` import in explore page
**File:** `Frontend/src/app/explore/page.tsx:4,17`  
**Description:** `BookOpen` is imported twice from `lucide-react` on separate lines.  
**Fix:** Merge into single import: `import { Search, SlidersHorizontal, X, BookOpen } from 'lucide-react';`

### MINOR-M02: `formatRelativeTime` can return negative values
**File:** `Frontend/src/utils/format-date.ts:12`  
**Description:** If `date` is in the future, `diffMs` will be negative, causing unexpected output like `-5m ago`.  
**Fix:** Add `Math.max(0, diffMs)` or handle future dates explicitly.

### MINOR-M03: Missing `alt` text on cover images
**File:** `Frontend/src/components/cards/study-material-card.tsx:42-47`  
**Description:** Uses `role="img"` and `aria-label` instead of `alt` attribute on a `div`. While accessible, an `img` element with `alt` would be more semantic.

### MINOR-M04: Error state component uses raw `<h3>` instead of `<Heading>`
**File:** `Frontend/src/components/common/error-state.tsx:21`  
**Description:** Uses `<h3 className="text-xl font-semibold">` instead of the `<Heading level={3}>` component.  
**Fix:** Use `<Heading level={3}>` for consistency.

### MINOR-M05: Empty state component uses raw `<h3>` instead of `<Heading>`
**File:** `Frontend/src/components/common/empty-state.tsx:17`  
**Description:** Same issue as MINOR-M04.

### MINOR-M06: `useDebounce` has `delayMs` in dependency array
**File:** `Frontend/src/hooks/useDebounce.ts:14`  
**Description:** Including `delayMs` in the `useEffect` dependency array will reset the timer if delay changes mid-typing. This is usually desired but could cause unexpected behavior if delay changes frequently.

### MINOR-M07: `Button` component passes `isLoading` to HeroButton which may not support it
**File:** `Frontend/src/components/ui/button.tsx:39`  
**Description:** `isDisabled={isLoading || props.isDisabled}` — when `isLoading` is true, the button is disabled but no loading indicator is shown.  
**Fix:** Add a spinner when `isLoading` is true.

---

## Summary

| Category | Count |
|----------|-------|
| Backend Bugs | 10 |
| Frontend Bugs | 16 |
| Security Issues | 5 |
| Architecture Gaps | 3 |
| Minor/Quality Issues | 7 |
| **Total** | **41** |

### Priority Matrix

| Priority | Issues |
|----------|--------|
| **Critical** | SEC-S01 (Auth middleware trusts headers) |
| **High** | BUG-B03 (Missing routes), BUG-B04 (Missing AI/Chat/Analytics), BUG-F01/F02/F03 (Response unwrapping), BUG-F11 (Infinite redirect), SEC-S04 (.env exposure) |
| **Medium** | BUG-B01 (DB handlers), BUG-B06 (Regex injection), BUG-B07 (Rate limiter leak), BUG-B08 (Auth response format), BUG-B09 (No validation), BUG-F04/F05/F06 (Dashboard), BUG-F10 (Typography plugin), BUG-F14/F15 (Auth service), SEC-S05 (No rate limiting) |
| **Low** | BUG-B02 (ObjectId cast), BUG-F07/F08/F09 (Dummy forms/filters), BUG-F12 (Route flash), BUG-F13 (Query clear), BUG-F16 (Author name), MINOR-* |
