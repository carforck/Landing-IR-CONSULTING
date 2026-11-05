import { Briefcase, Compass, Handshake, UsersThree, ChartLineUp } from '@phosphor-icons/react';
import { useLang } from '../i18n/index.jsx';
import './why.css';

// Los 5 diferenciales del portafolio (data.js `why`) en una fila compacta; el título corto de cada uno
// (ui.why.cards) usa palabras del propio portafolio ("Red de especialistas", "Visión integral", etc.).
const icons = [Briefcase, Compass, Handshake, UsersThree, ChartLineUp];

export default function WhyGrid() {
  const { t } = useLang();
  const { why } = t;
  const tx = t.ui.why;
  return (
    <section id="diferenciales" className="section section--soft why" aria-labelledby="por-que-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="kicker">{tx.kicker}</p>
          <h2 id="por-que-title">{tx.title}</h2>
        </header>
        <ul className="why__grid reveal">
          {why.map((text, i) => {
            const Icon = icons[i] || icons[0];
            return (
              <li key={i} className="why__card" style={{ '--d': `${i * 80}ms` }}>
                <span className="why__icon" aria-hidden="true"><Icon size={26} weight="duotone" /></span>
                <h3>{tx.cards[i]}</h3>
                <p>{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
