import React, { useState, useEffect, useRef } from 'react';
import { BiLike, BiShare } from 'react-icons/bi';

const OpinionSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer1 = setTimeout(() => setIsVisible(true), 200);
            const timer2 = setTimeout(() => setAnimateCards(true), 600);
            
            return () => {
              clearTimeout(timer1);
              clearTimeout(timer2);
            };
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Dolores",
      location: "Local Guide • 16 reviews",
      rating: 5,
      timeAgo: "3 days ago",
      comment: "Very happy with the service and the overall purchase experience offered by this company. Right now, it's one of the best options available in Spain for this type of service. Also, the staff is incredibly helpful and attentive.",
      likes: 1,
      avatar: "D"
    },
    {
      id: 2,
      name: "Dolores Pérez Carrasco",
      location: "Local Guide • 16 reviews",
      rating: 5,
      timeAgo: "4 months ago",
      comment: "Awaiting the arrival of the next batch I purchased. I will wait around a year for it to arrive. There is everything but it is true that there are expensive things but everything. They pay you. And the things that are not quite right they keep an eye on...",
      likes: 1,
      avatar: "D"
    },
    {
      id: 3,
      name: "Jesús González Martínez",
      location: "Local Guide • 49 reviews",
      rating: 5,
      timeAgo: "4 months ago",
      comment: "I admit that I bought a pallet of Amazon returns of household products with fear, for what they were. Having agreed on the condition with the staff who were ready to assist me was very important. Thank you very much!",
      likes: 1,
      avatar: "J"
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative w-full py-6 px-2 sm:py-10 sm:px-4 md:px-8 overflow-hidden"
    >
      {/* Header Section */}
      <div className={`max-w-7/8 mx-right mb-8 sm:mb-12 transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}>
        {/* Yellow badge */}
        <div className={`inline-block mb-4 sm:mb-8 transform transition-all duration-800 delay-200 ease-out ${
          isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-8 opacity-0 scale-95'
        }`}>
          <div className="bg-[#FFE67B] rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              Opinion of our clients
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className={`bg-[#D9D9D9] backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 max-w-3xl shadow-xl transform transition-all duration-1000 delay-400 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className={`text-[#585858] text-base sm:text-lg md:text-xl leading-relaxed mb-3 sm:mb-4 transform transition-all duration-800 delay-600 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`}>
            Know what our clients think about us and our service.
            The opinions of our clients are very important to us.
          </p>
          <p className={`text-[#585858] text-base sm:text-lg md:text-xl font-medium transform transition-all duration-800 delay-800 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`}>
            Client feedback and satisfaction are our top priorities.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7/8 mx-right relative mb-12 sm:mb-20">
        
        {/* Testimonials - Mobile optimized grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 max-w-7xl">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`relative transform transition-all duration-800 ease-out ${
                animateCards 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: `${400 + index * 200}ms`
              }}
            >
              {/* Gray background - responsive padding */}
              <div className="bg-[#D9D9D9] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 pt-12 sm:pt-20 pb-8 sm:pb-15 h-full min-h-[350px] sm:min-h-[400px] hover:shadow-lg transition-shadow duration-300">
                {/* White card content */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg h-full mx-auto relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* User Info - Mobile optimized */}
                  <div className="flex items-start mb-3 sm:mb-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-orange-400 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-xs sm:text-sm transform transition-all duration-500 ${
                      animateCards ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
                    }`}
                    style={{
                      transitionDelay: `${600 + index * 200}ms`
                    }}>
                      {testimonial.avatar}
                    </div>
                    <div className="ml-2 sm:ml-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {testimonial.location}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-1">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Rating Stars - Mobile optimized */}
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} transform transition-all duration-300`}
                            style={{
                              transitionDelay: `${800 + index * 200 + i * 100}ms`
                            }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1 sm:ml-2">{testimonial.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comment - Mobile text optimization */}
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-4 sm:line-clamp-none">
                    {testimonial.comment}
                  </p>
                  
                  {/* Actions - Mobile optimized */}
                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation">
                      <BiLike className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs">{testimonial.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation">
                      <BiShare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Absolute positioned Boxes Image - Mobile responsive */}
        <div className={`absolute -top-32 -right-20 sm:-top-55 sm:-right-45 z-50 pointer-events-none transform transition-all duration-1200 ease-out ${
          isVisible ? 'translate-x-0 translate-y-0 opacity-100 scale-100' : 'translate-x-20 -translate-y-10 opacity-0 scale-75'
        }`}>
          <div className="relative">
            <img
              src="/assets/boxes_opinion.png"
              alt="Opinion boxes with thumbs up"
              className="w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-170 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpinionSection;