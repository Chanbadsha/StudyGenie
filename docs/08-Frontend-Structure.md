# 08 - Frontend Structure

# StudyGenie Frontend Architecture

> This document defines the folder structure, architecture, coding conventions, and responsibilities of the **Next.js frontend**. The goal is to build a scalable, maintainable, and production-ready application using the App Router.

---

# 1. Technology Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- HeroUI
- TanStack Query
- React Hook Form
- Zod
- Recharts

---

# 2. Frontend Goals

The frontend should:

- Be fully responsive
- Follow component-based architecture
- Be accessible
- Be reusable and modular
- Separate UI from business logic
- Consume backend APIs only
- Never communicate directly with the AI provider

---

# 3. Folder Structure

```text
frontend/
├── public/
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── api/               # Next.js API routes (optional)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── cards/
│   │   ├── forms/
│   │   ├── charts/
│   │   └── ai/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── materials/
│   │   ├── ai/
│   │   ├── dashboard/
│   │   └── analytics/
│   │
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── utils/
│   ├── constants/
│   ├── validations/
│   └── assets/
│
├── .env.local
├── package.json
└── tsconfig.json
```

---

# 4. App Router Structure

```text
app/
│
├── (public)/
│   ├── page.tsx                 # Home
│   ├── explore/
│   ├── about/
│   ├── blog/
│   └── contact/
│
├── (auth)/
│   ├── login/
│   └── register/
│
├── (dashboard)/
│   ├── dashboard/
│   ├── materials/
│   │   ├── add/
│   │   └── manage/
│   ├── ai/
│   │   ├── notes/
│   │   └── chat/
│   ├── analytics/
│   └── profile/
```

---

# 5. Components

Components should be reusable and focused on a single responsibility.

### `components/common`

Shared components used across the application.

Examples:

- Button
- Input
- Modal
- Loader
- EmptyState
- ErrorMessage

---

### `components/layout`

Layout-related components.

Examples:

- Navbar
- Footer
- Sidebar
- DashboardLayout
- Container

---

### `components/ui`

Generic UI building blocks.

Examples:

- Card
- Badge
- Avatar
- Dialog
- Dropdown
- Tabs
- Tooltip

---

### `components/cards`

Feature-specific cards.

Examples:

- StudyMaterialCard
- StatisticCard
- FeatureCard
- TestimonialCard

---

### `components/forms`

Reusable form components.

Examples:

- LoginForm
- RegisterForm
- MaterialForm
- ProfileForm

---

### `components/charts`

Chart components.

Examples:

- StudyProgressChart
- SubjectDistributionChart
- AIUsageChart

---

### `components/ai`

AI-specific UI.

Examples:

- ChatWindow
- ChatMessage
- PromptForm
- AIResponseCard
- TypingIndicator

---

# 6. Feature Modules

Each feature owns its business logic.

## auth

- Authentication hooks
- Login services
- Register services
- User session

---

## materials

- CRUD operations
- Search
- Filters
- Pagination

---

## ai

- AI Notes Generator
- AI Tutor
- AI History

---

## dashboard

- Dashboard widgets
- Statistics
- Quick actions

---

## analytics

- Charts
- Reports
- Progress tracking

---

# 7. Hooks

Custom hooks should encapsulate reusable logic.

Examples:

```text
useAuth()

useCurrentUser()

useStudyMaterials()

usePagination()

useDebounce()

useAIChat()

useAINotes()
```

Hooks should not render UI.

---

# 8. Services

The `services` directory is responsible for API communication.

Examples:

```text
auth.service.ts

material.service.ts

ai.service.ts

chat.service.ts

analytics.service.ts
```

Responsibilities:

- HTTP requests
- Response parsing
- Error normalization

Business logic belongs in the backend, not in services.

---

# 9. Providers

Global providers include:

- TanStack Query Provider
- Authentication Provider
- Theme Provider (future)

Providers are registered in the root layout.

---

# 10. Store

Reserved for lightweight global state if required.

Examples:

- Theme
- UI preferences

Avoid storing server data here; use TanStack Query instead.

---

# 11. Types

Shared TypeScript types and interfaces.

Examples:

```text
user.ts

study-material.ts

ai.ts

chat.ts

analytics.ts
```

Avoid using `any`.

---

# 12. Utilities

Reusable helper functions.

Examples:

```text
format-date.ts

truncate-text.ts

cn.ts

generate-avatar.ts
```

Utilities must be pure functions.

---

# 13. Constants

Application-wide constants.

Examples:

```text
routes.ts

subjects.ts

difficulty.ts

pagination.ts

api.ts
```

Constants should not contain business logic.

---

# 14. Validation

All client-side schemas should live here.

Examples:

```text
login.schema.ts

register.schema.ts

material.schema.ts

profile.schema.ts
```

Use **Zod** for validation.

Server validation is still mandatory.

---

# 15. Styling Guidelines

- Tailwind CSS utility classes
- Consistent spacing
- Maximum of 3 primary colors
- Shared border radius
- Shared shadows
- Mobile-first responsive design
- Support dark mode (future)

Avoid inline styles unless absolutely necessary.

---

# 16. State Management

## Local State

Use React state for:

- Modals
- Dropdowns
- Tabs
- UI interactions

## Server State

Use TanStack Query for:

- User profile
- Study materials
- AI history
- Dashboard statistics
- Analytics

Benefits:

- Caching
- Refetching
- Background synchronization
- Loading and error states

---

# 17. Routing

Use App Router conventions.

Public routes:

```text
/
 /explore
 /about
 /blog
 /contact
 /login
 /register
```

Protected routes:

```text
/dashboard
/materials/add
/materials/manage
/ai/notes
/ai/chat
/analytics
/profile
```

Route protection should be handled through authentication-aware layouts or middleware.

---

# 18. Performance Guidelines

- Lazy-load large components
- Optimize images with `next/image`
- Use dynamic imports where appropriate
- Avoid unnecessary re-renders
- Memoize expensive computations only when needed
- Keep components focused and reusable

---

# 19. Accessibility

The frontend should:

- Use semantic HTML
- Associate labels with form fields
- Support keyboard navigation
- Include ARIA attributes where appropriate
- Maintain sufficient color contrast
- Display clear validation messages

---

# 20. Frontend Development Principles

Every frontend feature should:

- Follow the App Router architecture.
- Be fully typed with TypeScript.
- Keep components small and reusable.
- Separate presentation from data fetching.
- Consume backend APIs only.
- Handle loading, empty, and error states gracefully.
- Maintain a consistent UI and user experience across the application.
