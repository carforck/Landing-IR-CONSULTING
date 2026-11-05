import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav } from '../data.js';
import './chrome.css';

// Logo oficial: isotipo (brand/) + logotipo en Montserrat, oro y plata.
export function Logo({ className = '', size = 44, tagline = false }) {
  return (
    <span className={`hdr-logo ${className}`}>
      <img className="hdr-logo__iso" src="/brand/isotipo.svg" alt="" width={size} height={size} />
      <span className="hdr-logo__text">
        <span className="hdr-logo__word"><span className="hdr-logo__ir">IR</span> <span className="hdr-logo__sub">CONSULTING</span></span>
        {tagline && <span className="hdr-logo__tag">Consultoría estratégica y financiera</span>}
      </span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onResize = () => { if (window.innerWidth > 960) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`hdr ${scrolled || open ? 'hdr--solid' : ''}`}>
      <div className="container hdr__inner">
        <a href="#main" className="hdr__brand" aria-label="IR Consulting, ir al inicio" onClick={close}>
          <Logo />
        </a>

        <nav className="hdr__nav" aria-label="Principal">
          <ul>
            {nav.map((item) => (
              <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
            ))}
          </ul>
        </nav>

        <a href="#contacto" className="btn btn--mint hdr__cta">Agenda una conversación</a>

        <button
          ref={btnRef}
          type="button"
          className="hdr__toggle"
          aria-expanded={open}
          aria-controls="hdr-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <div id="hdr-menu" className={`hdr__panel ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav className="container" aria-label="Menú móvil">
          <ul>
            {nav.map((item) => (
              <li key={item.id}><a href={`#${item.id}`} onClick={close}>{item.label}</a></li>
            ))}
          </ul>
          <a href="#contacto" className="btn btn--mint hdr__panel-cta" onClick={close}>Agenda una conversación</a>
        </nav>
      </div>
    </header>
  );
}
