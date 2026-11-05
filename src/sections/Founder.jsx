import { useState } from 'react';
import { ArrowRight, Check, GraduationCap, MessageCircle } from 'lucide-react';
import { leader, brand } from '../data.js';
import { CountUp } from '../fx.jsx';
import './founder.css';

// Perfil de la fundadora. Todo sale de leader.bio / leader.career / leader.stats / leader.quote (portafolio).
const roles = ['Gerencia general', 'Gerencia administrativa y financiera', 'Dirección financiera', 'Contraloría', 'Tesorería', 'Planeación estratégica', 'Asesoría gerencial'];
const led = ['Reorganización', 'Control presupuestal', 'Costeo', 'Sistemas de gestión', 'Estructuración financiera'];
const creds = ['Contadora Pública', 'Especialista en Finanzas', 'MBA · Universidad Tecnológica de Bolívar'];

export default function Founder() {
  const [photoOk, setPhotoOk] = useState(Boolean(leader.photo));
  const first = leader.name.split(' ')[0];
  const wa = brand.contact.whatsapp
    ? `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent('Hola Isabel, me gustaría agendar una conversación sobre mi empresa')}`
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
            <strong><CountUp value={leader.stats[0].value} /></strong>
            <span>{leader.stats[0].label}</span>
          </div>
          <div className="fd__float fd__float--mba">
            <GraduationCap size={20} aria-hidden="true" />
            <span><b>MBA</b> Universidad Tecnológica de Bolívar</span>
          </div>
        </div>

        <div className="fd__body">
          <header className="reveal">
            <p className="kicker">Fundadora y consultora líder</p>
            <h2 id="fd-title">Hola, soy <span>{first} Rodríguez</span></h2>
          </header>
          <ul className="fd__creds reveal" aria-label="Formación">
            {creds.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <p className="fd__bio reveal">
            Llevo más de 25 años acompañando empresas desde la dirección: conecto las finanzas con la operación,
            las personas y la estrategia para que cada decisión tenga respaldo.
          </p>

          <div className="fd__block reveal">
            <h3>Trayectoria ejecutiva</h3>
            <ul className="fd__roles">{roles.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>

          <div className="fd__block reveal">
            <h3>He liderado procesos de</h3>
            <ul className="fd__led">{led.map((r) => <li key={r}><Check size={16} aria-hidden="true" />{r}</li>)}</ul>
          </div>

          <blockquote className="fd__quote reveal">
            <p>{leader.quote}</p>
          </blockquote>

          <div className="fd__ctas reveal">
            <a className="btn btn--primary" href={wa} target={brand.contact.whatsapp ? '_blank' : undefined} rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> Agendar con {first}
            </a>
            <a className="btn btn--outline" href="#servicios">Ver servicios <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
