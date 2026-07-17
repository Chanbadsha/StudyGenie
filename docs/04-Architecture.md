# 04 - Architecture

# StudyGenie System Architecture

> This document describes the high-level architecture, system components, data flow, AI workflow, and design decisions for the StudyGenie platform. The goal is to maintain a scalable, secure, and production-ready architecture.

---

# 1. Architecture Goals

The architecture is designed to achieve the following:

- Scalable application structure
- Clear separation of concerns
- Secure communication
- Modular development
- Maintainable codebase
- Agent-friendly organization
- Production-ready deployment

---

# 2. High-Level Architecture

```text
                        ┌────────────────────────────┐
                        │         Web Browser        │
                        └─────────────┬──────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │       Next.js Frontend          │
                    │  (React + TypeScript + UI)      │
                    └─────────────┬────────────────────┘
                                  │ HTTPS / REST API
                                  ▼
                    ┌─────────────────────────────────┐
                    │        Express Backend          │
                    │ Authentication • AI • CRUD      │
                    └──────┬──────────────┬───────────┘
                           │              │
               Database    │              │   AI Provider
                           ▼              ▼
              ┌────────────────┐   ┌──────────────────┐
              │    MongoDB     │   │ Google Gemini AI │
              └────────────────┘   └──────────────────┘
```

---

# 3. Technology Stack

## Frontend

- Next.js (App Router)
- React
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
- Better Auth

---

## AI Layer

- Google Gemini API

---

## Deployment

Frontend

- Vercel

Backend

- Render or Railway

Database

- MongoDB Atlas

---

# 4. System Layers

The application follows a layered architecture.

```text
Presentation Layer
        │
        ▼
Application Layer
        │
        ▼
Business Logic Layer
        │
        ▼
Data Access Layer
        │
        ▼
Database
```

---

# 5. Frontend Architecture

```text
Next.js

│

├── App Router

├── Pages

├── Layouts

├── Components

├── Features

├── Hooks

├── Services

├── Providers

├── Utilities

└── Types
```

### Responsibilities

The frontend is responsible for:

- User Interface
- Form validation
- Client routing
- State management
- API communication
- Responsive layouts

The frontend **must not** contain business logic related to authentication, authorization, or AI processing.

---

# 6. Backend Architecture

```text
Express

│

├── Routes

├── Controllers

├── Services

├── Repositories

├── Models

├── Middlewares

├── Validators

├── Prompts

├── Config

└── Utilities
```

### Responsibilities

The backend is responsible for:

- Authentication
- Authorization
- Validation
- CRUD operations
- AI communication
- Database access
- Business logic
- Security

---

# 7. Data Flow

## Standard CRUD Request

```text
User
      │
      ▼
Next.js UI
      │
      ▼
TanStack Query
      │
      ▼
Express API
      │
      ▼
Validation
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
MongoDB
      │
      ▼
JSON Response
      │
      ▼
Frontend UI
```

---

# 8. Authentication Flow

```text
User Login
      │
      ▼
Frontend Form
      │
      ▼
Better Auth API
      │
      ▼
Validate Credentials
      │
      ▼
Create Session
      │
      ▼
Set Session Cookie
      │
      ▼
Protected Requests
      │
      ▼
Better Auth Middleware
      │
      ▼
Authorized Response
```

The authenticated user's identity must always be derived from the verified session, not from client-provided data.

---

# 9. AI Workflow

```text
User Input
      │
      ▼
Input Validation
      │
      ▼
Prompt Builder
      │
      ▼
Prompt Template
      │
      ▼
Gemini API
      │
      ▼
AI Response
      │
      ▼
Post Processing
      │
      ▼
Save History
      │
      ▼
Return Response
```

The frontend never communicates directly with the AI provider.

---

# 10. AI Prompt Architecture

```text
AI Request

      │

      ▼

Prompt Variables

      │

      ▼

Prompt Template

      │

      ▼

Gemini

      │

      ▼

Structured Output
```

