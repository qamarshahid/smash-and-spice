export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our Story
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
          <p>
            At 18, I started working in restaurant kitchens, grinding every day to support my family and cover expenses. 
            Long hours, low pay, but I was learning. Every shift taught me something new about food, about people, about what makes a great meal.
          </p>
          
          <p>
            Around the same time, I started making content. Just sharing what I was cooking, what I was learning. 
            Nothing fancy—just real food, real stories. Slowly, people started following. Really following. 
            That community grew to over <span className="text-red-500 font-semibold">400,000 followers</span>, and they weren't just numbers. 
            They were people who believed in what I was doing.
          </p>
          
          <p>
            I saved every dollar I could. Learned every recipe. Perfected the dishes that would become our signature: 
            the famous <span className="text-orange-500 font-semibold">chapli platters</span> and our 
            <span className="text-red-500 font-semibold"> smash and zinger burgers</span>. 
            Every test, every tweak, every late night in the kitchen was getting me closer.
          </p>
          
          <p className="pt-4 sm:pt-6 border-t border-gray-800 text-lg sm:text-xl text-white">
            Today, that dream is real. Smash & Spice isn't just a restaurant—it's proof that hard work, 
            passion, and staying true to yourself can turn your vision into something real. 
            Come taste the difference that comes from doing it the right way.
          </p>
        </div>
      </div>
    </section>
  );
}
