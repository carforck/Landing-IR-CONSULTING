import Header from './sections/Header.jsx';
import Hero from './sections/Hero.jsx';
import SectorsMarquee from './sections/SectorsMarquee.jsx';
import Firm from './sections/Firm.jsx';
import Services from './sections/Services.jsx';
import Method from './sections/Method.jsx';
import Leader from './sections/Leader.jsx';
import Contact from './sections/Contact.jsx';
import FloatingContact from './sections/FloatingContact.jsx';
import Footer from './sections/Footer.jsx';
import { useReveal } from './fx.jsx';

export default function App() {
  useReveal();
  return (
    <>
      <a className="skip" href="#main">Saltar al contenido</a>
      <Header />
      <main id="main">
        <Hero />
        <SectorsMarquee />
        <Firm />
        <Services />
        <Method />
        <Leader />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
