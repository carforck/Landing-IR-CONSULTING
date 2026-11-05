import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, MessageCircle, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { brand as baseBrand, services as baseServices } from '../data.js'; // datos sin idioma (contacto, ids)
import { useLang } from '../i18n/index.jsx';
import './services.css';

const OTHER = 'otro';
const EMPTY = { nombre: '', empresa: '', correo: '', telefono: '', servicio: '', mensaje: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const email = baseBrand.contact?.email?.trim();
const whatsapp = baseBrand.contact?.whatsapp?.replace(/\D/g, '');

// t = diccionario del idioma activo (useLang().t).
function serviceLabel(t, id) {
  if (id === OTHER) return t.ui.contact.other;
  return t.services.find((s) => s.id === id)?.title || '';
}

// Lee #contacto?servicio=<id> (enlace directo) y devuelve el id si es válido.
function serviceFromHash() {
  const m = window.location.hash.match(/servicio=([\w-]+)/);
  const id = m?.[1];
  return id && (id === OTHER || baseServices.some((s) => s.id === id)) ? id : null;
}

// Devuelve claves de error (no textos) para que los mensajes cambien de idioma al vuelo.
function validate(f) {
  const e = {};
  if (f.nombre.trim().length < 2) e.nombre = 'nombre';
  if (f.empresa.trim().length < 2) e.empresa = 'empresa';
  if (!f.correo.trim()) e.correo = 'correoEmpty';
  else if (!EMAIL_RE.test(f.correo.trim())) e.correo = 'correoBad';
  if (f.telefono.trim() && f.telefono.replace(/\D/g, '').length < 7) e.telefono = 'telefono';
  if (!f.servicio) e.servicio = 'servicio';
  if (f.mensaje.trim().length < 10) e.mensaje = 'mensaje';
  return e;
}

function buildBody(t, f) {
  const L = t.ui.contact.labels;
  return [
    `${L.nombre}: ${f.nombre.trim()}`,
    `${L.empresa}: ${f.empresa.trim()}`,
    `${L.correo}: ${f.correo.trim()}`,
    f.telefono.trim() ? `${L.telefono}: ${f.telefono.trim()}` : null,
    `${L.servicio}: ${serviceLabel(t, f.servicio)}`,
    '',
    f.mensaje.trim(),
  ].filter((l) => l !== null).join('\n');
}

const ORDER = ['nombre', 'empresa', 'correo', 'telefono', 'servicio', 'mensaje'];

export default function Contact() {
  const { t } = useLang();
  const { brand, services, media } = t;
  const tx = t.ui.contact;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'ok' | 'warn' | 'error', text }
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
    const subject = tx.subject(serviceLabel(t, form.servicio), form.empresa.trim());
    const body = buildBody(t, form);
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ type: 'ok', key: 'okMail' });
    } else if (whatsapp) {
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, '_blank', 'noopener');
      setStatus({ type: 'ok', key: 'okWa' });
    } else {
      // Sin canal configurado: no se finge el envío.
      setStatus({ type: 'warn', key: 'warn' });
    }
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

  return (
    <section id="contacto" className="section section--soft ctc">
      <div className="container ctc-layout">
        <div className="ctc-intro reveal">
          <p className="kicker">{tx.kicker}</p>
          <h2>{tx.title}</h2>
          <p className="ctc-intro__text">
            {tx.text}
          </p>

          <aside className="ctc-card" aria-label={tx.cardLabel}>
            <img className="ctc-card__img" src={media.contacto.src} alt={media.contacto.alt} loading="lazy" decoding="async" width="800" height="533" />
            <p className="ctc-card__brand">{brand.name}</p>
            <p className="ctc-card__tag">{brand.tagline}</p>
            <ul className="ctc-card__list">
              <li><MapPin size={18} aria-hidden="true" /><span>{brand.city}</span></li>
              {email && (
                <li><Mail size={18} aria-hidden="true" /><a href={`mailto:${email}`}>{email}</a></li>
              )}
              {whatsapp && (
                <li><MessageCircle size={18} aria-hidden="true" /><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {brand.contact.phone}</a></li>
              )}
            </ul>
            <a className="btn btn--mint ctc-card__btn" href={`https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(t.ui.wa.advisory)}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> {tx.waBtn}
            </a>
          </aside>
        </div>

        <form ref={formRef} className="ctc-form reveal" onSubmit={submit} noValidate aria-labelledby="ctc-form-title">
          <h3 id="ctc-form-title" className="ctc-form__title">{tx.formTitle}</h3>
          <p className="ctc-form__req">{tx.required}</p>

          <div className="ctc-row">
            <div className="ctc-field">
              <label htmlFor="ctc-nombre">{tx.labels.nombre}</label>
              <input type="text" autoComplete="name" required {...field('nombre')} />
              {err('nombre')}
            </div>
            <div className="ctc-field">
              <label htmlFor="ctc-empresa">{tx.labels.empresa}</label>
              <input type="text" autoComplete="organization" required {...field('empresa')} />
              {err('empresa')}
            </div>
          </div>

          <div className="ctc-row">
            <div className="ctc-field">
              <label htmlFor="ctc-correo">{tx.labels.correo}</label>
              <input type="email" autoComplete="email" inputMode="email" required {...field('correo')} />
              {err('correo')}
            </div>
            <div className="ctc-field">
              <label htmlFor="ctc-telefono">{tx.labels.telefono} <span className="ctc-opt">{tx.optional}</span></label>
              <input type="tel" autoComplete="tel" inputMode="tel" {...field('telefono')} />
              {err('telefono')}
            </div>
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc-servicio">{tx.labels.servicio}</label>
            <select required {...field('servicio')}>
              <option value="">{tx.choose}</option>
              {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              <option value={OTHER}>{tx.other}</option>
            </select>
            {err('servicio')}
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc-mensaje">{tx.labels.mensaje}</label>
            <textarea rows={5} required {...field('mensaje')} />
            {err('mensaje')}
          </div>

          <button type="submit" className="btn btn--primary ctc-submit">
            {tx.submit} <Send size={18} aria-hidden="true" />
          </button>

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
