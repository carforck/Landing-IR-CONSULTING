import { ArrowUpRight } from 'lucide-react';
import { brand, nav } from '../data.js';
import { Logo } from './Header.jsx';
import './chrome.css';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr__top reveal">
          <div className="ftr__brand">
            <a href="#main" className="ftr__logo" aria-label="IR Consulting, volver al inicio">
              <Logo />
            </a>
            <p className="ftr__tagline">{brand.tagline}</p>
            <p className="ftr__city">{brand.city}</p>
          </div>

          <nav className="ftr__nav" aria-label="Pie de página">
            <ul>
              {nav.map((item) => (
                <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="ftr__bottom">
          <p>© 2026 IR Consulting · {brand.owner}</p>
          {brand.contact.phone && (
            <p><a href={`https://wa.me/${brand.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {brand.contact.phone}</a></p>
          )}
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
