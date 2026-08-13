# Implementation Guide

## Existing Repository

This project is an evolution of an existing application.

Reuse existing components whenever appropriate.

Reuse existing styling whenever practical.

Preserve existing project architecture.

Do not introduce new frameworks, libraries, routing systems, state management solutions, or styling approaches unless explicitly requested.

The implementation should integrate naturally into the existing codebase.

## Rules

The approved mockups are the source of truth.

Do not redesign layouts.

Do not substitute components.

Do not change spacing unless necessary for responsiveness.

Do not replace typography.

Do not introduce new accent colors.

---

## Component First

Every page should be assembled from reusable components.

Avoid page-specific implementations whenever possible.

Examples:

Navigation

SectionHeader

PrimaryButton

SecondaryButton

StatsCard

TechnologyCard

ProjectCard

ContactCard

TimelineCard

TestimonialCard

---

## Styling

Follow the styling approach already established within the repository.

New components should follow the same architectural and styling conventions as the existing codebase.

Extract reusable utility classes only when repetition becomes excessive.

Avoid deeply nested CSS.

---

## Animations

Use the animation solution already established within the project.

Only introduce new animation utilities when absolutely necessary.
Animation principles:

- fade
- translate
- slight scaling
- opacity
- stagger

Avoid:

- spinning
- bouncing
- large movements

---

## Accessibility

Every page must meet WCAG AA.

Keyboard navigation should work.

Visible focus states.

Semantic HTML.

ARIA where appropriate.

---

## Performance

Images lazy loaded.

Animations hardware accelerated.

Avoid layout shift.

Optimize Lighthouse score.

---

## Responsive Strategy

Desktop first.

Tablet second.

Mobile last.

Do not redesign desktop for mobile.

Adapt existing layouts naturally.
