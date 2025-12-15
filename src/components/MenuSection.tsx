interface MenuItem {
  name: string;
  price: string;
  variants?: string;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export default function MenuSection() {
  const menuData: MenuCategory[] = [
    {
      name: 'APPETIZER',
      items: [
        { name: '8oz homemade Hummus', price: '$4.99' },
        { name: 'Falafel', price: '$2.49 / $3.99 / $5.99', variants: '(2pc/4pc/6pc)' },
        { name: 'Nuggets', price: '$5.99 / $11.99', variants: '(6pc/12pc)' },
        { name: 'Tenders', price: '$6.99 / $13.99', variants: '(3pc/6pc)' },
        { name: 'Shrimp 8pc', price: '$9.99', variants: '(Regular/coconut)' },
        { name: 'Onions rings', price: '$4.99' },
        { name: 'Mozzarella sticks 6pc', price: '$4.99' },
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
        { name: 'Wings', price: '$9.49 / $16.99 / $29.99', variants: '(6pc/12pc/24pc) - garlic / mango / buffalo / honey mustard / BBQ / spicy BBQ' },
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
        { name: 'Chapli Platter', price: '$11.99 / $13.99 / $12.99', variants: '(Chicken/Beef/Mix)' },
        { name: 'Chicken Platter', price: '$9.99' },
        { name: 'Lamb Platter', price: '$10.99' },
        { name: 'Mix Platter', price: '$10.99' },
        { name: 'Falafel Platter', price: '$9.99' },
        { name: 'Fish/Shrimp Platter', price: '$11.99' },
      ],
    },
    {
      name: 'BURGERS',
      items: [
        { name: 'Zinger Burger', price: '$9.99', variants: '(Regular/Spicy/Chipotle)' },
        { name: 'Smash Burger', price: '$6.99 / $8.99 / $10.99', variants: '(Single/Double/Triple)' },
        { name: 'Veggie Burger', price: '$7.99' },
        { name: 'Fish Burger', price: '$7.99' },
        { name: 'Chapli Burger', price: '$7.99', variants: '(Chicken/Beef)' },
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
        { name: 'Shakes', price: '$8.99', variants: '(Strawberry/Chocolate/Vanilla/Oreo)' },
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
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium mb-4 sm:mb-6">
            Our Menu
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
            What's Cooking?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Everything made fresh to order. Quality you can taste.
          </p>
        </div>

        {/* Mobile: Single column, Desktop: Three columns */}
        <div className="md:grid md:grid-cols-3 md:gap-10 lg:gap-16">
          {/* Mobile: All categories in one column */}
          <div className="md:hidden space-y-10">
            {menuData.map((category) => (
              <div key={category.name} className="bg-gray-900/40 rounded-lg p-5 border border-gray-800/50">
                <h3 className="text-xl font-bold text-white mb-5 uppercase tracking-wide border-b border-red-600/50 pb-3">
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 py-3 border-b border-gray-800/50 last:border-0"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-base leading-tight">{item.name}</div>
                          {item.variants && (
                            <div className="text-gray-400 text-sm mt-1.5 leading-relaxed">{item.variants}</div>
                          )}
                        </div>
                        <span className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-bold whitespace-nowrap flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Three columns */}
          <div className="hidden md:block space-y-8">
            {leftColumn.map((categoryName) => {
              const category = getCategoryData(categoryName);
              if (!category) return null;
              return (
                <div key={category.name} className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-5 uppercase tracking-wide border-b border-gray-700 pb-2">
                    {category.name}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start gap-4 py-3 border-b border-gray-800 last:border-0"
                      >
                        <div className="flex-1">
                          <div className="text-white font-semibold text-base">{item.name}</div>
                          {item.variants && (
                            <div className="text-gray-500 text-sm mt-1 break-words">{item.variants}</div>
                          )}
                        </div>
                        <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold whitespace-nowrap flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:block space-y-8">
            {middleColumn.map((categoryName) => {
              const category = getCategoryData(categoryName);
              if (!category) return null;
              return (
                <div key={category.name} className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-5 uppercase tracking-wide border-b border-gray-700 pb-2">
                    {category.name}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start gap-4 py-3 border-b border-gray-800 last:border-0"
                      >
                        <div className="flex-1">
                          <div className="text-white font-semibold text-base">{item.name}</div>
                          {item.variants && (
                            <div className="text-gray-500 text-sm mt-1 break-words">{item.variants}</div>
                          )}
                        </div>
                        <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold whitespace-nowrap flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:block space-y-8">
            {rightColumn.map((categoryName) => {
              const category = getCategoryData(categoryName);
              if (!category) return null;
              return (
                <div key={category.name} className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-5 uppercase tracking-wide border-b border-gray-700 pb-2">
                    {category.name}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start gap-4 py-3 border-b border-gray-800 last:border-0"
                      >
                        <div className="flex-1">
                          <div className="text-white font-semibold text-base">{item.name}</div>
                          {item.variants && (
                            <div className="text-gray-500 text-sm mt-1 break-words">{item.variants}</div>
                          )}
                        </div>
                        <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold whitespace-nowrap flex-shrink-0">
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
      </div>
    </section>
  );
}
