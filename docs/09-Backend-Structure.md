# 09 - Backend Structure

# StudyGenie Backend Architecture

> This document defines the folder structure, architecture, coding standards, and responsibilities of the **Express.js backend**. The backend is responsible for business logic, authentication, AI integration, database access, and API security.

---

# 1. Technology Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Better Auth
- Zod
- Google Gemini API

---

# 2. Backend Goals

The backend should:

- Follow clean architecture principles
- Keep business logic separate from routing
- Secure all protected APIs
- Validate every request
- Communicate with MongoDB
- Handle AI requests
- Log important events
- Return consistent API responses

---

# 3. Folder Structure

```text
backend/
├── src/
│
├── config/
│   ├── database.ts
│   ├── env.ts
│   └── gemini.ts
│
├── controllers/
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   ├── material.controller.ts
│   ├── ai.controller.ts
│   ├── chat.controller.ts
│   └── analytics.controller.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── material.routes.ts
│   ├── ai.routes.ts
│   ├── chat.routes.ts
│   ├── analytics.routes.ts
│   └── index.ts
│
├── services/
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── material.service.ts
│   ├── ai.service.ts
│   ├── chat.service.ts
│   └── analytics.service.ts
│
├── repositories/
│   ├── user.repository.ts
│   ├── material.repository.ts
│   ├── ai.repository.ts
│   ├── chat.repository.ts
│   └── analytics.repository.ts
│
├── models/
│   ├── user.model.ts
│   ├── study-material.model.ts
│   ├── ai-generation.model.ts
│   ├── chat-session.model.ts
│   ├── chat-message.model.ts
│   └── learning-analytics.model.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   ├── validate.middleware.ts
│   ├── rate-limit.middleware.ts
│   └── not-found.middleware.ts
│
├── validators/
│   ├── auth.validator.ts
│   ├── material.validator.ts
│   ├── ai.validator.ts
│   └── profile.validator.ts
│
├── prompts/
│   ├── notes.prompt.ts
│   ├── tutor.prompt.ts
│   └── prompt-builder.ts
│
├── utils/
│   ├── api-response.ts
│   ├── async-handler.ts
│   ├── logger.ts
│   ├── object-id.ts
│   └── pagination.ts
│
├── types/
│├── interfaces/
│├── constants/
│
├── app.ts
├── server.ts
└── index.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

# 4. Layered Architecture

```text
HTTP Request
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Services
      │
      ▼
Repositories
      │
      ▼
MongoDB
```

Each layer has one responsibility.

---

# 5. Routes Layer

Responsibilities:

- Register endpoints
- Apply middleware
- Forward requests to controllers

Routes should **not** contain business logic.

Example:

```text
POST /auth/login

GET /materials

POST /ai/notes
```

---

# 6. Controllers Layer

Responsibilities:

- Receive validated requests
- Call services
- Return standardized responses
- Handle HTTP-specific concerns

Controllers should remain thin and avoid implementing business rules.

---

# 7. Services Layer

Responsibilities:

- Implement business logic
- Coordinate repositories
- Invoke AI providers
- Enforce application rules

Examples:

- Create study material
- Generate AI notes
- Manage chat sessions
- Update analytics

---

# 8. Repositories Layer

Responsibilities:

- Communicate with MongoDB
- Execute queries
- Return data models

Repositories should not contain business logic.

---

# 9. Models

Each collection has its own model.

Examples:

```text
User

StudyMaterial

AIGeneration

ChatSession

ChatMessage

LearningAnalytics
```

Models define:

- Fields
- Validation
- Relationships
- Indexes

---

# 10. Middlewares

## Authentication

Verifies the Better Auth session and attaches the authenticated user to the request.

---

## Validation

Validates request body, params, and query using Zod schemas.

---

## Error Handler

Catches and formats unexpected errors.

---

## Rate Limiter

Protects:

- Authentication endpoints
- AI endpoints
- Chat endpoints

---

## Not Found

Returns a standard 404 response for unknown routes.

---

# 11. Validators

Validation schemas include:

```text
auth

study material

profile

AI generation
```

Responsibilities:

- Validate request bodies
- Validate query parameters
- Validate route parameters

The backend is the source of truth for validation.

---

# 12. AI Prompt Layer

All prompt templates live inside:

```text
src/prompts/
```

Examples:

```text
notes.prompt.ts

tutor.prompt.ts

prompt-builder.ts
```

Prompt templates must:

- Be reusable
- Accept structured variables
- Avoid hardcoded user input
- Be version-controlled

---

# 13. Utilities

Shared helper functions.

Examples:

```text
Standard API responses

Pagination helpers

Date formatting

ObjectId validation

Logger

Async wrapper
```

Utilities should remain stateless and reusable.

---

# 14. Configuration

The `config` directory manages:

- Environment variables
- MongoDB connection
- Gemini client initialization

Configuration should be centralized and type-safe.

---

# 15. API Response Format

Every endpoint should return a consistent JSON structure.

Success:

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```

---

# 16. Authentication Flow

```text
Request

↓

Better Auth Middleware

↓

Authenticated User

↓

Controller

↓

Service

↓

Response
```

The authenticated user's identity is always derived from the verified Better Auth session.

---

# 17. AI Request Flow

```text
Client

↓

Validation

↓

Controller

↓

AI Service

↓

Prompt Builder

↓

Gemini API

↓

Post Processing

↓

Save History

↓

Response
```

All AI communication is centralized in the backend.

---

# 18. Logging

Log:

- Server startup
- Database connection
- Authentication events
- AI requests
- API errors
- Unexpected exceptions

Do **not** log:

- Passwords
- Better Auth secrets
- API keys
- Sensitive personal data

---

# 19. Security

The backend must implement:

- Better Auth session authentication
- Password hashing
- Input validation
- Request sanitization
- CORS
- Rate limiting
- Secure HTTP headers
- Ownership verification
- Environment variable management

Never expose secrets in responses.

---

# 20. Error Handling

Unexpected errors should:

- Be logged
- Return safe responses
- Never expose stack traces in production

The application should gracefully handle:

- Validation failures
- Authentication failures
- Authorization failures
- Database errors
- AI provider failures

---

# 21. Performance

Recommended practices:

- Pagination
- Database indexing
- Efficient queries
- Connection pooling
- Avoid duplicate queries
- Cache frequently accessed data where appropriate

---

# 22. Future Expansion

The backend architecture supports future additions such as:

- AI quiz generation
- Flashcards
- PDF summarization
- OCR
- File uploads
- Notifications
- Admin moderation
- Background jobs
- Queue processing
- WebSocket support
- Semantic search

These can be added without restructuring the existing architecture.

---

# 23. Backend Development Principles

Every backend feature should:

- Follow the layered architecture.
- Keep controllers thin.
- Place business logic in services.
- Keep repositories focused on data access.
- Validate every request.
- Protect sensitive endpoints.
- Return consistent API responses.
- Log important events.
- Maintain full TypeScript type safety.
- Be modular, testable, and production-ready.
