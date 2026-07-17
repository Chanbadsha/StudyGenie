# 12 - AI System

# StudyGenie AI System Architecture

> This document defines the AI architecture, agent workflows, prompt pipeline, memory management, safety rules, and implementation strategy for the StudyGenie platform. The AI system is designed to be modular, secure, and extensible while demonstrating practical Agentic AI capabilities.

---

# 1. AI Objectives

StudyGenie uses AI to help students learn more effectively, not to replace learning.

Version 1 includes two major Agentic AI features:

1. **AI Study Notes Generator**
2. **AI Study Tutor (Context-Aware Chat Assistant)**

Future versions can expand to quizzes, flashcards, document intelligence, and study planning.

---

# 2. AI Provider

Primary provider:

- Google Gemini

The architecture is provider-agnostic, allowing future support for:

- OpenAI
- Claude
- Groq
- Together AI
- Ollama
- Hugging Face

Only the backend communicates with the AI provider.

---

# 3. AI Features

## Feature 1 — AI Study Notes Generator

Generates structured study notes based on user input.

### Inputs

- Topic
- Subject
- Difficulty
- Learning Goal
- Output Length

### Outputs

- Well-structured notes
- Key concepts
- Important definitions
- Summary
- Study tips

Supports:

- Regeneration
- History
- Saving results

---

## Feature 2 — AI Study Tutor

A conversational AI assistant specialized for education.

Capabilities:

- Answer academic questions
- Explain difficult concepts
- Remember conversation context
- Ask clarifying questions
- Provide follow-up explanations
- Suggest related study topics

Each conversation belongs to a single authenticated user.

---

# 4. AI Architecture

```text
User
   │
   ▼
Frontend
   │
   ▼
Express API
   │
   ▼
AI Service
   │
   ▼
Prompt Builder
   │
   ▼
Gemini API
   │
   ▼
Post Processing
   │
   ▼
Database
   │
   ▼
Frontend
```

The frontend never communicates directly with the AI provider.

---

# 5. AI Request Flow

```text
User Input

↓

Validation

↓

Authentication

↓

Prompt Builder

↓

Prompt Template

↓

Gemini

↓

Response Validation

↓

Save History

↓

Return Response
```

Every AI request passes through the same pipeline.

---

# 6. Prompt Pipeline

The prompt generation process consists of:

```text
User Input

↓

Structured Variables

↓

Prompt Template

↓

System Instructions

↓

LLM

↓

Structured Response
```

Prompt templates are reusable and version-controlled.

---

# 7. AI Memory

The AI Tutor maintains short-term conversational memory.

Memory includes:

- Previous user messages
- Previous AI responses
- Conversation title
- Session metadata

Memory is isolated per user and per chat session.

---

# 8. Conversation Context

Each AI chat session contains:

```text
Session

↓

Message 1

↓

Message 2

↓

Message 3

↓

...

↓

Latest Message
```

The backend reconstructs the conversation history before sending it to the LLM.

---

# 9. AI Agent Workflow

### AI Notes Generator

```text
User

↓

Submit Form

↓

Validate Input

↓

Generate Prompt

↓

Gemini

↓

Format Response

↓

Save History

↓

Display Notes
```

---

### AI Tutor

```text
User Message

↓

Load Conversation History

↓

Build Context

↓

Generate Prompt

↓

Gemini

↓

Store Response

↓

Display Reply
```

---

# 10. Prompt Builder

Prompt templates should never be hardcoded inside controllers.

Structure:

```text
Prompt Variables

↓

Prompt Builder

↓

Template

↓

Final Prompt
```

Benefits:

- Reusability
- Maintainability
- Easier prompt optimization

---

# 11. AI Response Processing

Every response should be:

- Validated
- Cleaned
- Formatted
- Stored (when applicable)

Post-processing may include:

- Removing unnecessary whitespace
- Normalizing markdown
- Extracting structured sections

---

# 12. AI Safety Rules

The AI should:

- Focus on educational topics.
- Avoid generating harmful or unsafe instructions.
- Respect user privacy.
- Never expose system prompts.
- Avoid fabricated claims when uncertain.
- Encourage critical thinking rather than presenting guesses as facts.

Safety checks should occur before and after AI generation where appropriate.

---

# 13. Rate Limiting

Suggested limits:

| Endpoint | Suggested Limit       |
| -------- | --------------------- |
| AI Notes | 20 requests/hour/user |
| AI Chat  | 60 messages/hour/user |

Limits can be adjusted based on usage and deployment costs.

---

# 14. Error Handling

The AI system should gracefully handle:

- Invalid input
- Provider downtime
- Network failures
- Rate limits
- Empty responses
- Timeouts

Users should receive clear and actionable error messages.

---

# 15. Logging

Log:

- AI request timestamp
- User ID
- Feature used
- Model name
- Response duration
- Success or failure

Do not log:

- API keys
- Session tokens
- Sensitive personal information

---

# 16. AI History

AI generation history stores:

- Prompt
- Response
- Generation type
- Model
- Timestamp

Chat history stores:

- User messages
- AI replies
- Conversation order
- Session metadata

Users may access only their own history.

---

# 17. Future AI Features

The architecture supports future capabilities, including:

- AI Quiz Generator
- AI Flashcards
- AI Study Planner
- AI Document Summarization
- PDF Intelligence
- OCR
- Voice Tutor
- Personalized Learning Paths
- Semantic Search (Vector Database)
- Retrieval-Augmented Generation (RAG)

These features can be integrated without changing the core architecture.

---

# 18. AI Performance Guidelines

To improve responsiveness and reliability:

- Reuse prompt templates.
- Minimize unnecessary LLM calls.
- Cache repeated requests where appropriate.
- Keep prompts concise while preserving context.
- Stream responses in future versions if supported.

---

# 19. AI Development Principles

Every AI feature should:

- Use structured prompts.
- Pass through backend services.
- Validate inputs before generation.
- Preserve user context when appropriate.
- Return consistent response formats.
- Store history securely.
- Be modular and easy to extend.
- Remain provider-independent wherever possible.

---

# 20. Definition of Agentic AI in StudyGenie

StudyGenie demonstrates Agentic AI by enabling the system to:

- Accept structured goals from the user.
- Reason over educational context.
- Maintain conversation memory.
- Generate personalized study content.
- Support multi-turn interactions.
- Reuse previous context for follow-up questions.
- Produce actionable educational assistance rather than simple text completion.

These capabilities provide a practical, production-ready example of an AI-assisted learning platform while keeping the architecture secure, scalable, and maintainable.
