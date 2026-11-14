import { useEffect, useRef, useState } from 'react';
import { PROCESS, img, srcSet } from '../../data';
import { Lines } from '../primitives';

/**
 * Sticky media frame on the left crossfades as each step passes the middle
 * of the viewport. Purpose: keeps the reader oriented in a five-step sequence.
 * On narrow screens the frame is dropped and each step carries its own image.
 */
export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    el.querySelectorAll('[data-step]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="process" aria-labelledby="process-title">
      <div className="wrap">
        <Lines
          id="process-title"
          className="h-xl process__title"
          lines={['Arrival to handover,', <em key="p">five days.</em>]}
        />
      </div>

      <div ref={root} className="wrap process__grid">
        <div className="process__stage" aria-hidden="true">
          <div className="process__frame">
            {PROCESS.map((p, i) => (
              <img
                key={p.title}
                src={img(p.image, 1400)}
                srcSet={srcSet(p.image, [700, 1000, 1400, 2000])}
                sizes="45vw"
                alt=""
                data-on={step === i}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <div className="process__counter">
            <span className="process__digit" key={step}>
              {String(step + 1).padStart(2, '0')}
            </span>
            <span className="process__total">/ 05</span>
          </div>
          <div className="process__bar">
            <i style={{ transform: `scaleX(${(step + 1) / PROCESS.length})` }} />
          </div>
        </div>

        <ol className="process__steps">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="process__step" data-step={i} data-current={step === i}>
              <img
                className="process__inline"
                src={img(p.image, 1000)}
                alt={p.alt}
                loading="lazy"
                decoding="async"
              />
              <p className="process__when">{p.detail}</p>
              <h3 className="process__name">
                <span className="process__n">{String(i + 1).padStart(2, '0')}</span>
                {p.title}
              </h3>
              <p className="process__text">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
