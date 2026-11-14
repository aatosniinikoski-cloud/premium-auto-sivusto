import { COMMISSIONS } from '../../data';
import { Fade, Lines, Media } from '../primitives';

const LAYOUT = [
  { cls: 'c-a', ratio: '16 / 10', sizes: '(min-width: 900px) 62vw, 92vw' },
  { cls: 'c-b', ratio: '4 / 5', sizes: '(min-width: 900px) 30vw, 92vw' },
  { cls: 'c-c', ratio: '4 / 5', sizes: '(min-width: 900px) 34vw, 92vw' },
  { cls: 'c-d', ratio: '3 / 2', sizes: '(min-width: 900px) 50vw, 92vw' },
  { cls: 'c-e', ratio: '21 / 9', sizes: '92vw' },
];

export function Commissions() {
  return (
    <section className="commissions" aria-labelledby="comm-title">
      <div className="wrap">
        <div className="commissions__head">
          <Lines id="comm-title" className="h-xl" lines={['Recent', <em key="r">commissions.</em>]} />
          <Fade className="commissions__intro" delay={120}>
            <p>A selection from the last season in the studio, photographed on the day of handover.</p>
          </Fade>
        </div>

        <div className="commissions__grid">
          {COMMISSIONS.map((c, i) => (
            <figure key={c.car} className={`commission ${LAYOUT[i].cls}`}>
              <Media id={c.image} alt={c.alt} ratio={LAYOUT[i].ratio} sizes={LAYOUT[i].sizes} />
              <Fade as="figcaption" className="commission__cap" delay={200}>
                <span className="commission__car">{c.car}</span>
                <span className="commission__work">{c.work}</span>
              </Fade>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
