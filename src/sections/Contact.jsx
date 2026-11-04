import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, MessageCircle, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { brand, services } from '../data.js';
import { media } from '../media.js';
import './services.css';

const OTHER = 'otro';
const EMPTY = { nombre: '', empresa: '', correo: '', telefono: '', servicio: '', mensaje: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const email = brand.contact?.email?.trim();
const whatsapp = brand.contact?.whatsapp?.replace(/\D/g, '');

function serviceLabel(id) {
  if (id === OTHER) return 'Otro';
  return services.find((s) => s.id === id)?.title || '';
}

// Lee #contacto?servicio=<id> (enlace directo) y devuelve el id si es válido.
function serviceFromHash() {
  const m = window.location.hash.match(/servicio=([\w-]+)/);
  const id = m?.[1];
  return id && (id === OTHER || services.some((s) => s.id === id)) ? id : null;
}

function validate(f) {
  const e = {};
  if (f.nombre.trim().length < 2) e.nombre = 'Escriba su nombre.';
  if (f.empresa.trim().length < 2) e.empresa = 'Indique el nombre de su empresa.';
  if (!f.correo.trim()) e.correo = 'Escriba su correo electrónico.';
  else if (!EMAIL_RE.test(f.correo.trim())) e.correo = 'El correo no parece válido (ejemplo: nombre@empresa.com).';
  if (f.telefono.trim() && f.telefono.replace(/\D/g, '').length < 7) e.telefono = 'El teléfono debe tener al menos 7 dígitos.';
  if (!f.servicio) e.servicio = 'Seleccione el servicio de interés.';
  if (f.mensaje.trim().length < 10) e.mensaje = 'Cuéntenos brevemente su necesidad (mínimo 10 caracteres).';
  return e;
}

function buildBody(f) {
  return [
    `Nombre: ${f.nombre.trim()}`,
    `Empresa: ${f.empresa.trim()}`,
    `Correo: ${f.correo.trim()}`,
    f.telefono.trim() ? `Teléfono: ${f.telefono.trim()}` : null,
    `Servicio de interés: ${serviceLabel(f.servicio)}`,
    '',
    f.mensaje.trim(),
  ].filter((l) => l !== null).join('\n');
}

const ORDER = ['nombre', 'empresa', 'correo', 'telefono', 'servicio', 'mensaje'];

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'ok' | 'warn' | 'error', text }
  const [hint, setHint] = useState('');
  const formRef = useRef(null);

  // Preselección desde Servicios (CustomEvent) o desde el hash.
  useEffect(() => {
    const apply = (id) => {
      if (!id) return;
      setForm((f) => ({ ...f, servicio: id }));
      setErrors((er) => ({ ...er, servicio: undefined }));
      setHint(`Servicio seleccionado: ${serviceLabel(id)}.`);
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
      setStatus({ type: 'error', text: `Revise ${bad.length === 1 ? 'el campo marcado' : `los ${bad.length} campos marcados`} antes de enviar.` });
      formRef.current?.querySelector(`[name="${bad[0]}"]`)?.focus();
      return;
    }
    const subject = `Consulta: ${serviceLabel(form.servicio)} · ${form.empresa.trim()}`;
    const body = buildBody(form);
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ type: 'ok', text: 'Abrimos su programa de correo con el mensaje listo. Solo falta que lo envíe desde allí.' });
    } else if (whatsapp) {
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, '_blank', 'noopener');
      setStatus({ type: 'ok', text: 'Abrimos WhatsApp con su mensaje listo. Solo falta que lo envíe desde allí.' });
    } else {
      // Sin canal configurado: no se finge el envío.
      setStatus({ type: 'warn', text: 'Formulario de prueba: el canal de contacto aún no está configurado. Su mensaje no se ha enviado.' });
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
    <span id={`ctc-${k}-err`} className="ctc-err"><AlertCircle size={15} aria-hidden="true" />{errors[k]}</span>
  );

  return (
    <section id="contacto" className="section section--soft ctc">
      <div className="container ctc-layout">
        <div className="ctc-intro reveal">
          <p className="kicker">Contacto</p>
          <h2>Conversemos sobre su empresa</h2>
          <p className="ctc-intro__text">
            Cuéntenos el reto que enfrenta su organización. Revisaremos su caso con confidencialidad y le propondremos un alcance a la medida.
          </p>

          <aside className="ctc-card" aria-label="Datos de la firma">
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
            <a className="btn btn--mint ctc-card__btn" href={`https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent('Hola Isabel, me interesa una asesoría de IR Consulting')}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> Escribir por WhatsApp
            </a>
          </aside>
        </div>

        <form ref={formRef} className="ctc-form reveal" onSubmit={submit} noValidate aria-labelledby="ctc-form-title">
          <h3 id="ctc-form-title" className="ctc-form__title">Solicitud de información</h3>
          <p className="ctc-form__req">Todos los campos son obligatorios salvo el teléfono.</p>

          <div className="ctc-row">
            <div className="ctc-field">
              <label htmlFor="ctc-nombre">Nombre</label>
              <input type="text" autoComplete="name" required {...field('nombre')} />
              {err('nombre')}
            </div>
            <div className="ctc-field">
              <label htmlFor="ctc-empresa">Empresa</label>
              <input type="text" autoComplete="organization" required {...field('empresa')} />
              {err('empresa')}
            </div>
          </div>

          <div className="ctc-row">
            <div className="ctc-field">
              <label htmlFor="ctc-correo">Correo electrónico</label>
              <input type="email" autoComplete="email" inputMode="email" required {...field('correo')} />
              {err('correo')}
            </div>
            <div className="ctc-field">
              <label htmlFor="ctc-telefono">Teléfono <span className="ctc-opt">(opcional)</span></label>
              <input type="tel" autoComplete="tel" inputMode="tel" {...field('telefono')} />
              {err('telefono')}
            </div>
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc-servicio">Servicio de interés</label>
            <select required {...field('servicio')}>
              <option value="">Seleccione una opción</option>
              {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              <option value={OTHER}>Otro</option>
            </select>
            {err('servicio')}
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc-mensaje">Mensaje</label>
            <textarea rows={5} required {...field('mensaje')} />
            {err('mensaje')}
          </div>

          <button type="submit" className="btn btn--primary ctc-submit">
            Enviar consulta <Send size={18} aria-hidden="true" />
          </button>

          <p className="sr-only" aria-live="polite">{hint}</p>
          <div className="ctc-status-wrap" aria-live="polite" aria-atomic="true">
            {status && (
              <p className={`ctc-status ctc-status--${status.type}`}>
                {status.type === 'ok' ? <CheckCircle2 size={18} aria-hidden="true" /> : <AlertCircle size={18} aria-hidden="true" />}
                <span>{status.text}</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
