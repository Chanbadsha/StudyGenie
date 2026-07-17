# 16 - Environment

# StudyGenie Environment Configuration

> This document defines all environment variables required for the StudyGenie application. Sensitive information must never be committed to version control. Store secrets securely using `.env` files in development and platform-specific secret managers in production.

---

# 1. Environment Files

## Frontend

```text
frontend/
├── .env.local
├── .env.example
```

---

## Backend

```text
backend/
├── .env
├── .env.example
```

Do **not** commit `.env` files.

Only commit `.env.example`.

---

# 2. Frontend Environment Variables

## Application

```env
NEXT_PUBLIC_APP_NAME=StudyGenie
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Backend API

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## Authentication

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Only public configuration values should use the `NEXT_PUBLIC_` prefix.

---

# 3. Backend Environment Variables

## Application

```env
NODE_ENV=development

PORT=5000

CLIENT_URL=http://localhost:3000
```

---

## MongoDB

```env
MONGODB_URI=your_mongodb_connection_string

DATABASE_NAME=studygenie
```

---

## Authentication

```env
BETTER_AUTH_SECRET=your_long_random_secret

BETTER_AUTH_URL=http://localhost:5000
```

---

## Google OAuth

```env
GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## Gemini AI

```env
GEMINI_API_KEY=your_gemini_api_key

GEMINI_MODEL=gemini-2.5-flash
```

The model can be changed without modifying application code.

---

# 4. Optional Environment Variables

These are not required for version 1 but are reserved for future enhancements.

```env
LOG_LEVEL=info

RATE_LIMIT_WINDOW=3600

RATE_LIMIT_MAX_REQUESTS=100

CACHE_TTL=300

ENABLE_SWAGGER=false
```

---

# 5. Environment File Examples

## Frontend `.env.example`

```env
NEXT_PUBLIC_APP_NAME=StudyGenie

NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## Backend `.env.example`

```env
NODE_ENV=development

PORT=5000

CLIENT_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string

DATABASE_NAME=studygenie

BETTER_AUTH_SECRET=replace_with_secure_random_secret

BETTER_AUTH_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_gemini_api_key

GEMINI_MODEL=gemini-2.5-flash
```

---

# 6. Environment Validation

The backend should validate all required environment variables during startup.

Required variables include:

- PORT
- CLIENT_URL
- MONGODB_URI
- DATABASE_NAME
- BETTER_AUTH_SECRET
- BETTER_AUTH_URL
- GEMINI_API_KEY

If any required variable is missing, the server should fail to start with a clear error message.

---

# 7. Security Guidelines

Never expose:

- Better Auth secrets
- Database credentials
- API keys
- OAuth client secrets

Never return secret values in API responses or logs.

---

# 8. Development Configuration

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

API Base URL:

```text
http://localhost:5000/api/v1
```

---

# 9. Production Configuration

Frontend:

- Deploy on Vercel

Backend:

- Deploy on Render or Railway

Database:

- MongoDB Atlas

Configure production secrets using the hosting provider's environment variable manager.

---

# 10. Git Ignore

Ensure the following files are ignored:

```text
.env

.env.local

.env.production

.env.development
```

Commit only:

```text
.env.example
```

---

# 11. Environment Loading

Load environment variables as early as possible during application startup.

Suggested order:

```text
Read Environment

↓

Validate

↓

Initialize Configuration

↓

Connect Database

↓

Initialize AI Client

↓

Start Server
```

---

# 12. Configuration Principles

The StudyGenie environment configuration should:

- Keep secrets outside the source code.
- Use separate configurations for development and production.
- Validate required variables before startup.
- Centralize configuration access.
- Allow changing providers or deployment settings without modifying business logic.
- Support secure, scalable, and maintainable deployments.
