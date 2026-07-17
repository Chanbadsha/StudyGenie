# 18 - Contributing

# Contributing Guide

Welcome to **StudyGenie**! 🎉

Thank you for your interest in contributing to this project. This guide explains the development workflow, coding standards, Git conventions, review process, and best practices to ensure the codebase remains clean, maintainable, and production-ready.

---

# 1. Project Goals

StudyGenie aims to provide:

- A modern full-stack learning platform
- Practical Agentic AI features
- High-quality code
- Scalable architecture
- Excellent developer experience

Every contribution should align with these goals.

---

# 2. Before You Start

Ensure you have:

- Node.js (LTS version)
- npm
- Git
- MongoDB Atlas account
- Google Gemini API key
- Google OAuth credentials

Read the following documents before contributing:

- README.md
- AGENTS.md
- 02-PRD.md
- 04-Architecture.md
- 10-UI-Guidelines.md
- 11-Design-System.md

---

# 3. Development Workflow

Recommended workflow:

```text
Fork / Clone Repository

↓

Install Dependencies

↓

Create Feature Branch

↓

Develop Feature

↓

Test Feature

↓

Commit Changes

↓

Push Branch

↓

Open Pull Request

↓

Code Review

↓

Merge
```

---

# 4. Branch Naming

Use descriptive branch names.

Examples:

```text
feature/authentication

feature/ai-notes

feature/ai-chat

feature/dashboard

feature/search

fix/login-validation

fix/navbar

docs/api

refactor/services
```

Avoid working directly on the `main` branch.

---

# 5. Commit Convention

Follow Conventional Commits.

Examples:

```text
feat: add AI notes generator

fix: resolve auth validation issue

docs: update API documentation

style: improve dashboard spacing

refactor: simplify AI service

test: add authentication tests

chore: update dependencies
```

Keep commits focused on a single logical change.

---

# 6. Coding Standards

### General

- Use TypeScript everywhere.
- Prefer small, reusable functions.
- Keep files focused on one responsibility.
- Avoid duplicated code.
- Remove unused code before committing.

---

### Naming

Use:

- PascalCase for components and classes.
- camelCase for variables and functions.
- UPPER_SNAKE_CASE for constants.
- kebab-case for file names where appropriate.

Use meaningful names that describe intent.

---

### Formatting

Maintain consistent:

- Indentation
- Imports
- Spacing
- Line length
- File organization

Use ESLint and Prettier before committing.

---

# 7. Frontend Guidelines

Follow:

- App Router conventions
- Component-based architecture
- Tailwind CSS utility classes
- React Hook Form for forms
- Zod for validation
- TanStack Query for server state

Do not place business logic inside UI components.

---

# 8. Backend Guidelines

Follow the layered architecture:

```text
Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Database
```

Keep:

- Controllers thin
- Services responsible for business logic
- Repositories focused on data access

Validate every request.

---

# 9. AI Development Guidelines

When adding AI features:

- Store prompts in `src/prompts`.
- Use the Prompt Builder.
- Avoid hardcoded prompts.
- Preserve conversation context.
- Validate AI inputs.
- Log AI failures safely.

Never expose API keys or system prompts.

---

# 10. Testing Requirements

Before opening a pull request:

- Run TypeScript checks.
- Run linting.
- Test authentication.
- Test CRUD operations.
- Test AI features.
- Verify responsive layouts.
- Confirm loading, empty, and error states.

Do not merge untested code.

---

# 11. Documentation

Update documentation whenever you:

- Add features
- Change APIs
- Modify database models
- Update environment variables
- Introduce new AI capabilities
- Change project structure

Documentation should evolve with the codebase.

---

# 12. Pull Requests

Each pull request should:

- Focus on a single feature or fix.
- Include a clear description.
- Reference related issues (if any).
- Pass all checks.
- Be reviewed before merging.

Avoid mixing unrelated changes.

---

# 13. Code Review Checklist

Reviewers should verify:

- Code readability
- Correctness
- Type safety
- Error handling
- Security
- Performance
- Accessibility
- UI consistency
- Documentation updates
- Test coverage

Constructive feedback should be respectful and actionable.

---

# 14. Security Practices

Never commit:

- `.env` files
- API keys
- Better Auth secrets
- OAuth secrets
- Database credentials

Report security concerns privately rather than exposing them publicly.

---

# 15. Issue Reporting

When reporting bugs, include:

- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser/device information
- Relevant logs (without sensitive data)

This helps maintainers reproduce and resolve issues efficiently.

---

# 16. Feature Requests

Feature requests should include:

- Problem statement
- Proposed solution
- Expected user benefit
- Possible implementation approach (optional)

Focus on features that align with StudyGenie's educational mission.

---

# 17. Release Process

Before each release:

- Merge approved pull requests.
- Update documentation.
- Verify production environment variables.
- Run the production checklist.
- Tag the release in Git.

Maintain a clear release history.

---

# 18. Community Standards

Contributors should:

- Be respectful.
- Welcome constructive feedback.
- Collaborate openly.
- Share knowledge.
- Prioritize maintainable solutions over quick fixes.

Professional communication benefits the entire project.

---

# 19. Definition of a Good Contribution

A high-quality contribution:

- Solves a real problem.
- Follows the project architecture.
- Includes appropriate validation.
- Maintains type safety.
- Handles errors gracefully.
- Preserves UI consistency.
- Updates documentation when needed.
- Is well-tested.
- Is easy to review and maintain.

---

# 20. Thank You

Thank you for contributing to **StudyGenie**.

Your contributions help make the platform more useful, reliable, and accessible for learners. By following this guide, you help maintain a clean, scalable, and production-ready codebase for everyone involved.
