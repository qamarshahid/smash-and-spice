import { useState } from 'react';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { config } = useSiteConfig();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden lg:flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <a href={`tel:${config.business.phone}`} className="hover:text-orange-500 transition-colors">
                {config.business.phone}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-500" />
            <span className={`font-medium ${config.business.isOpen ? 'text-green-600' : 'text-red-600'}`}>
              {config.business.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={config.hero.images.logo}
              alt={`${config.business.name} logo`}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-black text-gray-900">{config.business.name}</h1>
              <p className="text-xs text-orange-500 font-bold">{config.business.tagline}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('menu')}
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Menu
            </button>
            <button 
              onClick={() => scrollToSection('story')}
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Our Story
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Contact
            </button>
            <a 
              href={config.links.delivery.ubereats} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Order Online
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('menu')}
                className="text-left text-gray-700 hover:text-orange-500 font-medium transition-colors py-2"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('story')}
                className="text-left text-gray-700 hover:text-orange-500 font-medium transition-colors py-2"
              >
                Our Story
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-orange-500 font-medium transition-colors py-2"
              >
                Contact
              </button>
              <div className="pt-2">
                <a 
                  href={config.links.delivery.ubereats} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300"
                >
                  Order Online
                </a>
              </div>
              <div className="pt-2 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 py-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <a href={`tel:${config.business.phone}`} className="hover:text-orange-500 transition-colors">
                    {config.business.phone}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;