import React from 'react';
import { Heart, Award, Users, Flame } from 'lucide-react';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const Story = () => {
  const { config } = useSiteConfig();

  return (
    <section id="story" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              {config.story.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto px-4">
              {config.story.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-20">
            {/* Story Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Born from Tradition</h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                {config.story.content.intro}
              </p>
              
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                {config.story.content.tradition}
              </p>

              <div className="bg-green-50 rounded-xl p-4 sm:p-6 border border-green-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900">{config.business.tagline}</h4>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {config.story.content.halal}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img 
                src={config.story.images.main} 
                alt="Chapli kebabs cooking"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {config.story.values.map((value, index) => {
              const IconComponent = value.icon === 'Award' ? Award : value.icon === 'Flame' ? Flame : Users;
              return (
                <div key={index} className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-sm border border-gray-200">
                  <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;