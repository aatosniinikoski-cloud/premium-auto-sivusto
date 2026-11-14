import { useEffect, useRef, useState } from 'react';
import { EASE_IN_OUT, prefersReducedMotion } from '../motion';
import type { Vars } from './primitives';

const WORD = 'ATELIER AUTO';

/**
 * First-load only. Letters rise, a copper hairline draws, the curtain lifts —
 * about 1.6s in total, then out of the way. Skipped under reduced motion.
 */
export function Intro({ onReveal }: { onReveal: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      onReveal();
      setGone(true);
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      onReveal();
      const anim = el.animate([{ clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)' }], {
        duration: 1000,
        easing: EASE_IN_OUT,
        fill: 'forwards',
      });
      await anim.finished.catch(() => {});
      if (!cancelled) setGone(true);
    }, 1250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [onReveal]);

  if (gone) return null;

  return (
    <div ref={ref} className="intro" aria-hidden="true">
      <div className="intro__word">
        {WORD.split('').map((ch, i) => (
          <span key={i} style={{ '--i': i } as Vars}>
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </div>
      <span className="intro__rule" />
    </div>
  );
}
