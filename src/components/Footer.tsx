import { Link } from '../router';
import { Arrow, Lines, type Vars } from './primitives';

export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="wrap">
        <Lines
          id="closing-title"
          className="closing__title"
          lines={[
            'Bring us the car',
            <>
              you love <em>most.</em>
            </>,
          ]}
        />
        <div className="closing__row" data-reveal="up" style={{ '--d': '200ms' } as Vars}>
          <p>
            Consultations are free and unhurried. Most commissions are booked four to six weeks ahead,
            and every car is handled start to finish by one technician.
          </p>
          <Link to="/book" className="btn btn--primary">
            <span>Reserve a consultation</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <p className="label">Visit</p>
          <p>
            No. 7 Foundry Yard
            <br />
            Shoreditch, London E2
          </p>
        </div>
        <div>
          <p className="label">Hours</p>
          <p>
            Tue – Sat, 08:00 – 18:00
            <br />
            By appointment only
          </p>
        </div>
        <div>
          <p className="label">Contact</p>
          <p>
            <a className="u-link" href="mailto:studio@atelierauto.example">
              studio@atelierauto.example
            </a>
            <br />
            <a className="u-link" href="tel:+442079460018">
              +44 20 7946 0018
            </a>
          </p>
        </div>
        <div className="footer__nav">
          <p className="label">Pages</p>
          <p>
            <Link className="u-link" to="/services">Disciplines</Link>
            <br />
            <Link className="u-link" to="/studio">Studio</Link>
            <br />
            <Link className="u-link" to="/book">Reserve</Link>
          </p>
        </div>
      </div>

      <div className="footer__mark" aria-hidden="true" data-reveal="lines">
        <span className="line" style={{ '--i': 0 } as Vars}>
          <span>
            Atelier <em>Auto</em>
          </span>
        </span>
      </div>

      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} Atelier Auto — a fictional studio.</span>
        <button
          type="button"
          className="u-link footer__top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
            })
          }
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
