# 05 - Database Design

# StudyGenie Database Design

> This document defines the database architecture, collections, relationships, indexes, validation rules, and design decisions for the StudyGenie platform.

**Database:** MongoDB Atlas  
**Database Name:** `studygenie`

---

# 1. Database Goals

The database is designed to:

- Store user data securely.
- Manage study materials.
- Support AI-generated content.
- Maintain AI conversation history.
- Track learning analytics.
- Scale for future AI features.
- Minimize data duplication.

---

# 2. Collections Overview

Version 1 includes the following collections:

```text
users

studyMaterials

chatSessions

chatMessages

aiGenerations

learningAnalytics
```

Future collections may include:

```text
quizzes

flashcards

notifications

reports

feedback
```

---

# 3. Entity Relationship Diagram (ERD)

```text
Users
 │
 ├──────────────┐
 │              │
 ▼              ▼
StudyMaterials  ChatSessions
 │              │
 │              ▼
 │         ChatMessages
 │
 ▼
AIGenerations

Users
 │
 ▼
LearningAnalytics
```

---

# 4. Collection: users

Stores authentication and profile information.

## Fields

| Field     | Type     | Required    | Description                        |
| --------- | -------- | ----------- | ---------------------------------- |
| \_id      | ObjectId | Yes         | Primary key                        |
| name      | String   | Yes         | Full name                          |
| email     | String   | Yes         | Unique email                       |
| password  | String   | Conditional | Hashed password (email login only) |
| avatar    | String   | No          | Profile image URL                  |
| provider  | String   | Yes         | `credentials` or `google`          |
| role      | String   | Yes         | `student` or `admin`               |
| createdAt | Date     | Yes         | Creation time                      |
| updatedAt | Date     | Yes         | Last update                        |

## Indexes

- email (unique)
- role

---

# 5. Collection: studyMaterials

Stores study resources created by users.

## Fields

| Field            | Type           | Required | Description                      |
| ---------------- | -------------- | -------- | -------------------------------- |
| \_id             | ObjectId       | Yes      | Primary key                      |
| title            | String         | Yes      | Material title                   |
| subject          | String         | Yes      | Subject category                 |
| difficulty       | String         | Yes      | Beginner, Intermediate, Advanced |
| shortDescription | String         | Yes      | Brief overview                   |
| content          | String         | Yes      | Full study content               |
| coverImage       | String         | No       | Cover image URL                  |
| tags             | Array\<String> | No       | Keywords                         |
| createdBy        | ObjectId       | Yes      | Reference to users               |
| createdAt        | Date           | Yes      | Creation date                    |
| updatedAt        | Date           | Yes      | Last update                      |

## Relationships

```text
createdBy
      │
      ▼
users._id
```

## Indexes

- title
- subject
- difficulty
- createdBy
- createdAt

---

# 6. Collection: aiGenerations

Stores AI-generated learning content.

## Fields

| Field        | Type     | Required | Description            |
| ------------ | -------- | -------- | ---------------------- |
| \_id         | ObjectId | Yes      | Primary key            |
| userId       | ObjectId | Yes      | Owner                  |
| materialId   | ObjectId | No       | Related study material |
| type         | String   | Yes      | Notes, Summary, Quiz   |
| prompt       | String   | Yes      | User prompt            |
| response     | String   | Yes      | AI response            |
| outputLength | String   | Yes      | Short, Medium, Long    |
| model        | String   | Yes      | AI model used          |
| createdAt    | Date     | Yes      | Generation time        |

## Relationships

```text
userId
    │
    ▼
users._id

materialId
     │
     ▼
studyMaterials._id
```

## Indexes

- userId
- materialId
- type
- createdAt

---

# 7. Collection: chatSessions

Represents an AI conversation.

## Fields

| Field         | Type     | Required | Description   |
| ------------- | -------- | -------- | ------------- |
| \_id          | ObjectId | Yes      | Primary key   |
| userId        | ObjectId | Yes      | Owner         |
| title         | String   | Yes      | Session title |
| lastMessageAt | Date     | Yes      | Last activity |
| createdAt     | Date     | Yes      | Creation time |

## Relationships

```text
userId
   │
   ▼
users._id
```

## Indexes

