import { useLang } from '../i18n/index.jsx';
import LottieIcon from '../components/LottieIcon.jsx';
import { Search, PencilRuler, Cog, Flag, ArrowRight } from 'lucide-react';
import { waProps, WhatsAppGlyph } from '../whatsapp.jsx';
import './services.css';

// Animación por paso (public/lottie/*.json, variante para fondo oscuro) y su icono de respaldo.
const STEP_ANIM = [
  ['diagnosticar', Search], ['disenar', PencilRuler], ['implementar', Cog], ['medir', Flag],
];

export default function Method() {
  const { t } = useLang();
  const { method } = t;
  return (
    <section id="metodologia" className="section section--dark mth" aria-labelledby="mth-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="kicker">{t.ui.method.kicker}</p>
          <h2 id="mth-title">{method.title}</h2>
          <p>{method.subtitle}</p>
        </header>
        <ol className="mth-steps">
          {method.steps.map((s, i) => (
            <li key={s.n} className="mth-step reveal" style={{ transitionDelay: `${i * 90}ms` }} data-lottie-hover="">
              <div className="mth-step__top">
                <span className="mth-step__n" aria-hidden="true">{s.n}</span>
                {STEP_ANIM[i] && <LottieIcon name={STEP_ANIM[i][0]} fallback={STEP_ANIM[i][1]} size={60} className="mth-step__anim" />}
              </div>
              <div className="mth-step__body">
                <h3 className="mth-step__title"><span className="sr-only">{t.ui.method.step} {s.n}: </span>{s.title}</h3>
                <p className="mth-step__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Primer paso: el diagnóstico (antes era la banda CtaBand, ahora integrada al cierre de la metodología). */}
        <div className="mth-cta reveal">
          <div>
            <p className="kicker">{t.ui.method.ctaKicker}</p>
            <h3 className="mth-cta__title">{t.ui.method.ctaTitle}</h3>
          </div>
          <div className="mth-cta__actions">
            <a {...waProps(t.ui.wa.diagnosis)} className="btn btn--mint" aria-label={t.ui.cta.waLabel}>
              <WhatsAppGlyph size={18} /> {t.ui.cta.wa}
            </a>
            <a href="#contacto" className="btn btn--ghost">{t.ui.cta.diagnosis} <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
