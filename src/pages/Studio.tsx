import { Closing } from '../components/Footer';
import { Fade, Lines, Media } from '../components/primitives';
import { IMG, img, srcSet } from '../data';

const PRINCIPLES = [
  {
    title: 'One car, one technician.',
    text: 'The person who inspects your car is the person who hands it back. Nothing is passed down a line.',
  },
  {
    title: 'Measure before we cut.',
    text: 'Clear coat is finite. We read its depth on every panel and leave a margin we would accept on our own cars.',
  },
  {
    title: 'Say no when it’s right.',
    text: 'If a car does not need a service, we will not sell it. Some defects are best left alone, and we will say so.',
  },
  {
    title: 'Show the work.',
    text: 'Inspection report before we start, photographs every evening, and a handover walk-around under the lamp.',
  },
];

const SPACE = [
  ['Light', 'High-CRI 5,600K panels and handheld inspection lamps in every bay'],
  ['Water', 'Filtered, deionised water — no mineral spotting, ever'],
  ['Air', 'Positive-pressure, filtered curing bay held at 21°C'],
  ['Security', 'Alarmed, monitored around the clock, fully insured'],
];

export function Studio() {
  return (
    <>
      <header className="studio-hero">
        <div className="studio-hero__media">
          <img
            src={img(IMG.garage, 2000)}
            srcSet={srcSet(IMG.garage, [800, 1400, 2000, 2800])}
            sizes="100vw"
            alt="Inside the studio: a dark car beneath cool overhead light, tail lights glowing red on the floor"
            fetchPriority="high"
          />
        </div>
        <div className="studio-hero__shade" aria-hidden="true" />
        <div className="wrap studio-hero__content">
          <Lines
            as="h1"
            className="h-mega"
            delay={150}
            lines={['A workshop', <>built around <em>light.</em></>]}
          />
        </div>
      </header>

      <section className="story">
        <div className="wrap story__grid">
          <Fade className="story__lead" as="p">
            Atelier Auto began in 2014 as a single rented bay and a promise to do one thing slowly and well.
            The name is deliberate: an atelier is a place where things are made by hand, by people who
            know the work.
          </Fade>
          <div className="story__body">
            <Fade as="p" delay={100}>
              We are not a car wash, and we are not a production line. Each car is booked into the studio
              for as long as it needs, and worked on by one technician from inspection to handover. The
              calendar is deliberately short.
            </Fade>
            <Fade as="p" delay={180}>
              The studio itself was built around a single question: how do you see a defect a client will
              notice in a year’s time? The answer is light — controlled, consistent, unforgiving — and a
              culture that does not move on until the panel is right.
            </Fade>
          </div>
        </div>

        <div className="wrap story__images">
          <Media id={IMG.washing} alt="A technician hand-washing a black car covered in foam" ratio="4 / 5" sizes="(min-width: 900px) 40vw, 92vw" />
          <Media id={IMG.spray} alt="Water spraying across the rear of a black sports car" ratio="3 / 2" sizes="(min-width: 900px) 50vw, 92vw" delay={120} />
        </div>
      </section>

      <section className="space" aria-labelledby="space-title">
        <div className="wrap space__grid">
          <Lines id="space-title" className="h-l" lines={['The', <em key="s">space.</em>]} />
          <dl className="space__list">
            {SPACE.map(([k, v], i) => (
              <Fade key={k} className="space__row" delay={i * 70}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </Fade>
            ))}
          </dl>
        </div>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div className="wrap">
          <Lines id="principles-title" className="h-xl" lines={['Four things', <em key="p">we hold to.</em>]} />
          <ol className="principles__list">
            {PRINCIPLES.map((p, i) => (
              <Fade as="li" key={p.title} className="principle" delay={i * 80}>
                <span className="principle__n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="principle__t">{p.title}</h3>
                <p className="principle__p">{p.text}</p>
              </Fade>
            ))}
          </ol>
        </div>
      </section>

      <div className="wrap studio-wide">
        <Media id={IMG.fog} alt="A grey car under headlights on a misty night road" ratio="21 / 9" sizes="92vw" />
      </div>

      <Closing />
    </>
  );
}
