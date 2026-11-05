import { useState } from 'react';
import { ArrowRight, Check, GraduationCap, MessageCircle } from 'lucide-react';
import { useLang } from '../i18n/index.jsx';
import { CountUp } from '../fx.jsx';
import './founder.css';

// Perfil de la fundadora. Todo sale de leader.bio / leader.career / leader.stats / leader.quote (portafolio);
// roles, procesos liderados y formación están en ui.founder (i18n/ui.js).

export default function Founder() {
  const { lang, t } = useLang();
  const { leader, brand } = t;
  const tx = t.ui.founder;
  const [photoOk, setPhotoOk] = useState(Boolean(leader.photo));
  const first = leader.name.split(' ')[0];
  const wa = brand.contact.whatsapp
    ? `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(t.ui.wa.meeting)}`
    : '#contacto';
  return (
    <section id="liderazgo" className="fd" aria-labelledby="fd-title">
      <div className="container fd__grid">
        <div className="fd__visual reveal">
          <div className="fd__frame">
            {photoOk ? (
              <img src={leader.photo} alt={`${leader.name}, ${leader.role}`} width="1000" height="1250" loading="lazy" decoding="async" onError={() => setPhotoOk(false)} />
            ) : (
              <div className="fd__ph" aria-hidden="true">IR</div>
            )}
          </div>
          <div className="fd__float fd__float--years">
            <strong><CountUp key={lang} value={leader.stats[0].value} /></strong>
            <span>{leader.stats[0].label}</span>
          </div>
          <div className="fd__float fd__float--mba">
            <GraduationCap size={20} aria-hidden="true" />
            <span><b>MBA</b> Universidad Tecnológica de Bolívar</span>
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
          <p className="fd__bio reveal">
            {tx.bio}
          </p>

          <div className="fd__block reveal">
            <h3>{tx.rolesTitle}</h3>
            <ul className="fd__roles">{tx.roles.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>

          <div className="fd__block reveal">
            <h3>{tx.ledTitle}</h3>
            <ul className="fd__led">{tx.led.map((r) => <li key={r}><Check size={16} aria-hidden="true" />{r}</li>)}</ul>
          </div>

          <blockquote className="fd__quote reveal">
            <p>{leader.quote}</p>
          </blockquote>

          <div className="fd__ctas reveal">
            <a className="btn btn--primary" href={wa} target={brand.contact.whatsapp ? '_blank' : undefined} rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> {tx.book(first)}
            </a>
            <a className="btn btn--outline" href="#servicios">{tx.services} <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
