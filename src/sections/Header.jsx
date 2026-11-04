import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav } from '../data.js';
import './chrome.css';

// Monograma propio: marco fino, I + R geométricas y un trazo ascendente (estrategia -> valor).
export function Monogram({ size = 38 }) {
  return (
    <svg className="hdr-mono" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="38" height="38" rx="9" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
      <rect x="10" y="10" width="3.2" height="20" rx="0.6" fill="currentColor" />
      <path d="M17 30V10h6.2a5.6 5.6 0 0 1 0 11.2H17" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M22.5 21.2 30 30" stroke="var(--mint)" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="31" cy="9" r="1.8" fill="var(--mint)" />
    </svg>
  );
}

export function Logo({ className = '' }) {
  return (
    <span className={`hdr-logo ${className}`}>
      <Monogram />
      <span className="hdr-logo__ir">IR</span>
      <span className="hdr-logo__sub">Consulting</span>
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
