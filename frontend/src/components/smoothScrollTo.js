// Native `behavior: "smooth"` scroll is compositor-driven and can stutter or
// no-op on Chromium builds with hardware acceleration enabled. This drives the
// scroll from rAF on the main thread instead, sidestepping that bug.
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutQuad(t));
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export function smoothScrollToElement(el, duration = 500) {
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY;
  smoothScrollTo(targetY, duration);
}
