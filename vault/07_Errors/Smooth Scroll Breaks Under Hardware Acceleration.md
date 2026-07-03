---
type: error
status: current
created: 2026-07-04
updated: 2026-07-04
tags:
  - error
  - current
---

# Smooth Scroll Breaks Under Hardware Acceleration

## Symptom
Native `window.scrollTo({ behavior: "smooth" })` / `Element.scrollIntoView({ behavior:
"smooth" })` and CSS `scroll-behavior: smooth` stutter or jump instantly instead of
animating, on some Chromium + Windows GPU driver combos with hardware acceleration on.

## Root cause
Native smooth scroll runs on the browser's compositor thread. Certain GPU
driver/Windows combinations drop or skip frames on that path, so the animation either
stutters or is skipped entirely (looks like an instant jump).

## Fix
Replaced all native smooth-scroll calls with a manual `requestAnimationFrame` easing
scroll, which runs on the main thread and isn't subject to the compositor bug. See
`frontend/src/components/smoothScrollTo.js` (`smoothScrollTo`, `smoothScrollToElement`).
Removed `scroll-behavior: smooth` from `frontend/src/index.css`.

## Related gotcha: scroll-margin-top not honored by manual scroll
CSS `scroll-margin-top` (used to offset scroll targets under the sticky 72px header) is
only applied automatically by the *native* `scrollIntoView`/CSS scroll-snap paths — a
manual `element.getBoundingClientRect()` + `scrollTo` calculation ignores it completely.
`smoothScrollToElement` now reads `getComputedStyle(el).scrollMarginTop` explicitly and
subtracts it from the target Y, so cross-page nav (Header/Footer → `/` with
`state.scrollTo`) and same-page anchor nav land at the same offset consistently.

## Related
- [[01_Project_State]]
