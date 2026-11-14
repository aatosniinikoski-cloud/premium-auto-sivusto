import { useCallback, useEffect, useRef } from 'react';
import { IMG, img, srcSet } from '../../data';
import { clamp } from '../../motion';
import { Fade, Lines } from '../primitives';

/**
 * Before / after under the inspection lamp. The "before" layer is the same
 * photograph, dulled and overlaid with a radial swirl pattern — the
 * holograms a rotary polisher and automatic car washes leave around any
 * point light source.
 *
 * Position is written directly to the DOM; a visually hidden range input
 * carries keyboard and screen-reader control.
 */
export function Compare() {
  const box = useRef<HTMLDivElement>(null);
  const before = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);

  const set = useCallback((pct: number) => {
    const b = box.current;
    if (!b || !before.current || !handle.current) return;
    const p = clamp(pct, 0, 100);
    before.current.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
    handle.current.style.transform = `translate3d(${(b.clientWidth * p) / 100}px, 0, 0)`;
    if (range.current) range.current.value = String(Math.round(p));
  }, []);

  useEffect(() => {
    set(50);
    const onResize = () => set(Number(range.current?.value ?? 50));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [set]);

  const fromPointer = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    set(((clientX - r.left) / r.width) * 100);
  };

  return (
    <section className="compare" aria-labelledby="compare-title">
      <div className="wrap compare__head">
        <Lines id="compare-title" className="h-l" lines={['Under the', <em key="c">inspection lamp.</em>]} />
        <Fade className="compare__intro" delay={120}>
          <p>
            Every car is judged under a single point of 5,600K light — the most unforgiving light there
            is. Drag across to see what correction changes.
          </p>
        </Fade>
      </div>

      <div className="wrap">
        <div
          ref={box}
          className="compare__box"
          data-reveal="clip"
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            fromPointer(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <img
            className="compare__img"
            src={img(IMG.porscheBlack, 2000)}
            srcSet={srcSet(IMG.porscheBlack, [900, 1400, 2000, 2600])}
            sizes="(min-width: 1440px) 1328px, 92vw"
            alt="After correction: black Porsche with deep, clear, mirror-like paint"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div ref={before} className="compare__before" aria-hidden="true">
            <img
              className="compare__img"
              src={img(IMG.porscheBlack, 2000)}
              srcSet={srcSet(IMG.porscheBlack, [900, 1400, 2000, 2600])}
              sizes="(min-width: 1440px) 1328px, 92vw"
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <span className="compare__swirl" />
          </div>

          <span className="compare__tag compare__tag--l">As delivered</span>
          <span className="compare__tag compare__tag--r">After correction</span>

          <div ref={handle} className="compare__handle" aria-hidden="true">
            <span className="compare__knob">
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                <path d="M5 1L1 5l4 4M17 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
              </svg>
            </span>
          </div>

          <input
            ref={range}
            className="sr-only compare__range"
            type="range"
            min={0}
            max={100}
            defaultValue={50}
            aria-label="Compare before and after correction"
            onInput={(e) => set(Number(e.currentTarget.value))}
          />
        </div>
      </div>
    </section>
  );
}
