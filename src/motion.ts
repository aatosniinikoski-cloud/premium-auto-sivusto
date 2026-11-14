/* Shared motion tokens — mirrored in CSS as --ease-out / --ease-in-out. */
export const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const finePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/**
 * Observe every [data-reveal] element inside `root` and mark it visible once
 * it enters the viewport. Fires once — re-animating on every scroll-by would
 * be the page fighting its reader.
 */
export function observeReveals(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-visible])');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.visible = '';
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
