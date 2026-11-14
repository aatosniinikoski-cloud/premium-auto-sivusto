import { useEffect, useRef, useState } from 'react';
import { DISCIPLINES, img } from '../../data';
import { finePointer, prefersReducedMotion } from '../../motion';
import { Link } from '../../router';
import { Arrow, Fade, Lines, type Vars } from '../primitives';

/**
 * An editorial index rather than a card grid. On fine pointers a preview
 * image trails the cursor (decorative tracking, smoothed with a critically
 * damped lerp); on touch the image sits inline in each row instead.
 */
export function Disciplines() {
  const [active, setActive] = useState<number | null>(null);
  const follower = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0, snap: true });

  useEffect(() => {
    const el = follower.current;
    if (!el || !finePointer() || active === null) return;
    const reduce = prefersReducedMotion();
    let x = target.current.x;
    let y = target.current.y;
    let raf = 0;
    const loop = () => {
      const t = target.current;
      if (t.snap || reduce) {
        x = t.x;
        y = t.y;
        t.snap = false;
      } else {
        x += (t.x - x) * 0.14;
        y += (t.y - y) * 0.14;
      }
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <section className="disciplines" aria-labelledby="disc-title">
      <div className="wrap">
        <div className="disciplines__head">
          <Lines id="disc-title" className="h-xl" lines={['Five', <em key="d">disciplines.</em>]} />
          <Fade className="disciplines__intro" delay={120}>
            <p>
              Each is a craft of its own. Most cars need two or three; very few need all five. We will
              tell you which — and which not.
            </p>
          </Fade>
        </div>

        <ol
          className="index"
          data-active={active !== null}
          onPointerMove={(e) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
          }}
          onPointerLeave={() => {
            setActive(null);
            target.current.snap = true;
          }}
        >
          {DISCIPLINES.map((d, i) => (
            <li
              key={d.id}
              className="index__row"
              data-current={active === i}
              data-reveal="up"
              style={{ '--d': `${i * 60}ms` } as Vars}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'mouse') return;
                target.current.x = e.clientX;
                target.current.y = e.clientY;
                setActive(i);
              }}
            >
              <Link to={`/services#${d.id}`} className="index__link">
                <span className="index__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="index__name">{d.name}</span>
                <span className="index__short">{d.short}</span>
                <span className="index__meta">
                  <span>{d.duration}</span>
                  <span>From {d.from}</span>
                </span>
                <Arrow className="index__arrow" />
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div ref={follower} className="follower" data-visible={active !== null} aria-hidden="true">
        <div className="follower__frame">
          {DISCIPLINES.map((d, i) => (
            <img key={d.id} src={img(d.image, 700)} alt="" data-on={active === i} loading="lazy" decoding="async" />
          ))}
        </div>
      </div>
    </section>
  );
}
