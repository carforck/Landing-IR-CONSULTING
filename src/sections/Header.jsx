import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang, LangSwitch } from '../i18n/index.jsx';
import { waProps, WhatsAppGlyph } from '../whatsapp.jsx';
import './chrome.css';

// Logo oficial: isotipo (brand/) + logotipo en Montserrat, oro y plata.
export function Logo({ className = '', size = 44, tagline = false }) {
  const { t } = useLang();
  return (
    <span className={`hdr-logo ${className}`}>
      <img className="hdr-logo__iso" src={`${import.meta.env.BASE_URL}brand/isotipo.svg`} alt="IR" width={size} height={size} />
      <span className="hdr-logo__text">
        <span className="hdr-logo__word"><span className="hdr-logo__sub">CONSULTING</span></span>
        {tagline && <span className="hdr-logo__tag">{t.brand.tagline}</span>}
      </span>
    </span>
  );
}

const MOBILE_MENU = 1199; // px: por debajo, menú hamburguesa (6 enlaces + idioma + CTA no caben)

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);
  const { t } = useLang();
  const { nav } = t;
  const tx = t.ui.header;
  const wa = waProps(t.ui.wa.hello);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menú abierto: bloquea el scroll del body, atrapa el foco (Tab/Shift+Tab) y cierra con Escape.
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.dataset.menu = 'open'; // oculta el botón flotante mientras el menú está abierto
    const focusables = () => [btnRef.current, ...(panelRef.current?.querySelectorAll('a[href], button:not([disabled])') || [])].filter(Boolean);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const els = focusables();
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth > MOBILE_MENU) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      delete document.body.dataset.menu;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`hdr ${scrolled || open ? 'hdr--solid' : ''}`}>
      <div className="hdr__inner">
        <a href="#main" className="hdr__brand" aria-label={tx.home} onClick={close}>
          <Logo />
        </a>

        <nav className="hdr__nav" aria-label={tx.navLabel}>
          <ul>
            {nav.map((item) => (
              <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
            ))}
          </ul>
        </nav>

        <LangSwitch className="hdr__lang" />

        <a {...wa} className="btn btn--mint hdr__cta" aria-label={t.ui.cta.waLabel}>
          <WhatsAppGlyph size={18} /> {t.ui.cta.wa}
        </a>

        <button
          ref={btnRef}
          type="button"
          className="hdr__toggle"
          aria-expanded={open}
          aria-controls="hdr-menu"
          aria-label={open ? tx.close : tx.open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <div id="hdr-menu" ref={panelRef} className={`hdr__panel ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav className="container" aria-label={tx.mobileNav}>
          <ul>
            {nav.map((item) => (
              <li key={item.id}><a href={`#${item.id}`} onClick={close}>{item.label}</a></li>
            ))}
          </ul>
          <a {...wa} className="btn btn--mint hdr__panel-cta" onClick={close} aria-label={t.ui.cta.waLabel}>
            <WhatsAppGlyph size={18} /> {t.ui.cta.wa}
          </a>
          <div className="hdr__panel-lang">
            <span aria-hidden="true">{t.ui.lang.label}</span>
            <LangSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
}
