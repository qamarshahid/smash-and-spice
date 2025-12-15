import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GrandOpeningBanner from './components/GrandOpeningBanner';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl shadow-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <div className="flex items-center">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center bg-gray-950 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 -ml-2 sm:-ml-3 hover:bg-gray-900 transition-colors">
                <img
                  src="/smash_and_spice.png"
                  alt="Smash & Spice"
                  className="h-10 sm:h-14 w-auto"
                />
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10"
              >
                Story
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10"
              >
                Visit
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="ml-4 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Order Now
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-6 space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="block w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                Story
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                Visit
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold mt-4"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </nav>

      <GrandOpeningBanner />

      <main>
        <Hero />
        <MenuSection />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;
