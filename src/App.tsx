import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import FloatingAdminButton from './components/FloatingAdminButton';
import SEO from './components/SEO';
import { SiteConfigProvider } from './contexts/SiteConfigContext';

function App() {
  return (
    <SiteConfigProvider>
      <div className="min-h-screen bg-white">
        <SEO />
        <Header />
        <Hero />
        <Menu />
        <Story />
        <Contact />
        <Footer />
        <MobileMenu />
        <FloatingAdminButton />
      </div>
    </SiteConfigProvider>
  );
}

export default App;