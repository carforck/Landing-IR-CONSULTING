import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLang } from '../i18n/index.jsx';
import './cta.css';

// Banda comercial: textos tomados del portafolio (primer frente de servicio + promesa de metodología).
export default function CtaBand() {
  const { t } = useLang();
  const { brand, method } = t;
  const tx = t.ui.cta;
  const wa = brand.contact.whatsapp
    ? `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(t.ui.wa.diagnosis)}`
    : null;
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container cta__inner reveal">
        <div>
          <p className="kicker">{tx.kicker}</p>
          <h2 id="cta-title">{tx.title}</h2>
          <p className="cta__text">{method.subtitle}</p>
        </div>
        <div className="cta__actions">
          <a className="btn btn--mint" href="#contacto">{tx.primary} <ArrowRight size={18} aria-hidden="true" /></a>
          {wa && (
            <a className="btn btn--ghost" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
