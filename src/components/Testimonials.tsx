import { Star, Quote } from 'lucide-react';
import { restaurantInfo } from '../config/restaurantInfo';

export default function Testimonials() {
  // If no testimonials, don't show the section
  if (!restaurantInfo.testimonials || restaurantInfo.testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            What Our Customers Say
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {restaurantInfo.testimonials.map((review, index) => (
            <div
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-800/50 hover:border-red-600/50 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < (review.rating || 5) ? 'text-yellow-500 fill-current' : 'text-gray-700'}
                  />
                ))}
              </div>
              
              <Quote className="text-red-500/50 mb-3" size={24} />
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold text-sm">
                    {review.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{review.name}</p>
                  {review.date && (
                    <p className="text-gray-500 text-xs">{review.date}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {restaurantInfo.googleReviewLink && (
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Want to share your experience?</p>
            <a
              href={restaurantInfo.googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium"
            >
              <Star size={18} className="text-yellow-500" />
              Leave a review on Google
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

