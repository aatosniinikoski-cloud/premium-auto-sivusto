import { IMG, img, srcSet } from '../../data';
import { Link } from '../../router';
import { Arrow, Lines, type Vars } from '../primitives';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media" data-reveal="hero">
        <img
          src={img(IMG.hero, 2000)}
          srcSet={srcSet(IMG.hero, [800, 1400, 2000, 2800])}
          sizes="100vw"
          alt="A dark Bentley coupé in shadow, light catching the edge of its grille and wheel"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content wrap">
        <p className="hero__kicker" data-reveal="up" style={{ '--d': '0ms' } as Vars}>
          Paint correction&ensp;·&ensp;Ceramic protection&ensp;·&ensp;Interior restoration
        </p>
        <Lines
          as="h1"
          id="hero-title"
          className="hero__title"
          delay={80}
          lines={[
            'The quiet art',
            <>
              of the <em>perfect</em>
            </>,
            'finish.',
          ]}
        />
        <div className="hero__foot" data-reveal="up" style={{ '--d': '520ms' } as Vars}>
          <p className="hero__lead">
            One car at a time, by hand, under daylight-balanced light. We return paint to the
            condition it left the factory in — and then we protect it.
          </p>
          <div className="hero__actions">
            <Link to="/book" className="btn btn--primary">
              <span>Reserve a consultation</span>
              <Arrow />
            </Link>
            <Link to="/services" className="u-link hero__secondary">
              See the five disciplines
            </Link>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
