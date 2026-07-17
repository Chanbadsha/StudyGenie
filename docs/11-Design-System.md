# 11 - Design System

# StudyGenie Design System

> This document defines the reusable design language, visual tokens, component standards, iconography, motion, and interaction patterns for the StudyGenie platform. Every UI component should follow this design system to ensure consistency and scalability.

---

# 1. Design Principles

The StudyGenie design system is built on the following principles:

- Consistency
- Simplicity
- Accessibility
- Reusability
- Scalability
- Responsiveness
- Performance

Every new component should follow these principles before being added to the application.

---

# 2. Brand Identity

## Product Name

**StudyGenie**

## Brand Personality

- Intelligent
- Helpful
- Modern
- Friendly
- Educational
- Professional

The UI should inspire trust and encourage focused learning.

---

# 3. Color System

Use a maximum of **3 primary colors** plus neutral shades.

## Primary

Used for:

- Primary buttons
- Links
- Active navigation
- Important actions

---

## Secondary

Used for:

- Secondary buttons
- Cards
- Supporting UI

---

## Accent

Used for:

- AI features
- Highlights
- Notifications
- Charts

---

## Neutral

Used for:

- Backgrounds
- Borders
- Dividers
- Text hierarchy

Avoid introducing additional brand colors without updating this document.

---

# 4. Typography

Recommended fonts:

- Inter
- Geist
- Poppins

## Typography Scale

| Element | Usage          |
| ------- | -------------- |
| Display | Hero titles    |
| H1      | Page titles    |
| H2      | Section titles |
| H3      | Card titles    |
| Body    | Paragraph text |
| Small   | Metadata       |
| Caption | Helper text    |

Maintain consistent font weights and line heights throughout the application.

---

# 5. Spacing System

Use a consistent spacing scale.

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

Spacing should be based on these values whenever possible.

---

# 6. Border Radius

Standardize rounded corners.

| Component | Radius |
| --------- | ------ |
| Buttons   | Medium |
| Inputs    | Medium |
| Cards     | Large  |
| Modals    | Large  |
| Avatars   | Full   |

Use the same radius for the same component type.

---

# 7. Elevation

Use subtle elevation.

Levels:

- None
- Low
- Medium
- High

Examples:

- Cards → Low
- Dropdowns → Medium
- Modals → High

Avoid excessive shadows.

---

# 8. Grid System

Use a responsive layout.

Maximum container width:

```text
1280px
```

Recommended columns:

| Device  | Columns |
| ------- | ------- |
| Mobile  | 1       |
| Tablet  | 2       |
| Laptop  | 3       |
| Desktop | 4       |

---

# 9. Icon System

Use a single icon library throughout the project.

Recommended:

- Lucide React

Guidelines:

- Consistent stroke width
- Consistent sizing
- Meaningful icons only

Avoid mixing multiple icon libraries.

---

# 10. Button System

Button variants:

- Primary
- Secondary
- Outline
- Ghost
- Danger

States:

- Default
- Hover
- Active
- Disabled
- Loading

Buttons should have consistent:

- Height
- Padding
- Border radius
- Typography

---

# 11. Form Components

Shared form components:

- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch

Every component should include:

- Label
- Error message
- Disabled state
- Focus state

Validation messages should be clear and concise.

---

# 12. Card System

All cards should follow a shared structure.

Typical layout:

```text
Image

↓

Title

↓

Description

↓

Metadata

↓

Primary Action
```

Cards should maintain:

- Equal height
- Equal width
- Shared spacing
- Shared border radius

---

# 13. Modal System

Modals should include:

- Title
- Close button
- Body
- Primary action
- Secondary action (optional)

Closing methods:

- Escape key
- Overlay click (when appropriate)
- Close button

---

# 14. Navigation Components

Navigation includes:

- Navbar
- Mobile Menu
- Sidebar
- Breadcrumbs (future)

Navigation should clearly indicate the active route.

---

# 15. AI Components

Shared AI components:

- Chat Window
- Chat Bubble
- Prompt Input
- AI Response Card
- Suggested Prompts
- Typing Indicator
- Regenerate Button
- Copy Button

AI interactions should remain visually consistent.

---

# 16. Feedback Components

Reusable feedback components:

- Alert
- Toast
- Success Message
- Error Message
- Empty State
- Loading State

Each should follow a consistent visual style.

---

# 17. Loading Components

Reusable loaders:

- Skeleton Card
- Skeleton Table
- Skeleton Chart
- Spinner
- Button Loader
- AI Typing Indicator

Avoid layout shifts while content loads.

---

# 18. Chart Components

Charts should follow a common style.

Supported charts:

- Bar Chart
- Line Chart
- Pie Chart
- Area Chart

Every chart should include:

- Title
- Tooltip
- Legend (if needed)
- Responsive sizing

---

# 19. Motion System

Animations should be subtle and purposeful.

Recommended interactions:

- Page transitions
- Card hover
- Button press
- Modal transitions
- Fade-in sections
- Accordion expansion

Avoid long or distracting animations.

---

# 20. Responsive Design

Support:

- Mobile
- Tablet
- Laptop
- Desktop

Layouts should adapt gracefully without breaking the design system.

---

# 21. Accessibility Standards

Components should support:

- Keyboard navigation
- Screen readers
- Focus indicators
- Semantic HTML
- ARIA attributes when required
- Sufficient color contrast

Accessibility should be considered during component design, not added later.

---

# 22. Component Naming Convention

Use PascalCase for components.

Examples:

```text
StudyMaterialCard

DashboardLayout

AIResponseCard

ChatWindow

StatisticsCard

ProfileForm
```

Component names should clearly describe their purpose.

---

# 23. Reusability Rules

Before creating a new component, verify whether an existing component can be reused or extended.

Avoid duplication.

Prefer composition over copy-and-paste.

---

# 24. Design Tokens

Centralize reusable values such as:

- Colors
- Typography
- Border radius
- Shadows
- Spacing
- Z-index values
- Animation durations
- Breakpoints

Design tokens should be defined once and reused throughout the application.

---

# 25. Future Expansion

The design system should support future additions, including:

- Dark mode
- Multiple themes
- Internationalization (RTL support)
- Additional chart types
- New AI interfaces
- Collaborative features
- Notification center

These enhancements should integrate without requiring major UI refactoring.

---

# 26. Design System Principles

Every StudyGenie interface should:

- Use reusable components.
- Follow consistent spacing and typography.
- Maintain visual hierarchy.
- Be responsive by default.
- Be accessible.
- Provide immediate feedback.
- Keep AI interactions intuitive.
- Deliver a cohesive and professional user experience across the entire platform.
