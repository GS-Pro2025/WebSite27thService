import React, { useState, useEffect, useRef } from "react";
import FormCobertura from "../FormCover";

const ValuableObjects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer1 = setTimeout(() => setIsVisible(true), 200);
            const timer2 = setTimeout(() => setAnimateContent(true), 600);
            
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

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen p-2 -mt-16 md:-mt-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left side - Text content */}
          <div className={`space-y-4 md:space-y-6 transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            {/* Title with yellow background */}
            <div className={`inline-block transform transition-all duration-800 delay-200 ease-out ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-5 opacity-0 scale-95'
            }`}>
              <div className="bg-[#FFE67B] rounded-full px-4 py-2 md:px-8 md:py-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">
                  ¿valuable objects?
                </h2>
              </div>
            </div>

            {/* Description box */}
            <div className={`bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 text-white shadow-xl transform transition-all duration-1000 delay-400 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <p className={`text-sm md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-3 md:mb-6 transform transition-all duration-800 delay-600 ease-out ${
                animateContent ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}>
                This category includes everything that holds significant value for you;
                they are more than just fragile items—they are memories, dreams, and moments to cherish
                and preserve.
              </p> 
              
              <p className={`text-sm md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-3 md:mb-6 transform transition-all duration-800 delay-800 ease-out ${
                animateContent ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}>
                You have items that require{" "}
                <span className="text-[#FFE67B] font-semibold">special Care</span>, we show you how{" "}
                <span className="text-[#FFE67B] font-semibold">we take care of them for you</span>.
              </p>

              <p className={`text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-300 transform transition-all duration-800 delay-1000 ease-out ${
                animateContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                What items do you need to move today?
              </p>
            </div>
          </div>

          {/* Right side - Heart icon, message and Form */}
          <div className={`flex flex-col items-center space-y-3 md:space-y-4 -mt-8 md:-mt-50 transform transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            {/* Heart and hands icon with text below - Centered in right column */}
            <div className={`flex flex-col items-center text-center transform transition-all duration-800 delay-500 ease-out ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-90'
            }`}>
              <img
                src="/assets/recurso_hands_heart.svg"
                alt="Hands with heart"
                className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-50 xl:h-50 mb-2 md:mb-3 transform transition-all duration-1000 delay-700 ease-out ${
                  animateContent ? 'rotate-0 scale-100' : 'rotate-12 scale-75'
                }`}
              />
              <h1 className={`text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight px-2 transform transition-all duration-800 delay-900 ease-out ${
                animateContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <span className="text-[#FFE67B]">We take care</span> of them,{" "}
                <span className="text-[#FFE67B]">as if they were our own</span>
              </h1>
            </div>

            {/* Form Cover Component */}
            <div className={`bg-white rounded-2xl p-3 md:p-4 w-full max-w-sm md:max-w-xs shadow-2xl transform transition-all duration-1000 delay-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`}>
              <FormCobertura />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuableObjects;