import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useLang } from '../i18n/index.jsx';
import { waProps, WhatsAppGlyph } from '../whatsapp.jsx';
import './founder.css';

// Perfil de la fundadora + "Quiénes somos" de la firma (antes sección aparte "Nuestra firma").
// Todo sale del portafolio: leader (data.js), firm.who y brand.audiences; roles, procesos y formación en ui.founder.
// "25+ años" se menciona una sola vez aquí (en la bio); la cifra destacada vive en el hero.
const BASE = import.meta.env.BASE_URL;

export default function Founder() {
  const { t } = useLang();
  const { leader, brand, firm } = t;
  const tx = t.ui.founder;
  const [photoOk, setPhotoOk] = useState(Boolean(leader.photo));
  const first = leader.name.split(' ')[0];
  return (
    <section id="liderazgo" className="fd" aria-labelledby="fd-title">
      <div className="container fd__grid">
        <div className="fd__visual reveal">
          <div className="fd__frame">
            {photoOk ? (
              <picture>
                <source srcSet={`${BASE}img/isabel.webp`} type="image/webp" />
                <img src={leader.photo} alt={`${leader.name}, ${leader.role}`} width="800" height="1000" loading="lazy" decoding="async" onError={() => setPhotoOk(false)} />
              </picture>
            ) : (
              <div className="fd__ph" aria-hidden="true">IR</div>
            )}
          </div>
        </div>

        <div className="fd__body">
          <header className="reveal">
            <p className="kicker">{tx.kicker}</p>
            <h2 id="fd-title">{tx.hello} <span>{first} Rodríguez</span></h2>
          </header>
          <ul className="fd__creds reveal" aria-label={tx.credsLabel}>
            {tx.creds.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <p className="fd__bio reveal">{tx.bio}</p>

          <blockquote className="fd__quote reveal">
            <p>{leader.quote}</p>
          </blockquote>

          <div className="fd__block fd__who reveal">
            <h3>{tx.whoTitle}</h3>
            <p>{firm.who}</p>
            <ul className="fd__aud" aria-label={tx.audLabel}>
              {brand.audiences.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>

          <div className="fd__block reveal">
            <h3>{tx.rolesTitle}</h3>
            <ul className="fd__roles">{tx.roles.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>

          <div className="fd__block reveal">
            <h3>{tx.ledTitle}</h3>
            <ul className="fd__led">{tx.led.map((r) => <li key={r}><Check size={16} aria-hidden="true" />{r}</li>)}</ul>
          </div>

          <div className="fd__ctas reveal">
            <a {...waProps(t.ui.wa.hello)} className="btn btn--primary" aria-label={t.ui.cta.waLabel}>
              <WhatsAppGlyph size={18} /> {t.ui.cta.wa}
            </a>
            <a className="btn btn--outline" href="#contacto">{t.ui.cta.diagnosis} <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
