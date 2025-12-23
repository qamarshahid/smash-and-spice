import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import GrandOpeningBanner from './components/GrandOpeningBanner';
import SEOHead from './components/SEOHead';

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
              onClick={() => scrollToSection('faqs', '/faqs')}
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/faqs') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              FAQs
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
              onClick={() => scrollToSection('faqs', '/faqs')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/faqs') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              FAQs
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
  const navigate = useNavigate();

  useEffect(() => {
    const scrollToSection = () => {
      let sectionId = '';
      let path = location.pathname;
      
      // Check window.location first for GitHub Pages redirect format: /?/menu
      // The 404.html redirects to /?/menu, and we need to check the actual browser URL
      const fullUrl = window.location.href;
      const urlPath = window.location.pathname;
      
      // Handle GitHub Pages redirect format: /?/menu
      // The pathname might be /?/menu or just /, so check both
      if (urlPath.includes('/?/')) {
        // Extract route from /?/menu format
        const route = urlPath.split('/?/')[1]?.replace(/~and~/g, '&').split('?')[0].split('#')[0] || '';
        if (route) {
          navigate(`/${route}`, { replace: true });
          path = `/${route}`;
        }
      } else if (urlPath === '/' && fullUrl.includes('/?/')) {
        // Sometimes the pathname is / but the full URL has /?/menu
        const routeMatch = fullUrl.match(/\/\?\/([^?&#]+)/);
        if (routeMatch && routeMatch[1]) {
          const route = routeMatch[1].replace(/~and~/g, '&');
          navigate(`/${route}`, { replace: true });
          path = `/${route}`;
        }
      }
      
      // Also check React Router location pathname
      if (path.includes('/?/')) {
        const route = path.split('/?/')[1]?.replace(/~and~/g, '&').split('?')[0].split('#')[0] || '';
        if (route) {
          navigate(`/${route}`, { replace: true });
          path = `/${route}`;
        }
      }
      
      // Determine section based on route
      if (path === '/menu') {
        sectionId = 'menu';
      } else if (path === '/story') {
        sectionId = 'about';
      } else if (path === '/gallery') {
        sectionId = 'gallery';
      } else if (path === '/contact') {
        sectionId = 'contact';
      } else if (path === '/faqs') {
        sectionId = 'faqs';
      } else if (path === '/' || path === '') {
        sectionId = 'home';
      }

      if (sectionId) {
        // Wait for page to fully render before scrolling
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            // Scroll to element
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            // If element not found, try again after a longer delay
            setTimeout(() => {
              const retryElement = document.getElementById(sectionId);
              if (retryElement) {
                retryElement.scrollIntoView({ behavior: 'smooth' });
              }
            }, 500);
          }
        }, 400);
      }
    };

    // Run immediately and also on location change
    scrollToSection();
  }, [location, navigate]);

  return null;
}

// Component that renders all sections (single-page scrolling experience)
// This keeps the user experience of scrolling through all content on one page
// while allowing proper SEO routing
function AllSections() {
  const location = useLocation();
  const path = location.pathname;

  // Define SEO content for each route
  const seoContent = {
    '/': {
      title: 'Smash & Spice | Authentic Zabiha Halal Burgers & Chapli Platters in Highland Park, NJ',
      description: 'Smash & Spice - Authentic Zabiha halal restaurant in Highland Park, NJ. Famous chapli platters, hand-smashed burgers, and zinger burgers. Open 11AM-10PM. Located at 323 Raritan Ave.',
      ogTitle: 'Smash & Spice - Halal Restaurant Highland Park, NJ',
      ogDescription: 'Authentic Zabiha halal food in Highland Park, NJ. Famous chapli platters, hand-smashed burgers, and zinger burgers.',
    },
    '/menu': {
      title: 'Menu - Smash & Spice | Freshly Made Halal Burgers & Chapli Platters in Highland Park, NJ',
      description: 'View our complete menu featuring authentic Zabiha halal burgers, chapli platters, wings, wraps, and more. Freshly made to order in Highland Park, NJ.',
      ogTitle: 'Menu - Smash & Spice | Halal Restaurant Highland Park, NJ',
      ogDescription: 'Freshly made halal burgers and chapli platters. View our complete menu with prices and options.',
    },
    '/story': {
      title: 'Our Story - Smash & Spice | Authentic Halal Restaurant Highland Park, NJ',
      description: 'Learn about the journey behind Smash & Spice. From kitchen experience to 450,000+ followers, discover our passion for authentic halal food.',
      ogTitle: 'Our Story - Smash & Spice',
      ogDescription: 'The journey behind Smash & Spice. Authentic halal food made with passion and dedication.',
    },
    '/gallery': {
      title: 'Gallery - Smash & Spice | Halal Restaurant Photos Highland Park, NJ',
      description: 'View photos of our delicious halal food, restaurant atmosphere, and customer favorites at Smash & Spice in Highland Park, NJ.',
      ogTitle: 'Gallery - Smash & Spice',
      ogDescription: 'Photos of our authentic halal food and restaurant in Highland Park, NJ.',
    },
    '/contact': {
      title: 'Visit Us - Smash & Spice | Halal Restaurant Highland Park, NJ | 323 Raritan Ave',
      description: 'Visit Smash & Spice at 323 Raritan Ave, Highland Park, NJ. Open 11AM-10PM. Call (848) 228-4033 to order. Authentic Zabiha halal food.',
      ogTitle: 'Visit Us - Smash & Spice | Highland Park, NJ',
      ogDescription: 'Visit us at 323 Raritan Ave, Highland Park, NJ. Open 11AM-10PM. Call to order authentic halal food.',
    },
    '/faqs': {
      title: 'FAQs - Smash & Spice | Frequently Asked Questions | Halal Restaurant Highland Park, NJ',
      description: 'Frequently asked questions about Smash & Spice. Learn about our halal food, menu items, hours, and location in Highland Park, NJ.',
      ogTitle: 'FAQs - Smash & Spice',
      ogDescription: 'Frequently asked questions about our authentic Zabiha halal restaurant in Highland Park, NJ.',
    },
  };

  const currentSEO = seoContent[path as keyof typeof seoContent] || seoContent['/'];

  return (
    <>
      <SEOHead
        title={currentSEO.title}
        description={currentSEO.description}
        ogTitle={currentSEO.ogTitle}
        ogDescription={currentSEO.ogDescription}
      />
      <Hero />
      <MenuSection />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
      <FAQs />
    </>
  );
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
            {/* All routes show all sections for single-page scrolling experience */}
            <Route path="/" element={<AllSections />} />
            <Route path="/menu" element={<AllSections />} />
            <Route path="/story" element={<AllSections />} />
            <Route path="/gallery" element={<AllSections />} />
            <Route path="/contact" element={<AllSections />} />
            <Route path="/faqs" element={<AllSections />} />
            {/* Catch-all route */}
            <Route path="/*" element={<AllSections />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
