import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { brand as baseBrand, services as baseServices } from '../data.js'; // datos sin idioma (contacto, ids)
import { useLang } from '../i18n/index.jsx';
import { WA_NUMBER as whatsapp, waLink, waProps, WhatsAppGlyph } from '../whatsapp.jsx';
import './services.css';

// Formulario WhatsApp-first: no hay correo de la firma configurado, así que el envío abre WhatsApp con el
// mensaje ya redactado. Campos: Nombre (oblig.), Empresa (opcional), Servicio (oblig.), Mensaje (opcional).
const OTHER = 'otro';
const EMPTY = { nombre: '', empresa: '', servicio: '', mensaje: '' };
const ORDER = ['nombre', 'servicio'];

const email = baseBrand.contact?.email?.trim();

// t = diccionario del idioma activo (useLang().t).
function serviceLabel(t, id) {
  if (id === OTHER) return t.ui.contact.other;
  return t.services.find((s) => s.id === id)?.title || '';
}

// Lee #contacto?servicio=<id> (enlace directo, p. ej. desde el footer) y devuelve el id si es válido.
function serviceFromHash() {
  const m = window.location.hash.match(/servicio=([\w-]+)/);
  const id = m?.[1];
  return id && (id === OTHER || baseServices.some((s) => s.id === id)) ? id : null;
}

// Devuelve claves de error (no textos) para que los mensajes cambien de idioma al vuelo.
function validate(f) {
  const e = {};
  if (f.nombre.trim().length < 2) e.nombre = 'nombre';
  if (!f.servicio) e.servicio = 'servicio';
  return e;
}

export default function Contact() {
  const { t } = useLang();
  const { brand, services, media } = t;
  const tx = t.ui.contact;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'ok' | 'warn' | 'error', key, n }
  const [hint, setHint] = useState(null); // id del servicio preseleccionado (el texto se arma en el idioma activo)
  const formRef = useRef(null);

  // Preselección desde Servicios (CustomEvent) o desde el hash.
  useEffect(() => {
    const apply = (id) => {
      if (!id) return;
      setForm((f) => ({ ...f, servicio: id }));
      setErrors((er) => ({ ...er, servicio: undefined }));
      setHint(id);
    };
    const onEvt = (e) => apply(e.detail?.id);
    const onHash = () => {
      const id = serviceFromHash();
      if (id) {
        apply(id);
        document.getElementById('contacto')?.scrollIntoView();
      }
    };
    onHash();
    window.addEventListener('ir:servicio', onEvt);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('ir:servicio', onEvt);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  const set = (k) => (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = validate(form);
    setErrors(er);
    const bad = ORDER.filter((k) => er[k]);
    if (bad.length) {
      setStatus({ type: 'error', key: 'review', n: bad.length });
      formRef.current?.querySelector(`[name="${bad[0]}"]`)?.focus();
      return;
    }
    if (!whatsapp) {
      // Sin canal configurado: no se finge el envío.
      setStatus({ type: 'warn', key: 'warn' });
      return;
    }
    const text = t.ui.wa.form({
      nombre: form.nombre.trim(),
      empresa: form.empresa.trim(),
      servicio: serviceLabel(t, form.servicio),
      mensaje: form.mensaje.trim(),
    });
    window.open(waLink(text), '_blank', 'noopener');
    setStatus({ type: 'ok', key: 'okWa' });
  };

  const field = (k) => ({
    id: `ctc-${k}`,
    name: k,
    value: form[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `ctc-${k}-err` : undefined,
  });
  const err = (k) => errors[k] && (
    <span id={`ctc-${k}-err`} className="ctc-err"><AlertCircle size={15} aria-hidden="true" />{tx.errors[errors[k]]}</span>
  );
  const req = <span className="ctc-req" aria-hidden="true">*</span>;

  return (
    <section id="contacto" className="section section--soft ctc" aria-labelledby="ctc-title">
      <div className="container ctc-layout">
        <div className="ctc-intro reveal">
          <p className="kicker">{tx.kicker}</p>
          <h2 id="ctc-title">{tx.title}</h2>
          <p className="ctc-intro__text">{tx.text}</p>
        </div>

        <aside className="ctc-card reveal" aria-label={tx.cardLabel}>
          <img className="ctc-card__img" src={media.contacto.src} srcSet={media.contacto.srcSet} sizes="(min-width: 900px) 460px, 100vw"
            alt={media.contacto.alt} loading="lazy" decoding="async" width="800" height="533" />
          <p className="ctc-card__brand">{brand.name}</p>
          <p className="ctc-card__tag">{brand.tagline}</p>
          <ul className="ctc-card__list">
            <li><MapPin size={18} aria-hidden="true" /><span>{brand.city}</span></li>
            {email && (
              <li><Mail size={18} aria-hidden="true" /><a href={`mailto:${email}`}>{email}</a></li>
            )}
            {whatsapp && (
              <li><WhatsAppGlyph size={18} /><a {...waProps()}>WhatsApp {brand.contact.phone}</a></li>
            )}
          </ul>
          <a {...waProps(t.ui.wa.advisory)} className="btn btn--mint ctc-card__btn" aria-label={t.ui.cta.waLabel}>
            <WhatsAppGlyph size={18} /> {t.ui.cta.wa}
          </a>
        </aside>

        <form ref={formRef} className="ctc-form reveal" onSubmit={submit} noValidate aria-labelledby="ctc-form-title">
          <h3 id="ctc-form-title" className="ctc-form__title">{tx.formTitle}</h3>
          <p className="ctc-form__req">{tx.formIntro} {tx.required}</p>

          <div className="ctc-row">
            <div className="ctc-field">
              <label htmlFor="ctc-nombre">{tx.labels.nombre} {req}</label>
              <input type="text" autoComplete="name" required {...field('nombre')} />
              {err('nombre')}
            </div>
            <div className="ctc-field">
              <label htmlFor="ctc-empresa">{tx.labels.empresa} <span className="ctc-opt">{tx.optional}</span></label>
              <input type="text" autoComplete="organization" {...field('empresa')} />
            </div>
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc-servicio">{tx.labels.servicio} {req}</label>
            <select required {...field('servicio')}>
              <option value="">{tx.choose}</option>
              {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              <option value={OTHER}>{tx.other}</option>
            </select>
            {err('servicio')}
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc-mensaje">{tx.labels.mensaje} <span className="ctc-opt">{tx.optional}</span></label>
            <textarea rows={4} {...field('mensaje')} />
          </div>

          <div className="ctc-submit-row">
            <button type="submit" className="btn btn--wa ctc-submit" aria-describedby="ctc-privacy">
              <WhatsAppGlyph size={18} /> {tx.submit}
            </button>
            {/* PENDIENTE: validar texto legal Ley 1581 de 2012 (tratamiento de datos) con la cliente. */}
            <p id="ctc-privacy" className="ctc-privacy">{tx.privacy}</p>
          </div>

          <p className="sr-only" aria-live="polite">{hint ? tx.selected(serviceLabel(t, hint)) : ''}</p>
          <div className="ctc-status-wrap" aria-live="polite" aria-atomic="true">
            {status && (
              <p className={`ctc-status ctc-status--${status.type}`}>
                {status.type === 'ok' ? <CheckCircle2 size={18} aria-hidden="true" /> : <AlertCircle size={18} aria-hidden="true" />}
                <span>{status.key === 'review' ? tx.review(status.n) : tx[status.key]}</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
