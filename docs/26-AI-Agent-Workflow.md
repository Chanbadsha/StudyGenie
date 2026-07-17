# 26 - AI Agent Workflow

# StudyGenie AI Agent Workflow

> This document defines how AI coding agents should work within the StudyGenie project. It establishes a standardized workflow to ensure AI-generated code is consistent, secure, maintainable, and aligned with the project architecture.

---

# 1. Purpose

The AI agent should:

- Follow the project documentation.
- Respect the architecture.
- Implement one task at a time.
- Produce production-ready code.
- Avoid introducing breaking changes.
- Keep documentation synchronized with code.

---

# 2. Primary References

Before making any changes, the AI agent should read the following documents in order:

```text
README.md

↓

AGENTS.md

↓

02-PRD.md

↓

03-Business-Rules.md

↓

04-Architecture.md

↓

05-Database.md

↓

06-API.md

↓

Relevant feature documents
```

Never begin implementation without understanding the project requirements.

---

# 3. Task Workflow

For every assigned task, follow this workflow:

```text
Receive Task

↓

Read Relevant Documentation

↓

Understand Requirements

↓

Plan Implementation

↓

Implement Feature

↓

Run Validation

↓

Update Documentation (if required)

↓

Complete Task
```

Do not work on multiple unrelated features simultaneously.

---

# 4. Development Rules

The AI agent should:

- Complete one development phase before starting the next.
- Preserve existing project architecture.
- Prefer reusable components and services.
- Keep functions small and focused.
- Avoid unnecessary complexity.
- Reuse existing utilities whenever possible.

---

# 5. Frontend Workflow

When implementing frontend features:

1. Review the UI guidelines.
2. Follow the design system.
3. Reuse shared components.
4. Implement responsive layouts.
5. Handle loading, empty, and error states.
6. Validate forms.
7. Ensure accessibility.

Do not place business logic directly inside UI components.

---

# 6. Backend Workflow

When implementing backend features:

1. Define or update routes.
2. Implement controllers.
3. Add business logic in services.
4. Access data through repositories.
5. Validate requests.
6. Handle errors consistently.
7. Secure endpoints with authentication and authorization where required.

---

# 7. AI Feature Workflow

When building AI functionality:

```text
Receive User Input

↓

Validate Input

↓

Build Prompt

↓

Call Gemini API

↓

Validate Response

↓

Store History (if applicable)

↓

Return Structured Response
```

System prompts must remain on the server.

---

# 8. Documentation Workflow

Whenever implementation changes affect the project:

- Update API documentation.
- Update database documentation.
- Update environment variables.
- Update architecture if necessary.
- Update prompt documentation for AI changes.

Documentation should always reflect the current implementation.

---

# 9. Testing Workflow

Before completing a task, verify:

- TypeScript compiles successfully.
- ESLint passes.
- New functionality works.
- Existing functionality remains unaffected.
- Responsive behavior is maintained.
- AI features behave as expected.

Do not mark a task complete without validation.

---

# 10. Error Handling

The AI agent should:

- Anticipate failure cases.
- Handle validation errors.
- Return meaningful API responses.
- Display user-friendly frontend messages.
- Avoid exposing internal implementation details.

Never ignore errors silently.

---

# 11. Security Workflow

For every feature:

- Validate user input.
- Verify authentication.
- Enforce authorization.
- Protect secrets.
- Sanitize untrusted input.
- Avoid exposing sensitive information.

Security checks should never be optional.

---

# 12. Code Quality Checklist

Before completing any implementation, confirm:

- No duplicated logic.
- No unused imports.
- No unused variables.
- No commented-out code.
- Clear naming.
- Consistent formatting.
- Type-safe implementation.
- Proper separation of concerns.

---

# 13. AI Agent Restrictions

The AI agent must **not**:

- Modify unrelated files.
- Change project architecture without approval.
- Introduce breaking API changes without documentation.
- Hardcode secrets or credentials.
- Disable validation or security checks.
- Skip required documentation updates.
- Ignore existing coding standards.

---

# 14. Completion Checklist

A task is complete only when:

- Requirements are implemented.
- Code follows the architecture.
- TypeScript passes.
- Linting passes.
- Errors are handled.
- Documentation is updated (if required).
- No regressions are introduced.

---

# 15. Escalation Guidelines

If requirements are unclear, the AI agent should:

1. Review the relevant documentation.
2. Infer behavior from established project patterns.
3. Avoid making assumptions that conflict with documented requirements.
4. Request clarification only when a decision cannot be made safely.

---

# 16. Continuous Improvement

The AI agent should continuously:

- Reduce duplication.
- Improve readability.
- Refactor safely.
- Reuse existing abstractions.
- Keep modules focused.
- Optimize performance without sacrificing clarity.

Improvements should preserve existing functionality.

---

# 17. Definition of Success

An AI-generated contribution is considered successful when it:

- Solves the assigned task completely.
- Follows all project documentation.
- Preserves architectural consistency.
- Produces clean, maintainable, and type-safe code.
- Meets security and validation requirements.
- Updates documentation when necessary.
- Is ready for review and production deployment without unnecessary rework.

Following this workflow ensures that every AI-assisted contribution remains aligned with StudyGenie's engineering standards and long-term maintainability.
