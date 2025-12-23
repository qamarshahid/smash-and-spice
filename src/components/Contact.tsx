import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, Star, ShoppingBag } from 'lucide-react';
import { restaurantInfo } from '../config/restaurantInfo';
import DoorDashModal from './DoorDashModal';

export default function Contact() {
  const [showDoorDashModal, setShowDoorDashModal] = useState(false);
  const formatPhoneForTel = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    // If it's a 10-digit US number, add country code 1
    if (digits.length === 10) {
      return '1' + digits;
    }
    return digits;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium mb-4 sm:mb-6">
            Visit Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
            Come Hungry, Leave Happy
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Find us in the heart of downtown. Walk-ins welcome, reservations not required.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800/50 hover:border-red-600/50 transition-colors">
              <div className="flex items-start gap-3">
                <MapPin className="text-red-500 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-white mb-1">Location</h3>
                  <p className="text-gray-300">
                    {restaurantInfo.address.street}<br />
                    {restaurantInfo.address.city}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800/50 hover:border-red-600/50 transition-colors">
              <div className="flex items-start gap-3">
                <Clock className="text-red-500 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-white mb-2">Hours</h3>
                  <div className="text-gray-300 space-y-1">
                    {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between gap-4">
                        <span>{day}</span>
                        <span className="font-medium text-white">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800/50 hover:border-red-600/50 transition-colors">
              <div className="flex items-start gap-3">
                <Phone className="text-red-500 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-white mb-1">Phone</h3>
                  <a
                    href={`tel:+${formatPhoneForTel(restaurantInfo.phone)}`}
                    className="text-red-500 hover:text-red-400 font-medium text-lg"
                  >
                    {restaurantInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800/50 hover:border-red-600/50 transition-colors">
              <div className="flex items-start gap-3">
                <Mail className="text-red-500 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-white mb-1">Email</h3>
                  <a
                    href={`mailto:${restaurantInfo.email}`}
                    className="text-red-500 hover:text-red-400 font-medium"
                  >
                    {restaurantInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={restaurantInfo.googleMapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Navigation size={18} />
              Get Directions
            </a>

            {restaurantInfo.doordash && (
              <button
                onClick={() => setShowDoorDashModal(true)}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Order on DoorDash
              </button>
            )}

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50">
              <p className="text-gray-300 mb-4">
                Enjoyed your visit? We'd love to hear about it!
              </p>
              <a
                href={restaurantInfo.googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-500 hover:text-red-400 font-medium"
              >
                <Star size={18} className="text-yellow-500" />
                Leave us a review on Google
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto rounded-lg sm:rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src={restaurantInfo.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${restaurantInfo.name} Location`}
            ></iframe>
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
