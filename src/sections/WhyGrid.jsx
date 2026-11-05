import { Briefcase, Compass, Handshake, UsersThree, ChartLineUp } from '@phosphor-icons/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { why, leader, brand } from '../data.js';
import { CountUp } from '../fx.jsx';
import './why.css';

// Los textos son los 5 diferenciales del portafolio (data.js `why`); el título corto resume cada uno
// con palabras del propio portafolio ("Red de especialistas", "Visión integral", etc.).
const meta = [
  { icon: Briefcase, title: 'Experiencia directiva' },
  { icon: Compass, title: 'Visión integral' },
  { icon: Handshake, title: 'Soluciones a la medida' },
  { icon: UsersThree, title: 'Red de especialistas' },
  { icon: ChartLineUp, title: 'Resultados con confidencialidad' },
];

export default function WhyGrid() {
  const years = leader.stats[0];
  return (
    <section id="diferenciales" className="why" aria-labelledby="por-que-title">
      <div className="container">
        <header className="why__head reveal">
          <div>
            <p className="kicker">Diferenciales</p>
            <h2 id="por-que-title">¿Por qué elegirnos?</h2>
          </div>
          <p className="why__intro">{leader.quote}</p>
        </header>

        <ul className="why__grid reveal">
          {why.map((text, i) => {
            const { icon: Icon, title } = meta[i] || meta[0];
            const featured = i === 0;
            return (
              <li key={text} className={`why__card${featured ? ' why__card--feat' : ''}`} style={{ '--d': `${i * 90}ms` }}>
                <span className="why__icon" aria-hidden="true"><Icon size={featured ? 34 : 28} weight="duotone" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                {featured && (
                  <div className="why__feat-foot">
                    <span className="why__num"><CountUp value={years.value} /></span>
                    <span className="why__num-l">{years.label}</span>
                    <a className="btn btn--mint why__cta" href="#contacto">Conversemos <ArrowRight size={18} aria-hidden="true" /></a>
                  </div>
                )}
              </li>
            );
          })}
          <li className="why__card why__card--cta" style={{ '--d': `${why.length * 90}ms` }}>
            <p className="why__cta-k">Primer paso</p>
            <h3>Diagnóstico estratégico, financiero y organizacional</h3>
            <a className="why__cta-link" href={brand.contact.whatsapp ? `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent('Hola Isabel, quiero solicitar un diagnóstico para mi empresa')}` : '#contacto'}
              target={brand.contact.whatsapp ? '_blank' : undefined} rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> Solicitarlo por WhatsApp <ArrowRight size={16} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
