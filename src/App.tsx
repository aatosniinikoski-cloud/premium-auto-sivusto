import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Intro } from './components/Intro';
import { Nav } from './components/Nav';
import { Link, RouterProvider, useRouter } from './router';
import { observeReveals } from './motion';
import { Book } from './pages/Book';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Studio } from './pages/Studio';

function NotFound() {
  return (
    <section className="notfound wrap">
      <h1 className="h-mega">
        Off the <em>map.</em>
      </h1>
      <p>This page doesn’t exist — but the studio does.</p>
      <Link to="/" className="btn btn--primary">
        Back to the studio
      </Link>
    </section>
  );
}

function Routes({ ready }: { ready: boolean }) {
  const { path } = useRouter();

  // Reveal observers start only once the intro curtain begins to lift, so the
  // hero's entrance plays in view rather than behind the curtain.
  useEffect(() => {
    if (!ready) return;
    return observeReveals(document);
  }, [path, ready]);

  const page =
    path === '/' ? <Home /> :
    path === '/services' ? <Services /> :
    path === '/studio' ? <Studio /> :
    path === '/book' ? <Book /> :
    <NotFound />;

  return (
    <main id="main" key={path}>
      {page}
    </main>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const onReveal = useCallback(() => setReady(true), []);

  return (
    <RouterProvider>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Intro onReveal={onReveal} />
      <Nav />
      <Routes ready={ready} />
      <Footer />
      <div className="grain" aria-hidden="true" />
    </RouterProvider>
  );
}
