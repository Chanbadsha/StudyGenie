# AGENTS.md

# StudyGenie — AI Agent Development Guide

> This document defines the rules, architecture, coding standards, workflow, and responsibilities for every AI coding agent working on the StudyGenie project.

---

# 1. Project Overview

StudyGenie is a production-ready Full Stack Agentic AI application that helps students create, organize, and understand study materials using Large Language Models (LLMs).

The project emphasizes:

- Clean Architecture
- Scalable Code
- Agentic AI Workflows
- Type Safety
- Professional UI/UX
- Production Readiness

Every implementation must follow this document.

---

# 2. Primary Objective

The goal is **not only to make features work**, but also to produce maintainable, scalable, and production-quality software.

Agents should always prefer:

- readability
- modularity
- reusability
- scalability
- consistency

over writing the shortest possible code.

---

# 3. Technology Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- HeroUI
- TanStack Query
- React Hook Form
- Zod
- Recharts

---

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB

---

## Authentication

- Better Auth
- Google OAuth

---

## AI

- Google Gemini API

---

# 4. Architecture

```
Next.js

↓

Express API

↓

MongoDB

↓

Gemini API
```

The frontend **must never communicate directly with Gemini**.

All AI requests must go through the backend.

---

# 5. Development Principles

Always prefer

- SOLID principles
- DRY
- KISS
- Composition over inheritance
- Functional programming where appropriate

Never write duplicate logic.

---

# 6. TypeScript Rules

TypeScript is mandatory.

Never use

```ts
any;
```

Avoid

```ts
unknown;
```

unless absolutely necessary.

Prefer

- interfaces
- type aliases
- generics

Enable strict mode.

No implicit any.

---

# 7. Naming Conventions

## Files

```
study-card.tsx
login-form.tsx
user-service.ts
```

Use kebab-case.

---

## Components

```tsx
StudyCard;
LoginForm;
Navbar;
```

Use PascalCase.

---

## Variables

```ts
studyMaterials;

currentUser;

selectedSubject;
```

camelCase only.

---

## Constants

```ts
MAX_UPLOAD_SIZE;

API_BASE_URL;
```

UPPER_SNAKE_CASE.

---

## Environment Variables

```
NEXT_PUBLIC_API_URL

BETTER_AUTH_SECRET

BETTER_AUTH_URL

MONGODB_URI

GEMINI_API_KEY
```

---

# 8. Folder Structure

## Frontend

```
src/

app/

components/

features/

hooks/

providers/

services/

types/

utils/

constants/

lib/

styles/
```

---

## Backend

```
src/

controllers/

routes/

middlewares/

services/

repositories/

models/

validators/

config/

utils/

types/

prompts/
```

---

# 9. Component Rules

Each component should have a single responsibility.

Avoid components larger than ~300 lines where practical.

Move reusable logic into:

- hooks
- utilities
- services

---

# 10. State Management

Use:

- TanStack Query for server state
- React state for local UI state

Avoid unnecessary global state.

---

# 11. Forms

Every form must use

- React Hook Form
- Zod validation

Never perform validation only on the client.

Server validation is mandatory.

---

# 12. Styling Rules

Use Tailwind CSS.

Avoid inline styles.

Use reusable UI components.

Maintain consistent:

- spacing
- radius
- typography
- shadows
- colors

Maximum 3 primary colors.

Support:

- Desktop
- Tablet
- Mobile

---

# 13. Accessibility

Every page should include:

- semantic HTML
- proper labels
- keyboard accessibility
- aria attributes where needed
- sufficient color contrast

---

# 14. API Rules

REST API only.

Resource-based routes.

Example

```
GET /materials

POST /materials

GET /materials/:id

DELETE /materials/:id
```

Return consistent JSON responses.

Example

```json
{
  "success": true,
  "message": "Study material created successfully.",
  "data": {}
}
```

Error example

```json
{
  "success": false,
  "message": "Validation failed."
}
```

---

# 15. Authentication

Use Better Auth for all authentication.

Protected endpoints require a valid session.

Authentication middleware must verify:

- session
- user existence

Never trust client-provided user IDs.

Always derive the authenticated user from the verified session.

Better Auth features:
- Email/password authentication
- Google OAuth
- Session-based authentication
- Protected routes
- Role-based authorization (future)
- Secure cookies
- Session management
- Sign in / Sign up / Sign out
- Current user session retrieval

---

# 16. Authorization

Users may:

- create their own materials
- delete their own materials
- access only their own AI history

Future roles:

- Student
- Admin

---

# 17. Database Rules

Use MongoDB.

Collections should be normalized where practical.

Use ObjectId references instead of duplicating large datasets.

Index frequently queried fields.

Use timestamps.

---

# 18. AI Rules

Every AI request must:

- validate input
- sanitize prompt variables
- use prompt templates
- log generation metadata
- save history when appropriate

Never expose API keys.

Never call Gemini directly from the client.

---

# 19. Prompt Engineering

Store prompts separately.

Never hardcode prompts inside controllers.

Prompt templates belong inside

```
backend/src/prompts/
```

Each prompt should be reusable.

---

# 20. Error Handling

Never crash the server.

Always return structured errors.

Log unexpected errors.

Never expose stack traces in production.

---

# 21. Logging

Log:

- server startup
- authentication events
- AI requests
- failed requests
- database connection

Avoid logging sensitive data.

---

# 22. Security

Always implement:

- Better Auth session authentication
- input validation
- environment variables
- CORS
- rate limiting
- request size limits
- secure HTTP headers
- password hashing (handled by Better Auth)

Never commit secrets.

---

# 23. Performance

Use:

- lazy loading
- code splitting
- pagination
- query caching
- image optimization
- memoization when appropriate

Avoid unnecessary re-renders.

---

# 24. Git Workflow

Commit after each completed phase.

Commit message format:

```
feat(auth): implement Google authentication

feat(materials): add CRUD APIs

fix(api): validate material ownership

refactor(ui): improve dashboard layout

docs(prd): update AI workflow
```

Never commit broken code.

---

# 25. Testing Checklist

Before marking a feature complete, verify:

- TypeScript passes
- ESLint passes
- Build succeeds
- No console errors
- Responsive layout
- Authentication works
- API validation works
- AI feature works
- Loading and error states exist

---

# 26. Documentation

When implementing new features, update the relevant documentation if the architecture, API, or business logic changes.

---

# 27. Prohibited Practices

Do not:

- use `any`
- duplicate code
- hardcode secrets
- bypass validation
- ignore TypeScript errors
- disable lint rules without justification
- mix business logic into UI components
- call the AI provider directly from the frontend
- introduce placeholder content into production code

---

# 28. Definition of Done

A task is complete only if:

- Requirements are fully implemented.
- Code follows project conventions.
- UI is responsive.
- Loading, empty, and error states are handled.
- Validation is complete.
- TypeScript passes.
- Lint passes.
- Build passes.
- Documentation is updated when required.

---

# 29. AI Agent Responsibilities

Before starting any task, the AI agent must:

1. Read this `AGENTS.md`.
2. Review the relevant documentation in the `docs/` directory.
3. Follow the current development phase.
4. Modify only the files required for the task.
5. Preserve existing functionality unless changes are explicitly requested.

If requirements are unclear or documentation is missing, the agent should request clarification rather than making assumptions.

---

# 30. Guiding Principle

Build StudyGenie as if it were a real production SaaS product.

Prioritize clean architecture, maintainability, user experience, security, and scalable AI workflows over quick or temporary solutions.
