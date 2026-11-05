import Header from './sections/Header.jsx';
import Hero from './sections/Hero.jsx';
import SectorsMarquee from './sections/SectorsMarquee.jsx';
import Philosophy from './sections/Philosophy.jsx';
import WhyGrid from './sections/WhyGrid.jsx';
import FirmStory from './sections/FirmStory.jsx';
import Services from './sections/Services.jsx';
import CtaBand from './sections/CtaBand.jsx';
import Method from './sections/Method.jsx';
import Founder from './sections/Founder.jsx';
import Contact from './sections/Contact.jsx';
import FloatingContact from './sections/FloatingContact.jsx';
import Footer from './sections/Footer.jsx';
import { useReveal } from './fx.jsx';
import { useLang } from './i18n/index.jsx';

// Orden comercial: promesa → confianza (sectores, diferenciales) → oferta → llamada a la acción
// → cómo trabajamos → quién lo hace → la firma → contacto.
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
        <WhyGrid />
        <Services />
        <CtaBand />
        <Method />
        <Founder />
        <FirmStory />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
