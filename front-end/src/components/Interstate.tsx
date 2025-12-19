import React, { useState, useEffect, useRef } from "react";
import USAMapImage from "/assets/inter.png";

const InterstateMoveSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <div 
      ref={sectionRef}
      className="relative w-full min-h-[120vh] py-16 px-4 sm:px-6 lg:px-8 bg-[#0E6F7E]"
    >
      <div className="max-w-9xl mx-auto h-auto">
        {/* Card Container */}
        <div className="relative bg-[#0E6F7E] min-h-[100vh] lg:min-h-[120vh]">
          
          {/* Background Image */}
          <img
            className={`
              absolute inset-0 w-full h-full object-cover opacity-80 
              sm:object-contain sm:opacity-70 
              md:object-cover 
              lg:object-cover lg:opacity-80
            `}
            src={USAMapImage}
            alt="USA Map"
          />

          {/* Decorative Stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-white rounded-full animate-pulse transition-opacity duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: isVisible ? Math.random() * 0.5 + 0.3 : 0,
                  transitionDelay: `${Math.random() * 500}ms`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div
            className="
              relative z-10 
              px-4 py-14 
              sm:px-8 sm:py-20 
              md:px-12 md:py-24 
              lg:px-16 lg:py-24 
              mt-10 sm:mt-16 md:mt-20 lg:mt-24
            "
          >
            {/* Badge */}
            <div 
              className={`flex justify-center sm:justify-start mb-8 transition-all duration-1000 ease-out ${
                isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-20"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="
                inline-block bg-white/90 backdrop-blur-sm text-[#0E6F7E] 
                px-5 py-2 rounded-xl text-base sm:text-lg 
                font-semibold shadow-lg
              ">
                Interstate move!
              </span>
            </div>

            {/* Title */}
            <h2
              className={`
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                font-semibold text-white mb-4 text-center leading-tight
                transition-all duration-1000 ease-out
                ${isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 -translate-y-10"
                }
              `}
              style={{ transitionDelay: "400ms" }}
            >
              Are you moving to another state?
            </h2>

            {/* Subtitle */}
            <p
              className={`
                text-lg sm:text-xl md:text-2xl 
                text-white/90 text-center 
                mb-12 max-w-2xl mx-auto
                transition-all duration-1000 ease-out
                ${isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
                }
              `}
              style={{ transitionDelay: "600ms" }}
            >
              We are getting closer and closer to where you need us
            </p>
          </div>

          {/* CTA BUTTON - MOBILE/TABLET ADJUSTED */}
          <div
            className={`
              absolute 
              left-1/2 transform -translate-x-1/2  
              z-20
              top-[78%] 
              sm:top-[70%] 
              md:top-1/2 md:-translate-y-1/2 
              lg:top-1/2 lg:-translate-y-1/2
              transition-all duration-1000 ease-out
              ${isVisible 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-75"
              }
            `}
            style={{ transitionDelay: "800ms" }}
          >
            <button
              className="
                bg-[#FFE67B] hover:bg-[#FFE67B]/60 
                text-gray-900 font-semibold 
                px-6 py-3 sm:px-8 sm:py-4 
                rounded-xl text-lg sm:text-xl 
                transition-all duration-300 
                hover:scale-105 hover:shadow-xl
              "
            >
              Find your destination here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterstateMoveSection;