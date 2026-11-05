import { Briefcase, Compass, Handshake, UsersThree, ChartLineUp } from '@phosphor-icons/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLang } from '../i18n/index.jsx';
import { CountUp } from '../fx.jsx';
import './why.css';

// Los textos son los 5 diferenciales del portafolio (data.js `why`); el título corto de cada uno
// (ui.why.cards) usa palabras del propio portafolio ("Red de especialistas", "Visión integral", etc.).
const meta = [Briefcase, Compass, Handshake, UsersThree, ChartLineUp];

export default function WhyGrid() {
  const { lang, t } = useLang();
  const { why, leader, brand } = t;
  const tx = t.ui.why;
  const years = leader.stats[0];
  return (
    <section id="diferenciales" className="why" aria-labelledby="por-que-title">
      <div className="container">
        <header className="why__head reveal">
          <div>
            <p className="kicker">{tx.kicker}</p>
            <h2 id="por-que-title">{tx.title}</h2>
          </div>
          <p className="why__intro">{leader.quote}</p>
        </header>

        <ul className="why__grid reveal">
          {why.map((text, i) => {
            const Icon = meta[i] || meta[0];
            const title = tx.cards[i];
            const featured = i === 0;
            return (
              <li key={i} className={`why__card${featured ? ' why__card--feat' : ''}`} style={{ '--d': `${i * 90}ms` }}>
                <span className="why__icon" aria-hidden="true"><Icon size={featured ? 34 : 28} weight="duotone" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                {featured && (
                  <div className="why__feat-foot">
                    <span className="why__num"><CountUp key={lang} value={years.value} /></span>
                    <span className="why__num-l">{years.label}</span>
                    <a className="btn btn--mint why__cta" href="#contacto">{tx.talk} <ArrowRight size={18} aria-hidden="true" /></a>
                  </div>
                )}
              </li>
            );
          })}
          <li className="why__card why__card--cta" style={{ '--d': `${why.length * 90}ms` }}>
            <p className="why__cta-k">{tx.ctaKicker}</p>
            <h3>{tx.ctaTitle}</h3>
            <a className="why__cta-link" href={brand.contact.whatsapp ? `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(t.ui.wa.diagnosis)}` : '#contacto'}
              target={brand.contact.whatsapp ? '_blank' : undefined} rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> {tx.ctaLink} <ArrowRight size={16} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
