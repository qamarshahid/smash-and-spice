import { MapPin, Clock, Phone } from 'lucide-react';
import { restaurantInfo } from '../config/restaurantInfo';

export default function Hero() {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatPhoneForTel = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    // If it's a 10-digit US number, add country code 1
    if (digits.length === 10) {
      return '1' + digits;
    }
    return digits;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gray-950 pt-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Grand Opening Announcement */}
          <div className="mb-4 sm:mb-6">
            <p className="text-red-500 text-base sm:text-lg font-medium">
              Opening December 18, 2025
            </p>
          </div>

          {/* Animated heading */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight px-2">
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <span className="bg-gradient-to-r from-white via-white to-red-500 bg-clip-text text-transparent animate-gradient">
                  Smash
                </span>
              </span>
              <span className="inline-block mx-2 text-red-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                &
              </span>
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-white bg-clip-text text-transparent animate-gradient">
                  Spice
                </span>
              </span>
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-gray-400 font-light animate-fade-in-up px-4" style={{ animationDelay: '0.7s' }}>
              Famous Chapli Platters & Hand-Smashed Burgers
            </p>
            <p className="text-base sm:text-lg text-gray-500 animate-fade-in-up px-4" style={{ animationDelay: '0.8s', opacity: 0 }}>
              Best Chapli Platters, Smash Burgers & Zinger Burgers Near Me
            </p>
          </div>

          {/* Simple description */}
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mt-6 sm:mt-8 px-4 animate-fade-in-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
            Authentic flavors perfected through years of experience. 
            From our kitchen to your table, every dish tells our story.
          </p>
          
          <div className="mt-4 sm:mt-6 px-4 animate-fade-in-up" style={{ animationDelay: '1s', opacity: 0 }}>
            <p className="text-sm sm:text-base text-white font-medium">
              We only serve <span className="text-red-500">Zabiha halal</span> food.
            </p>
          </div>

          {/* Simple buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-12 px-4 animate-fade-in-up" style={{ animationDelay: '1.1s', opacity: 0 }}>
            <button
              onClick={scrollToMenu}
              className="w-full sm:w-auto bg-red-600 text-white px-8 sm:px-10 py-3 text-base sm:text-lg font-medium hover:bg-red-700 transition-colors"
            >
              View Menu
            </button>
            <a
              href={`tel:+${formatPhoneForTel(restaurantInfo.phone)}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-white border border-gray-700 px-8 sm:px-10 py-3 text-base sm:text-lg font-medium hover:border-gray-600 hover:bg-gray-900 transition-colors"
            >
              <Phone size={18} />
              Call to Order
            </a>
          </div>

          {/* Address and Hours */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-12 sm:mt-16 text-gray-400 px-4 text-sm sm:text-base">
            <a
              href={restaurantInfo.googleMapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MapPin size={18} />
              <span>{restaurantInfo.address.street}</span>
            </a>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>11AM - 10PM Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
