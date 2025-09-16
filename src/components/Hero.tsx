import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Shield, ArrowRight, X } from 'lucide-react';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const Hero = () => {
  const { config } = useSiteConfig();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Generate hero slides from config data
  const heroSlides = [
    {
      id: 1,
      title: config.hero.slides.left.title,
      subtitle: config.hero.images.leftImageLabel,
      description: config.hero.slides.left.description,
      image: config.hero.images.leftImage,
      cta: config.hero.ctaButtons.primary,
      badge: config.hero.slides.left.badge,
      badgeColor: config.hero.slides.left.badgeColor,
      features: config.hero.slides.left.features,
      price: config.hero.slides.left.price,
      rating: config.hero.slides.left.rating,
      deliveryTime: config.hero.slides.left.deliveryTime
    },
    {
      id: 2,
      title: config.hero.slides.rightTop.title,
      subtitle: config.hero.images.rightImages.topLabel,
      description: config.hero.slides.rightTop.description,
      image: config.hero.images.rightImages.top,
      cta: config.hero.ctaButtons.secondary,
      badge: config.hero.slides.rightTop.badge,
      badgeColor: config.hero.slides.rightTop.badgeColor,
      features: config.hero.slides.rightTop.features,
      price: config.hero.slides.rightTop.price,
      rating: config.hero.slides.rightTop.rating,
      deliveryTime: config.hero.slides.rightTop.deliveryTime
    },
    {
      id: 3,
      title: config.hero.slides.rightBottom.title,
      subtitle: config.hero.images.rightImages.bottomLabel,
      description: config.hero.slides.rightBottom.description,
      image: config.hero.images.rightImages.bottom,
      cta: "Taste the Magic",
      badge: config.hero.slides.rightBottom.badge,
      badgeColor: config.hero.slides.rightBottom.badgeColor,
      features: config.hero.slides.rightBottom.features,
      price: config.hero.slides.rightBottom.price,
      rating: config.hero.slides.rightBottom.rating,
      deliveryTime: config.hero.slides.rightBottom.deliveryTime
    }
  ];

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 200); // Reduced from 300ms to 200ms
  }, [isTransitioning, heroSlides.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsTransitioning(false);
    }, 200); // Reduced from 300ms to 200ms
  }, [isTransitioning, heroSlides.length]);

  const handleDotClick = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 200); // Reduced from 300ms to 200ms
  }, [isTransitioning, currentSlide]);

  // Auto-rotate slides (reduced frequency for better performance)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000); // Increased from 6000ms to 8000ms

    return () => clearInterval(interval);
  }, [handleNext]);

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="hero-section relative min-h-screen overflow-hidden bg-black">
      {/* Hero Background with Video-like Effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `url(${currentSlideData.image})`,
            transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
            filter: 'brightness(0.3) saturate(1.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-red-900/50 to-orange-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-96 h-96 bg-red-500/5 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-orange-500/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-yellow-500/5 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-48 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-12rem)] py-8 lg:py-16">
          
          {/* Left Content - Brand & CTA */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-8 order-2 lg:order-1">
            
            {/* Brand Identity */}
            <div className="space-y-6">
              {/* Logo & Tagline */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <img 
                  src={config.hero.images.logo} 
                  alt="Smash and Spice Logo"
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain drop-shadow-2xl"
                />
                <div className="text-left">
                  <p className="text-xl lg:text-2xl text-yellow-400 font-black uppercase tracking-wider">
                    {config.business.tagline}
                  </p>
                  <p className="text-lg text-white/90 font-bold">
                    {config.business.slogan}
                  </p>
                </div>
              </div>

                {/* Dynamic Slide Content */}
                <div className={`transition-opacity duration-300 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none mb-4">
                  <span className="block text-yellow-400 drop-shadow-2xl">
                    {currentSlideData.title.split(' ')[0]}
                  </span>
                  <span className="block text-white drop-shadow-2xl">
                    {currentSlideData.title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
                
                <h2 className="text-2xl lg:text-3xl text-yellow-400 font-bold mb-4">
                  {currentSlideData.subtitle}
                </h2>
                
                <p className="text-lg lg:text-xl text-white/95 max-w-2xl leading-relaxed mb-6">
                  {currentSlideData.description}
                </p>
              </div>

                {/* Price & Delivery Time */}
                <div className={`flex items-center justify-center lg:justify-start gap-6 mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-3xl lg:text-4xl font-black text-yellow-400">
                  {currentSlideData.price}
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold">{currentSlideData.deliveryTime}</span>
                </div>
              </div>

                {/* Feature Badges */}
                <div className={`flex flex-wrap justify-center lg:justify-start gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {currentSlideData.features.map((feature, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {feature}
                  </div>
                ))}
              </div>
            </div>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-opacity duration-300 relative ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <button 
                onClick={scrollToMenu}
                className="bg-white hover:bg-gray-100 text-red-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View Full Menu
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {currentSlideData.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

                {/* Trust Indicators */}
                <div className={`flex flex-wrap justify-center lg:justify-start gap-6 pt-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold">Halal Certified</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold">Fresh Daily</span>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-8">
              {/* Previous/Next */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots Navigation */}
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              
              {/* Main Product Container */}
              <div className="relative group">
                {/* Simplified Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
                
                {/* Product Card */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl transition-all duration-200">
                  <div className="relative overflow-hidden rounded-xl">
                        <img 
                          key={currentSlide}
                          src={currentSlideData.image} 
                          alt={currentSlideData.title}
                          className={`w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover transition-opacity duration-300 ${
                            isTransitioning ? 'opacity-0' : 'opacity-100'
                          }`}
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
                    
                    {/* Floating Badge */}
                    <div className={`absolute top-6 right-6 ${currentSlideData.badgeColor} text-white rounded-lg px-4 py-2 text-sm font-bold shadow-lg`}>
                      {currentSlideData.badge}
                    </div>
                  </div>
                  
                  {/* Product Info Card */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl px-6 py-4 shadow-xl min-w-80 border border-gray-200">
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-2">
                        {currentSlideData.subtitle}
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {currentSlideData.deliveryTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Fade to White Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent"></div>

      {/* Delivery Options Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Order Online</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6 text-center">
                Choose your preferred delivery platform to order from <strong>Smash and Spice</strong>
              </p>
              
              <div className="space-y-4">
                {/* Uber Eats */}
                <a 
                  href={config.links.delivery.ubereats} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900">Uber Eats</h4>
                    <p className="text-gray-500 text-sm">15-25 min delivery</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </a>

                {/* DoorDash */}
                <a 
                  href={config.links.delivery.doordash} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-red-500 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900">DoorDash</h4>
                    <p className="text-gray-500 text-sm">20-30 min delivery</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                </a>

                {/* Grubhub */}
                <a 
                  href={config.links.delivery.grubhub} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900">Grubhub</h4>
                    <p className="text-gray-500 text-sm">25-35 min delivery</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </a>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-center text-sm text-gray-500">
                  All delivery times are estimates and may vary
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;