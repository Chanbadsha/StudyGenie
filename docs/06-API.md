# 06 - API Specification

# StudyGenie REST API

> This document defines the REST API for the StudyGenie platform, including endpoint structure, request/response formats, authentication requirements, validation, and error handling.

**API Version:** v1

**Base URL (Development)**

```text
http://localhost:5000/api/v1
```

**Base URL (Production)**

```text
https://your-api-domain.com/api/v1
```

---

# 1. API Design Principles

The API follows RESTful conventions.

Principles:

- Resource-oriented URLs
- Consistent JSON responses
- Better Auth session authentication
- Proper HTTP status codes
- Input validation
- Predictable error handling

---

# 2. Standard Response Format

## Success

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```

---

# 3. Authentication

Protected endpoints require a valid Better Auth session.

The backend determines the authenticated user from the verified session.

---

# 4. Authentication APIs

## Register

### POST

```http
/auth/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Login

### POST

```http
/auth/login
```

### Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Google Login

### POST

```http
/auth/google
```

Authenticates users via Google OAuth.

---

## Get Current User

### GET

```http
/auth/me
```

Authentication required.

---

## Logout

### POST

```http
/auth/logout
```

---

# 5. User APIs

## Get Profile

### GET

```http
/users/profile
```

Authentication required.

---

## Update Profile

### PATCH

```http
/users/profile
```

---

# 6. Study Material APIs

## Create Study Material

### POST

```http
/materials
```

Authentication required.

### Request

```json
{
  "title": "Introduction to Algebra",
  "subject": "Mathematics",
  "difficulty": "Beginner",
  "shortDescription": "Basic algebra concepts.",
  "content": "Full study material...",
  "coverImage": "https://example.com/image.jpg"
}
```

---

## Get All Materials

### GET

```http
/materials
```

Supports:

| Query      | Description            |
| ---------- | ---------------------- |
| page       | Page number            |
| limit      | Items per page         |
| search     | Search by title        |
| subject    | Filter by subject      |
| difficulty | Filter by difficulty   |
| sort       | newest, oldest, az, za |

Example

```http
/materials?page=1&limit=12&subject=Math&difficulty=Beginner&sort=newest
```

---

## Get Material Details

### GET

```http
/materials/:id
```

Public endpoint.

---

## Delete Material

### DELETE

```http
/materials/:id
```

Authentication required.

Only the owner may delete.

---

# 7. AI Notes Generator APIs

## Generate Notes

### POST

```http
/ai/notes
```

Authentication required.

### Request

```json
{
  "topic": "Newton's Laws",
  "subject": "Physics",
  "difficulty": "Intermediate",
  "learningGoal": "Understand motion",
  "outputLength": "Medium"
}
```

### Response

```json
{
  "success": true,
  "message": "Notes generated successfully.",
  "data": {
    "response": "Generated AI notes..."
  }
}
```

---

## Get AI Generation History

### GET

```http
/ai/history
```

Returns all AI generations for the authenticated user.

---

## Delete AI Generation

### DELETE

```http
/ai/history/:id
```

Deletes one AI generation owned by the authenticated user.

---

# 8. AI Tutor APIs

## Create Chat Session

### POST

```http
/chat/sessions
```

Creates a new AI chat session.

---

## Get Chat Sessions

### GET

```http
/chat/sessions
```

Returns the authenticated user's chat sessions.

---

## Get Chat Session

### GET

```http
/chat/sessions/:id
```

Returns a specific chat session with all messages.

---

## Send Message

### POST

```http
/chat/messages
```

### Request

```json
{
  "sessionId": "SESSION_ID",
  "message": "Explain Newton's First Law."
}
```

### Response

```json
{
  "success": true,
  "message": "AI response generated.",
  "data": {
    "reply": "Newton's First Law states..."
  }
}
```

---

## Delete Chat Session

### DELETE

```http
/chat/sessions/:id
```

Deletes the chat session and its messages.

---

# 9. Analytics APIs

## Dashboard Statistics

### GET

```http
/analytics/dashboard
```

Authentication required.

Example response:

```json
{
  "success": true,
  "data": {
    "totalMaterials": 15,
    "totalGenerations": 42,
    "totalChatSessions": 8,
    "favoriteSubject": "Physics"
  }
}
```

---

## Learning Charts

### GET

```http
/analytics/charts
```

Returns chart-ready data for the authenticated user.

---

# 10. Search & Filter Parameters

Supported query parameters:

| Parameter  | Description            |
| ---------- | ---------------------- |
| page       | Current page           |
| limit      | Records per page       |
| search     | Search by title        |
| subject    | Filter by subject      |
| difficulty | Filter by difficulty   |
| sort       | newest, oldest, az, za |

---

# 11. HTTP Status Codes

| Status | Meaning               |
| ------ | --------------------- |
| 200    | Success               |
| 201    | Created               |
| 204    | Deleted successfully  |
| 400    | Validation error      |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Resource not found    |
| 409    | Conflict              |
| 429    | Too many requests     |
| 500    | Internal server error |

---

# 12. Validation Rules

Every endpoint validates:

- Required fields
- Data types
- String lengths
- Enum values
- ObjectId format
- Authorization
- Resource ownership

Validation occurs on both client and server.

---

# 13. Error Responses

Example validation error:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "title",
      "message": "Title is required."
    }
  ]
}
```

Example unauthorized error:

```json
{
  "success": false,
  "message": "Authentication required."
}
```

---

# 14. Rate Limiting

Recommended limits:

| Endpoint       | Suggested Limit       |
| -------------- | --------------------- |
| /auth/login    | 5 requests/minute/IP  |
| /auth/register | 5 requests/minute/IP  |
| /ai/notes      | 20 requests/hour/user |
| /chat/messages | 60 requests/hour/user |

Limits may be adjusted based on deployment and usage.

---

# 15. API Versioning

The API uses URI versioning.

Example:

```text
/api/v1/materials
```

Future versions:

```text
/api/v2/materials
```

Breaking changes should be introduced in a new version.

---

# 16. Security Requirements

- Better Auth session authentication
- Password hashing
- Request validation
- Input sanitization
- Environment variables
- Secure CORS configuration
- Ownership verification
- Backend-only AI access

The frontend must never communicate directly with the AI provider.

---

# 17. Future APIs

Planned endpoints include:

```text
POST   /ai/quiz
POST   /ai/flashcards
POST   /documents/upload
POST   /documents/summarize
GET    /notifications
POST   /feedback
GET    /admin/users
DELETE /admin/materials/:id
```

These APIs are intentionally excluded from Version 1 but fit within the existing architecture.

---

# 18. API Development Guidelines

All API endpoints should:

- Use descriptive RESTful routes.
- Return consistent JSON responses.
- Validate input before processing.
- Verify authentication and authorization.
- Handle errors gracefully.
- Log unexpected server errors.
- Avoid exposing internal implementation details.
- Remain backward compatible within the same API version.
