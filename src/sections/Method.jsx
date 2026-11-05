import { useLang } from '../i18n/index.jsx';
import LottieIcon from '../components/LottieIcon.jsx';
import { Search, PencilRuler, Cog, Flag } from 'lucide-react';
import './services.css';

// Animación por paso (public/lottie/*.json, variante para fondo oscuro) y su icono de respaldo.
const STEP_ANIM = [
  ['diagnosticar', Search], ['disenar', PencilRuler], ['implementar', Cog], ['medir', Flag],
];

export default function Method() {
  const { t } = useLang();
  const { method } = t;
  return (
    <section id="metodologia" className="section section--dark mth">
      <div className="container">
        <header className="section-head reveal">
          <p className="kicker">{t.ui.method.kicker}</p>
          <h2>{method.title}</h2>
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
      </div>
    </section>
  );
}
