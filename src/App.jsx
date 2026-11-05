import Header from './sections/Header.jsx';
import Hero from './sections/Hero.jsx';
import SectorsMarquee from './sections/SectorsMarquee.jsx';
import Services from './sections/Services.jsx';
import Method from './sections/Method.jsx';
import Founder from './sections/Founder.jsx';
import WhyGrid from './sections/WhyGrid.jsx';
import Philosophy from './sections/Philosophy.jsx';
import Contact from './sections/Contact.jsx';
import FloatingContact from './sections/FloatingContact.jsx';
import Footer from './sections/Footer.jsx';
import { useReveal } from './fx.jsx';
import { useLang } from './i18n/index.jsx';

// Orden comercial: promesa → sectores → oferta → cómo trabajamos (con el primer paso: diagnóstico)
// → quién lo hace (fundadora + la firma) → diferenciales → identidad → contacto.
// Fondos alternos: hero oscuro · sectores blanco · servicios arena · metodología oscuro · fundadora blanco
// · diferenciales arena · identidad (banda oscura + blanco) · contacto arena · pie oscuro.
export default function App() {
  useReveal();
  const { t } = useLang();
  return (
    <>
      <a className="skip" href="#main">{t.ui.skip}</a>
      <Header />
      <main id="main">
        <Hero />
        <SectorsMarquee />
        <Services />
        <Method />
        <Founder />
        <WhyGrid />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
