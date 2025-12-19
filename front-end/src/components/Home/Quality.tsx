import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QualityIcon from "/assets/quality-icon.png";
import PremiumIcon from "/assets/premium-icon.png";
import PackingIcon from "/assets/packing-icon.png";
import GuaranteeIcon from "/assets/guarantee-icon.png";
import Location from "/assets/Location.svg";

interface FeatureCard {
  id: number;
  iconSrc: string;
  title: string;
  subtitle: string;
  rating: number;
}

const WhyChooseUs: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features: FeatureCard[] = [
    {
      id: 1,
      iconSrc: QualityIcon,
      title: "Quality and excellence",
      subtitle: "Twenty seventh",
      rating: 5.0,
    },
    {
      id: 2,
      iconSrc: PremiumIcon,
      title: "Premium service",
      subtitle: "Twenty seventh",
      rating: 5.0,
    },
    {
      id: 3,
      iconSrc: PackingIcon,
      title: "Reliable packing",
      subtitle: "Twenty seventh",
      rating: 5.0,
    },
    {
      id: 4,
      iconSrc: GuaranteeIcon,
      title: "Service guarantee",
      subtitle: "Twenty seventh",
      rating: 5.0,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < features.length - 1 ? prev + 1 : prev));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-12 md:py-14 lg:py-16 bg-gradient-to-b from-[#D9F3FF] to-[#0E6F7E]"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div 
          className={`text-center mb-8 md:mb-10 lg:mb-12 transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-10"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 font-[Poppins] mb-4 md:mb-6">
            Why choose us?
          </h2>
          
          {/* Stats Badge */}
          <div 
            className={`inline-block bg-[#FFE67B] px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-2xl md:text-3xl font-semibold font-[manrope] text-gray-900">5000+</p>
            <p className="text-xs md:text-sm font-semibold text-gray-700">Successful moves</p>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative bg-white rounded-3xl p-6 shadow-lg transition-all duration-1000 ease-out hover:bg-[#FFE67B] hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Rating Badge */}
              <div className="absolute top-7 right-7 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 transition-transform duration-300 group-hover:scale-110">
                <span className="text-lg text-[#FFE67B]">⭐</span>
                <span className="text-lg font-semibold text-gray-900">
                  {feature.rating}
                </span>
              </div>

              {/* Icon Container */}
              <div className="bg-[#0E6F7E] rounded-2xl flex items-center justify-center aspect-square transition-all duration-300 group-hover:bg-[#0E6F7E]">
                <img
                  src={feature.iconSrc}
                  alt={feature.title}
                  className="w-auto h-full object-contain"
                />
              </div>

              {/* Text Content */}
              <div className="text-start mt-2">
                <h3 className="text-3xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <div className="flex items-start justify-start gap-1 text-gray-300">
                  <img
                    src={Location}
                    className="w-8 h-auto object-contain"
                    alt="Location"
                  />
                  <p className="text-xl font-medium">{feature.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet Horizontal Scroll */}
        <div className="hidden md:block lg:hidden mt-8 md:mt-10 relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-4 md:gap-6" style={{ width: 'max-content' }}>
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group relative bg-white rounded-3xl p-5 md:p-6 shadow-lg transition-all duration-1000 ease-out hover:bg-[#FFE67B] hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                    isVisible 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 translate-x-20"
                  }`}
                  style={{ 
                    minWidth: '280px', 
                    maxWidth: '280px',
                    transitionDelay: `${400 + index * 150}ms`
                  }}
                >
                  {/* Rating Badge */}
                  <div className="absolute top-6 right-6 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 transition-transform duration-300 group-hover:scale-110">
                    <span className="text-base text-[#FFE67B]">⭐</span>
                    <span className="text-base font-semibold text-gray-900">
                      {feature.rating}
                    </span>
                  </div>

                  {/* Icon Container */}
                  <div className="bg-[#0E6F7E] rounded-2xl flex items-center justify-center aspect-square transition-all duration-300 group-hover:bg-[#0E6F7E]">
                    <img
                      src={feature.iconSrc}
                      alt={feature.title}
                      className="w-auto h-full object-contain"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="text-start mt-2">
                    <h3 className="text-2xl font-semibold text-gray-900 font-[Poppins] mb-2">
                      {feature.title}
                    </h3>
                    <div className="flex items-start justify-start gap-1 text-gray-300">
                      <img
                        src={Location}
                        className="w-6 h-auto object-contain"
                        alt="Location"
                      />
                      <p className="text-lg font-medium">{feature.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile with Arrow Navigation */}
        <div className="md:hidden mt-8 relative">
          {/* Cards Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`w-full flex-shrink-0 px-4 transition-all duration-1000 ease-out ${
                    isVisible 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <div className="bg-white rounded-3xl p-5 shadow-lg">
                    {/* Rating Badge */}
                    <div className="absolute top-9 right-9 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                      <span className="text-sm text-[#FFE67B]">⭐</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {feature.rating}
                      </span>
                    </div>

                    {/* Icon Container */}
                    <div className="bg-[#0E6F7E] rounded-2xl flex items-center justify-center aspect-square">
                      <img
                        src={feature.iconSrc}
                        alt={feature.title}
                        className="w-auto h-full object-contain p-8"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="text-start mt-3">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <div className="flex items-start justify-start gap-1 text-gray-300">
                        <img
                          src={Location}
                          className="w-6 h-auto object-contain"
                          alt="Location"
                        />
                        <p className="text-base font-medium">{feature.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div 
            className={`flex justify-center gap-3 mt-6 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#FFE67B] text-gray-900 hover:bg-[#FFD700] shadow-lg hover:shadow-xl hover:scale-110"
              }`}
              aria-label="Previous card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 h-2 bg-[#FFE67B] rounded-full"
                      : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/75 hover:scale-125"
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === features.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === features.length - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#FFE67B] text-gray-900 hover:bg-[#FFD700] shadow-lg hover:shadow-xl hover:scale-110"
              }`}
              aria-label="Next card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;