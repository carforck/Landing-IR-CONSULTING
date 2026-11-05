import { FirstAidKit, Lightning, Drop, Factory, Crane, ShieldCheck, Storefront, Briefcase } from '@phosphor-icons/react';
import { useLang } from '../i18n/index.jsx';
import './sectors.css';

// Icono por sector, en el mismo orden que leader.sectors (Salud, Energía, Servicios públicos,
// Industria y minería, Construcción e inmobiliario, Seguridad privada, Servicios y comercio); Briefcase como respaldo.
const icons = [FirstAidKit, Lightning, Drop, Factory, Crane, ShieldCheck, Storefront];

function Items({ hidden = false }) {
  const { t } = useLang();
  return (
    <ul className="sectors__list" role="list" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : t.ui.sectors.list}>
      {t.leader.sectors.map((s, i) => {
        const Icon = icons[i] ?? Briefcase;
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
  const { t } = useLang();
  return (
    <section className="sectors" aria-labelledby="sectors-title">
      <div className="container">
        <h2 id="sectors-title" className="sectors__title">{t.ui.sectors.title}</h2>
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
