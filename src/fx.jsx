import { useEffect, useRef, useState } from 'react';

// Marca los elementos .reveal con data-in="1" al entrar en pantalla. Se usa un atributo (no una clase)
// porque React reescribe className al re-renderizar y borraría la marca, dejando el bloque invisible.
// Un MutationObserver incorpora los .reveal que se monten después. Respeta prefers-reduced-motion.
export function useReveal() {
  useEffect(() => {
    const show = (el) => el.setAttribute('data-in', '1');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(show);
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    const watch = (root) => root.querySelectorAll?.('.reveal:not([data-in])').forEach((el) => io.observe(el));
    watch(document);
    const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => {
      if (n.nodeType !== 1) return;
      if (n.matches('.reveal:not([data-in])')) io.observe(n);
      watch(n);
    })));
    mo.observe(document.body, { childList: true, subtree: true });
    // Red de seguridad: nada debe quedar oculto si el observador no dispara (pestañas en segundo plano, etc.).
    const t = setTimeout(() => document.querySelectorAll('.reveal:not([data-in])').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) show(el);
    }), 2500);
    return () => { io.disconnect(); mo.disconnect(); clearTimeout(t); };
  }, []);
}

// Cuenta ascendente para valores como "25+" o "7" (el texto no numérico se deja igual).
export function CountUp({ value, duration = 1400 }) {
  const m = /^(\d+)(.*)$/.exec(String(value));
  const ref = useRef(null);
  const [n, setN] = useState(m ? 0 : null);
  useEffect(() => {
    if (!m) return;
    const target = parseInt(m[1], 10);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { setN(target); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  if (!m) return value;
  return <span ref={ref}>{n}{m[2]}</span>;
}
