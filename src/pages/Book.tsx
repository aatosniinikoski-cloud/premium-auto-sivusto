import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Fade, Lines, Media, Arrow } from '../components/primitives';
import { DISCIPLINES, IMG } from '../data';
import { prefersReducedMotion } from '../motion';

type Field = 'name' | 'email' | 'vehicle' | 'services';
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'sent';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function nextMonths(count: number) {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i + 1, 1);
    return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  });
}

export function Book() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [picked, setPicked] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const months = useMemo(() => nextMonths(6), []);
  const sentRef = useRef<HTMLHeadingElement>(null);

  // The success panel is much shorter than the form — bring it into view and
  // move focus to it so keyboard and screen-reader users land on the result.
  useEffect(() => {
    if (status !== 'sent' || !sentRef.current) return;
    const top = sentRef.current.getBoundingClientRect().top + window.scrollY - 160;
    window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
    sentRef.current.focus({ preventScroll: true });
  }, [status]);

  const toggle = (id: string) => {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    setErrors((e) => ({ ...e, services: undefined }));
  };

  const clear = (f: Field) => errors[f] && setErrors((e) => ({ ...e, [f]: undefined }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const vehicle = String(data.get('vehicle') ?? '').trim();

    const next: Errors = {};
    if (!name) next.name = 'Please tell us your name.';
    if (!email) next.email = 'We need an email address to reply.';
    else if (!EMAIL.test(email)) next.email = 'That email address doesn’t look quite right.';
    if (!vehicle) next.vehicle = 'Which car should we prepare for?';
    if (picked.length === 0) next.services = 'Choose at least one discipline — or “Not sure yet”.';
    setErrors(next);

    const firstInvalid = (Object.keys(next) as Field[])[0];
    if (firstInvalid) {
      const el = form.current?.querySelector<HTMLElement>(
        firstInvalid === 'services' ? '.chips input' : `[name="${firstInvalid}"]`,
      );
      el?.focus();
      return;
    }

    setFirstName(name.split(' ')[0]);
    setStatus('sending');
    // No backend in this demo — simulate the round trip.
    window.setTimeout(() => setStatus('sent'), 1400);
  };

  return (
    <section className="book">
      <div className="wrap book__grid">
        <aside className="book__side">
          <Lines as="h1" className="h-l book__title" delay={150} lines={['Reserve a', <em key="b">consultation.</em>]} />
          <Fade className="book__intro" delay={450}>
            <p>
              Tell us about the car and what you would like for it. We reply within one working day to
              arrange a time for you to bring it in — the consultation itself is free and takes about an hour.
            </p>
          </Fade>
          <Media
            className="book__media"
            id={IMG.laferrari}
            alt="Front of a black supercar in a darkened studio"
            ratio="4 / 3"
            sizes="(min-width: 900px) 38vw, 92vw"
            delay={300}
          />
        </aside>

        <div className="book__main" aria-live="polite">
          {status === 'sent' ? (
            <div className="sent enter">
              <p className="label">Request received</p>
              <h2 className="h-l" ref={sentRef} tabIndex={-1} style={{ outline: 'none' }}>
                Thank you, <em>{firstName}.</em>
              </h2>
              <p>
                We will be in touch within one working day to find a time that suits you. In the meantime,
                there is nothing you need to do to the car — please don’t wash it before the visit; we
                would like to see it as it is.
              </p>
              <button
                type="button"
                className="u-link"
                onClick={() => {
                  setStatus('idle');
                  setPicked([]);
                }}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form ref={form} className="form enter" noValidate onSubmit={onSubmit}>
              <fieldset className="form__group">
                <legend className="label">You</legend>
                <div className="form__row">
                  <Input name="name" label="Full name" autoComplete="name" error={errors.name} onChange={() => clear('name')} />
                  <Input name="email" label="Email" type="email" autoComplete="email" error={errors.email} onChange={() => clear('email')} />
                </div>
                <Input name="phone" label="Phone" type="tel" autoComplete="tel" optional />
              </fieldset>

              <fieldset className="form__group">
                <legend className="label">The car</legend>
                <div className="form__row form__row--wide">
                  <Input name="vehicle" label="Make & model" placeholder="e.g. Porsche 911 GT3, 2021" error={errors.vehicle} onChange={() => clear('vehicle')} />
                  <div className="field">
                    <label htmlFor="f-month">Preferred month</label>
                    <div className="select">
                      <select id="f-month" name="month" defaultValue="">
                        <option value="">Flexible</option>
                        {months.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="form__group" aria-describedby={errors.services ? 'err-services' : undefined}>
                <legend className="label">Disciplines</legend>
                <div className="chips">
                  {[...DISCIPLINES.map((d) => ({ id: d.id, name: d.name })), { id: 'unsure', name: 'Not sure yet' }].map((d) => (
                    <label key={d.id} className="chip" data-on={picked.includes(d.id)}>
                      <input type="checkbox" name="services" value={d.id} checked={picked.includes(d.id)} onChange={() => toggle(d.id)} />
                      <span>{d.name}</span>
                    </label>
                  ))}
                </div>
                {errors.services && (
                  <p className="field__error" id="err-services">
                    {errors.services}
                  </p>
                )}
              </fieldset>

              <fieldset className="form__group">
                <legend className="label">Anything else</legend>
                <div className="field">
                  <label htmlFor="f-notes">
                    Notes <span className="field__opt">optional</span>
                  </label>
                  <textarea id="f-notes" name="notes" rows={4} placeholder="Known paint damage, history, an event date…" />
                </div>
              </fieldset>

              <div className="form__submit">
                <button type="submit" className="btn btn--primary btn--lg" data-loading={status === 'sending'} disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Sending' : 'Send request'}</span>
                  {status === 'sending' ? <span className="spinner" aria-hidden="true" /> : <Arrow />}
                </button>
                <p className="form__fine">This is a demo studio — nothing is sent anywhere.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Input({
  name,
  label,
  type = 'text',
  autoComplete,
  placeholder,
  error,
  optional,
  onChange,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  optional?: boolean;
  onChange?: () => void;
}) {
  const id = `f-${name}`;
  return (
    <div className="field" data-invalid={Boolean(error)}>
      <label htmlFor={id}>
        {label} {optional && <span className="field__opt">optional</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        onChange={onChange}
      />
      {error && (
        <p className="field__error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
