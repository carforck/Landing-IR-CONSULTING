import { method } from '../data.js';
import './services.css';

export default function Method() {
  return (
    <section id="metodologia" className="section section--dark mth">
      <div className="container">
        <header className="section-head reveal">
          <p className="kicker">Metodología</p>
          <h2>{method.title}</h2>
          <p>{method.subtitle}</p>
        </header>
        <ol className="mth-steps">
          {method.steps.map((s, i) => (
            <li key={s.n} className="mth-step reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="mth-step__n" aria-hidden="true">{s.n}</span>
              <div className="mth-step__body">
                <h3 className="mth-step__title"><span className="sr-only">Paso {s.n}: </span>{s.title}</h3>
                <p className="mth-step__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
