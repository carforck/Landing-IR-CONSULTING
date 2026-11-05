import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import { useLang } from '../i18n/index.jsx';
import { Logo } from './Header.jsx';
import './chrome.css';

export default function Footer() {
  const { t } = useLang();
  const { brand, nav, services } = t;
  const tx = t.ui.footer;
  const wa = brand.contact.whatsapp
    ? `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(t.ui.wa.advisory)}`
    : '#contacto';
  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr__cta reveal">
          <div>
            <h2 className="ftr__shine">{tx.title}</h2>
            <p>{tx.text}</p>
          </div>
          <a className="btn btn--mint" href={wa} target={brand.contact.whatsapp ? '_blank' : undefined} rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" /> {tx.wa}
          </a>
        </div>

        <div className="ftr__grid reveal">
          <div className="ftr__brand">
            <a href="#main" aria-label={tx.home}><Logo tagline /></a>
            <p>{brand.summary}</p>
          </div>
          <div>
            <h3>{tx.services}</h3>
            <ul>{services.map((s) => <li key={s.id}><a href="#servicios">{s.title}</a></li>)}</ul>
          </div>
          <div>
            <h3>{tx.firm}</h3>
            <ul>{nav.map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}</ul>
          </div>
          <div>
            <h3>{tx.contact}</h3>
            <ul>
              {brand.contact.phone && (
                <li><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" />{brand.contact.phone}</a></li>
              )}
              <li><span><MapPin size={16} aria-hidden="true" />{brand.city}</span></li>
            </ul>
          </div>
        </div>

        <div className="ftr__bottom">
          <p>© {new Date().getFullYear()} IR Consulting · {brand.owner}. {tx.rights}</p>
          <p className="ftr__credit">
            {tx.madeBy}{' '}
            <a href="https://vanttagetech.com/" target="_blank" rel="noopener noreferrer">
              Vanttage <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
