import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { restaurantInfo } from '../config/restaurantInfo';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "Is all your food halal certified?",
      answer: "Yes! We only serve Zabiha halal food. All our meat is certified halal and prepared according to Islamic dietary guidelines. We take halal certification seriously and ensure every dish meets the highest standards."
    },
    {
      question: "How do I place an order?",
      answer: "You can place an order by calling us at (848) 228-4033. We're open Monday-Thursday 11AM-10PM, Friday-Saturday 11AM-11PM, and Sunday 12PM-9PM. You can also visit us in person at 323 Raritan Ave, Highland Park, NJ."
    },
    {
      question: "Do you offer delivery or takeout?",
      answer: "Yes! We offer both takeout and delivery. You can order by calling us at (848) 228-4033, or order online through DoorDash. We make everything fresh to order, so please allow time for preparation."
    },
    {
      question: "What makes your chapli platters special?",
      answer: "Our chapli platters are our signature dish, made with authentic spices and traditional recipes perfected over years. Each platter is made fresh to order with high-quality Zabiha halal meat, served with rice and fresh sides. It's a customer favorite!"
    },
    {
      question: "What's the difference between a Smash Burger and a regular burger?",
      answer: "Our Smash Burgers are hand-smashed on the grill, creating a crispy, caramelized crust while keeping the inside juicy. This technique gives our burgers a unique texture and flavor you won't find elsewhere. Available in Single, Double, or Triple patties."
    },
    {
      question: "Do you have vegetarian options?",
      answer: "Yes! We offer several vegetarian options including our Veggie Burger, Falafel Platter, Garden Salad, and various appetizers. All our vegetarian items are prepared with the same care and quality as our meat dishes."
    },
    {
      question: "Can I customize my order?",
      answer: "Absolutely! We're happy to accommodate special requests and modifications when possible. Just let us know your preferences when you place your order, and we'll do our best to make it exactly how you like it."
    },
    {
      question: "Do you accept large orders or catering?",
      answer: "Yes, we welcome large orders and can help with catering for events. Please call us at (848) 228-4033 in advance so we can prepare your order properly. We recommend calling at least 24-48 hours ahead for large orders."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash and all major credit cards. Payment is made when you pick up your order or upon delivery."
    },
    {
      question: "Is there parking available?",
      answer: "Yes, there is parking available near our location at 323 Raritan Ave in Highland Park. Street parking is typically available, and we're easily accessible from the surrounding areas."
    },
    {
      question: "What are your most popular items?",
      answer: "Our most popular items are our Chapli Platters (available in Chicken, Beef, or Mix), Smash Burgers, and Zinger Burgers. Our wings are also a big hit, especially with our variety of sauces including garlic, buffalo, BBQ, and spicy BBQ."
    },
    {
      question: "Are your ingredients fresh?",
      answer: "Absolutely! We use only fresh ingredients and make everything to order. Nothing is pre-made or frozen - every dish is prepared fresh when you order it, ensuring the best quality and taste."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 md:py-32 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium mb-4 sm:mb-6">
            FAQs
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about Smash & Spice
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900/40 rounded-lg border border-gray-800/50 overflow-hidden transition-all hover:border-gray-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-900/60 transition-colors"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="text-red-500" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={24} />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 pt-0">
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Still have questions?
          </p>
          <a
            href={`tel:+1${restaurantInfo.phone.replace(/\D/g, '')}`}
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Call Us: {restaurantInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

