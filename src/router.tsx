import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import { EASE_IN_OUT, prefersReducedMotion } from './motion';

type RouterValue = { path: string; navigate: (to: string) => void };

const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} });

export const useRouter = () => useContext(RouterContext);

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

function jumpTo(hash: string, smooth = false) {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  const top = target ? target.getBoundingClientRect().top + window.scrollY - 96 : 0;
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'instant' });
}

const TITLES: Record<string, string> = {
  '/': 'Atelier Auto — The Quiet Art of the Perfect Finish',
  '/services': 'Disciplines — Atelier Auto',
  '/studio': 'The Studio — Atelier Auto',
  '/book': 'Reserve — Atelier Auto',
};

/**
 * A tiny history router whose only job beyond matching paths is the page
 * transition: a curtain covers the old page, the route swaps underneath,
 * and the curtain lifts off the new one. Exit continues in the direction of
 * entry (bottom → top) so the motion reads as one continuous wipe.
 */
export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname);
  const curtain = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const go = useCallback(async (to: string, push: boolean) => {
    const url = new URL(to, window.location.origin);
    const samePage = url.pathname === window.location.pathname;

    if (samePage) {
      if (push) history.pushState(null, '', url.pathname + url.hash);
      jumpTo(url.hash, !prefersReducedMotion());
      return;
    }
    if (busy.current) return;
    busy.current = true;

    const el = curtain.current;
    const reduce = prefersReducedMotion();
    const timing = { duration: reduce ? 180 : 760, easing: EASE_IN_OUT, fill: 'forwards' as const };

    if (el) {
      el.dataset.active = 'true';
      await el.animate(
        reduce
          ? [{ opacity: 0 }, { opacity: 1 }]
          : [{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)' }],
        timing,
      ).finished;
    }

    if (push) history.pushState(null, '', url.pathname + url.hash);
    document.title = TITLES[url.pathname] ?? 'Atelier Auto';
    flushSync(() => setPath(url.pathname));
    jumpTo(url.hash);
    await nextFrame();

    if (el) {
      await el.animate(
        reduce
          ? [{ opacity: 1 }, { opacity: 0 }]
          : [{ clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)' }],
        timing,
      ).finished;
      el.dataset.active = 'false';
      el.getAnimations().forEach((a) => a.cancel());
    }
    busy.current = false;
  }, []);

  useEffect(() => {
    document.title = TITLES[window.location.pathname] ?? 'Atelier Auto';
    const onPop = () => go(window.location.href, false);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [go]);

  const navigate = useCallback((to: string) => void go(to, true), [go]);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
      <div ref={curtain} className="curtain" data-active="false" aria-hidden="true">
        <span className="curtain__mark">
          Atelier <em>Auto</em>
        </span>
      </div>
    </RouterContext.Provider>
  );
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, onClick, ...rest }: LinkProps) {
  const { navigate, path } = useRouter();
  const isCurrent = to === path;
  return (
    <a
      href={to}
      aria-current={isCurrent ? 'page' : undefined}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
      }}
    />
  );
}
