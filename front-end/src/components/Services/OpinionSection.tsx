import React, { useState, useEffect, useRef } from 'react';
import { BiLike, BiShare } from 'react-icons/bi';
import BoxesOpinionImage from '/assets/boxes_opinion_like_2.svg';

const OpinionSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            const timer = setTimeout(() => setAnimateCards(true), 400);
            return () => clearTimeout(timer);
          } else {
            setIsVisible(false);
            setAnimateCards(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-80px 0px -80px 0px"
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
      className="relative w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      {/* Header Section */}
      <div className={`max-w-7xl mx-auto mb-12 md:mb-16 lg:mb-20 transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : scrollDirection === 'down'
            ? '-translate-y-12 opacity-0'
            : 'translate-y-12 opacity-0'
      }`}>
        {/* Yellow badge */}
        <div className={`inline-block mb-6 md:mb-8 lg:mb-10 transform transition-all duration-800 delay-100 ease-out ${
          isVisible 
            ? 'translate-x-0 opacity-100 scale-100' 
            : scrollDirection === 'down'
              ? '-translate-x-12 opacity-0 scale-90'
              : 'translate-x-12 opacity-0 scale-90'
        }`}>
          <div className="bg-[#FFE67B] rounded-full px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-[#0E6F7E]">
              Opinion of our clients
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className={`bg-[#D9D9D9]/80 backdrop-blur-md rounded-3xl p-6 md:p-8 lg:p-10 max-w-4xl shadow-2xl transform transition-all duration-1000 delay-200 ease-out ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : scrollDirection === 'down'
              ? 'translate-y-12 opacity-0'
              : '-translate-y-12 opacity-0'
        }`}>
          <p className={`text-[#585858] text-lg md:text-xl lg:text-2xl leading-relaxed mb-4 md:mb-5 transform transition-all duration-800 delay-300 ease-out ${
            isVisible 
              ? 'translate-x-0 opacity-100' 
              : scrollDirection === 'down'
                ? 'translate-x-8 opacity-0'
                : '-translate-x-8 opacity-0'
          }`}>
            Know what our clients think about us and our service.
            The opinions of our clients are very important to us.
          </p>
          <p className={`text-[#585858] text-lg md:text-xl lg:text-2xl font-semibold transform transition-all duration-800 delay-400 ease-out ${
            isVisible 
              ? 'translate-x-0 opacity-100' 
              : scrollDirection === 'down'
                ? 'translate-x-8 opacity-0'
                : '-translate-x-8 opacity-0'
          }`}>
            Client feedback and satisfaction are our top priorities.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative">
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`relative transform transition-all duration-900 ease-out ${
                animateCards 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : scrollDirection === 'down'
                    ? 'translate-y-16 opacity-0 scale-90'
                    : '-translate-y-16 opacity-0 scale-90'
              }`}
              style={{
                transitionDelay: `${400 + index * 150}ms`
              }}
            >
              {/* Gray background container */}
              <div className="bg-[#D9D9D9] rounded-xl md:rounded-2xl p-1.5 md:p-2 pt-10 md:pt-12 lg:pt-14 pb-6 md:pb-8 lg:pb-10 h-full min-h-[320px] md:min-h-[340px] lg:min-h-[360px] hover:shadow-2xl transition-all duration-300 hover:scale-105">
                {/* White card content */}
                <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 shadow-xl h-full relative hover:shadow-2xl transition-all duration-300">
                  
                  {/* User Info */}
                  <div className="flex items-start mb-2 md:mb-3">
                    <div className={`w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm md:text-base lg:text-lg shadow-lg transform transition-all duration-600 ${
                      animateCards ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
                    }`}
                    style={{
                      transitionDelay: `${500 + index * 150}ms`
                    }}>
                      {testimonial.avatar}
                    </div>
                    
                    <div className="ml-2 md:ml-3 flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-xs md:text-sm lg:text-base truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-[10px] md:text-xs text-gray-500 truncate">
                            {testimonial.location}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-1">
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 md:w-3.5 md:h-3.5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} transform transition-all duration-400`}
                            style={{
                              transitionDelay: `${600 + index * 150 + i * 80}ms`
                            }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-[10px] md:text-xs text-gray-500 ml-1 md:ml-2">{testimonial.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-2 md:mb-3 line-clamp-4">
                    {testimonial.comment}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-200">
                    <button className="flex items-center space-x-1 md:space-x-1.5 text-gray-500 hover:text-blue-600 transition-colors duration-200 hover:scale-110 transform">
                      <BiLike className="w-4 h-4 md:w-4.5 md:h-4.5" />
                      <span className="text-xs md:text-sm font-medium">{testimonial.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 md:space-x-1.5 text-gray-500 hover:text-green-600 transition-colors duration-200 hover:scale-110 transform">
                      <BiShare className="w-4 h-4 md:w-4.5 md:h-4.5" />
                      <span className="text-xs md:text-sm font-medium">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Boxes Image - Larger size */}
        <div className={`absolute -top-32 -right-20 md:-top-48 md:-right-32 lg:-top-64 lg:-right-40 xl:-top-80 xl:-right-48 pointer-events-none transform transition-all duration-1200 ease-out ${
          isVisible 
            ? 'translate-x-0 translate-y-0 opacity-100 scale-100 rotate-0' 
            : scrollDirection === 'down'
              ? 'translate-x-24 -translate-y-12 opacity-0 scale-75 rotate-12'
              : '-translate-x-24 translate-y-12 opacity-0 scale-75 -rotate-12'
        }`}
        style={{ zIndex: 10 }}>
          <div className="relative">
            <img
              src={BoxesOpinionImage}
              alt="Opinion boxes with thumbs up"
              className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-[32rem] xl:h-[32rem] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpinionSection;