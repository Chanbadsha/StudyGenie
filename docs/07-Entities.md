# 07 - Entities

# StudyGenie Domain Entities

> This document defines the core business entities of the StudyGenie platform. Unlike the database schema, these entities represent the business objects, their responsibilities, relationships, lifecycle, permissions, and validation rules.

---

# 1. Overview

StudyGenie is built around six primary domain entities:

```text
User

StudyMaterial

AIGeneration

ChatSession

ChatMessage

LearningAnalytics
```

Each entity has a single responsibility and represents an important part of the application's business domain.

---

# 2. Entity Relationship Overview

```text
User
│
├──────────────┐
│              │
▼              ▼
StudyMaterial  ChatSession
│              │
│              ▼
│         ChatMessage
│
▼
AIGeneration
│
▼
LearningAnalytics
```

---

# 3. User

## Purpose

Represents an authenticated student using the platform.

---

## Responsibilities

- Register and authenticate
- Manage profile
- Create study materials
- Generate AI content
- Chat with AI Tutor
- View analytics

---

## Relationships

```text
User
├── StudyMaterial (1:N)
├── AIGeneration (1:N)
├── ChatSession (1:N)
└── LearningAnalytics (1:1)
```

---

## Ownership

Owns:

- Study Materials
- AI History
- Chat Sessions
- Dashboard Data

---

## Lifecycle

```text
Register

↓

Verify/Login

↓

Use Platform

↓

Update Profile

↓

Delete Account (Future)
```

---

## Permissions

Can:

- Create materials
- Delete own materials
- Generate AI notes
- Chat with AI
- View dashboard

Cannot:

- Access another user's data
- Delete another user's content

---

## Validation

- Name required
- Unique email
- Valid authentication provider
- Valid role

---

# 4. StudyMaterial

## Purpose

Represents a learning resource created by a student.

---

## Responsibilities

- Store educational content
- Organize by subject
- Support AI features
- Be discoverable through search

---

## Relationships

```text
StudyMaterial

│

├── belongs to User

└── referenced by AIGeneration
```

---

## Lifecycle

```text
Create

↓

View

↓

Search

↓

Delete
```

---

## Permissions

Owner can:

- Create
- Delete

Everyone can:

- Browse
- View Details

---

## Validation

Required

- Title
- Subject
- Difficulty
- Short Description
- Content

Optional

- Cover Image
- Tags

---

# 5. AIGeneration

## Purpose

Stores AI-generated educational content.

Examples

- Notes
- Summary
- Quiz (Future)
- Flashcards (Future)

---

## Responsibilities

- Save prompts
- Save AI responses
- Track AI usage
- Enable regeneration

---

## Relationships

```text
AIGeneration

│

├── belongs to User

└── optionally linked to StudyMaterial
```

---

## Lifecycle

```text
Generate

↓

Save

↓

View History

↓

Delete (Optional Future)
```

---

## Permissions

Only the owner can:

- View history
- Delete history

---

## Validation

Required

- Prompt
- Response
- Generation Type
- Output Length

---

# 6. ChatSession

## Purpose

Represents one conversation with the AI Tutor.

---

## Responsibilities

- Maintain context
- Group messages
- Support follow-up reasoning

---

## Relationships

```text
ChatSession

│

├── belongs to User

└── has many ChatMessages
```

---

## Lifecycle

```text
Create Session

↓

Send Messages

↓

Continue Conversation

↓

Delete Session
```

---

## Permissions

Only the owner may:

- View session
- Continue chat
- Delete session

---

## Validation

Required

- User
- Session Title

---

# 7. ChatMessage

## Purpose

Represents a single message exchanged between the user and the AI Tutor.

---

## Responsibilities

- Preserve conversation history
- Maintain chronological order
- Support contextual AI reasoning

---

## Relationships

```text
ChatMessage

│

└── belongs to ChatSession
```

---

## Roles

```text
User

Assistant
```

---

## Lifecycle

```text
Send

↓

Store

↓

Read
```

---

## Validation

Required

- Session ID
- Role
- Message Content

---

# 8. LearningAnalytics

## Purpose

Stores aggregated learning statistics for each user.

---

## Responsibilities

- Dashboard metrics
- Learning trends
- AI usage statistics
- Progress visualization

---

## Relationships

```text
LearningAnalytics

│

└── belongs to User
```

---

## Metrics

Examples

- Total Materials
- AI Generations
- Chat Sessions
- Favorite Subject
- Study Minutes

---

## Lifecycle

```text
User Action

↓

Statistics Updated

↓

Dashboard Refresh
```

---

## Validation

All numeric values must be non-negative.

---

# 9. Entity Ownership

| Entity            | Owner             |
| ----------------- | ----------------- |
| User              | Self              |
| StudyMaterial     | User              |
| AIGeneration      | User              |
| ChatSession       | User              |
| ChatMessage       | ChatSession Owner |
| LearningAnalytics | User              |

Ownership must always be enforced on the backend.

---

# 10. Entity Permissions Matrix

| Entity            | Create | Read   | Update | Delete |
| ----------------- | ------ | ------ | ------ | ------ |
| User              | Self   | Self   | Self   | Future |
| StudyMaterial     | Owner  | Public | Future | Owner  |
| AIGeneration      | Owner  | Owner  | No     | Future |
| ChatSession       | Owner  | Owner  | No     | Owner  |
| ChatMessage       | Owner  | Owner  | No     | No     |
| LearningAnalytics | System | Owner  | System | No     |

---

# 11. Business Rules

## User

- Email must be unique.
- Authentication is required for protected features.

---

## StudyMaterial

- Must belong to exactly one user.
- Publicly visible by default.
- Requires all mandatory fields before creation.

---

## AIGeneration

- Generated only through backend AI services.
- Linked to the authenticated user.
- Stored for history and future reference.

---

## ChatSession

- Each session belongs to one user.
- Messages remain ordered by creation time.
- Conversation context is preserved within the session.

---

## LearningAnalytics

- Updated automatically after relevant user actions.
- Read-only from the user's perspective.

---

# 12. Future Entities

The architecture supports adding new domain entities without disrupting existing functionality.

Potential future entities include:

- Quiz
- Flashcard
- StudyPlan
- Notification
- Bookmark
- AI Feedback
- Document
- File Upload
- Report

---

# 13. Entity Design Principles

StudyGenie follows these principles:

- Single Responsibility — each entity models one core concept.
- Clear Ownership — every entity has a well-defined owner.
- Minimal Coupling — relationships are kept simple and explicit.
- Extensibility — new entities can be introduced without major refactoring.
- Security — access control is enforced through ownership and authorization.
- AI Readiness — entities support contextual AI workflows and future enhancements.
- Consistency — naming, validation, and lifecycle patterns remain uniform across the application.
