interface MenuItem {
  name: string;
  price: string;
  variants?: string;
  description?: string;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Phone, ShoppingBag } from 'lucide-react';
import { restaurantInfo } from '../config/restaurantInfo';
import DoorDashModal from './DoorDashModal';

export default function MenuSection() {
  const navigate = useNavigate();
  const [showDoorDashModal, setShowDoorDashModal] = useState(false);

  const formatPhoneForTel = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return '1' + digits;
    }
    return digits;
  };

  const menuData: MenuCategory[] = [
    {
      name: 'APPETIZER',
      items: [
        { name: '8oz homemade Hummus', price: '$4.99', description: 'Creamy, fresh hummus made daily' },
        { name: 'Falafel', price: '$2.49 / $3.99 / $5.99', variants: '(2pc/4pc/6pc)', description: 'Crispy chickpea fritters, perfectly seasoned' },
        { name: 'Nuggets', price: '$5.99 / $11.99', variants: '(6pc/12pc)', description: 'Crispy halal chicken nuggets' },
        { name: 'Tenders', price: '$6.99 / $13.99', variants: '(3pc/6pc)', description: 'Juicy halal chicken tenders, hand-breaded' },
        { name: 'Shrimp 8pc', price: '$9.99', variants: '(Regular/coconut)', description: 'Fresh shrimp, crispy and golden' },
        { name: 'Onions rings', price: '$4.99', description: 'Golden fried onion rings' },
        { name: 'Mozzarella sticks 6pc', price: '$4.99', description: 'Melted mozzarella, crispy outside' },
      ],
    },
    {
      name: 'FRIES',
      items: [
        { name: 'Fries', price: '$3.99' },
        { name: 'Cheese Fries', price: '$5.99' },
        { name: 'Loaded Fries', price: '$9.99' },
      ],
    },
    {
      name: 'WINGS',
      items: [
        { name: 'Wings', price: '$9.49 / $16.99 / $29.99', variants: '(6pc/12pc/24pc) - garlic / mango / buffalo / honey mustard / BBQ / spicy BBQ', description: 'Halal chicken wings in your choice of sauce' },
      ],
    },
    {
      name: 'SALADS',
      items: [
        { name: 'Garden salad', price: '$6.99' },
        { name: 'Chicken salad', price: '$8.99' },
        { name: 'Lamb salad', price: '$8.99' },
      ],
    },
    {
      name: 'MAINS',
      items: [
        { name: 'Chapli Platter', price: '$11.99 / $13.99 / $12.99', variants: '(Chicken/Beef/Mix)', description: 'Our famous authentic chapli platter, perfectly spiced and grilled to perfection' },
        { name: 'Chicken Platter', price: '$9.99', description: 'Tender halal chicken served with rice and sides' },
        { name: 'Lamb Platter', price: '$10.99', description: 'Succulent halal lamb with traditional sides' },
        { name: 'Mix Platter', price: '$10.99', description: 'Combination of chicken and lamb for the perfect taste' },
        { name: 'Falafel Platter', price: '$9.99', description: 'Crispy falafel served with fresh vegetables and tahini' },
        { name: 'Fish/Shrimp Platter', price: '$11.99', description: 'Fresh seafood platter with your choice of fish or shrimp' },
      ],
    },
    {
      name: 'BURGERS',
      items: [
        { name: 'Zinger Burger', price: '$9.99', variants: '(Regular/Spicy/Chipotle)', description: 'Spicy, crispy chicken burger with our signature zinger sauce' },
        { name: 'Smash Burger', price: '$6.99 / $8.99 / $10.99', variants: '(Single/Double/Triple)', description: 'Hand-smashed halal beef patty, grilled to perfection with classic toppings' },
        { name: 'Veggie Burger', price: '$7.99', description: 'Plant-based patty with fresh vegetables' },
        { name: 'Fish Burger', price: '$7.99', description: 'Crispy fish fillet with tartar sauce' },
        { name: 'Chapli Burger', price: '$7.99', variants: '(Chicken/Beef)', description: 'Authentic chapli kebab in a burger bun, bursting with flavor' },
      ],
    },
    {
      name: 'WRAPS',
      items: [
        { name: 'Pita Wrap', price: '$9.99', variants: '(Chicken / Lamb / Falafel)' },
        { name: 'Pita Chapli Wrap', price: '$9.99', variants: '(Chicken/Beef)' },
      ],
    },
    {
      name: 'SIDES',
      items: [
        { name: 'Mash Potatoes', price: '$2.99' },
        { name: 'Mac n Cheese', price: '$3.99' },
        { name: 'Desi Corn on the Cob', price: '$3.99' },
        { name: 'Coleslaw', price: '$3.99' },
        { name: 'Macaroni Salad', price: '$3.99' },
      ],
    },
    {
      name: 'DESSERT',
      items: [
        { name: 'Tres Leches Cake', price: '$4.99' },
        { name: 'Red Velvet Cake', price: '$4.99' },
        { name: 'Biscoff Cake', price: '$4.99' },
        { name: 'Chocolate Cake', price: '$4.99' },
        { name: 'Waffle', price: '$6.99', variants: '(Maple/Chocolate)' },
      ],
    },
    {
      name: 'DRINKS',
      items: [
        { name: 'Shakes', price: '$7.99', variants: '(Strawberry/Chocolate/Vanilla)' },
        { name: 'Mojitos', price: '$5.99', variants: '(Mint/Mango)' },
        { name: 'Mango Lassi', price: '$4.99' },
        { name: 'Jaritos Mandarin', price: '$2.99' },
        { name: 'Soda', price: '$1.99' },
        { name: 'Water', price: '$1.50' },
      ],
    },
  ];

  // Organize into three columns as shown in the menu
  const leftColumn = ['APPETIZER', 'FRIES', 'WINGS', 'SALADS'];
  const middleColumn = ['MAINS', 'BURGERS', 'WRAPS'];
  const rightColumn = ['SIDES', 'DESSERT', 'DRINKS'];

  const getCategoryData = (categoryName: string) => {
    return menuData.find((cat) => cat.name === categoryName);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium mb-4 sm:mb-6">
            Our Menu
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
            Freshly Made Halal Burgers & Chapli Platters in Highland Park, NJ
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4 mb-6">
            Everything made fresh to order. Quality you can taste.
          </p>
          
          {/* Zabiha Halal Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <CheckCircle2 className="text-green-500" size={24} />
            <span className="text-white font-semibold text-lg">
              <span className="text-green-500">Zabiha Halal</span> Certified
            </span>
          </div>
          
          {/* Order Now CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:+${formatPhoneForTel(restaurantInfo.phone)}`}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
            >
              <Phone size={20} />
              Call: {restaurantInfo.phone}
            </a>
            {restaurantInfo.doordash && (
              <button
                onClick={() => setShowDoorDashModal(true)}
                className="flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg"
              >
                <ShoppingBag size={20} />
                Order on DoorDash
              </button>
            )}
          </div>
        </div>

        {/* Mobile: Single column, Desktop: Three columns */}
        <div className="md:grid md:grid-cols-3 md:gap-8 lg:gap-12 md:items-start">
          {/* Mobile: All categories in one column */}
          <div className="md:hidden space-y-8">
            {menuData.map((category) => (
              <div key={category.name} className="bg-gray-900/40 rounded-lg p-6 border border-gray-800/50">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wide border-b border-red-600/50 pb-3">
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="py-3 border-b border-gray-800/50 last:border-0"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-base leading-tight mb-1">{item.name}</div>
                          {item.description && (
                            <div className="text-gray-400 text-sm mt-1.5 leading-relaxed mb-1">{item.description}</div>
                          )}
                          {item.variants && (
                            <div className="text-gray-500 text-xs mt-1.5 leading-relaxed">{item.variants}</div>
                          )}
                        </div>
                        <span className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-bold whitespace-nowrap flex-shrink-0 ml-2">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Three columns - Left */}
          <div className="hidden md:block">
            {leftColumn.map((categoryName) => {
              const category = getCategoryData(categoryName);
              if (!category) return null;
              return (
                <div key={category.name} className="mb-10 last:mb-0">
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-gray-700 pb-2">
                    {category.name}
                  </h3>
                  <div className="space-y-2.5">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start gap-3 py-2.5 border-b border-gray-800/50 last:border-0"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="text-white font-semibold text-sm leading-tight mb-0.5">{item.name}</div>
                          {item.description && (
                            <div className="text-gray-400 text-xs mt-1 leading-relaxed mb-0.5">{item.description}</div>
                          )}
                          {item.variants && (
                            <div className="text-gray-500 text-xs mt-1 leading-relaxed">{item.variants}</div>
                          )}
                        </div>
                        <span className="bg-red-600 text-white px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0 self-start">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: Three columns - Middle */}
          <div className="hidden md:block">
            {middleColumn.map((categoryName) => {
              const category = getCategoryData(categoryName);
              if (!category) return null;
              return (
                <div key={category.name} className="mb-10 last:mb-0">
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-gray-700 pb-2">
                    {category.name}
                  </h3>
                  <div className="space-y-2.5">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start gap-3 py-2.5 border-b border-gray-800/50 last:border-0"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="text-white font-semibold text-sm leading-tight mb-0.5">{item.name}</div>
                          {item.description && (
                            <div className="text-gray-400 text-xs mt-1 leading-relaxed mb-0.5">{item.description}</div>
                          )}
                          {item.variants && (
                            <div className="text-gray-500 text-xs mt-1 leading-relaxed">{item.variants}</div>
                          )}
                        </div>
                        <span className="bg-red-600 text-white px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0 self-start">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: Three columns - Right */}
          <div className="hidden md:block">
            {rightColumn.map((categoryName) => {
              const category = getCategoryData(categoryName);
              if (!category) return null;
              return (
                <div key={category.name} className="mb-10 last:mb-0">
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-gray-700 pb-2">
                    {category.name}
                  </h3>
                  <div className="space-y-2.5">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start gap-3 py-2.5 border-b border-gray-800/50 last:border-0"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="text-white font-semibold text-sm leading-tight mb-0.5">{item.name}</div>
                          {item.description && (
                            <div className="text-gray-400 text-xs mt-1 leading-relaxed mb-0.5">{item.description}</div>
                          )}
                          {item.variants && (
                            <div className="text-gray-500 text-xs mt-1 leading-relaxed">{item.variants}</div>
                          )}
                        </div>
                        <span className="bg-red-600 text-white px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0 self-start">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Order Now CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gray-900/60 rounded-lg p-6 sm:p-8 border border-gray-800/50">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Order?
            </h3>
            <p className="text-gray-400 mb-6 text-lg">
              Call us now to place your order for fresh, authentic Zabiha halal food
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:+${formatPhoneForTel(restaurantInfo.phone)}`}
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
              >
                <Phone size={20} />
                Call: {restaurantInfo.phone}
              </a>
              {restaurantInfo.doordash && (
                <a
                  href={restaurantInfo.doordash}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg"
                >
                  <ShoppingBag size={20} />
                  Order on DoorDash
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DoorDash Modal */}
      {restaurantInfo.doordash && (
        <DoorDashModal
          isOpen={showDoorDashModal}
          onClose={() => setShowDoorDashModal(false)}
          onContinue={() => {
            window.open(restaurantInfo.doordash, '_blank', 'noopener,noreferrer');
            setShowDoorDashModal(false);
          }}
        />
      )}
    </section>
  );
}
