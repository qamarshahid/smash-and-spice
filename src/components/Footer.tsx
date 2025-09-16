import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const Footer = () => {
  const { config } = useSiteConfig();
  return (
    <footer className="bg-gradient-to-br from-orange-500 via-red-500 to-red-600 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6 mt-8">
            <div className="flex items-center space-x-3">
              <img 
                src={config.hero.images.logo} 
                alt={`${config.business.name} Logo`}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-2xl font-black text-white">{config.business.name}</h3>
                <p className="text-yellow-300 text-sm font-bold">{config.business.tagline}</p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed">
              {config.business.description}
            </p>
            <div className="flex space-x-4">
              <a href={config.links.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 text-white border border-white/30">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={config.links.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 text-white border border-white/30">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={config.links.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 text-white border border-white/30">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8">
            <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#menu" className="text-white/80 hover:text-yellow-300 transition-colors font-medium">Menu</a></li>
              <li><a href="#story" className="text-white/80 hover:text-yellow-300 transition-colors font-medium">Our Story</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-yellow-300 transition-colors font-medium">Contact</a></li>
              <li><a href={config.footer.quickLinks.catering} className="text-white/80 hover:text-yellow-300 transition-colors font-medium">Catering</a></li>
              <li><a href={config.footer.quickLinks.rewards} className="text-white/80 hover:text-yellow-300 transition-colors font-medium">Rewards</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mt-8">
            <h4 className="text-xl font-bold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">{config.business.address.street}</p>
                  <p className="text-white/80">{config.business.address.city}, {config.business.address.state} {config.business.address.zip}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-300" />
                <a href={`tel:${config.business.phone}`} className="text-white/80 hover:text-yellow-300 transition-colors font-medium">
                  {config.business.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-300" />
                <a href={`mailto:${config.business.email}`} className="text-white/80 hover:text-yellow-300 transition-colors font-medium">
                  {config.business.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="mt-8">
            <h4 className="text-xl font-bold text-white mb-6">Hours</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className={`font-bold text-sm ${config.business.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                  {config.business.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80 font-medium">Mon - Thu</span>
                  <span className="text-white font-bold">{config.business.hours.monday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80 font-medium">Fri - Sat</span>
                  <span className="text-white font-bold">{config.business.hours.friday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80 font-medium">Sunday</span>
                  <span className="text-white font-bold">{config.business.hours.sunday}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/70">
              <p>&copy; 2024 {config.business.name}. All rights reserved.</p>
              <div className="flex gap-6">
                <a href={config.footer.legalLinks.privacyPolicy} className="hover:text-yellow-300 transition-colors">Privacy Policy</a>
                <a href={config.footer.legalLinks.termsOfService} className="hover:text-yellow-300 transition-colors">Terms of Service</a>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/70">{config.business.certifications[0] || '100% Zabiha Halal Certified'}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;