Prompt templates are stored in:

```text
backend/src/prompts/
```

Each prompt should be reusable and version-controlled.

---

# 11. AI Memory Flow

```text
User

│

▼

Chat Session

│

▼

Conversation History

│

▼

Prompt Builder

│

▼

Gemini

│

▼

AI Response

│

▼

Store Message
```

Conversation context is maintained per session to provide coherent follow-up responses.

---

# 12. Database Architecture

```text
Users
      │
      │ 1
      │
      ├──────────────┐
      │              │
      ▼              ▼
StudyMaterials   ChatSessions
      │              │
      │              ▼
      │         ChatMessages
      │
      ▼
AIGenerations
      │
      ▼
LearningAnalytics
```

Future modules can extend the schema without major architectural changes.

---

# 13. API Architecture

RESTful endpoints grouped by feature.

```text
/auth

/users

/materials

/ai

/chat

/analytics
```

Each endpoint should:

- Validate input
- Authenticate if required
- Execute business logic
- Return consistent JSON responses

---

# 14. Error Handling

```text
Request
      │
      ▼
Validation
      │
      ▼
Controller
      │
      ▼
Try / Catch
      │
      ▼
Global Error Handler
      │
      ▼
Standard JSON Response
```

Unhandled exceptions should be logged and converted into safe client responses.

---

# 15. Security Architecture

Security measures include:

- Better Auth session authentication
- Password hashing
- Request validation
- Input sanitization
- CORS configuration
- Rate limiting
- Environment variables
- Secure HTTP headers
- Authorization middleware

Sensitive credentials must never be exposed to the client.

---

# 16. State Management

## Client State

Managed with React state and hooks.

Examples:

- Modal visibility
- Form state
- UI preferences

## Server State

Managed with TanStack Query.

Examples:

- User profile
- Study materials
- AI history
- Dashboard data

This separation improves caching and data synchronization.

---

# 17. Deployment Architecture

```text
                Internet
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
   Vercel (Frontend)      Render/Railway (Backend)
        │                         │
        └────────────┬────────────┘
                     ▼
              MongoDB Atlas
                     │
                     ▼
             Google Gemini API
```

---

# 18. Scalability Considerations

The architecture supports future additions such as:

- AI quiz generation
- Flashcards
- Document intelligence
- OCR
- File uploads
- Multi-language support
- Admin dashboard
- Notifications
- Real-time collaboration
- Vector search or semantic retrieval
- Background jobs and queues

These features can be integrated without significant restructuring.

---

# 19. Design Principles

StudyGenie follows:

- Separation of concerns
- Single responsibility
- Modular design
- Reusable components
- Type safety
- Clean architecture
- Secure-by-default development
- AI abstraction through backend services

---

# 20. Architecture Decisions

| Decision               | Rationale                                           |
| ---------------------- | --------------------------------------------------- |
| Next.js App Router     | Modern routing, layouts, and server capabilities    |
| Express.js Backend     | Clear API layer and separation from the frontend    |
| MongoDB                | Flexible document database for evolving AI features |
| TypeScript             | Type safety and maintainability                     |
| HeroUI                 | Accessible, production-ready UI component library   |
| TanStack Query         | Efficient server-state management and caching       |
| Recharts               | Lightweight, composable charting library            |
| Better Auth            | Secure session-based authentication with OAuth      |
| Gemini API             | Fast, capable LLM for educational use cases         |
| REST API               | Simplicity and maintainability                      |
| Backend-only AI access | Improved security and centralized prompt management |

---

# 21. Guiding Principle

Every feature in StudyGenie should respect the architecture defined in this document.

Frontend components focus on presentation, the backend owns business logic, MongoDB stores application data, and the AI layer is accessed exclusively through secure backend services. This separation ensures the application remains scalable, testable, maintainable, and suitable for production deployment.
