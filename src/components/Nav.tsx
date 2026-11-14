import { useEffect, useRef, useState } from 'react';
import { Link, useRouter } from '../router';
import type { Vars } from './primitives';

const LINKS = [
  { to: '/services', label: 'Disciplines' },
  { to: '/studio', label: 'Studio' },
  { to: '/book', label: 'Reserve' },
];

export function Nav() {
  const header = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const { path } = useRouter();

  // Scrolled + hide-on-scroll-down state lives on data attributes, not React
  // state, so scrolling never re-renders the tree.
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      el.dataset.scrolled = String(y > 40);
      if (Math.abs(y - last) > 6) {
        el.dataset.hidden = String(y > last && y > 480);
        last = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('is-locked');
    const first = menuRef.current?.querySelector<HTMLElement>('a');
    first?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header ref={header} className="nav" data-open={open}>
        <div className="nav__inner wrap">
          <Link to="/" className="wordmark" aria-label="Atelier Auto — home">
            Atelier <em>Auto</em>
          </Link>
          <nav className="nav__links" aria-label="Primary">
            {LINKS.slice(0, 2).map((l) => (
              <Link key={l.to} to={l.to} className="nav__link">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link to="/book" className="btn btn--ghost btn--sm nav__cta">
            Reserve a consultation
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav__toggle-label">{open ? 'Close' : 'Menu'}</span>
            <span className="nav__toggle-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        className="menu"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="menu__links wrap" aria-label="Mobile">
          {[{ to: '/', label: 'Home' }, ...LINKS].map((l, i) => (
            <Link key={l.to} to={l.to} className="menu__link" style={{ '--i': i } as Vars}>
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>
        <div className="menu__foot wrap">
          <p>No. 7 Foundry Yard, London E2</p>
          <a href="mailto:studio@atelierauto.example">studio@atelierauto.example</a>
        </div>
      </div>
    </>
  );
}
