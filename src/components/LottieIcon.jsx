import { useEffect, useRef, useState } from 'react';

/*
 * Icono animado Lottie (decorativo).
 * - Carga perezosa: el reproductor (lottie-web light, SVG) y el JSON solo se piden al acercarse a pantalla.
 * - Se reproduce una vez al entrar; al pasar el cursor por el contenedor [data-lottie-hover] (o el propio icono) se repite.
 * - prefers-reduced-motion: muestra el último frame (estado completo) sin animar.
 * - Si algo falla, renderiza el icono `fallback` (componente lucide).
 * Las animaciones viven en public/lottie/<name>.json (generadas con scripts/gen_lottie.py).
 */

let playerPromise;
const loadPlayer = () =>
  (playerPromise ||= import('lottie-web/build/player/lottie_light').then((m) => m.default || m));

const dataCache = new Map();
const loadData = (name) => {
  if (!dataCache.has(name)) {
    const p = fetch(`${import.meta.env.BASE_URL}lottie/${name}.json`).then((r) => {
      if (!r.ok) throw new Error(`lottie ${name}: ${r.status}`);
      return r.json();
    });
    p.catch(() => dataCache.delete(name));
    dataCache.set(name, p);
  }
  return dataCache.get(name);
};

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function LottieIcon({ name, size = 48, fallback: Fallback, fallbackSize, className = '' }) {
  const box = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || failed) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setFailed(true); return undefined; }

    let anim = null;
    let disposed = false;
    let visible = false;
    let played = false;
    const still = reducedMotion();

    const playFromStart = () => {
      if (!anim || still) return;
      anim.goToAndPlay(0, true);
      played = true;
    };

    const start = () => {
      Promise.all([loadPlayer(), loadData(name)])
        .then(([lottie, data]) => {
          if (disposed) return;
          anim = lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: data,
            rendererSettings: { preserveAspectRatio: 'xMidYMid meet', progressiveLoad: true },
          });
          const svg = el.querySelector('svg');
          if (svg) { svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false'); }
          if (still) anim.goToAndStop(anim.totalFrames - 1, true);
          else if (visible) playFromStart();
        })
        .catch(() => { if (!disposed) setFailed(true); });
    };

    // Precarga con margen; reproduce cuando el icono es visible de verdad.
    let requested = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !requested) { requested = true; start(); }
          visible = e.intersectionRatio >= 0.6;
          if (visible && anim && !played) playFromStart();
        }
      },
      { rootMargin: '120px 0px', threshold: [0, 0.6] },
    );
    io.observe(el);

    const hoverEl = el.closest('[data-lottie-hover]') || el;
    const onEnter = () => { if (anim && anim.isPaused) playFromStart(); };
    hoverEl.addEventListener('mouseenter', onEnter);

    return () => {
      disposed = true;
      io.disconnect();
      hoverEl.removeEventListener('mouseenter', onEnter);
      anim?.destroy();
    };
  }, [name, failed]);

  const style = { width: size, height: size, display: 'inline-block', flex: 'none', lineHeight: 0 };
  if (failed) {
    return Fallback ? <Fallback size={fallbackSize || Math.round(size * 0.5)} aria-hidden="true" className={className} /> : null;
  }
  return <span ref={box} className={`lottie-icon ${className}`.trim()} style={style} aria-hidden="true" />;
}
