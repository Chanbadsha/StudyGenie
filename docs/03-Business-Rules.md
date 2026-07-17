# 03 - Business Rules

# StudyGenie

> This document defines the business rules, constraints, permissions, and system behaviors for the StudyGenie platform. These rules ensure consistent implementation across the frontend, backend, database, and AI workflows.

---

# 1. User Roles

## Student

The default role assigned to every registered user.

A student can:

- Register an account
- Login and logout
- Manage their profile
- Create study materials
- View public study materials
- Delete their own study materials
- Generate AI notes
- Use the AI Tutor
- View personal dashboard and analytics

A student **cannot**:

- Delete another user's materials
- Access another user's dashboard
- Modify another user's AI history
- Access administrative features

---

## Admin (Future)

An administrator can:

- Manage all users
- Remove inappropriate study materials
- Monitor AI usage
- View platform-wide analytics
- Moderate reported content

---

# 2. Authentication Rules

- Registration requires a unique email address.
- Passwords must be securely hashed before storage.
- Email addresses are case-insensitive.
- Better Auth sessions are required for protected API endpoints.
- Expired or invalid sessions must be rejected.
- Google authentication should create an account automatically if one does not already exist.
- Users must be authenticated before accessing protected pages.

---

# 3. Authorization Rules

Protected actions require a valid authenticated user.

A user may:

- Create their own study materials.
- Delete only their own study materials.
- Access only their own AI history.
- Access only their own dashboard.
- Manage only their own profile.

Ownership must always be verified on the server.

Client-side authorization alone is not sufficient.

---

# 4. Study Material Rules

Each study material:

- Belongs to exactly one user.
- Must have a title.
- Must have a subject.
- Must have a difficulty level.
- Must have a short description.
- Must have full study content.
- May include an optional cover image URL.
- Records the creation timestamp.

Study materials are public by default unless future privacy features are added.

---

# 5. Data Validation Rules

The backend is the source of truth for validation.

Validation must occur on both:

- Client
- Server

Invalid data must never be stored.

Typical validation includes:

- Required fields
- Minimum lengths
- Maximum lengths
- Valid URLs
- Valid enum values
- Sanitized input

---

# 6. AI Notes Generator Rules

Only authenticated users may generate AI notes.

Every generation requires:

- Topic
- Subject
- Difficulty
- Learning goal
- Output length

Each AI generation:

- Uses a predefined prompt template.
- Is processed by the backend.
- May be stored in the user's AI history.
- Can be regenerated.

The AI provider must never be called directly from the frontend.

---

# 7. AI Tutor Rules

Only authenticated users may access the AI Tutor.

Each chat belongs to a single user.

Each conversation:

- Maintains message history.
- Preserves context within the session.
- Supports follow-up questions.
- Can be resumed later.

The AI should answer educational questions and stay within the application's intended purpose.

---

# 8. Prompt Management Rules

Prompt templates must be stored in dedicated backend files.

Prompt templates must:

- Be reusable.
- Accept structured variables.
- Be version-controlled.
- Avoid hardcoded user input.
- Include clear system instructions.

Controllers should not contain long prompt strings.

---

# 9. Search Rules

Users can search study materials by:

- Title

Search should:

- Ignore letter casing.
- Support partial matches.
- Return relevant results.

---

# 10. Filter Rules

Filtering must support at least:

- Subject
- Difficulty

Multiple filters may be combined.

Filters should be optional.

---

# 11. Sorting Rules

Supported sorting:

- Newest first
- Oldest first
- Alphabetical (A–Z)
- Alphabetical (Z–A)

Sorting should occur on the server.

---

# 12. Pagination Rules

Listing pages must support pagination.

Default page size should be consistent across the application.

Pagination should return:

- Current page
- Total pages
- Total records
- Records per page

---

# 13. Dashboard Rules

The dashboard displays only the authenticated user's information.

Dashboard metrics may include:

- Total study materials
- AI note generations
- Recent activity
- Subject distribution
- Learning progress

Users cannot access another user's dashboard data.

---

# 14. Analytics Rules

Analytics are user-specific.

Analytics should update automatically after relevant actions such as:

- Creating a study material
- Generating AI notes
- Completing future quizzes

Aggregated values should be calculated on the backend where practical.

---

# 15. File & Image Rules

Users may provide a cover image URL for study materials.

Image URLs should:

- Be optional.
- Be validated before saving.
- Fall back to a default image if unavailable.

Direct file uploads are out of scope for Version 1.

---

# 16. API Rules

All API responses should follow a consistent structure.

Success response:

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```

HTTP status codes should accurately reflect the outcome of each request.

---

# 17. Error Handling Rules

The application must gracefully handle:

- Authentication failures
- Authorization failures
- Validation errors
- Missing resources
- AI service failures
- Database failures
- Network issues

Sensitive implementation details must never be exposed to the client.

---

# 18. Security Rules

The application must:

- Hash passwords.
- Protect Better Auth secrets.
- Validate all incoming requests.
- Sanitize user input.
- Restrict access to protected resources.
- Never expose API keys.
- Use environment variables for secrets.

---

# 19. Logging Rules

The backend may log:

- Authentication events
- API errors
- AI generation requests
- Database connection status
- Unexpected exceptions

Logs must never include:

- Passwords
- Better Auth secrets
- API keys
- Sensitive personal information

---

# 20. Rate Limiting Rules

To protect the AI service and backend:

- AI generation endpoints should be rate-limited.
- Chat endpoints should be rate-limited.
- Authentication endpoints should be protected against abuse.

Specific limits may be adjusted based on deployment requirements.

---

# 21. Future Feature Rules

Future enhancements may include:

- AI-generated quizzes
- Flashcards
- PDF summarization
- OCR
- Voice tutor
- Study reminders
- Collaboration
- Admin moderation

These features should be designed to integrate without breaking existing functionality.

---

# 22. General Business Principles

StudyGenie follows these principles:

- Every user owns their own content.
- AI enhances learning but does not replace critical thinking.
- User privacy and security are prioritized.
- The backend is the authoritative source for business logic.
- Consistent validation is enforced across the platform.
- AI interactions should be contextual, educational, and transparent.

---

# 23. Definition of Valid Behavior

A feature is considered valid only if it:

- Follows authentication and authorization rules.
- Validates all required input.
- Produces consistent API responses.
- Handles errors gracefully.
- Preserves user ownership of data.
- Complies with the project's architecture and security standards.
- Supports a responsive and accessible user experience.
