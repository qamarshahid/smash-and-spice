import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GrandOpeningBanner from './components/GrandOpeningBanner';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string, path: string) => {
    navigate(path);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl shadow-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('home', '/')}
              className="flex items-center bg-gray-950 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 -ml-2 sm:-ml-3 hover:bg-gray-900 transition-colors"
            >
              <img
                src="/smash_and_spice.png"
                alt="Smash & Spice"
                className="h-10 sm:h-14 w-auto"
              />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => scrollToSection('home', '/')}
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu', '/menu')}
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/menu') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('about', '/story')}
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/story') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Story
            </button>
            <button
              onClick={() => scrollToSection('gallery', '/gallery')}
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/gallery') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact', '/contact')}
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/contact') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Visit
            </button>
            <button
              onClick={() => scrollToSection('contact', '/contact')}
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
              onClick={() => scrollToSection('home', '/')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu', '/menu')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/menu') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('about', '/story')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/story') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Story
            </button>
            <button
              onClick={() => scrollToSection('gallery', '/gallery')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/gallery') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact', '/contact')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/contact') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Visit
            </button>
            <button
              onClick={() => scrollToSection('contact', '/contact')}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold mt-4"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// Handle route-based scrolling
function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    const scrollToSection = () => {
      let sectionId = '';
      
      if (location.pathname === '/menu') {
        sectionId = 'menu';
      } else if (location.pathname === '/story') {
        sectionId = 'about';
      } else if (location.pathname === '/gallery') {
        sectionId = 'gallery';
      } else if (location.pathname === '/contact') {
        sectionId = 'contact';
      } else if (location.pathname === '/') {
        sectionId = 'home';
      }

      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    scrollToSection();
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollHandler />
      <div className="min-h-screen bg-gray-950">
        <Navigation />
        <GrandOpeningBanner />

        <main>
          <Routes>
            <Route path="/*" element={
              <>
                <Hero />
                <MenuSection />
                <About />
                <Gallery />
                <Testimonials />
                <Contact />
              </>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
