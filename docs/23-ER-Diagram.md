# 23 - ER Diagram

# StudyGenie Entity Relationship Diagram (ERD)

> This document defines the database entities, relationships, cardinality, and data ownership within the StudyGenie platform. It serves as the primary reference for backend development, database design, and API implementation.

---

# 1. Database Overview

StudyGenie uses **MongoDB** as its primary database.

Main entities:

- User
- Study Material
- AI Generation
- Chat Session
- Chat Message

The database follows a **reference-based design**, where documents are linked by IDs rather than deeply nested.

---

# 2. High-Level ER Diagram

```text
                    +----------------+
                    |      User      |
                    +----------------+
                    | _id            |
                    | name           |
                    | email          |
                    | avatar         |
                    | role           |
                    +--------+-------+
                             |
        +--------------------+---------------------+
        |                    |                     |
        |                    |                     |
        ▼                    ▼                     ▼
+----------------+   +----------------+   +----------------+
| Study Material |   | AI Generation  |   | Chat Session   |
+----------------+   +----------------+   +----------------+
| _id            |   | _id            |   | _id            |
| userId         |   | userId         |   | userId         |
| title          |   | topic          |   | title          |
| subject        |   | response       |   | createdAt      |
| difficulty     |   | createdAt      |   +--------+-------+
| createdAt      |   +----------------+            |
+----------------+                                 |
                                                   ▼
                                        +------------------+
                                        |  Chat Message    |
                                        +------------------+
                                        | _id              |
                                        | sessionId        |
                                        | sender           |
                                        | content          |
                                        | createdAt        |
                                        +------------------+
```

---

# 3. User Entity

A user represents an authenticated learner.

### Relationships

A user can have:

- Many study materials
- Many AI generations
- Many chat sessions

```text
User

1

↓

Many Study Materials

Many AI Generations

Many Chat Sessions
```

---

# 4. Study Material Entity

Stores educational resources created by users.

### Relationship

```text
User

1

↓

Many Study Materials
```

Each study material belongs to exactly one user.

---

# 5. AI Generation Entity

Stores generated study notes.

### Relationship

```text
User

1

↓

Many AI Generations
```

Each generation belongs to one authenticated user.

---

# 6. Chat Session Entity

Represents a conversation with the AI tutor.

Relationship:

```text
User

1

↓

Many Chat Sessions
```

Each session contains multiple messages.

---

# 7. Chat Message Entity

Represents a single message inside a conversation.

Relationship:

```text
Chat Session

1

↓

Many Chat Messages
```

Messages cannot exist without a session.

---

# 8. Relationship Summary

| Parent       | Child          | Relationship |
| ------------ | -------------- | ------------ |
| User         | Study Material | One-to-Many  |
| User         | AI Generation  | One-to-Many  |
| User         | Chat Session   | One-to-Many  |
| Chat Session | Chat Message   | One-to-Many  |

---

# 9. Cardinality Diagram

```text
User
 │
 ├──────────────< Study Material
 │
 ├──────────────< AI Generation
 │
 └──────────────< Chat Session
                     │
                     └──────────< Chat Message
```

`1 ────< Many`

---

# 10. Ownership Rules

Ownership is enforced on the backend.

| Resource       | Owner              |
| -------------- | ------------------ |
| Study Material | User               |
| AI Generation  | User               |
| Chat Session   | User               |
| Chat Message   | Chat Session Owner |

Users may only manage their own resources.

---

# 11. Delete Behavior

### User Deleted

If a user is removed:

- Delete study materials
- Delete AI generations
- Delete chat sessions
- Delete chat messages associated with those sessions

This is handled as an application-level cascade.

---

### Chat Session Deleted

Deleting a session also removes:

- All associated chat messages

---

# 12. Reference Strategy

MongoDB stores references using IDs.

Example:

```text
Study Material

userId

↓

User._id
```

```text
Chat Message

sessionId

↓

Chat Session._id
```

No embedded documents are required for these relationships.

---

# 13. Index Recommendations

Create indexes for:

### User

- email (unique)

### Study Material

- userId
- subject
- difficulty
- createdAt

### AI Generation

- userId
- createdAt

### Chat Session

- userId
- createdAt

### Chat Message

- sessionId
- createdAt

Indexes improve search, filtering, and sorting performance.

---

# 14. Future Relationships

Future versions may introduce:

```text
User

↓

Bookmarks

↓

Study Plan

↓

Quiz

↓

Flashcard

↓

Learning Progress
```

The current schema is designed to support these additions without major restructuring.

---

# 15. Database Design Principles

The StudyGenie database follows these principles:

- Clear ownership of all user-generated data.
- Reference-based relationships to reduce duplication.
- One-to-many relationships for scalable growth.
- Indexed fields for efficient querying.
- Application-level cascade deletion.
- Simple, modular schema that supports future AI features and educational tools.
