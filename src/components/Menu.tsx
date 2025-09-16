import { useState, useEffect } from 'react';
import { X, ArrowRight, Star, Search, Beef, Coffee, Pizza, Circle } from 'lucide-react';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const Menu = () => {
  const { config } = useSiteConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsToShow, setItemsToShow] = useState(8); // Show 8 items initially (2 rows of 4)
  
  // Use only the menu items from config (admin panel managed)
  const allMenuItems = config.menu.items;

  const categories = [
    { id: 'featured', name: 'Featured', icon: Star, color: 'text-yellow-500' },
    { id: 'kebabs', name: 'Kebabs', icon: Beef, color: 'text-red-500' },
    { id: 'rice-platters', name: 'Rice Platters', icon: Circle, color: 'text-green-500' },
    { id: 'burgers', name: 'Burgers', icon: Circle, color: 'text-orange-500' },
    { id: 'sides', name: 'Sides', icon: Pizza, color: 'text-purple-500' },
    { id: 'drinks', name: 'Drinks', icon: Coffee, color: 'text-blue-500' }
  ];

  // Filter items based on active category and search
  const filteredItems = allMenuItems.filter(item => {
    const matchesCategory = activeCategory === 'featured' ? 
      (item.category === 'highlights' || item.featured) : 
      item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.available && !item.soldOut;
  });

  // Get items to display based on pagination
  const displayedItems = filteredItems.slice(0, itemsToShow);
  const hasMoreItems = filteredItems.length > itemsToShow;

  // Load more function
  const loadMoreItems = () => {
    setItemsToShow(prev => prev + 8); // Load 8 more items (2 more rows)
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Reset pagination when category or search changes
  useEffect(() => {
    setItemsToShow(8);
  }, [activeCategory, searchTerm]);

  return (
    <section id="menu" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header - McDonald's Style */}
        <div className="text-center mb-16">
          <div className="relative">
            <h2 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">
              OUR MENU
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed font-medium">
            Discover our signature dishes crafted with authentic Pakistani flavors and premium ingredients
          </p>
        </div>

        {/* Search and Filter Section - Clean & Professional */}
        <div className="mb-16">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar - Clean & Simple */}
            <div className="mb-8">
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-4 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-200 text-base"
                />
              </div>
            </div>

            {/* Category Filter - Simple Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeCategory === category.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${
                      activeCategory === category.id ? 'text-white' : category.color
                    }`} />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Items Grid - Compact 4 Items Per Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {displayedItems.map((item) => (
            <div key={item.id} className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full">
              {/* Food Image - Reduced Height */}
              <div className="relative overflow-hidden h-36">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY2YjM1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb29kIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {item.combo && (
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                      COMBO
                    </div>
                  )}
                  {item.soldOut && (
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                      SOLD OUT
                    </div>
                  )}
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-2 right-2 bg-orange-500 rounded-lg px-3 py-1.5 shadow-xl z-20">
                  <span className="text-lg font-black text-white">{item.price}</span>
                </div>
              </div>
              
              {/* Item Info - Compact Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-black text-gray-900 mb-2 line-clamp-1 tracking-tight">
                  {item.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 font-semibold tracking-wide">{item.calories}</span>
                </div>
                
                <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow font-medium">
                  {item.description}
                </p>
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-lg font-black text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-auto uppercase tracking-wide"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('featured');
                setItemsToShow(8); // Reset pagination
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button - Simple & Clean */}
        {hasMoreItems && (
          <div className="text-center py-8">
            <button
              onClick={loadMoreItems}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-base transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Load More Items
            </button>
            
            <p className="text-gray-500 text-sm mt-3">
              Showing {itemsToShow} of {filteredItems.length} items
            </p>
          </div>
        )}

        {/* CTA Section - Professional Style */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-red-600 rounded-2xl p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-6 right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-6 left-6 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">
                Ready to <span className="text-yellow-400">Order?</span>
              </h3>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
                Fresh ingredients, authentic flavors, lightning-fast preparation
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Start Your Order
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  View Full Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Menu;