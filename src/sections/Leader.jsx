import { CountUp } from '../fx.jsx';
import { useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { leader } from '../data.js';
import './about.css';

// Nombre corto para el saludo: primer nombre + primer apellido (de leader.name).
const parts = leader.name.split(' ');
const shortName = `${parts[0]} ${parts[2] ?? parts[1] ?? ''}`.trim();

// Credenciales tal como aparecen en leader.bio.
const credentials = [
  'Contadora Pública',
  'Especialista en Finanzas',
  'MBA · Universidad Tecnológica de Bolívar',
];

function Portrait() {
  const [failed, setFailed] = useState(!leader.photo);
  return (
    <div className="lead-portrait">
      <div className="lead-portrait__frame">
        {/* Placeholder siempre debajo: se ve mientras carga o si no hay foto */}
        <div className="lead-portrait__ph" aria-hidden="true">
          <span className="lead-portrait__mono">IR</span>
        </div>
        {!failed && (
          <img
            className="lead-portrait__img"
            src={leader.photo}
            alt={`Retrato de ${leader.name}`}
            width="560"
            height="700"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <p className="lead-portrait__tag">
        <span className="lead-portrait__dot" aria-hidden="true" />
        {leader.role}
      </p>
    </div>
  );
}

export default function Leader() {
  return (
    <section id="liderazgo" className="section section--soft lead" aria-labelledby="liderazgo-title">
      <div className="container">
        <div className="lead-hello">
          <div className="reveal">
            <Portrait />
          </div>

          <div className="lead-hello__body reveal">
            <p className="kicker">Liderazgo</p>
            <h2 id="liderazgo-title" className="lead-hello__title">
              Hola, soy <span>{shortName}</span>
            </h2>
            <p className="lead-hello__role">{leader.role} de IR Consulting</p>

            <ul className="lead-creds" aria-label="Formación académica">
              {credentials.map((c) => <li key={c}>{c}</li>)}
            </ul>

            <div className="lead-hello__bio">
              <p>
                Soy Contadora Pública, Especialista en Finanzas y Magíster en Administración y Gerencia (MBA)
                de la Universidad Tecnológica de Bolívar, y llevo más de 25 años de trayectoria profesional.
              </p>
              <p>
                Mi experiencia abarca la gerencia general, la gerencia administrativa y financiera, la dirección
                financiera, la contraloría, la tesorería, la planeación estratégica y la asesoría gerencial. He
                liderado equipos y procesos de reorganización, control presupuestal, costeo, sistemas de gestión
                y estructuración financiera.
              </p>
            </div>

            <dl className="lead-metrics">
              {leader.stats.map((s) => (
                <div key={s.label} className="lead-metric">
                  <dt>{s.label}</dt>
                  <dd><CountUp value={s.value} /></dd>
                </div>
              ))}
            </dl>

            <figure className="lead-hello__quote">
              <Quote className="lead-hello__qmark" size={26} strokeWidth={1.5} aria-hidden="true" />
              <blockquote><p>{leader.quote}</p></blockquote>
              <figcaption>{leader.name}</figcaption>
            </figure>

            <a className="btn btn--primary lead-hello__cta" href="#contacto">
              Conversemos
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
