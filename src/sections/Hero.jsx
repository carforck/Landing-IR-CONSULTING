import { ArrowRight } from 'lucide-react';
import { CountUp } from '../fx.jsx';
import { brand, leader } from '../data.js';
import { media } from '../media.js';
import { useEffect, useRef } from 'react';
import './chrome.css';

// Composición abstracta: retícula, arcos concéntricos y una trayectoria ascendente con nodos
// (diagnosticar → diseñar → implementar → medir). Decorativa, sin datos.
// Video de fondo decorativo: sin audio, en loop; con reduced-motion se queda en el póster.
function HeroVideo() {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); return; }
    v.play().catch(() => {});
  }, []);
  return (
    <div className="hero__media" aria-hidden="true">
      <video ref={ref} className="hero__video" src={media.hero.video} poster={media.hero.poster} muted loop playsInline autoPlay preload="metadata" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroVideo />
      <div className="container hero__inner">
        <div className="hero__content reveal">
          <p className="kicker hero__kicker">{brand.tagline}</p>
          <h1 id="hero-title" className="hero__title">
            {brand.headline.map((line, i) => (
              <span key={line} className={`hero__line ${i === 1 ? 'hero__line--accent' : ''}`}>{line}</span>
            ))}
          </h1>
          <p className="hero__summary">{brand.summary}</p>
          <div className="hero__ctas">
            <a href="#contacto" className="btn btn--mint">
              Solicitar diagnóstico <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#servicios" className="btn btn--ghost">Ver servicios</a>
          </div>
          <p className="hero__owner">
            Liderada por <strong>{brand.owner}</strong> <span aria-hidden="true">·</span> {brand.city}
          </p>
        </div>
      </div>

      <div className="hero__stats">
        <div className="container">
          <ul className="hero-stats reveal">
            {leader.stats.slice(0, 3).map((s) => (
              <li key={s.label} className="hero-stats__item">
                <span className="hero-stats__value"><CountUp value={s.value} /></span>
                <span className="hero-stats__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
