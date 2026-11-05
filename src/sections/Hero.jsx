import { ArrowRight, MapPin } from 'lucide-react';
import { CountUp } from '../fx.jsx';
import { useLang } from '../i18n/index.jsx';
import { useEffect, useState } from 'react';
import './chrome.css';

// Frase que se escribe y se borra (efecto máquina de escribir). Decorativa: el h1 lleva el texto fijo para lectores.
function Typewriter({ phrases }) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [i, setI] = useState(0);
  const [n, setN] = useState(reduced ? phrases[0].length : 0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduced) return undefined;
    const full = phrases[i];
    let t;
    if (!del && n < full.length) t = setTimeout(() => setN(n + 1), 55);
    else if (!del) t = setTimeout(() => setDel(true), 2600);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 28);
    else { setDel(false); setI((i + 1) % phrases.length); }
    return () => clearTimeout(t);
  }, [n, del, i, phrases, reduced]);
  return (
    <span className="hero__line hero__line--accent hero__type" aria-hidden="true">
      {phrases[i].slice(0, n)}<span className="hero__caret" />
    </span>
  );
}

// Palabra que rota con transición vertical.
function WordSwap({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="hero__swap">
      <span key={i} className="hero__swap-word">{words[i]}</span>
    </span>
  );
}

// Carrusel de video de fondo (lugares de Cartagena) con fundido. Solo se montan el clip actual y el
// anterior (mientras se desvanece), así no se descargan todos a la vez. Con reduced-motion: póster fijo.
const CLIP_MS = 8000;

function HeroReel() {
  const { t: { media, heroReel } } = useLang();
  const reel = heroReel?.length ? heroReel : [{ ...media.hero, place: 'Cartagena' }];
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced || reel.length < 2) return undefined;
    const t = setTimeout(() => { setPrev(idx); setIdx((i) => (i + 1) % reel.length); }, CLIP_MS);
    return () => clearTimeout(t);
  }, [idx, reduced, reel.length]);

  useEffect(() => {
    if (prev === null) return undefined;
    const t = setTimeout(() => setPrev(null), 1400);
    return () => clearTimeout(t);
  }, [prev]);

  const clip = (i, cls) => (
    <video key={reel[i].video} className={`hero__video ${cls}`} src={reel[i].video} poster={reel[i].poster}
      muted loop playsInline autoPlay={!reduced} preload="auto" />
  );

  return (
    <>
      <div className="hero__media" aria-hidden="true">
        {prev !== null && clip(prev, 'is-out')}
        {clip(idx, 'is-in')}
      </div>
      <p className="hero__place" aria-live="off">
        <MapPin size={14} aria-hidden="true" /> <span key={idx}>{reel[idx].place}</span>
        <span className="hero__dots" aria-hidden="true">
          {reel.map((r, i) => <i key={r.video} className={i === idx ? 'is-on' : ''} />)}
        </span>
      </p>
    </>
  );
}

export default function Hero() {
  const { lang, t } = useLang();
  const { brand, leader } = t;
  const tx = t.ui.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroReel />
      <div className="container hero__inner">
        <div className="hero__content reveal">
          <p className="kicker hero__kicker">{brand.tagline}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">{brand.headline[0]}</span>
            <span className="sr-only">{brand.headline[1]}</span>
            <Typewriter key={lang} phrases={brand.rotating} />
          </h1>
          <p className="hero__summary">{brand.summary}</p>
          <p className="hero__aud">
            {tx.audPre} <WordSwap key={lang} words={brand.audiences} /> {tx.audPost}
          </p>
          <div className="hero__ctas">
            <a href="#contacto" className="btn btn--mint">
              {tx.ctaPrimary} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#servicios" className="btn btn--ghost">{tx.ctaSecondary}</a>
          </div>
          <p className="hero__owner">
            {tx.ledBy} <strong>{brand.owner}</strong> <span aria-hidden="true">·</span> {brand.city}
          </p>
        </div>
      </div>

      <div className="hero__stats">
        <div className="container">
          <ul className="hero-stats reveal">
            {leader.stats.slice(0, 3).map((s) => (
              <li key={s.value} className="hero-stats__item">
                <span className="hero-stats__value"><CountUp key={lang} value={s.value} /></span>
                <span className="hero-stats__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
