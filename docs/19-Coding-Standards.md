# 19 - Coding Standards

# StudyGenie Coding Standards

> This document defines the coding standards, naming conventions, project organization, TypeScript practices, and development principles for the StudyGenie application. Every contributor and AI coding agent must follow these standards to ensure consistency, readability, and maintainability.

---

# 1. Purpose

These standards help ensure that the codebase is:

- Consistent
- Readable
- Maintainable
- Scalable
- Type-safe
- Easy to review

---

# 2. General Principles

Follow these principles:

- Keep code simple.
- Write readable code before clever code.
- Prefer composition over duplication.
- Keep functions small and focused.
- Use meaningful names.
- Remove unused code.
- Avoid premature optimization.

---

# 3. TypeScript Standards

TypeScript is mandatory throughout the project.

Rules:

- Enable `strict` mode.
- Avoid using `any`.
- Prefer interfaces for object shapes.
- Use type aliases where appropriate.
- Export shared types from the `types` directory.
- Always define function return types when they are not obvious.

Example:

```ts
interface User {
  id: string;
  name: string;
  email: string;
}
```

---

# 4. File Naming

Use **kebab-case** for files.

Examples:

```text
user.service.ts

auth.controller.ts

study-material.model.ts

chat-window.tsx
```

Avoid spaces and inconsistent naming.

---

# 5. Component Naming

React components use **PascalCase**.

Examples:

```text
Navbar

Footer

StudyMaterialCard

AIResponseCard

DashboardLayout
```

One component per file whenever practical.

---

# 6. Variable Naming

Use **camelCase**.

Examples:

```ts
userName;

studyMaterial;

chatHistory;

totalMaterials;
```

Names should describe purpose rather than implementation.

---

# 7. Function Naming

Functions should start with a verb.

Examples:

```ts
createMaterial();

deleteMaterial();

generateNotes();

sendMessage();

validateToken();
```

Avoid vague names such as:

```text
doThing()

handleStuff()

data()
```

---

# 8. Constants

Use **UPPER_SNAKE_CASE**.

Examples:

```ts
MAX_FILE_SIZE;

DEFAULT_PAGE_SIZE;

SESSION_EXPIRATION;
```

Store shared constants in the `constants` directory.

---

# 9. Folder Organization

Separate responsibilities clearly.

Example:

```text
controllers/

services/

repositories/

middlewares/

validators/

components/

features/
```

Do not mix unrelated concerns in the same directory.

---

# 10. Import Order

Maintain a consistent import order.

```ts
// Node modules

// Third-party libraries

// Internal aliases

// Relative imports

// Types

// Styles
```

Keep imports grouped and sorted alphabetically within each group.

---

# 11. Functions

Functions should:

- Have one responsibility.
- Be concise.
- Return early when appropriate.
- Avoid deeply nested logic.

Prefer small helper functions over large monolithic functions.

---

# 12. Components

React components should:

- Be focused on presentation.
- Receive data through props.
- Avoid unnecessary state.
- Keep JSX readable.
- Delegate business logic to hooks or services.

---

# 13. Hooks

Custom hooks should:

- Start with `use`.
- Encapsulate reusable logic.
- Avoid rendering UI.
- Be independent of specific pages whenever possible.

Examples:

```text
useAuth()

useStudyMaterials()

useAIChat()
```

---

# 14. Error Handling

Always handle expected errors.

Backend:

- Throw meaningful errors.
- Use centralized error middleware.
- Return consistent API responses.

Frontend:

- Show user-friendly messages.
- Display loading and retry states where appropriate.

Never ignore errors silently.

---

# 15. Validation

Validate:

- Request body
- Query parameters
- Route parameters
- Form inputs

Use Zod for both frontend and backend validation where practical.

---

# 16. API Standards

REST endpoints should:

- Use nouns for resources.
- Return consistent JSON responses.
- Use appropriate HTTP status codes.
- Never expose internal implementation details.

Example success response:

```json
{
  "success": true,
  "message": "Study material created successfully.",
  "data": {}
}
```

---

# 17. Comments

Write comments only when they add value.

Use comments to explain:

- Why something exists.
- Complex algorithms.
- Non-obvious decisions.

Avoid comments that merely restate the code.

---

# 18. Formatting

Use:

- ESLint
- Prettier

Maintain consistent:

- Indentation
- Spacing
- Quotes
- Semicolons
- Line breaks

Never manually format code inconsistently.

---

# 19. Logging

Log:

- Server startup
- Authentication events
- AI requests
- Unexpected errors

Never log:

- Passwords
- Session tokens
- API keys
- Sensitive personal information

---

# 20. Git Standards

Follow Conventional Commits.

Examples:

```text
feat: add AI tutor chat

fix: resolve pagination issue

docs: update API documentation

refactor: simplify material service

test: add authentication tests

chore: update dependencies
```

Each commit should represent a single logical change.

---

# 21. Performance Guidelines

Prefer:

- Efficient database queries
- Lazy loading
- Pagination
- Image optimization
- Memoization only when beneficial

Avoid unnecessary re-renders and duplicate API requests.

---

# 22. Security Practices

Always:

- Validate user input.
- Verify resource ownership.
- Protect private routes.
- Store secrets in environment variables.
- Sanitize untrusted input.
- Enforce authorization on the backend.

Never trust client-side validation alone.

---

# 23. Testing Expectations

Every feature should be tested for:

- Happy path
- Validation failures
- Authorization
- Error handling
- Responsive UI
- AI functionality (where applicable)

Critical bugs should be resolved before merging.

---

# 24. Code Review Checklist

Before submitting code, verify:

- TypeScript passes.
- ESLint passes.
- No unused variables.
- No `console.log` statements left unintentionally.
- No commented-out code.
- Loading and error states are handled.
- Documentation is updated if needed.

---

# 25. Definition of Clean Code

StudyGenie code is considered clean when it:

- Is easy to understand.
- Uses consistent naming.
- Has clear separation of concerns.
- Is fully typed.
- Avoids duplication.
- Handles errors gracefully.
- Follows the project architecture.
- Is secure, maintainable, and production-ready.
