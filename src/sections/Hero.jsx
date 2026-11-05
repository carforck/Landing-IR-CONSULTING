import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { CountUp } from '../fx.jsx';
import { useLang } from '../i18n/index.jsx';
import { waProps, WhatsAppGlyph } from '../whatsapp.jsx';
import './chrome.css';

// Frase que se escribe y se borra (efecto máquina de escribir). Decorativa: el h1 lleva el texto fijo para lectores.
// Todas las frases se apilan invisibles en la misma celda de la grilla: la caja siempre mide lo que la frase
// más larga ocupa en el ancho actual, así no hay saltos de layout (CLS) en ningún ancho ni idioma.
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
    <span className="hero__type" aria-hidden="true">
      {phrases.map((p) => <span key={p} className="hero__type-ghost">{p}<span className="hero__caret" /></span>)}
      <span className="hero__type-live">{phrases[i].slice(0, n)}<span className="hero__caret" /></span>
    </span>
  );
}

// Carrusel de video de fondo (lugares de Cartagena) con fundido.
// - Solo en pantallas > 760px, sin ahorro de datos y sin reduced-motion; si no, póster fijo (imagen LCP).
// - Solo se montan el clip actual y el anterior (mientras se desvanece).
// - Fuera de pantalla no avanza ni reproduce (IntersectionObserver sobre .hero).
const CLIP_MS = 8000;
const VIDEO_QUERY = '(min-width: 761px) and (prefers-reduced-motion: no-preference)';

function canPlayVideo() {
  if (typeof window === 'undefined') return false;
  if (navigator.connection?.saveData) return false;
  return window.matchMedia(VIDEO_QUERY).matches;
}

function HeroReel({ heroRef }) {
  const { t: { media, heroReel } } = useLang();
  const reel = heroReel?.length ? heroReel : [{ ...media.hero, place: 'Cartagena' }];
  const [video, setVideo] = useState(canPlayVideo);
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(null);
  const [inView, setInView] = useState(true);
  const box = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(VIDEO_QUERY);
    const on = () => setVideo(canPlayVideo());
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [heroRef]);

  // Avanza solo con video activo y el hero en pantalla.
  useEffect(() => {
    if (!video || !inView || reel.length < 2) return undefined;
    const t = setTimeout(() => { setPrev(idx); setIdx((i) => (i + 1) % reel.length); }, CLIP_MS);
    return () => clearTimeout(t);
  }, [idx, video, inView, reel.length]);

  useEffect(() => {
    if (prev === null) return undefined;
    const t = setTimeout(() => setPrev(null), 1400);
    return () => clearTimeout(t);
  }, [prev]);

  // Pausa/reanuda los videos montados según visibilidad.
  useEffect(() => {
    box.current?.querySelectorAll('video').forEach((v) => {
      if (inView) v.play?.().catch(() => {});
      else v.pause?.();
    });
  }, [inView, idx]);

  const clip = (i, cls) => (
    <video key={reel[i].video} className={`hero__video ${cls}`} src={reel[i].video} poster={reel[i].poster}
      muted loop playsInline autoPlay preload="metadata" />
  );

  return (
    <>
      <div className="hero__media" aria-hidden="true" ref={box}>
        {video ? (
          <>
            {prev !== null && clip(prev, 'is-out')}
            {clip(idx, 'is-in')}
          </>
        ) : (
          <img className="hero__video hero__poster" src={reel[0].poster} alt="" fetchpriority="high" decoding="async" width="1280" height="720" />
        )}
      </div>
      <p className="hero__place" aria-live="off">
        <MapPin size={14} aria-hidden="true" /> <span key={idx}>{reel[idx].place}</span>
        {video && (
          <span className="hero__dots" aria-hidden="true">
            {reel.map((r, i) => <i key={r.video} className={i === idx ? 'is-on' : ''} />)}
          </span>
        )}
      </p>
    </>
  );
}

export default function Hero() {
  const { lang, t } = useLang();
  const { brand, leader } = t;
  const tx = t.ui.hero;
  const heroRef = useRef(null);
  return (
    <section className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <HeroReel heroRef={heroRef} />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="kicker hero__kicker">{brand.tagline}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">{brand.headline[0]}</span>
            <span className="sr-only">{brand.headline[1]}</span>
            <Typewriter key={lang} phrases={brand.rotating} />
          </h1>
          <p className="hero__summary">{brand.summary}</p>
          <p className="hero__aud">{tx.aud}</p>
          <div className="hero__ctas">
            <a {...waProps(t.ui.wa.hello)} className="btn btn--mint" aria-label={t.ui.cta.waLabel}>
              <WhatsAppGlyph size={18} /> {t.ui.cta.wa}
            </a>
            <a href="#contacto" className="btn btn--ghost">
              {t.ui.cta.diagnosis} <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <a href="#servicios" className="hero__link">{tx.services}</a>
          <p className="hero__owner">
            {tx.ledBy} <strong>{brand.owner}</strong> <span aria-hidden="true">·</span> {brand.city}
          </p>
        </div>
      </div>

      <div className="hero__stats">
        <div className="container">
          <ul className="hero-stats">
            {leader.stats.slice(0, 3).map((s) => (
              <li key={s.label} className="hero-stats__item">
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
