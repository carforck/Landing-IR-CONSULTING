import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLang } from '../i18n/index.jsx';
import { WA_NUMBER as whatsapp, waLink, WhatsAppGlyph } from '../whatsapp.jsx';
import './floating.css';

// Escritorio: visible después del hero. Móvil (<760px): visible desde el inicio (WhatsApp es la conversión principal).
// En ambos casos se oculta mientras #contacto o el pie están en pantalla (no tapa el botón del formulario ni el footer).
function useFloatingVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      const hero = document.querySelector('.hero');
      const mobile = window.innerWidth < 760;
      const pastHero = mobile || (hero ? hero.getBoundingClientRect().bottom < vh * 0.25 : window.scrollY > vh);
      const guards = [document.getElementById('contacto'), document.querySelector('footer')];
      const guardInView = guards.some((el) => el && el.getBoundingClientRect().top < vh);
      setVisible(pastHero && !guardInView);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return visible;
}

export default function FloatingContact() {
  const { t } = useLang();
  const tx = t.ui.fab;
  const visible = useFloatingVisible();
  const [peek, setPeek] = useState(false);
  const shown = useRef(false);

  // La burbuja se asoma una sola vez, la primera vez que aparece el botón (solo pantallas amplias).
  useEffect(() => {
    if (!visible || shown.current) return;
    shown.current = true;
    if (!window.matchMedia('(min-width: 640px)').matches) return;
    setPeek(true);
    const t = setTimeout(() => setPeek(false), 5000);
    return () => clearTimeout(t);
  }, [visible]);

  const link = whatsapp
    ? {
        href: waLink(t.ui.wa.advisory),
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': tx.waLabel,
      }
    : { href: '#contacto', 'aria-label': tx.formLabel };

  return (
    <div className={`fab${visible ? ' is-visible' : ''}${peek ? ' is-peek' : ''}${whatsapp ? ' fab--wa' : ''}`}>
      <p className="fab__bubble" aria-hidden="true">
        <strong>{tx.title}</strong>
        <span>{whatsapp ? tx.wa : tx.form}</span>
      </p>
      <a className="fab__btn" {...link} tabIndex={visible ? undefined : -1} aria-hidden={visible ? undefined : true}>
        {whatsapp ? <WhatsAppGlyph size={28} /> : <MessageCircle size={26} aria-hidden="true" />}
      </a>
    </div>
  );
}
