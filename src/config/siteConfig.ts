export interface MenuItem {
  id: number;
  name: string;
  price?: string;
  calories: string;
  description: string;
  image: string;
  combo?: boolean;
  category: string;
  available?: boolean;
  soldOut?: boolean;
  featured?: boolean;
}

export interface SiteConfig {
  // Business Information
  business: {
    name: string;
    tagline: string;
    slogan: string;
    description: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    hours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    isOpen: boolean;
    certifications: string[];
  };

  // Hero Section
  hero: {
    mainHeadline: string[];
    subHeadline: string;
    ctaButtons: {
      primary: string;
      secondary: string;
    };
    slides: {
      left: {
        title: string;
        description: string;
        badge: string;
        badgeColor: string;
        features: string[];
        price: string;
        rating: number;
        deliveryTime: string;
      };
      rightTop: {
        title: string;
        description: string;
        badge: string;
        badgeColor: string;
        features: string[];
        price: string;
        rating: number;
        deliveryTime: string;
      };
      rightBottom: {
        title: string;
        description: string;
        badge: string;
        badgeColor: string;
        features: string[];
        price: string;
        rating: number;
        deliveryTime: string;
      };
    };
    images: {
      logo: string;
      leftImage: string;
      leftImageLabel: string;
      rightImages: {
        top: string;
        topLabel: string;
        bottom: string;
        bottomLabel: string;
      };
    };
  };

  // Menu Items
  menu: {
    categories: string[];
    items: MenuItem[];
  };

  // Story Section
  story: {
    title: string;
    subtitle: string;
    content: {
      intro: string;
      tradition: string;
      halal: string;
    };
    values: {
      title: string;
      description: string;
      icon: string;
    }[];
    images: {
      main: string;
    };
  };

  // Contact Section
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    orderOnlineTitle: string;
    orderOnlineDescription: string;
    quickContactTitle: string;
  };

  // Footer Section
  footer: {
    quickLinks: {
      catering: string;
      rewards: string;
    };
    legalLinks: {
      privacyPolicy: string;
      termsOfService: string;
    };
  };

  // Social Media & External Links
  links: {
    social: {
      instagram: string;
      facebook: string;
      twitter: string;
    };
    delivery: {
      ubereats: string;
      doordash: string;
      grubhub: string;
    };
  };

  // SEO & Meta
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
}

// Force config refresh by updating version
const CONFIG_VERSION = '1.1.0';

