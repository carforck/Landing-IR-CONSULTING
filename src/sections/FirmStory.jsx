import { Briefcase, LineChart, Workflow, Search, Route, Handshake, Gauge, MapPin } from 'lucide-react';
import { useLang } from '../i18n/index.jsx';
import { CountUp } from '../fx.jsx';
import './firmstory.css';

// Todo sale del portafolio (data.js): la propuesta de valor se descompone en sus tres pilares
// ("experiencia directiva, análisis financiero y conocimiento de procesos") y en su ruta
// ("no nos limitamos a diagnosticar: diseñamos rutas de acción, acompañamos su implementación y medimos avances").
// Textos en ui.firm (i18n/ui.js); aquí solo los iconos, en el mismo orden.
const pillarIcons = [Briefcase, LineChart, Workflow];
const routeIcons = [Search, Route, Handshake, Gauge];

export default function FirmStory() {
  const { lang, t } = useLang();
  const { firm, leader, brand, media } = t;
  const tx = t.ui.firm;
  const years = leader.stats[0];
  return (
    <section id="firma" className="fs" aria-labelledby="firma-title">
      <div className="container fs__grid">
        <div className="fs__media reveal">
          <img src={media.firma.src} alt={media.firma.alt} loading="lazy" decoding="async" width="1600" height="900" />
          <div className="fs__badge">
            <strong><CountUp key={lang} value={years.value} /></strong>
            <span>{years.label}<br />{tx.badge}</span>
          </div>
          <p className="fs__place"><MapPin size={14} aria-hidden="true" /> {tx.place} · {brand.city}</p>
        </div>

        <div className="fs__body">
          <header className="reveal">
            <p className="kicker">{tx.kicker}</p>
            <h2 id="firma-title">{firm.title}</h2>
            <p className="fs__lead">{firm.subtitle}</p>
          </header>
          <p className="fs__who reveal">{firm.who}</p>
          <ul className="fs__aud reveal" aria-label={tx.audLabel}>
            {brand.audiences.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </div>

      <div className="container">
        <h3 className="fs__h3 reveal">{tx.valueTitle}</h3>
        <ul className="fs__pillars reveal">
          {tx.pillars.map(({ title, text }, i) => {
            const Icon = pillarIcons[i];
            return (
            <li key={i}>
              <span className="fs__icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
              <h4>{title}</h4>
              <p>{text}</p>
            </li>
            );
          })}
        </ul>

        <p className="fs__route-lead reveal">{tx.routeLead}</p>
        <ol className="fs__route reveal">
          {tx.route.map((label, i) => {
            const Icon = routeIcons[i];
            return (
            <li key={i} style={{ '--d': `${i * 120}ms` }}>
              <span className="fs__step" aria-hidden="true"><Icon size={18} /></span>
              <span>{label}</span>
            </li>
            );
          })}
        </ol>
      </div>

    </section>
  );
}
