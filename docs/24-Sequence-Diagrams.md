# 24 - Sequence Diagrams

# StudyGenie Sequence Diagrams

> This document describes the major request flows within StudyGenie. These diagrams illustrate how the frontend, backend, database, authentication system, and AI provider interact during common user actions.

---

# 1. User Registration

```text
User
 │
 ▼
Frontend
 │
 │ Submit Registration Form
 ▼
Backend API
 │
 │ Validate Input
 ▼
Authentication Service
 │
 │ Hash Password
 ▼
MongoDB
 │
 │ Create User
 ▼
Backend API
 │
 │ Create Session
 ▼
Frontend
 │
 ▼
User Logged In
```

---

# 2. User Login

```text
User
 │
 ▼
Frontend
 │
 │ Submit Credentials
 ▼
Backend API
 │
 │ Validate Credentials
 ▼
MongoDB
 │
 │ Find User
 ▼
Authentication Service
 │
 │ Verify Password
 │
 │ Create Session
 ▼
Frontend
 │
 ▼
Dashboard
```

---

# 3. Google Login

```text
User
 │
 ▼
Frontend
 │
 │ Google OAuth
 ▼
Google
 │
 │ User Authenticated
 ▼
Backend API
 │
 │ Verify Google Token
 ▼
MongoDB
 │
 │ Create or Find User
 ▼
Backend API
 │
 │ Create Session
 ▼
Frontend
```

---

# 4. Create Study Material

```text
User
 │
 ▼
Frontend
 │
 │ Submit Form
 ▼
Backend API
 │
 │ Session Verification
 │
 │ Validate Request
 ▼
Study Material Service
 │
 ▼
MongoDB
 │
 │ Save Material
 ▼
Backend API
 │
 ▼
Frontend
 │
 ▼
Success Message
```

---

# 5. View Study Materials

```text
User
 │
 ▼
Frontend
 │
 │ Fetch Materials
 ▼
Backend API
 │
 ▼
MongoDB
 │
 │ Query Materials
 ▼
Backend API
 │
 ▼
Frontend
 │
 ▼
Material Cards
```

---

# 6. Delete Study Material

```text
User
 │
 ▼
Frontend
 │
 │ Delete Request
 ▼
Backend API
 │
 │ Session Verification
 │
 │ Ownership Check
 ▼
MongoDB
 │
 │ Delete Document
 ▼
Backend API
 │
 ▼
Frontend
 │
 ▼
Updated Material List
```

---

# 7. AI Study Notes Generation

```text
User
 │
 ▼
Frontend
 │
 │ Submit Topic
 ▼
Backend API
 │
 │ Validate Input
 ▼
Prompt Builder
 │
 │ Build Prompt
 ▼
Gemini API
 │
 │ Generate Notes
 ▼
Backend API
 │
 │ Save Generation History
 ▼
MongoDB
 │
 ▼
Frontend
 │
 ▼
Display Notes
```

---

# 8. AI Tutor Conversation

```text
User
 │
 ▼
Frontend
 │
 │ Send Message
 ▼
Backend API
 │
 │ Load Conversation History
 ▼
MongoDB
 │
 │ Return Previous Messages
 ▼
Prompt Builder
 │
 │ Build Context-Aware Prompt
 ▼
Gemini API
 │
 │ Generate Reply
 ▼
Backend API
 │
 │ Save Conversation
 ▼
MongoDB
 │
 ▼
Frontend
 │
 ▼
Display AI Response
```

---

# 9. Search & Filter

```text
User
 │
 ▼
Frontend
 │
 │ Search / Filter
 ▼
Backend API
 │
 │ Validate Query
 ▼
MongoDB
 │
 │ Execute Filtered Query
 ▼
Backend API
 │
 ▼
Frontend
 │
 ▼
Filtered Results
```

---

# 10. Dashboard Analytics

```text
User
 │
 ▼
Frontend
 │
 │ Request Dashboard Data
 ▼
Backend API
 │
 │ Session Verification
 ▼
Analytics Service
 │
 ▼
MongoDB
 │
 │ Aggregate Statistics
 ▼
Backend API
 │
 ▼
Frontend
 │
 ▼
Charts & Statistics
```

---

# 11. Error Handling Flow

```text
User Action
 │
 ▼
Frontend
 │
 ▼
Backend API
 │
 │ Exception
 ▼
Error Middleware
 │
 │ Log Error
 ▼
Formatted Error Response
 │
 ▼
Frontend
 │
 ▼
User-Friendly Error Message
```

---

# 12. Protected Route Access

```text
User
 │
 ▼
Frontend
 │
 │ Access Protected Page
 ▼
Backend API
 │
 │ Verify Session
 ├──────────────┐
 │              │
 │ Valid        │ Invalid
 ▼              ▼
Continue     Unauthorized
 │              │
 ▼              ▼
Frontend     Redirect to Login
```

---

# 13. AI Request Lifecycle

```text
User Input
 │
 ▼
Validation
 │
 ▼
Prompt Builder
 │
 ▼
Gemini API
 │
 ▼
Response Validation
 │
 ▼
History Storage
 │
 ▼
Frontend Display
```

---

# 14. Overall System Flow

```text
User
 │
 ▼
Next.js Frontend
 │
 ▼
Express API
 │
 ├───────────────┐
 ▼               ▼
MongoDB      Gemini API
 │               │
 └──────┬────────┘
        ▼
Frontend
        │
        ▼
User
```

---

# 15. Sequence Diagram Principles

The StudyGenie request flows follow these architectural principles:

- All client requests pass through the backend API.
- Authentication is verified before accessing protected resources.
- Business logic is handled by services, not controllers.
- AI prompts are built using reusable prompt templates.
- AI providers are accessed only from the backend.
- Database operations are isolated from presentation logic.
- Every response is validated before returning to the frontend.
- Errors are handled through centralized middleware.
- User data and AI conversation history remain isolated per authenticated user.

These standardized request flows help maintain a secure, scalable, and maintainable application architecture while simplifying onboarding for developers and AI coding agents.
