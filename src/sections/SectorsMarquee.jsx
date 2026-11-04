import { FirstAidKit, Lightning, Drop, Factory, Crane, ShieldCheck, Storefront, Briefcase } from '@phosphor-icons/react';
import { leader } from '../data.js';
import './sectors.css';

// Icono por sector (nombres de leader.sectors); Briefcase como respaldo.
const icons = {
  'Salud': FirstAidKit,
  'Energía': Lightning,
  'Servicios públicos': Drop,
  'Industria y minería': Factory,
  'Construcción e inmobiliario': Crane,
  'Seguridad privada': ShieldCheck,
  'Servicios y comercio': Storefront,
};

function Items({ hidden = false }) {
  return (
    <ul className="sectors__list" role="list" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : 'Sectores'}>
      {leader.sectors.map((s) => {
        const Icon = icons[s] ?? Briefcase;
        return (
          <li key={s} className="sectors__item">
            <span className="sectors__icon"><Icon size={26} weight="duotone" aria-hidden="true" /></span>
            <span>{s}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function SectorsMarquee() {
  return (
    <section className="sectors" aria-labelledby="sectors-title">
      <div className="container">
        <h2 id="sectors-title" className="sectors__title">Experiencia en sectores</h2>
      </div>
      <div className="sectors__viewport">
        <div className="sectors__track">
          <Items />
          <Items hidden />
        </div>
      </div>
    </section>
  );
}
