import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import StoryPage from './pages/StoryPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import GrandOpeningBanner from './components/GrandOpeningBanner';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl shadow-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center bg-gray-950 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 -ml-2 sm:-ml-3 hover:bg-gray-900 transition-colors">
              <img
                src="/smash_and_spice.png"
                alt="Smash & Spice"
                className="h-10 sm:h-14 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/menu') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Menu
            </Link>
            <Link
              to="/story"
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/story') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Story
            </Link>
            <Link
              to="/gallery"
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/gallery') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${
                isActive('/contact') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Visit
            </Link>
            <Link
              to="/contact"
              className="ml-4 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Order Now
            </Link>
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
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/menu') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Menu
            </Link>
            <Link
              to="/story"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/story') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Story
            </Link>
            <Link
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/gallery') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all ${
                isActive('/contact') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
              }`}
            >
              Visit
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold mt-4 text-center block"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Navigation />
        <GrandOpeningBanner />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
