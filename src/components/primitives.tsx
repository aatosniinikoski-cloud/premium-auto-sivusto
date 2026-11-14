import type { CSSProperties, ElementType, ReactNode } from 'react';
import { img, srcSet } from '../data';

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Headline split into masked lines that rise into place on reveal. */
export function Lines({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  id,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} data-reveal="lines" style={{ '--d': `${delay}ms` } as Vars}>
      {lines.map((line, i) => (
        <span className="line" key={i} style={{ '--i': i } as Vars}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Image that unveils with a clip-path wipe while settling from a slight zoom. */
export function Media({
  id,
  alt,
  ratio = '3 / 2',
  sizes = '100vw',
  className = '',
  delay = 0,
  eager = false,
}: {
  id: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  className?: string;
  delay?: number;
  eager?: boolean;
}) {
  return (
    <div className={`media ${className}`} data-reveal="clip" style={{ '--ratio': ratio, '--d': `${delay}ms` } as Vars}>
      <div className="media__zoom">
        <img
          src={img(id, 1600)}
          srcSet={srcSet(id)}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </div>
  );
}

export function Fade({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={className} data-reveal="up" style={{ '--d': `${delay}ms` } as Vars}>
      {children}
    </Tag>
  );
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
      <path d="M0 5h16.5M12.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export type { Vars };
