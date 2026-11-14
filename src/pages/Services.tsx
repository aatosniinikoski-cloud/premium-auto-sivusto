import { useId, useState } from 'react';
import { Closing } from '../components/Footer';
import { Fade, Lines, Media, type Vars } from '../components/primitives';
import { DISCIPLINES, FAQ, PROGRAMMES } from '../data';

export function Services() {
  return (
    <>
      <header className="page-head">
        <div className="wrap page-head__grid">
          <Lines
            as="h1"
            className="h-mega page-head__title"
            delay={150}
            lines={['Disciplines', <em key="s">&amp; programmes.</em>]}
          />
          <Fade className="page-head__intro" delay={500}>
            <p>
              Five crafts, each priced from a starting point and confirmed after we have seen the car in
              person. Nothing begins until you have read the inspection report.
            </p>
          </Fade>
        </div>
        <nav className="wrap toc" aria-label="Disciplines on this page" data-reveal="up" style={{ '--d': '650ms' } as Vars}>
          {DISCIPLINES.map((d, i) => (
            <a key={d.id} href={`#${d.id}`} className="toc__item">
              <span>{String(i + 1).padStart(2, '0')}</span>
              {d.name}
            </a>
          ))}
        </nav>
      </header>

      <div className="services">
        {DISCIPLINES.map((d, i) => (
          <article key={d.id} id={d.id} className="service wrap" aria-labelledby={`${d.id}-t`}>
            <div className="service__side">
              <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
              <Lines id={`${d.id}-t`} as="h2" className="h-l service__name" lines={d.name.split(' ')} />
            </div>
            <div className="service__body">
              <Media id={d.image} alt={d.alt} ratio="16 / 9" sizes="(min-width: 900px) 58vw, 92vw" />
              <Fade className="service__text" delay={100}>
                <p className="service__lead">{d.long}</p>
              </Fade>
              <div className="service__cols">
                <Fade delay={150}>
                  <p className="label">What it includes</p>
                  <ul className="ticks">
                    {d.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </Fade>
                <Fade className="service__facts" delay={220}>
                  <dl>
                    <div>
                      <dt className="label">Time in studio</dt>
                      <dd>{d.duration}</dd>
                    </div>
                    <div>
                      <dt className="label">From</dt>
                      <dd>{d.from}</dd>
                    </div>
                  </dl>
                </Fade>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="programmes" aria-labelledby="prog-title">
        <div className="wrap">
          <div className="programmes__head">
            <Lines id="prog-title" className="h-xl" lines={['After the', <em key="p">first visit.</em>]} />
            <Fade className="programmes__intro" delay={120}>
              <p>
                A finish is only as good as the way it is kept. Programmes keep your car on our calendar,
                so the paint never drifts back to where it started.
              </p>
            </Fade>
          </div>

          <div className="table-wrap" data-reveal="up">
            <table className="ptable">
              <caption className="sr-only">Comparison of care programmes</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {PROGRAMMES.tiers.map((t) => (
                    <th key={t.name} scope="col">
                      <span className="ptable__name">{t.name}</span>
                      <span className="ptable__price">
                        {t.price} <small>{t.unit}</small>
                      </span>
                      <span className="ptable__note">{t.note}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROGRAMMES.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    {r.values.map((v, i) => (
                      <td key={i} data-empty={v === '—'}>
                        {v === '—' ? <span aria-label="Not included">—</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div className="wrap faq__grid">
          <Lines id="faq-title" className="h-l" lines={['Questions,', <em key="q">answered.</em>]} />
          <div className="faq__list" data-reveal="up">
            {FAQ.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="faq__item" data-open={open}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <span>{q}</span>
          <span className="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div id={id} className="faq__panel" role="region" aria-hidden={!open}>
        <div className="faq__inner">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}
