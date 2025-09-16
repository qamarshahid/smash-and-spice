import React from 'react';
import { Menu, ShoppingBag, Phone, Heart } from 'lucide-react';

const MobileMenu = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden shadow-lg">
      <div className="grid grid-cols-4 gap-1 p-2">
        <button 
          onClick={() => scrollToSection('menu')}
          className="flex flex-col items-center justify-center py-3 px-2 text-gray-600 hover:text-orange-500 transition-colors"
        >
          <Menu className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Menu</span>
        </button>
        
        <button className="flex flex-col items-center justify-center py-3 px-2 text-gray-600 hover:text-orange-500 transition-colors">
          <a href="https://ubereats.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
            <ShoppingBag className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Order</span>
          </a>
        </button>
        
        <button 
          onClick={() => scrollToSection('story')}
          className="flex flex-col items-center justify-center py-3 px-2 text-gray-600 hover:text-orange-500 transition-colors"
        >
          <Heart className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Story</span>
        </button>
        
        <button 
          onClick={() => scrollToSection('contact')}
          className="flex flex-col items-center justify-center py-3 px-2 text-gray-600 hover:text-orange-500 transition-colors"
        >
          <Phone className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Contact</span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;