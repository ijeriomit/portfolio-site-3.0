# AI Handoff Notes

Practical patterns and gotchas discovered during implementation.
Read this before touching any section. It will save you time.

---

## Stack

React 18 / Create React App. SCSS modules (BEM naming). No Vue — README.md is outdated.
No Tailwind. No GSAP. No new libraries unless explicitly requested.

---

## Completed Sections

| Section    | Status           |
|------------|------------------|
| Home       | ✅ Complete       |
| About      | ✅ Complete       |
| Experience | ✅ Complete       |
| Services   | ⬜ Not started    |
| Portfolio  | ⬜ Not started    |
| Testimonials | ⬜ Not started  |
| Contact    | ⬜ Not started    |

---

## Critical Architecture Facts

### App.js owns the observer state
`src/App.js` runs `IntersectionObserver` and passes these props down:
- `flipLogo` → `<Header>`
- `loadAboutContent` → `<AboutSection>`
- `inExpSection` → `<ExpSection>`

Do not move this logic. Do not recreate observers inside section components.
Every section component uses `forwardRef` so `App.js` can hold the refs.
**Never remove `forwardRef`, the section `id` attribute, or props passed from `App.js`.**

### Logo animation
Driven by `flipLogo` prop from `App.js`. Two keyframes:
- `logo-spin`: 750ms linear
- `logo-text-appear` / `logo-text-disappear`: 1.75s

Do not touch these. They are wired to the `IntersectionObserver` on `#HOME`.

### Button component
`src/components/shared/button/button.js`
Uses a `variant` prop: `"primary"` or `"secondary"`.
Global font-size is `1.8rem` — override at the call site with a scoped selector if you need smaller buttons (see `.exp-section__project .btn` in experience-section.scss).

---

## Global Styling Traps

### index.scss forces 100vh on all sections
```scss
section {
  height: 100vh;
  overflow: hidden;
}
```
Any section that needs to grow taller than the viewport **must** override this with `!important`:
```scss
#ABOUT { height: auto !important; overflow: visible !important; }
#EXP   { height: auto !important; overflow: visible !important; }
```
Already done for About and Experience (desktop). Do the same for any future tall section.

### Mobile breakpoint in index.scss
`src/global-styles/index.scss` has a `@media (max-width: 600px)` block that overrides
`#HOME`, `#ABOUT`, and `#EXP`. If you change a section's mobile height/overflow behaviour,
**update both** the component's own SCSS **and** the override in `index.scss`.
They must agree or one will silently win with `!important`.

### Variables
All design tokens live in `src/global-styles/variables.scss`:
```scss
$quaternary-color: #080f07      // near-black background
$tertiary-color:   #14d086      // green accent
$secondary-color:  #ffffff      // white text
$header-height:    12vh
$small-screen-width: 1250px     // desktop→mobile breakpoint
$phone-screen-width: 600px      // phone-only overrides
```

---

## Section-Specific Patterns

### MatrixBackground
`position: absolute; inset: 0` — it fills whatever `position: relative` parent wraps it.
Add `border-radius: inherit` to `.section-bg` and `.section-bg-gradient` if the parent
is a card with rounded corners, otherwise the matrix bleeds outside the border-radius.
Uses `window.matchMedia` internally to serve fewer columns on mobile — don't pass a columns prop.

### About section
Needs `height: auto !important; overflow: visible !important` on desktop because content
is taller than 100vh. Already set in `index.scss`. Do not remove.
`StatisticsRow` is hidden on mobile via `display: none` in about-section.scss.
Technology stack "All Technologies" filter item is hidden on mobile via
`.technology-stack__filter-item--all { display: none }`.

### Experience section — desktop
Two-column sticky layout: left col (420px wide) + right scrollable cards pane.
Active card detection uses a scroll listener on `cardsPane` ref (not IntersectionObserver).
Guard: `pane.scrollHeight > pane.clientHeight` before attaching — this is how it avoids
running on mobile where the pane doesn't exist.
Timeline item height is `72px` — kept in sync between `ITEM_H` constant in JS and
`.exp-section__timeline-item` height in SCSS. If you change one, change both.

### Experience section — mobile
Section is `100vh; overflow: hidden`.
Inner layout is a flex column:
- `.exp-section__mobile-header` → `flex-shrink: 0` (natural height)
- `.exp-section__mobile-cards` → `flex: 1; overflow-y: auto` (fills remainder)

This means cards always scroll within whatever space is left — no `vh` magic numbers needed.
`display: contents` on `.exp-section__desktop` makes it a transparent wrapper on desktop
(doesn't affect grid). It becomes `display: none` on mobile.

---

## Mobile Patterns

### Scroll snap is disabled on mobile
`src/global-styles/index.scss` sets `.App { scroll-snap-type: none }` at `max-width: 600px`.
This allows tall sections (About, Experience) to exist without breaking page scroll.

### Never use fixed vh values for scrollable containers
Using `height: 65vh` on a scroll container breaks on different viewport heights.
Always use `flex: 1` on the scroll container so it fills exactly what's left.
Pattern:
```scss
.parent { display: flex; flex-direction: column; height: 100%; }
.fixed-header { flex-shrink: 0; }
.scroll-area  { flex: 1; overflow-y: auto; }
```

---

## Asset Paths

All assets are in `public/assets/`:
- `public/assets/clip-art-images/check-mark.svg` — used as icon placeholder everywhere
- `public/assets/experience-images/` — company logos
- `public/assets/project-images/` — featured project images (supplier-nexus-art.png, haloguard.png)

Reference them from JSX as `/assets/...` (no `public/` prefix).

---

## What Not To Do

- Do not add new frameworks or libraries without being explicitly asked.
- Do not change desktop layout while fixing mobile (and vice versa).
- Do not remove `forwardRef` or section `id` attributes.
- Do not use `vh` magic numbers for scrollable containers — use `flex: 1`.
- Do not inline styles for layout — use the SCSS file.
- Do not redesign sections — match the mockups in `ai/ux mocks/`.
- Do not create new global keyframes — reuse the ones already in `index.scss`.
