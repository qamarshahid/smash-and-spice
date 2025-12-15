import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { restaurantInfo } from '../config/restaurantInfo';

interface GalleryItem {
  url: string;
  type: 'instagram' | 'image';
  embedCode?: string;
}

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Process gallery items from config
    const processedItems: GalleryItem[] = restaurantInfo.galleryItems.map((url) => {
      const isInstagram = url.includes('instagram.com/p/') || url.includes('instagram.com/reel/');
      
      if (isInstagram) {
        // Extract post ID from Instagram URL
        const postId = url.match(/\/p\/([^\/]+)/)?.[1] || url.match(/\/reel\/([^\/]+)/)?.[1];
        if (postId) {
          // Use Instagram's embed API
          const embedUrl = `https://www.instagram.com/p/${postId}/embed/`;
          return {
            url,
            type: 'instagram',
            embedCode: embedUrl,
          };
        }
      }
      
      return {
        url,
        type: 'image',
      };
    });

    setGalleryItems(processedItems);
  }, []);

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium mb-4 sm:mb-6">
            Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
            Food Worth Sharing
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Follow us on Instagram for daily specials and behind-the-scenes content
          </p>
        </div>

        {galleryItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg sm:rounded-2xl ${
                  index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                {item.type === 'instagram' && item.embedCode ? (
                  <div className={`w-full bg-gray-800 ${
                    index === 0 ? 'h-full min-h-[250px] sm:min-h-[300px] md:min-h-[500px]' : 'aspect-square min-h-[200px] sm:min-h-0'
                  }`}>
                    <iframe
                      src={item.embedCode}
                      className="w-full h-full"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency
                      allow="encrypted-media"
                      title={`Instagram post ${index + 1}`}
                    ></iframe>
                  </div>
                ) : (
                  <>
                    <img
                      src={item.url}
                      alt={`Gallery image ${index + 1}`}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                        index === 0 ? 'h-full min-h-[250px] sm:min-h-[300px] md:min-h-[500px]' : 'aspect-square min-h-[200px] sm:min-h-0'
                      }`}
                    />
                    <a
                      href={restaurantInfo.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6"
                    >
                      <div className="flex items-center gap-2 text-white">
                        <Instagram size={18} />
                        <span className="font-medium">View on Instagram</span>
                      </div>
                    </a>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <a
            href={restaurantInfo.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            <Instagram size={18} />
            Follow {restaurantInfo.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
