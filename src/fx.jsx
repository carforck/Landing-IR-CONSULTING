import { useEffect, useRef, useState } from 'react';

// Añade .is-in a los elementos .reveal cuando entran en pantalla. Respeta prefers-reduced-motion.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
