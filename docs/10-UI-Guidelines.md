# 10 - UI Guidelines

# StudyGenie UI & UX Guidelines

> This document defines the visual language, user experience principles, layout rules, component behavior, responsiveness, and accessibility standards for the StudyGenie platform.

---

# 1. Design Philosophy

StudyGenie is designed to provide a clean, modern, and distraction-free learning experience.

The frontend uses **HeroUI** as the primary component library. Prefer HeroUI components before creating custom UI components. Follow HeroUI design patterns and accessibility guidelines.

Core principles:

- Simplicity over complexity
- Consistency across all pages
- Accessibility by default
- Mobile-first design
- Clear visual hierarchy
- Fast and intuitive interactions

The interface should help users focus on learning rather than navigating the application.

---

# 2. Design Goals

The UI should:

- Feel modern and professional
- Be easy to understand
- Minimize visual clutter
- Encourage exploration
- Provide immediate feedback
- Maintain consistency across the application

---

# 3. Theme

Version 1 supports:

- Light Mode

Version 2 (Future):

- Dark Mode
- System Theme

---

# 4. Color Guidelines

Limit the design to:

- 3 Primary Colors
- Neutral Gray Scale

Example roles:

| Purpose   | Color Role               |
| --------- | ------------------------ |
| Primary   | Brand color              |
| Secondary | Supporting actions       |
| Accent    | Highlights & AI features |
| Neutral   | Backgrounds & borders    |

Avoid excessive use of bright colors.

---

# 5. Typography

Recommended font families:

- Inter
- Geist
- Poppins

Typography hierarchy:

| Element       | Weight    |
| ------------- | --------- |
| Hero Title    | Bold      |
| Page Title    | Semi Bold |
| Section Title | Semi Bold |
| Card Title    | Medium    |
| Body Text     | Regular   |
| Caption       | Regular   |

Maintain consistent spacing between headings and content.

---

# 6. Layout System

Use a centered container with consistent spacing.

Recommended structure:

```text
Navbar

↓

Hero

↓

Sections

↓

Footer
```

Maximum content width:

```text
1280px
```

Consistent horizontal padding:

- Mobile
- Tablet
- Desktop

---

# 7. Spacing System

Use a consistent spacing scale.

Examples:

```text
4px
8px
12px
16px
24px
32px
48px
64px
```

Avoid arbitrary spacing values.

---

# 8. Border Radius

Maintain consistent corner rounding.

Examples:

| Component | Radius |
| --------- | ------ |
| Buttons   | Medium |
| Inputs    | Medium |
| Cards     | Large  |
| Modals    | Large  |

The same component type should always use the same radius.

---

# 9. Shadows

Use subtle shadows.

Examples:

- Cards
- Dropdowns
- Modals

Avoid heavy shadows that distract from content.

---

# 10. Buttons

Buttons should communicate hierarchy.

Primary

- Main actions

Secondary

- Supporting actions

Ghost

- Low emphasis

Danger

- Destructive actions

States:

- Default
- Hover
- Active
- Disabled
- Loading

Buttons should display loading indicators during asynchronous operations.

---

# 11. Forms

Every form should include:

- Labels
- Placeholder text where helpful
- Validation messages
- Required field indicators
- Disabled state while submitting

Use React Hook Form with Zod validation.

---

# 12. Inputs

Supported input types:

- Text
- Email
- Password
- Textarea
- Select
- Search

All inputs should have consistent:

- Height
- Padding
- Border radius
- Focus state

---

# 13. Cards

Cards are a core UI element.

Every card should have:

- Consistent width
- Consistent height
- Image (if applicable)
- Title
- Description
- Metadata
- Primary action

Avoid cards with inconsistent dimensions.

---

# 14. Tables

Tables should support:

- Responsive layout
- Empty states
- Loading states
- Readable spacing
- Clear row actions

Actions should remain visible on smaller screens.

---

# 15. Navigation

Navbar should:

- Be sticky
- Display logo
- Show authentication status
- Collapse into a mobile menu
- Highlight the active route

Footer should include:

- Navigation links
- Contact information
- Social links
- Copyright

---

# 16. Loading States

Every asynchronous page should include loading indicators.

Examples:

- Skeleton loaders
- Button loading states
- AI typing indicator
- Chart loading placeholders

Avoid blank screens during loading.

---

# 17. Empty States

Provide meaningful empty states.

Examples:

- No study materials
- No AI history
- No chat sessions
- No analytics

Each empty state should include a clear call-to-action.

---

# 18. Error States

Display friendly error messages.

Examples:

- Network failure
- Validation error
- Unauthorized access
- AI generation failure

Users should understand what happened and how to recover.

---

# 19. AI Experience

The AI interface should feel conversational.

Features:

- Chat bubbles
- Typing indicator
- Suggested prompts
- Conversation history
- Copy response button
- Regenerate button

AI-generated content should be clearly distinguished from user input.

---

# 20. Charts & Analytics

Charts should:

- Be responsive
- Include titles
- Use readable legends
- Display tooltips
- Handle empty data gracefully

Dashboard widgets should remain visually consistent.

---

# 21. Animations

Use subtle animations to improve usability.

Examples:

- Page transitions
- Card hover effects
- Modal transitions
- Button feedback
- Loading indicators

Avoid excessive or distracting animations.

---

# 22. Responsiveness

The application must support:

- Mobile
- Tablet
- Laptop
- Desktop

Layouts should adapt gracefully without horizontal scrolling.

---

# 23. Accessibility

Follow WCAG best practices where possible.

Requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper labels
- ARIA attributes when needed
- Sufficient color contrast

The application should be usable without a mouse.

---

# 24. Content Guidelines

Do not use:

- Lorem Ipsum
- Placeholder images
- Dummy user names
- Fake statistics in production

All visible content should be meaningful and relevant to the educational context.

---

# 25. Consistency Rules

Maintain consistency across:

- Typography
- Colors
- Icons
- Buttons
- Cards
- Forms
- Spacing
- Border radius
- Navigation
- Feedback messages

Users should not need to relearn interactions between pages.

---

# 26. Responsive Breakpoints

Recommended breakpoints:

| Device       | Width         |
| ------------ | ------------- |
| Mobile       | < 640px       |
| Small Tablet | 640px–767px   |
| Tablet       | 768px–1023px  |
| Laptop       | 1024px–1279px |
| Desktop      | ≥ 1280px      |

Design mobile-first and progressively enhance for larger screens.

---

# 27. Definition of Good UI

A StudyGenie interface is considered complete when it:

- Is visually consistent.
- Clearly communicates available actions.
- Provides immediate feedback.
- Handles loading, empty, and error states.
- Is fully responsive.
- Is accessible.
- Maintains a clean and modern appearance.
- Supports an enjoyable and productive learning experience.
