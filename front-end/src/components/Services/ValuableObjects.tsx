import React, { useState, useEffect, useRef } from "react";
import FormCobertura from "../FormCover";

const ValuableObjects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

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
            const timer = setTimeout(() => setAnimateContent(true), 400);
            return () => clearTimeout(timer);
          } else {
            setIsVisible(false);
            setAnimateContent(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px -50px 0px"
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
      className="relative min-h-screen p-4 md:p-6 lg:p-8 -mt-16 md:-mt-20 lg:-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left side - Text content */}
          <div className={`space-y-6 md:space-y-8 lg:space-y-10 transform transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-x-0 opacity-100' 
              : scrollDirection === 'down' 
                ? '-translate-x-20 opacity-0' 
                : 'translate-x-20 opacity-0'
          }`}>
            {/* Title with yellow background */}
            <div className={`inline-block transform transition-all duration-800 delay-100 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100 scale-100' 
                : scrollDirection === 'down'
                  ? 'translate-y-10 opacity-0 scale-90'
                  : '-translate-y-10 opacity-0 scale-90'
            }`}>
              <div className="bg-[#FFE67B] rounded-full px-6 py-3 md:px-10 md:py-4 lg:px-12 lg:py-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                  Valuable objects?
                </h2>
              </div>
            </div>

            {/* Description box */}
            <div className={`bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 lg:p-10 text-[#0E6F7E] shadow-2xl transform transition-all duration-1000 delay-200 ease-out hover:shadow-3xl ${
              isVisible 
                ? 'translate-y-0 opacity-100 scale-100' 
                : scrollDirection === 'down'
                  ? 'translate-y-16 opacity-0 scale-95'
                  : '-translate-y-16 opacity-0 scale-95'
            }`}>
              <p className={`text-base md:text-xl lg:text-2xl leading-relaxed mb-4 md:mb-6 transform transition-all duration-800 delay-400 ease-out ${
                animateContent 
                  ? 'translate-x-0 opacity-100' 
                  : scrollDirection === 'down'
                    ? 'translate-x-8 opacity-0'
                    : '-translate-x-8 opacity-0'
              }`}>
                This category includes everything that holds significant value for you;
                they are more than just fragile items—they are memories, dreams, and moments to cherish
                and preserve.
              </p> 
              
              <p className={`text-base md:text-xl lg:text-2xl leading-relaxed mb-4 md:mb-6 transform transition-all duration-800 delay-600 ease-out ${
                animateContent 
                  ? 'translate-x-0 opacity-100' 
                  : scrollDirection === 'down'
                    ? 'translate-x-8 opacity-0'
                    : '-translate-x-8 opacity-0'
              }`}>
                You have items that require{" "}
                <span className="text-[#FFE67B] font-bold">special Care</span>, we show you how{" "}
                <span className="text-[#FFE67B] font-bold">we take care of them for you</span>.
              </p>

              <p className={`text-lg md:text-2xl lg:text-3xl font-bold text-[#585858] transform transition-all duration-800 delay-800 ease-out ${
                animateContent 
                  ? 'translate-y-0 opacity-100' 
                  : scrollDirection === 'down'
                    ? 'translate-y-8 opacity-0'
                    : '-translate-y-8 opacity-0'
              }`}>
                What items do you need to move today?
              </p>
            </div>
          </div>

          {/* Right side - Heart icon, message and Form */}
          <div className={`flex flex-col items-center space-y-6 md:space-y-8 transform transition-all duration-1000 delay-300 ease-out ${
            isVisible 
              ? 'translate-x-0 opacity-100' 
              : scrollDirection === 'down'
                ? 'translate-x-20 opacity-0'
                : '-translate-x-20 opacity-0'
          }`}>
            {/* Heart and hands icon with text below */}
            <div className={`flex flex-col items-center text-center transform transition-all duration-800 delay-400 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100 scale-100' 
                : scrollDirection === 'down'
                  ? 'translate-y-12 opacity-0 scale-85'
                  : '-translate-y-12 opacity-0 scale-85'
            }`}>
              <div className={`relative transform transition-all duration-1000 delay-500 ease-out ${
                animateContent 
                  ? 'rotate-0 scale-100' 
                  : scrollDirection === 'down'
                    ? 'rotate-12 scale-75'
                    : '-rotate-12 scale-75'
              }`}>
                <img
                  src="/assets/recurso_hands_heart.svg"
                  alt="Hands with heart"
                  className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 mb-4 md:mb-6 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <h1 className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight px-4 transform transition-all duration-800 delay-700 ease-out ${
                animateContent 
                  ? 'translate-y-0 opacity-100' 
                  : scrollDirection === 'down'
                    ? 'translate-y-8 opacity-0'
                    : '-translate-y-8 opacity-0'
              }`}>
                <span className="text-[#FFE67B] drop-shadow-lg">We take care</span> of them,{" "}
                <span className="text-[#FFE67B] drop-shadow-lg">as if they were our own</span>
              </h1>
            </div>

            {/* Form Cover Component */}
            <div className={`w-full max-w-md lg:max-w-lg transform transition-all duration-1000 delay-600 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100 scale-100' 
                : scrollDirection === 'down'
                  ? 'translate-y-16 opacity-0 scale-90'
                  : '-translate-y-16 opacity-0 scale-90'
            }`}>
              <div className="bg-white rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <FormCobertura />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuableObjects;