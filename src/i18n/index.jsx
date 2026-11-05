import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as es from '../data.js';
import * as en from './en.js';
import { ui } from './ui.js';
import { media as baseMedia, heroReel as baseReel } from '../media.js';

// i18n mínimo sin dependencias.
// - Contenido del portafolio: ES = src/data.js (fuente), EN = src/i18n/en.js (misma forma).
// - Textos sueltos de componentes, alt de medios, WhatsApp y SEO: src/i18n/ui.js.
// Uso: const { lang, setLang, t } = useLang();  t.brand, t.services, t.ui.hero.ctaPrimary, t.media…
export const LANGS = ['es', 'en'];
const KEYS = ['brand', 'nav', 'firm', 'identity', 'leader', 'services', 'method', 'why'];
const SOURCES = { es, en };

// Medios con rutas de media.js y alt/lugares del idioma activo.
function localizeMedia(m) {
  return {
    media: {
      ...baseMedia,
      hero: { ...baseMedia.hero, alt: m.hero },
      services: Object.fromEntries(Object.entries(baseMedia.services).map(([k, v]) => [k, { ...v, alt: m.services[k] ?? v.alt }])),
      contacto: { ...baseMedia.contacto, alt: m.contacto },
    },
    heroReel: baseReel.map((c, i) => ({ ...c, ...(m.reel[i] || {}) })),
  };
}

const DICT = Object.fromEntries(LANGS.map((l) => [l, {
  ...Object.fromEntries(KEYS.map((k) => [k, SOURCES[l][k]])),
  ui: ui[l],
  ...localizeMedia(ui[l].media),
}]));

const norm = (v) => (typeof v === 'string' && LANGS.includes(v.toLowerCase()) ? v.toLowerCase() : null);

// Prioridad: ?lang= en la URL (enlace compartido) → localStorage → idioma del navegador (en* → EN, resto ES).
function initialLang() {
  if (typeof window === 'undefined') return 'es';
  try {
    const q = norm(new URLSearchParams(window.location.search).get('lang'));
    if (q) return q;
  } catch { /* URL no disponible */ }
  try {
    const saved = norm(window.localStorage.getItem('lang'));
    if (saved) return saved;
  } catch { /* almacenamiento bloqueado */ }
  return /^en\b/i.test(navigator.language || '') ? 'en' : 'es';
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);
  const t = DICT[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.ui.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.ui.seo.description);
    try { window.localStorage.setItem('lang', lang); } catch { /* almacenamiento bloqueado */ }
    // Si el enlace traía ?lang=, se mantiene coherente con el idioma elegido.
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('lang') && url.searchParams.get('lang') !== lang) {
        url.searchParams.set('lang', lang);
        window.history.replaceState(window.history.state, '', url);
      }
    } catch { /* history no disponible */ }
  }, [lang, t]);

  const setLang = useCallback((l) => { const v = norm(l); if (v) setLangState(v); }, []);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang debe usarse dentro de <LangProvider>');
  return ctx;
}

// Botón segmentado ES | EN (header de escritorio y menú móvil).
export function LangSwitch({ className = '' }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.ui.lang.group}>
      {LANGS.map((l) => (
        <button key={l} type="button" lang={l} className="lang-switch__btn" aria-pressed={lang === l}
          aria-label={t.ui.lang[l]} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
