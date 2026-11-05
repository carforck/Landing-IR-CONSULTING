import { ArrowRight, MessageCircle } from 'lucide-react';
import { brand, method } from '../data.js';
import './cta.css';

// Banda comercial: textos tomados del portafolio (primer frente de servicio + promesa de metodología).
const wa = brand.contact.whatsapp
  ? `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent('Hola Isabel, quiero solicitar un diagnóstico para mi empresa')}`
  : null;

export default function CtaBand() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container cta__inner reveal">
        <div>
          <p className="kicker">Primer paso</p>
          <h2 id="cta-title">Diagnóstico estratégico, financiero y organizacional</h2>
          <p className="cta__text">{method.subtitle}</p>
        </div>
        <div className="cta__actions">
          <a className="btn btn--mint" href="#contacto">Solicitar diagnóstico <ArrowRight size={18} aria-hidden="true" /></a>
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
