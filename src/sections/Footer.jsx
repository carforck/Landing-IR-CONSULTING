import { ArrowUpRight, MapPin } from 'lucide-react';
import { useLang } from '../i18n/index.jsx';
import { waProps, WhatsAppGlyph } from '../whatsapp.jsx';
import { Logo } from './Header.jsx';
import './chrome.css';

// Pie sin franja CTA propia (la sección Contacto, justo encima, ya cierra con "Conversemos…").
// Los servicios llevan al formulario con el servicio preseleccionado (#contacto?servicio=<id>, ver Contact.jsx).
// La columna "La firma" solo enlaza lo que no está en las otras columnas.
export default function Footer() {
  const { t } = useLang();
  const { brand, nav, services } = t;
  const tx = t.ui.footer;
  const firmLinks = nav.filter((n) => n.id !== 'servicios' && n.id !== 'contacto');
  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr__grid reveal">
          <div className="ftr__brand">
            <a href="#main" className="ftr__home" aria-label={tx.home}><Logo tagline /></a>
            <p>{brand.summary}</p>
          </div>
          <div>
            <h3>{tx.services}</h3>
            <ul>{services.map((s) => <li key={s.id}><a href={`#contacto?servicio=${s.id}`}>{s.title}</a></li>)}</ul>
          </div>
          <div>
            <h3>{tx.firm}</h3>
            <ul>{firmLinks.map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}</ul>
          </div>
          <div>
            <h3>{tx.contact}</h3>
            <ul>
              {brand.contact.phone && (
                <li><a {...waProps(t.ui.wa.advisory)} aria-label={`${t.ui.cta.waLabel}: ${brand.contact.phone}`}><WhatsAppGlyph size={16} />{brand.contact.phone}</a></li>
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
