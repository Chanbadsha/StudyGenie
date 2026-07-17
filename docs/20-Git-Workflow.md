# 20 - Git Workflow

# StudyGenie Git Workflow

> This document defines the Git branching strategy, commit conventions, pull request process, release workflow, and version control best practices for the StudyGenie project.

---

# 1. Purpose

This workflow ensures:

- Clean Git history
- Predictable releases
- Easy collaboration
- Safe feature development
- Efficient code reviews
- Reliable deployments

Every contributor and AI coding agent should follow this workflow.

---

# 2. Branch Strategy

The project uses a lightweight Git Flow approach.

```text
main
│
├── develop
│
├── feature/*
│
├── fix/*
│
├── docs/*
│
├── refactor/*
│
└── release/*
```

### Branch Roles

| Branch       | Purpose                                     |
| ------------ | ------------------------------------------- |
| `main`       | Production-ready code                       |
| `develop`    | Integration branch for ongoing work         |
| `feature/*`  | New features                                |
| `fix/*`      | Bug fixes                                   |
| `docs/*`     | Documentation updates                       |
| `refactor/*` | Code improvements without changing behavior |
| `release/*`  | Release preparation                         |

Never commit directly to `main`.

---

# 3. Branch Naming

Use clear, descriptive names.

Examples:

```text
feature/authentication

feature/study-materials

feature/ai-notes

feature/ai-chat

feature/dashboard

feature/search-filter

fix/google-login

fix/material-validation

docs/api

refactor/auth-service
```

Use lowercase and hyphens where appropriate.

---

# 4. Development Workflow

Follow this sequence for every task.

```text
Create Branch

↓

Implement Feature

↓

Run Tests

↓

Update Documentation

↓

Commit Changes

↓

Push Branch

↓

Open Pull Request

↓

Code Review

↓

Merge into develop

↓

Release to main
```

---

# 5. Commit Message Convention

Use **Conventional Commits**.

### Format

```text
type(scope): short description
```

The scope is optional.

---

### Commit Types

| Type     | Purpose                    |
| -------- | -------------------------- |
| feat     | New feature                |
| fix      | Bug fix                    |
| docs     | Documentation              |
| style    | Formatting or styling      |
| refactor | Internal code improvements |
| test     | Tests                      |
| chore    | Maintenance tasks          |
| perf     | Performance improvements   |
| build    | Build configuration        |
| ci       | CI/CD changes              |

---

### Examples

```text
feat(auth): add Google login

feat(ai): implement AI notes generator

fix(chat): preserve conversation history

docs(api): update endpoint documentation

refactor(material): simplify repository layer

test(auth): add login integration tests

chore: update dependencies
```

Keep commit messages concise and meaningful.

---

# 6. Pull Request Guidelines

Each pull request should:

- Address a single feature or fix.
- Include a clear title.
- Describe the changes made.
- Explain any breaking changes.
- Reference related issues (if applicable).

Avoid combining unrelated changes into one pull request.

---

# 7. Pull Request Checklist

Before opening a pull request, verify:

- TypeScript builds successfully.
- ESLint passes.
- Tests pass.
- No console errors remain.
- Documentation is updated.
- Environment variables are unchanged or documented.
- Loading and error states are implemented.
- Responsive behavior is verified.

---

# 8. Code Review Guidelines

Reviewers should check:

- Readability
- Correctness
- Architecture
- Type safety
- Validation
- Error handling
- Security
- Performance
- Accessibility
- Documentation

Provide constructive, respectful feedback.

---

# 9. Merge Strategy

Preferred merge method:

- **Squash and Merge** for feature branches

Benefits:

- Cleaner history
- Easier rollback
- One commit per completed feature

Avoid unnecessary merge commits.

---

# 10. Release Workflow

```text
develop

↓

release/v1.x.x

↓

Testing

↓

main

↓

Tag Release
```

Release branches are used to stabilize the application before production deployment.

---

# 11. Versioning

Follow **Semantic Versioning (SemVer)**.

Format:

```text
MAJOR.MINOR.PATCH
```

Examples:

```text
1.0.0

1.1.0

1.1.1
```

### Version Rules

- **MAJOR**: Breaking changes
- **MINOR**: New backward-compatible features
- **PATCH**: Backward-compatible bug fixes

---

# 12. Tagging Releases

After merging to `main`, create a Git tag.

Examples:

```text
v1.0.0

v1.1.0

v1.1.1
```

Tags provide a stable reference for deployments and rollbacks.

---

# 13. Hotfix Workflow

For urgent production issues:

```text
main

↓

fix/critical-bug

↓

Testing

↓

main

↓

develop
```

Always merge the hotfix back into `develop` to keep branches synchronized.

---

# 14. Documentation Workflow

Update documentation whenever:

- APIs change.
- Database schema changes.
- Environment variables change.
- AI prompts change significantly.
- Folder structure changes.
- New features are added.

Documentation should stay aligned with the implementation.

---

# 15. Rollback Strategy

If a release introduces critical issues:

1. Identify the last stable Git tag.
2. Revert or redeploy that version.
3. Investigate and fix the issue on a new branch.
4. Test thoroughly before releasing again.

---

# 16. Git Ignore

Ensure the following are ignored:

```text
node_modules/

.env

.env.local

dist/

build/

.next/

coverage/

*.log
```

Do not commit generated files or secrets.

---

# 17. AI Coding Agent Workflow

When an AI coding agent performs work, it should:

1. Read `AGENTS.md`.
2. Review the relevant documentation.
3. Complete one development phase at a time.
4. Preserve the existing architecture.
5. Reuse existing components and services.
6. Update documentation if behavior changes.
7. Produce clean, type-safe code.
8. Stop after completing the assigned task.

---

# 18. Definition of Done

A task is complete only when:

- Code is implemented.
- TypeScript passes.
- ESLint passes.
- Tests pass (where applicable).
- Documentation is updated.
- Responsive behavior is verified.
- Security checks are respected.
- The feature is reviewed and merged.

---

# 19. Git Workflow Principles

StudyGenie's Git workflow is built on these principles:

- Keep branches short-lived.
- Make small, focused commits.
- Write meaningful commit messages.
- Review code before merging.
- Maintain a clean Git history.
- Keep documentation synchronized with code.
- Prioritize stability and production readiness over speed.