- userId
- lastMessageAt

---

# 8. Collection: chatMessages

Stores all AI conversation messages.

## Fields

| Field     | Type     | Required | Description           |
| --------- | -------- | -------- | --------------------- |
| \_id      | ObjectId | Yes      | Primary key           |
| sessionId | ObjectId | Yes      | Chat session          |
| role      | String   | Yes      | `user` or `assistant` |
| content   | String   | Yes      | Message text          |
| createdAt | Date     | Yes      | Timestamp             |

## Relationships

```text
sessionId
      │
      ▼
chatSessions._id
```

## Indexes

- sessionId
- createdAt

---

# 9. Collection: learningAnalytics

Stores user learning statistics.

## Fields

| Field             | Type     | Required | Description            |
| ----------------- | -------- | -------- | ---------------------- |
| \_id              | ObjectId | Yes      | Primary key            |
| userId            | ObjectId | Yes      | User reference         |
| totalMaterials    | Number   | Yes      | Total study materials  |
| totalGenerations  | Number   | Yes      | AI generations         |
| totalChatSessions | Number   | Yes      | Chat sessions          |
| favoriteSubject   | String   | No       | Most-used subject      |
| totalStudyMinutes | Number   | Yes      | Accumulated study time |
| updatedAt         | Date     | Yes      | Last calculation       |

## Relationships

```text
userId
   │
   ▼
users._id
```

## Indexes

- userId (unique)

---

# 10. Collection Relationships

```text
Users
 │
 ├──────────────┐
 │              │
 ▼              ▼
StudyMaterials  ChatSessions
 │              │
 │              ▼
 │         ChatMessages
 │
 ▼
AIGenerations

Users
 │
 ▼
LearningAnalytics
```

---

# 11. Enumerations

## User Roles

```text
student
admin
```

## Authentication Provider

```text
credentials
google
```

## Difficulty Levels

```text
Beginner
Intermediate
Advanced
```

## AI Generation Types

```text
Notes
Summary
Quiz
Flashcards (Future)
```

## Output Length

```text
Short
Medium
Long
```

---

# 12. Validation Rules

## User

- Email must be unique.
- Name is required.
- Password is required for credential-based accounts.
- Role defaults to `student`.

## Study Material

- Title is required.
- Subject is required.
- Difficulty must match the allowed enum.
- Short description is required.
- Content is required.

## AI Generation

- Prompt is required.
- Response is required.
- Type is required.
- Output length must be valid.

## Chat

- Every message belongs to one session.
- Every session belongs to one user.

---

# 13. Normalization Strategy

The database avoids unnecessary duplication by storing references.

Examples:

- Study materials reference the creator.
- AI generations reference users and optionally study materials.
- Chat messages reference chat sessions.
- Analytics reference users.

Large AI responses are stored only once.

---

# 14. Query Optimization

Frequently queried fields should be indexed.

Common queries include:

- User materials
- Explore materials by subject
- Search by title
- Recent AI generations
- User chat history
- Dashboard analytics

Pagination should be implemented using indexed fields such as `createdAt`.

---

# 15. Data Ownership Rules

- Users own their study materials.
- Users own their AI generation history.
- Users own their chat sessions and messages.
- Analytics are private to each user.
- Ownership is always enforced on the backend.

---

# 16. Soft Delete Policy

Version 1 uses **hard deletes** for simplicity.

Future versions may introduce:

- `deletedAt`
- `isDeleted`

to support recovery and auditing.

---

# 17. Backup & Recovery

Recommended production strategy:

- MongoDB Atlas automated backups.
- Point-in-time recovery (where available).
- Periodic export of critical collections.
- Secure storage of backup credentials.

---

# 18. Future Database Expansion

Potential future collections include:

```text
quizzes
flashcards
studyPlans
notifications
aiFeedback
reports
bookmarks
sharedMaterials
```

The current schema is designed to accommodate these additions with minimal changes.

---

# 19. Design Principles

The StudyGenie database follows these principles:

- Clear ownership of data.
- Minimal duplication.
- Consistent naming conventions.
- Strong validation.
- Indexed search fields.
- Scalable relationships.
- Efficient querying.
- AI-ready structure.
- Security-first design.

```

```
