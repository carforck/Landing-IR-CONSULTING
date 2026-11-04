import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { brand } from '../data.js';
import './floating.css';

const WA_TEXT = 'Hola Isabel, me interesa una asesoría de IR Consulting';
const whatsapp = brand.contact?.whatsapp?.replace(/\D/g, '');

// Glifo de WhatsApp (mismo trazado que la landing SOTEC). Solo se usa si hay número configurado.
const WhatsAppGlyph = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.2 4.23-9.42 9.43-9.42a9.37 9.37 0 0 1 9.42 9.43c0 5.2-4.23 9.42-9.42 9.42zm8.02-17.45A11.27 11.27 0 0 0 12.05.72C5.8.72.72 5.8.72 12.05c0 2 .52 3.95 1.52 5.66L.62 23.28l5.7-1.5a11.3 11.3 0 0 0 5.73 1.46c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.31-8z" />
  </svg>
);

// Visible solo después del hero y mientras #contacto y el pie no están en pantalla
// (así nunca tapa el botón "Enviar" del formulario ni el footer).
function useFloatingVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      const hero = document.querySelector('.hero');
      const pastHero = hero ? hero.getBoundingClientRect().bottom < vh * 0.25 : window.scrollY > vh;
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
        href: `https://wa.me/${whatsapp}?text=${encodeURIComponent(WA_TEXT)}`,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': 'Escribir a Isabel Rodríguez por WhatsApp (se abre en una pestaña nueva)',
      }
    : { href: '#contacto', 'aria-label': 'Ir al formulario de contacto' };

  return (
    <div className={`fab${visible ? ' is-visible' : ''}${peek ? ' is-peek' : ''}${whatsapp ? ' fab--wa' : ''}`}>
      <p className="fab__bubble" aria-hidden="true">
        <strong>¿Necesita más información?</strong>
        <span>{whatsapp ? 'Escríbale a Isabel por WhatsApp' : 'Cuéntenos su necesidad en el formulario'}</span>
      </p>
      <a className="fab__btn" {...link} tabIndex={visible ? undefined : -1} aria-hidden={visible ? undefined : true}>
        {whatsapp ? <WhatsAppGlyph width={28} height={28} /> : <MessageCircle size={26} aria-hidden="true" />}
      </a>
    </div>
  );
}
