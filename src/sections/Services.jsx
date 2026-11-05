import { useEffect, useRef, useState } from 'react';
import { Compass, LineChart, Wallet, FileSpreadsheet, ShieldCheck, TrendingUp, Briefcase, ChevronDown, ArrowRight, Check } from 'lucide-react';
import { services } from '../data.js';
import { media } from '../media.js';
import LottieIcon from '../components/LottieIcon.jsx';
import './services.css';

// Mapa explícito: los `icon` de data.js son nombres de componentes lucide (verificados en 0.468.0).
const ICONS = { Compass, LineChart, Wallet, FileSpreadsheet, ShieldCheck, TrendingUp };
const iconFor = (name) => ICONS[name] || Briefcase;
// Animación Lottie por servicio: public/lottie/<id>.json (mismo id que data.js).
const LOTTIES = new Set(['estrategia', 'finanzas', 'recursos', 'contabilidad', 'control', 'proyectos']);

function SvcIcon({ s, size }) {
  const Icon = iconFor(s.icon);
  if (!LOTTIES.has(s.id)) return <Icon size={Math.round(size * 0.5)} aria-hidden="true" />;
  return <LottieIcon name={s.id} size={size} fallback={Icon} />;
}

const MOBILE_QUERY = '(max-width: 759px)';

function useIsMobile() {
  const get = () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;
  const [mobile, setMobile] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const on = () => setMobile(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return mobile;
}

// Avisa al formulario de contacto qué servicio se eligió (Contact escucha 'ir:servicio').
function pickService(id) {
  window.dispatchEvent(new CustomEvent('ir:servicio', { detail: { id } }));
}

function Detail({ s }) {
  return (
    <div className="svc-detail">
      <div className="svc-detail__main">
        {LOTTIES.has(s.id) && (
          <span className="svc-detail__anim"><LottieIcon name={s.id} size={84} fallback={iconFor(s.icon)} /></span>
        )}
        <p className="svc-detail__area">{s.area}</p>
        <h3 className="svc-detail__title">{s.title}</h3>
        <p className="svc-detail__lead">{s.lead}</p>
        <ul className="svc-detail__list">
          {s.items.map((it) => (
            <li key={it}><Check size={18} aria-hidden="true" /><span>{it}</span></li>
          ))}
        </ul>
      </div>
      <aside className="svc-detail__side">
        {media.services[s.id] && (
          <img className="svc-detail__img" src={media.services[s.id].src} alt={media.services[s.id].alt} loading="lazy" decoding="async" width="800" height="533" />
        )}
        <div className="svc-note">
          <p className="svc-note__title">{s.noteTitle}</p>
          <p className="svc-note__text">{s.note}</p>
        </div>
        <a href="#contacto" className="btn btn--primary svc-detail__cta" onClick={() => pickService(s.id)}>
          Consultar este servicio <ArrowRight size={18} aria-hidden="true" />
        </a>
      </aside>
    </div>
  );
}

function Tabs({ active, setActive }) {
  const refs = useRef([]);
  const idx = Math.max(0, services.findIndex((s) => s.id === active));
  const current = services[idx];

  const onKey = (e, i) => {
    const last = services.length - 1;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = i === last ? 0 : i + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = i === 0 ? last : i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(services[next].id);
    refs.current[next]?.focus();
  };

  return (
    <>
      <div className="svc-grid" role="tablist" aria-label="Líneas de servicio">
        {services.map((s, i) => {
          const selected = i === idx;
          return (
            <button
              key={s.id}
              ref={(el) => { refs.current[i] = el; }}
              id={`svc-tab-${s.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="svc-panel"
              tabIndex={selected ? 0 : -1}
              className={`svc-card${selected ? ' is-active' : ''}`}
              onClick={() => setActive(s.id)}
              onKeyDown={(e) => onKey(e, i)}
              data-lottie-hover=""
            >
              <span className="svc-card__icon"><SvcIcon s={s} size={46} /></span>
              <span className="svc-card__area">{s.area}</span>
              <span className="svc-card__title">{s.title}</span>
              <span className="svc-card__lead">{s.lead}</span>
              <span className="svc-card__more" aria-hidden="true">{selected ? 'Viendo detalle' : 'Ver detalle'}</span>
              {selected && <span className="svc-card__progress" key={s.id} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${current.id}`} tabIndex={0} className="svc-panel" key={current.id}>
        <Detail s={current} />
      </div>
    </>
  );
}

function Accordion({ active, setActive }) {
  return (
    <ul className="svc-acc">
      {services.map((s) => {
        const open = s.id === active;
        return (
          <li key={s.id} className={`svc-acc__item${open ? ' is-open' : ''}`}>
            <h3 className="svc-acc__heading">
              <button
                type="button"
                id={`svc-acc-${s.id}`}
                className="svc-acc__btn"
                aria-expanded={open}
                aria-controls={`svc-acc-panel-${s.id}`}
                onClick={() => setActive(open ? null : s.id)}
                data-lottie-hover=""
              >
                <span className="svc-card__icon"><SvcIcon s={s} size={40} /></span>
                <span className="svc-acc__text">
                  <span className="svc-card__area">{s.area}</span>
                  <span className="svc-acc__title">{s.title}</span>
                  <span className="svc-card__lead">{s.lead}</span>
                </span>
                <ChevronDown className="svc-acc__chev" size={20} aria-hidden="true" />
              </button>
            </h3>
            <div id={`svc-acc-panel-${s.id}`} role="region" aria-labelledby={`svc-acc-${s.id}`} hidden={!open} className="svc-acc__panel">
              <Detail s={s} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const AUTO_MS = 7000;      // cada cuánto avanza solo
const HOLD_MS = 15000;     // pausa tras una elección del usuario

export default function Services() {
  const mobile = useIsMobile();
  const [active, setActive] = useState(services[0].id);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const [hold, setHold] = useState(false);
  const wrapRef = useRef(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const auto = !mobile && !reduced && inView && !hover;

  // Solo rota mientras la sección está en pantalla.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return undefined;
    const t = setTimeout(() => {
      setHold(false);
      const i = services.findIndex((x) => x.id === active);
      setActive(services[(i + 1) % services.length].id);
    }, hold ? HOLD_MS : AUTO_MS);
    return () => clearTimeout(t);
  }, [auto, active, hold]);

  const choose = (id) => { setHold(true); setActive(id); };

  return (
    <section id="servicios" className="section svc">
      <div className="container">
        <header className="section-head reveal">
          <p className="kicker">Servicios</p>
          <h2>Soluciones integrales para cada frente de la empresa</h2>
          <p>Seis líneas de trabajo que se combinan según el reto de cada organización. Seleccione una para ver su alcance.</p>
        </header>
        {/* reveal solo en el contenedor estable: su contenido cambia entre tabs y acordeón. */}
        <div
          ref={wrapRef}
          className={`svc-wrap reveal${auto ? ' is-auto' : ''}`}
          style={{ '--svc-dur': `${hold ? HOLD_MS : AUTO_MS}ms` }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
        >
          {mobile ? <Accordion active={active} setActive={setActive} /> : <Tabs active={active} setActive={choose} />}
        </div>
      </div>
    </section>
  );
}
