import { useEffect } from 'react';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const SEO = () => {
  const { config } = useSiteConfig();

  useEffect(() => {
    // Update document title
    document.title = config.seo.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.seo.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', config.seo.keywords);
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', config.seo.title);
    }

    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', config.seo.description);
    }

    // Update Open Graph image
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', config.seo.ogImage);
    }

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', config.seo.title);
    }

    // Update Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', config.seo.description);
    }

    // Update Twitter image
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', config.seo.ogImage);
    }

    // Update structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": config.business.name,
      "description": config.business.description,
      "url": window.location.origin,
      "telephone": config.business.phone,
      "email": config.business.email,
      "image": config.seo.ogImage,
      "logo": config.hero.images.logo,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": config.business.address.street,
        "addressLocality": config.business.address.city,
        "addressRegion": config.business.address.state,
        "postalCode": config.business.address.zip,
        "addressCountry": "US"
      },
      "openingHours": [
        `Mo-Th ${config.business.hours.monday.replace('AM', ':00').replace('PM', ':00')}`,
        `Fr-Sa ${config.business.hours.friday.replace('AM', ':00').replace('PM', ':00')}`,
        `Su ${config.business.hours.sunday.replace('AM', ':00').replace('PM', ':00')}`
      ],
      "servesCuisine": ["Pakistani", "Halal", "Middle Eastern", "South Asian"],
      "priceRange": "$$",
      "acceptsReservations": false,
      "hasDeliveryService": true,
      "hasTakeawayService": true,
      "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
      "currenciesAccepted": "USD",
      "menu": `${window.location.origin}/#menu`
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [config]);

  return null; // This component doesn't render anything
};

export default SEO;
