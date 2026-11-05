import { ShieldCheck, Medal, Strategy, Lightbulb, Eye, Handshake } from '@phosphor-icons/react';
import { Target, Telescope, MapPin } from 'lucide-react';
import LottieIcon from '../components/LottieIcon.jsx';
import { firm, identity } from '../data.js';
import './philosophy.css';

// Compromiso + identidad (misión, visión, valores) en una sola sección. Textos de data.js (portafolio).
const valueIcons = {
  'Integridad y confidencialidad': ShieldCheck,
  'Excelencia profesional': Medal,
  'Pensamiento estratégico': Strategy,
  'Innovación práctica': Lightbulb,
  Transparencia: Eye,
  'Compromiso con el cliente': Handshake,
};

export default function Philosophy() {
  const commit = firm.commitment.split(/(?<=\.)\s+/).map((p) => { const [k, ...r] = p.split(' '); return { k, rest: r.join(' ') }; });
  return (
    <section id="identidad" className="ph" aria-labelledby="identidad-title">
      {/* Compromiso: banda tipográfica */}
      <div className="ph__commit">
        <div className="container">
          <p className="ph__k reveal">Nuestro compromiso</p>
          <ol className="ph__commit-list reveal">
            {commit.map(({ k, rest }, i) => (
              <li key={k} style={{ '--d': `${i * 160}ms` }}>
                <span className="ph__n" aria-hidden="true">0{i + 1}</span>
                <strong>{k}</strong>
                <span className="ph__rest">{rest}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="container ph__body">
        <header className="ph__head reveal">
          <p className="kicker">Identidad</p>
          <h2 id="identidad-title">{identity.title}</h2>
          <p>{identity.subtitle}</p>
        </header>

        <div className="ph__mv">
          <article className="ph__card ph__card--mision reveal" data-lottie-hover>
            <span className="ph__icon" aria-hidden="true"><LottieIcon name="mision" size={60} fallback={Target} fallbackSize={24} /></span>
            <p className="ph__tag">Misión</p>
            <p className="ph__text">{identity.mission}</p>
          </article>
          <article className="ph__card ph__card--vision reveal" data-lottie-hover>
            <span className="ph__icon ph__icon--dark" aria-hidden="true"><LottieIcon name="vision" size={60} fallback={Telescope} fallbackSize={24} /></span>
            <p className="ph__tag">Visión</p>
            <p className="ph__text">{identity.vision}</p>
            <p className="ph__place"><MapPin size={14} aria-hidden="true" /> Cartagena · Región Caribe · Proyección nacional</p>
          </article>
        </div>

        <h3 className="ph__vt reveal">Nuestros valores</h3>
        <ul className="ph__values reveal">
          {identity.values.map((v, i) => {
            const Icon = valueIcons[v] || ShieldCheck;
            return (
              <li key={v} style={{ '--d': `${i * 80}ms` }}>
                <span className="ph__vicon" aria-hidden="true"><Icon size={30} weight="duotone" /></span>
                <span className="ph__vname">{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
