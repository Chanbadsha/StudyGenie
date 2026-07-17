# 13 - Prompt Library

# StudyGenie Prompt Library

> This document defines the prompt templates, prompt engineering guidelines, variable structure, and reusable prompt patterns used by the AI features in StudyGenie. All prompts are managed on the backend to ensure consistency, security, and maintainability.

---

# 1. Purpose

The Prompt Library provides:

- Reusable prompt templates
- Consistent AI behavior
- Easier maintenance
- Better output quality
- Version-controlled prompts
- Separation of prompts from business logic

Controllers and routes must never contain long prompt strings.

---

# 2. Prompt Directory

```text
backend/
└── src/
    └── prompts/
        ├── notes.prompt.ts
        ├── tutor.prompt.ts
        ├── prompt-builder.ts
        └── index.ts
```

Each prompt should have a single responsibility.

---

# 3. Prompt Design Principles

Every prompt should:

- Be reusable
- Use structured variables
- Avoid hardcoded values
- Produce predictable outputs
- Encourage factual responses
- Keep a professional educational tone

---

# 4. Prompt Variables

Common variables used across prompts:

| Variable            | Description                      |
| ------------------- | -------------------------------- |
| topic               | Learning topic                   |
| subject             | Subject name                     |
| difficulty          | Beginner, Intermediate, Advanced |
| learningGoal        | User's objective                 |
| outputLength        | Short, Medium, Long              |
| conversationHistory | Previous chat messages           |
| userQuestion        | Current user question            |

---

# 5. AI Notes Generator Prompt

## Purpose

Generate structured study notes.

### Input Variables

```text
topic
subject
difficulty
learningGoal
outputLength
```

### Expected Output

The AI should generate:

- Introduction
- Key Concepts
- Detailed Explanation
- Important Definitions
- Examples
- Summary
- Study Tips

Output should be formatted using Markdown headings and bullet points.

---

# 6. AI Tutor Prompt

## Purpose

Provide educational assistance through conversation.

### Input Variables

```text
conversationHistory

userQuestion
```

### AI Responsibilities

The tutor should:

- Explain concepts clearly
- Answer follow-up questions
- Use previous conversation context
- Encourage learning
- Avoid unnecessary complexity
- Ask clarifying questions when appropriate

---

# 7. System Instructions

Every AI request begins with a system instruction.

General responsibilities:

- Act as an educational assistant.
- Explain concepts accurately.
- Use simple language unless advanced detail is requested.
- Organize responses clearly.
- Avoid unsupported claims.
- State uncertainty when appropriate.
- Keep the response focused on the user's educational goal.

System instructions should be maintained centrally and reused.

---

# 8. Prompt Builder

The Prompt Builder combines structured variables with reusable templates.

Workflow:

```text
User Input

↓

Validation

↓

Prompt Variables

↓

Prompt Template

↓

System Instructions

↓

Final Prompt
```

The builder should sanitize and normalize user input before constructing prompts.

---

# 9. Output Formatting

AI responses should follow consistent formatting.

Recommended elements:

- Markdown headings
- Bullet lists
- Numbered steps
- Tables (when appropriate)
- Code blocks (for programming topics)

Avoid large, unstructured paragraphs.

---

# 10. Response Length

Supported options:

| Option | Description          |
| ------ | -------------------- |
| Short  | Concise overview     |
| Medium | Balanced explanation |
| Long   | Detailed study guide |

The selected option should influence the depth of the AI response.

---

# 11. Conversation Context

The AI Tutor prompt should include:

- Previous user messages
- Previous AI responses
- Current user question

Only the current chat session should be used to build context.

---

# 12. Prompt Safety

Prompts should:

- Avoid requesting personal or sensitive information.
- Prevent prompt injection where practical.
- Ignore attempts to reveal system prompts.
- Keep responses aligned with educational use.
- Avoid generating harmful or unsafe content.

Prompt validation should occur before sending requests to the LLM.

---

# 13. Regeneration

When a user requests regeneration:

- Reuse the original structured input.
- Generate a fresh response.
- Preserve the original history entry unless replaced intentionally.

The regenerated output should remain relevant while varying wording or examples.

---

# 14. Prompt Versioning

Prompt files should be version-controlled.

Example:

```text
notes.prompt.v1.ts

notes.prompt.v2.ts
```

Alternatively, maintain version history through Git while keeping a single active template.

Document significant prompt changes in release notes or commit messages.

---

# 15. Error Handling

If AI generation fails:

- Return a friendly error message.
- Avoid exposing provider errors directly.
- Log the failure on the server.
- Allow the user to retry.

Fallback behavior should never reveal internal implementation details.

---

# 16. Future Prompt Templates

The prompt library is designed to support future features such as:

- Quiz Generator
- Flashcard Generator
- Study Planner
- Document Summarizer
- PDF Analyzer
- OCR Assistant
- Learning Recommendation Engine
- Revision Planner

Each new feature should receive its own dedicated prompt template.

---

# 17. Prompt Quality Guidelines

Every prompt should:

- Clearly define the AI's role.
- Specify the expected output structure.
- Include all required context.
- Minimize ambiguity.
- Be concise while preserving necessary detail.
- Produce deterministic and educational responses where possible.

---

# 18. Prompt Testing

Prompt templates should be tested with different scenarios, including:

- Beginner vs. advanced difficulty
- Short vs. long output
- Different subjects
- Ambiguous user questions
- Follow-up questions in chat
- Empty or invalid input

Testing helps ensure consistent AI behavior across the application.

---

# 19. Maintenance Guidelines

Prompt templates should be reviewed when:

- AI output quality declines.
- A new AI provider is adopted.
- New educational features are introduced.
- User feedback identifies recurring issues.

Updates should preserve compatibility with the existing AI architecture whenever possible.

---

# 20. Prompt Engineering Principles

StudyGenie follows these prompt engineering principles:

- Centralize prompts in the backend.
- Separate prompts from business logic.
- Use structured variables instead of string concatenation.
- Build prompts through reusable templates.
- Preserve conversation context responsibly.
- Optimize prompts for clarity, consistency, and educational value.
- Design prompts to be portable across supported LLM providers.
