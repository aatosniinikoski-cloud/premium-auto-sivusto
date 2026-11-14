import { Fragment, useEffect, useRef } from 'react';
import { IMG } from '../../data';
import { clamp, prefersReducedMotion } from '../../motion';
import { Fade, Media } from '../primitives';

// Words wrapped in *asterisks* are set in italic.
const TEXT =
  'We don’t wash cars. We restore the way *light* travels across them — lifting years of swirls from the clear coat, sealing the result beneath glass-hard ceramic, and returning the keys only when the reflection is *true.*';

/**
 * The page's one signature scroll moment: the manifesto brightens word by
 * word as it moves through the viewport. Opacity is written straight to each
 * word (no React state), and the listener only runs while the block is on screen.
 */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>('.mw'));
    if (prefersReducedMotion()) {
      words.forEach((w) => (w.style.opacity = '1'));
      return;
    }
    const n = words.length;
    const SOFT = 4; // how many words are mid-fade at once
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.82;
      const end = vh * 0.3 - r.height * 0.55;
      const p = clamp((start - r.top) / (start - end));
      const head = p * (n + SOFT);
      for (let i = 0; i < n; i++) {
        const t = clamp((head - i) / SOFT);
        words[i].style.opacity = String(0.14 + t * 0.86);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener('scroll', onScroll);
        update();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const tokens = TEXT.split(' ');

  return (
    <section className="manifesto" aria-label="Our approach">
      <div className="wrap manifesto__grid">
        <p ref={ref} className="manifesto__text">
          {tokens.map((tok, i) => {
            const italic = tok.startsWith('*');
            const word = tok.replace(/\*/g, '');
            return (
              <Fragment key={i}>
                <span className={`mw${italic ? ' mw--em' : ''}`}>{word}</span>{' '}
              </Fragment>
            );
          })}
        </p>

        <div className="manifesto__aside">
          <Media
            id={IMG.headlight}
            alt="A headlight glowing cold blue against a dark body panel"
            ratio="4 / 5"
            sizes="(min-width: 900px) 26vw, 70vw"
          />
          <Fade className="manifesto__note" delay={150}>
            <p>
              Founded in a single bay in 2014. Today, three bays, one lamp-lit inspection room, and
              the same rule: one technician sees your car through from arrival to handover.
            </p>
          </Fade>
        </div>
      </div>
    </section>
  );
}
