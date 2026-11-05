import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import { brand, nav, services } from '../data.js';
import { Logo } from './Header.jsx';
import './chrome.css';

const wa = brand.contact.whatsapp
  ? `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent('Hola Isabel, me interesa una asesoría de IR Consulting')}`
  : '#contacto';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr__cta reveal">
          <div>
            <h2 className="ftr__shine">¿Conversamos sobre su empresa?</h2>
            <p>Cuéntenos el reto y le proponemos un alcance a la medida.</p>
          </div>
          <a className="btn btn--mint" href={wa} target={brand.contact.whatsapp ? '_blank' : undefined} rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" /> Escribir por WhatsApp
          </a>
        </div>

        <div className="ftr__grid reveal">
          <div className="ftr__brand">
            <a href="#main" aria-label="IR Consulting, volver al inicio"><Logo tagline /></a>
            <p>{brand.summary}</p>
          </div>
          <div>
            <h3>Servicios</h3>
            <ul>{services.map((s) => <li key={s.id}><a href="#servicios">{s.title}</a></li>)}</ul>
          </div>
          <div>
            <h3>La firma</h3>
            <ul>{nav.map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}</ul>
          </div>
          <div>
            <h3>Contacto</h3>
            <ul>
              {brand.contact.phone && (
                <li><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" />{brand.contact.phone}</a></li>
              )}
              <li><span><MapPin size={16} aria-hidden="true" />{brand.city}</span></li>
            </ul>
          </div>
        </div>

        <div className="ftr__bottom">
          <p>© {new Date().getFullYear()} IR Consulting · {brand.owner}. Todos los derechos reservados.</p>
          <p className="ftr__credit">
            Hecho por{' '}
            <a href="https://vanttagetech.com/" target="_blank" rel="noopener noreferrer">
              Vanttage <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
