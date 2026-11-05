import { ShieldCheck, Award, Compass, Lightbulb, Eye, Handshake, Target, Telescope, Sparkles } from 'lucide-react';
import { firm, identity, why } from '../data.js';
import { media } from '../media.js';
import LottieIcon from '../components/LottieIcon.jsx';
import './about.css';

// Icono por valor (los textos vienen de data.js; si cambia alguno, cae en el icono por defecto).
const valueIcons = {
  'Integridad y confidencialidad': ShieldCheck,
  'Excelencia profesional': Award,
  'Pensamiento estratégico': Compass,
  'Innovación práctica': Lightbulb,
  Transparencia: Eye,
  'Compromiso con el cliente': Handshake,
};

export function FirmIntro() {
  return (
      <section id="firma" className="section firm" aria-labelledby="firma-title">
        <div className="container">
          <header className="section-head reveal">
            <p className="kicker">Nuestra firma</p>
            <h2 id="firma-title">{firm.title}</h2>
            <p>{firm.subtitle}</p>
          </header>

          <div className="firm-cols">
            <article className="firm-col reveal">
              <h3>Quiénes somos</h3>
              <p>{firm.who}</p>
            </article>
            <article className="firm-col reveal">
              <h3>Nuestra propuesta de valor</h3>
              <p>{firm.value}</p>
            </article>
          </div>

          <figure className="firm-photo reveal">
            <img src={media.firma.src} alt={media.firma.alt} loading="lazy" decoding="async" width="1600" height="900" />
          </figure>

          <figure className="firm-commit reveal">
            <blockquote>
              <p>
                {/* La frase de compromiso se compone en tres tiempos, a partir del mismo texto de data.js */}
                {firm.commitment.split(/(?<=\.)\s+/).map((phrase) => {
                  const [first, ...rest] = phrase.split(' ');
                  return (
                    <span key={phrase} className="firm-commit__line">
                      <strong>{first}</strong> {rest.join(' ')}
                    </span>
                  );
                })}
              </p>
            </blockquote>
            <figcaption>Nuestro compromiso</figcaption>
          </figure>
        </div>
      </section>
  );
}

export function Identity() {
  return (
      <section className="section section--soft firm-identity" aria-labelledby="identidad-title">
        <div className="container">
          <header className="section-head reveal">
            <p className="kicker">Identidad</p>
            <h2 id="identidad-title">{identity.title}</h2>
            <p>{identity.subtitle}</p>
          </header>

          <div className="firm-mv">
            <article className="firm-card reveal" data-lottie-hover="">
              <span className="firm-card__icon firm-card__icon--anim" aria-hidden="true"><LottieIcon name="mision" size={64} fallback={Target} fallbackSize={24} /></span>
              <h3>Misión</h3>
              <p>{identity.mission}</p>
            </article>
            <article className="firm-card firm-card--dark reveal" data-lottie-hover="">
              <span className="firm-card__icon firm-card__icon--anim" aria-hidden="true"><LottieIcon name="vision" size={64} fallback={Telescope} fallbackSize={24} /></span>
              <h3>Visión</h3>
              <p>{identity.vision}</p>
            </article>
          </div>

          <h3 className="firm-values__title reveal">Nuestros valores</h3>
          <ul className="firm-values reveal" role="list">
            {identity.values.map((v) => {
              const Icon = valueIcons[v] || Sparkles;
              return (
                <li key={v} className="firm-value">
                  <span className="firm-value__icon" aria-hidden="true"><Icon size={20} strokeWidth={1.75} /></span>
                  <span>{v}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
  );
}

export function Why() {
  return (
      <section id="diferenciales" className="section firm-why" aria-labelledby="por-que-title">
        <div className="container firm-why__grid">
          <header className="section-head firm-why__head reveal">
            <p className="kicker">Diferenciales</p>
            <h2 id="por-que-title">¿Por qué elegirnos?</h2>
          </header>
          <ol className="firm-why__list" role="list">
            {why.map((item) => (
              <li key={item} className="firm-why__item reveal">
                {/* Check que se traza al entrar en pantalla (CSS en about.css, ligado a .reveal[data-in]) */}
                <span className="firm-why__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                    <path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
  );
}
