import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Gift } from 'lucide-react';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const Contact = () => {
  const { config } = useSiteConfig();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'feedback'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      type: 'feedback'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              {config.contact.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">
              {config.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-8 h-8 text-orange-500" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{config.contact.formTitle}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 transition-colors text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 transition-colors text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 transition-colors text-sm sm:text-base"
                    placeholder="(732) 555-1234"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">
                    Message Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="feedback">General Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="compliment">Compliment</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="catering">Catering Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 transition-colors resize-y text-sm sm:text-base"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-white font-bold text-base sm:text-lg transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Rewards & Newsletter */}
            <div className="space-y-8">
              {/* Rewards Program */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{config.contact.orderOnlineTitle}</h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  {config.contact.orderOnlineDescription}
                </p>
                <div className="space-y-4">
                  <a href={config.links.delivery.ubereats} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-black hover:bg-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-bold transition-all duration-300 text-sm sm:text-base">
                    <div className="w-6 h-6 mr-3 bg-white rounded flex items-center justify-center">
                      <span className="text-black text-xs font-bold">U</span>
                    </div>
                    Uber Eats
                  </a>
                  <a href={config.links.delivery.doordash} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-bold transition-all duration-300 text-sm sm:text-base">
                    <div className="w-6 h-6 mr-3 bg-white rounded flex items-center justify-center">
                      <span className="text-red-600 text-xs font-bold">D</span>
                    </div>
                    DoorDash
                  </a>
                  <a href={config.links.delivery.grubhub} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-bold transition-all duration-300 text-sm sm:text-base">
                    <div className="w-6 h-6 mr-3 bg-white rounded flex items-center justify-center">
                      <span className="text-orange-500 text-xs font-bold">G</span>
                    </div>
                    Grubhub
                  </a>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{config.contact.quickContactTitle}</h3>
                <div className="space-y-4">
                  <a 
                    href={`tel:${config.business.phone}`}
                    className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <Phone className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="text-gray-900 font-semibold text-sm sm:text-base">Call Us</p>
                      <p className="text-gray-600 text-sm">{config.business.phone}</p>
                    </div>
                  </a>
                  <a 
                    href={`mailto:${config.business.email}`}
                    className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <Mail className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="text-gray-900 font-semibold text-sm sm:text-base">Email Us</p>
                      <p className="text-gray-600 text-sm">{config.business.email}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;