import { Briefcase, LineChart, Workflow, Search, Route, Handshake, Gauge, MapPin } from 'lucide-react';
import { firm, leader, brand } from '../data.js';
import { media } from '../media.js';
import { CountUp } from '../fx.jsx';
import './firmstory.css';

// Todo sale del portafolio (data.js): la propuesta de valor se descompone en sus tres pilares
// ("experiencia directiva, análisis financiero y conocimiento de procesos") y en su ruta
// ("no nos limitamos a diagnosticar: diseñamos rutas de acción, acompañamos su implementación y medimos avances").
const pillars = [
  { icon: Briefcase, title: 'Experiencia directiva', text: 'Gerencia general, administrativa y financiera aplicada a retos reales.' },
  { icon: LineChart, title: 'Análisis financiero', text: 'Información financiera convertida en decisiones inteligentes.' },
  { icon: Workflow, title: 'Conocimiento de procesos', text: 'Procesos sólidos para reducir riesgos y mejorar resultados.' },
];
const route = [
  { icon: Search, label: 'Diagnosticamos' },
  { icon: Route, label: 'Diseñamos rutas de acción' },
  { icon: Handshake, label: 'Acompañamos la implementación' },
  { icon: Gauge, label: 'Medimos avances' },
];

export default function FirmStory() {
  const years = leader.stats[0];
  return (
    <section id="firma" className="fs" aria-labelledby="firma-title">
      <div className="container fs__grid">
        <div className="fs__media reveal">
          <img src={media.firma.src} alt={media.firma.alt} loading="lazy" decoding="async" width="1600" height="900" />
          <div className="fs__badge">
            <strong><CountUp value={years.value} /></strong>
            <span>{years.label}<br />de experiencia directiva</span>
          </div>
          <p className="fs__place"><MapPin size={14} aria-hidden="true" /> Firma boutique · {brand.city}</p>
        </div>

        <div className="fs__body">
          <header className="reveal">
            <p className="kicker">Nuestra firma</p>
            <h2 id="firma-title">{firm.title}</h2>
            <p className="fs__lead">{firm.subtitle}</p>
          </header>
          <p className="fs__who reveal">{firm.who}</p>
          <ul className="fs__aud reveal" aria-label="A quién acompañamos">
            {brand.audiences.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </div>

      <div className="container">
        <h3 className="fs__h3 reveal">Nuestra propuesta de valor</h3>
        <ul className="fs__pillars reveal">
          {pillars.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className="fs__icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
              <h4>{title}</h4>
              <p>{text}</p>
            </li>
          ))}
        </ul>

        <p className="fs__route-lead reveal">No nos limitamos a diagnosticar:</p>
        <ol className="fs__route reveal">
          {route.map(({ icon: Icon, label }, i) => (
            <li key={label} style={{ '--d': `${i * 120}ms` }}>
              <span className="fs__step" aria-hidden="true"><Icon size={18} /></span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
      </div>

    </section>
  );
}
