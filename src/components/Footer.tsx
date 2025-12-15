import { Facebook, Instagram, Twitter } from 'lucide-react';
import { restaurantInfo } from '../config/restaurantInfo';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="bg-gray-950 text-white py-10 sm:py-12 md:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div className="sm:col-span-2">
            <img
              src="/smash_and_spice.png"
              alt="Smash & Spice"
              className="h-12 sm:h-14 md:h-16 w-auto mb-3 sm:mb-4"
            />
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md mb-4 sm:mb-6">
              Hand-smashed burgers made with love and the finest local ingredients.
              Every bite is an experience worth sharing.
            </p>
            <div className="flex gap-4">
              {restaurantInfo.socialMedia.facebook && (
                <a
                  href={restaurantInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors border border-gray-700"
                >
                  <Facebook size={18} />
                </a>
              )}
              <a
                href={restaurantInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors border border-gray-700"
              >
                <Instagram size={18} />
              </a>
              {restaurantInfo.socialMedia.twitter && (
                <a
                  href={restaurantInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors border border-gray-700"
                >
                  <Twitter size={18} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Visit Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Contact</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li>{restaurantInfo.address.street}</li>
              <li>{restaurantInfo.address.city}</li>
              <li className="pt-2">
                <a href={`tel:+1${restaurantInfo.phone.replace(/\D/g, '')}`} className="hover:text-red-500 transition-colors">
                  {restaurantInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${restaurantInfo.email}`} className="hover:text-red-500 transition-colors">
                  {restaurantInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {restaurantInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
            <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