export const defaultSiteConfig: SiteConfig = {
  business: {
    name: "Smash and Spice",
    tagline: "100% Zabiha Halal",
    slogan: "Where Every Bite Tells a Story of Flavor",
    description: "Highland Park's premier destination for authentic chapli kebabs, rice platters, and zinger burgers. Where tradition meets flavor.",
    phone: "(732) 555-1234",
    email: "info@smashandspice.com",
    address: {
      street: "123 Raritan Avenue",
      city: "Highland Park",
      state: "NJ",
      zip: "08904"
    },
    hours: {
      monday: "11AM - 10PM",
      tuesday: "11AM - 10PM", 
      wednesday: "11AM - 10PM",
      thursday: "11AM - 10PM",
      friday: "11AM - 11PM",
      saturday: "11AM - 11PM",
      sunday: "12PM - 10PM"
    },
    isOpen: true,
    certifications: ["100% Zabiha Halal Certified"]
  },

  hero: {
    mainHeadline: ["SMASH", "THE", "HUNGER"],
    subHeadline: "Smash the Ordinary, Spice Up Your Life!",
    ctaButtons: {
      primary: "View Menu",
      secondary: "Order Online"
    },
    slides: {
      left: {
        title: "SMASH THE HUNGER",
        description: "Where tradition meets taste! Our legendary chapli kebabs are hand-crafted with 100% Zabiha Halal beef and secret Peshawar spices that will make your taste buds dance!",
        badge: "LEGENDARY TASTE",
        badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
        features: ["100% Halal Certified", "Fresh Daily", "Traditional Recipe"],
        price: "$16.99",
        rating: 4.9,
        deliveryTime: "15-20 min"
      },
      rightTop: {
        title: "SPICE UP YOUR LIFE",
        description: "Life's too short for boring food! Our tender marinated chicken over fragrant basmati rice with signature sauces will spice up your day and satisfy your soul!",
        badge: "STREET FOOD KING",
        badgeColor: "bg-gradient-to-r from-green-500 to-teal-500",
        features: ["High Protein", "Balanced Nutrition", "Quick Serve"],
        price: "$14.99",
        rating: 4.8,
        deliveryTime: "10-15 min"
      },
      rightBottom: {
        title: "CRISPY & DELICIOUS",
        description: "Get ready for a flavor explosion! Our famous zinger burger with crispy spiced chicken, fresh veggies, and premium brioche bun will make you forget all other burgers!",
        badge: "FLAVOR EXPLOSION",
        badgeColor: "bg-gradient-to-r from-red-600 to-red-700",
        features: ["Extra Spicy", "Crispy Coating", "Fresh Ingredients"],
        price: "$12.99",
        rating: 4.7,
        deliveryTime: "8-12 min"
      }
    },
    images: {
      logo: "https://qamarshahid.github.io/smash-and-spice/PHOTO-2025-07-22-21-55-22.jpg",
      leftImage: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500",
      leftImageLabel: "Chapli Kebab",
      rightImages: {
        top: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        topLabel: "Chicken Over Rice",
        bottom: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400",
        bottomLabel: "Lamb Over Rice"
      }
    }
  },

  menu: {
    categories: ["highlights", "kebabs", "rice-platters", "burgers", "sides", "drinks"],
    items: [
      {
        id: 1,
        name: "Chapli Kebab Platter",
        price: "$16.99",
        calories: "850 Cal",
        description: "Traditional Peshawar-style minced beef chapli kebab with authentic spices, served with fresh naan, basmati rice, salad, and mint chutney.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format",
        combo: true,
        category: "highlights",
        available: true
      },
      {
        id: 2,
        name: "Chicken Over Rice Platter",
        price: "$14.99",
        calories: "920 Cal",
        description: "Tender halal chicken over fragrant basmati rice with white sauce, hot sauce, and fresh salad.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
        combo: true,
        category: "highlights",
        available: true
      },
      {
        id: 3,
        name: "Lamb Over Rice Platter",
        price: "$18.99",
        calories: "1050 Cal",
        description: "Succulent halal lamb over basmati rice with traditional sauces and fresh vegetables.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
        combo: true,
        category: "highlights",
        available: true
      },
      {
        id: 4,
        name: "Zinger Burger",
        price: "$12.99",
        calories: "780 Cal",
        description: "Crispy fried chicken breast with spicy mayo, fresh lettuce, and tomato on brioche bun.",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop&auto=format",
        combo: true,
        category: "highlights",
        available: true
      },
      {
        id: 5,
        name: "Chicken Tikka Kebab",
        price: "$11.99",
        calories: "580 Cal",
        description: "Tender chicken marinated in yogurt and aromatic spices, grilled to perfection",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format",
        category: "kebabs",
        available: true
      },
      {
        id: 6,
        name: "Lamb Seekh Kebab",
        price: "$15.99",
        calories: "720 Cal",
        description: "Grilled lamb skewers with traditional spices and herbs",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
        category: "kebabs",
        available: true
      },
      {
        id: 7,
        name: "Beef Burger",
        price: "$13.99",
        calories: "820 Cal",
        description: "Juicy beef patty with lettuce, tomato, onion, and special sauce",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop&auto=format",
        category: "burgers",
        available: true
      },
      {
        id: 8,
        name: "Chicken Burger",
        price: "$11.99",
        calories: "650 Cal",
        description: "Grilled chicken breast with fresh vegetables and mayo",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop&auto=format",
        category: "burgers",
        available: true
      },
      {
        id: 9,
        name: "Mixed Grill Rice",
        price: "$19.99",
        calories: "1150 Cal",
        description: "Combination of chicken, lamb, and beef over fragrant basmati rice",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
        category: "rice-platters",
        available: true
      },
      {
        id: 10,
        name: "Fish Over Rice",
        price: "$16.99",
        calories: "780 Cal",
        description: "Fresh grilled fish over basmati rice with traditional sauces",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
        category: "rice-platters",
        available: true
      },
      {
        id: 11,
        name: "Spicy Chicken Wings",
        price: "$9.99",
        calories: "450 Cal",
        description: "Crispy chicken wings tossed in our signature spicy sauce",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format",
        category: "sides",
        available: true
      },
      {
        id: 12,
        name: "Fresh Fruit Smoothie",
        price: "$6.99",
        calories: "280 Cal",
        description: "Blend of fresh mango, banana, and yogurt",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
        category: "drinks",
        available: true
      },
      {
        id: 13,
        name: "Caesar Salad",
        price: "$8.99",
        calories: "320 Cal",
        description: "Fresh romaine lettuce with parmesan and croutons",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format",
        category: "sides",
        available: true
      },
      {
        id: 14,
        name: "Chocolate Milkshake",
        price: "$5.99",
        calories: "420 Cal",
        description: "Rich chocolate milkshake with whipped cream",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
        category: "drinks",
        available: true
      }
    ]
  },

  story: {
    title: "Our Story",
    subtitle: "From the bustling streets of Peshawar to Highland Park, NJ - a journey of authentic flavors, family traditions, and the pursuit of the perfect chapli kebab",
    content: {
      intro: "Smash and Spice began as a dream to bring the authentic taste of Pakistani street food to New Jersey. Our founder, raised on the aromatic chapli kebabs of Peshawar, spent years perfecting the traditional recipes passed down through generations.",
      tradition: "Every chapli kebab is hand-crafted using the same techniques his grandmother taught him - the perfect blend of minced meat, fresh herbs, and secret spices that create that distinctive flat, crispy exterior and juicy interior that chapli kebabs are famous for.",
      halal: "All our meat is sourced from certified Zabiha Halal suppliers and prepared according to Islamic law. We maintain strict halal standards in our kitchen with separate preparation areas and utensils."
    },
    values: [
      {
        title: "Authentic Quality",
        description: "We source only the finest Zabiha Halal ingredients and follow traditional cooking methods to ensure every bite is authentic and delicious.",
        icon: "Award"
      },
      {
        title: "Fresh Daily",
        description: "Every chapli kebab is made fresh to order. Our spices are ground daily and our meat is prepared fresh every morning for maximum flavor.",
        icon: "Flame"
      },
      {
        title: "Community First",
        description: "Highland Park is our home. We're proud to serve our neighbors with food that brings families together and creates lasting memories.",
        icon: "Users"
      }
    ],
    images: {
      main: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  },

  contact: {
    title: "Get In Touch",
    subtitle: "We'd love to hear from you! Share your feedback, join our rewards program, or just say hello",
    formTitle: "Send us a Message",
    orderOnlineTitle: "Order Online",
    orderOnlineDescription: "Order our delicious chapli kebabs and rice platters for delivery or pickup through these platforms:",
    quickContactTitle: "Quick Contact"
  },

  footer: {
    quickLinks: {
      catering: "#catering",
      rewards: "#rewards"
    },
    legalLinks: {
      privacyPolicy: "#privacy",
      termsOfService: "#terms"
    }
  },

  links: {
    social: {
      instagram: "https://instagram.com/smashandspice",
      facebook: "https://facebook.com/smashandspice",
      twitter: "https://twitter.com/smashandspice"
    },
    delivery: {
      ubereats: "https://ubereats.com/stores/smash-and-spice",
      doordash: "https://doordash.com/store/smash-and-spice",
      grubhub: "https://grubhub.com/restaurant/smash-and-spice"
    }
  },

  seo: {
    title: "Smash and Spice - Authentic Pakistani Cuisine | Chapli Kebabs & Rice Platters | Highland Park, NJ",
    description: "Smash and Spice - Highland Park's premier Pakistani restaurant serving authentic chapli kebabs, chicken & lamb over rice platters, and zinger burgers. 100% Zabiha Halal certified. Order online for pickup and delivery.",
    keywords: "chapli kebab Highland Park, Pakistani food NJ, halal rice platters, zinger burger New Jersey, zabiha halal restaurant, chicken over rice Highland Park, lamb over rice NJ, authentic Pakistani cuisine, halal food Highland Park NJ",
    ogImage: "https://smashandspice.com/og-image.jpg"
  }
};

// Local storage functions
export const getSiteConfig = (): SiteConfig => {
  if (typeof window === 'undefined') return defaultSiteConfig;
  
  const stored = localStorage.getItem('smashandspice-config');
  if (stored) {
    try {
      return { ...defaultSiteConfig, ...JSON.parse(stored) };
    } catch (error) {
      console.error('Error parsing stored config:', error);
      return defaultSiteConfig;
    }
  }
  return defaultSiteConfig;
};

export const setSiteConfig = (config: SiteConfig): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('smashandspice-config', JSON.stringify(config));
};

export const resetSiteConfig = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('smashandspice-config');
};