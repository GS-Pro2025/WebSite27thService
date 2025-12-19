import React, { useState, useEffect, useRef } from 'react';
import banner from "../../../public/assets/about.png";

export default function MovingLeadersComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para animaciones de scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!hasAnimated) {
              setHasAnimated(true);
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
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
  }, [hasAnimated]);

  // Animación inicial al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <path fill="#C9E1EC" fillOpacity="1" d="M0,192L80,170.7C160,149,320,107,480,122.7C640,139,800,213,960,229.3C1120,245,1280,203,1360,181.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
      <div className="max-w-7xl mx-auto px-4">
        {/* Título principal */}
        <h1 
          className={`text-4xl md:text-5xl font-semibold text-gray-900 text-center mb-4 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "200ms" : "0ms",
          }}
        >
          Leaders in moving
        </h1>

        {/* Subtítulo descriptivo */}
        <p 
          className={`text-center text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "400ms" : "0ms",
          }}
        >
          We are a team dedicated to professional moves, we have been characterized by our commitment to help more families in each new beginning
        </p>

        {/* Tarjeta con imagen */}
        <div 
          className={`relative rounded-3xl overflow-hidden shadow-2xl mb-8 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
          style={{
            transitionDelay: isVisible ? "600ms" : "0ms",
          }}
        >
          {/* Imagen de ejemplo */}
          <div className="relative">
            <img
              src={banner}
              alt="Safe box"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Sección de misión y visión */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Misión */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
            style={{
              transitionDelay: isVisible ? "800ms" : "0ms",
            }}
          >
            <div className="inline-block mb-4">
              <span className="bg-[#F4D35E] text-gray-900 px-4 py-2 rounded-xl text-sm font-medium">
                Our Mission
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Make every move an easy, safe and stress-free experience, accompanying our clients at the beginning of new stages with commitment, efficiency and personalized care.
            </p>
          </div>

          {/* Visión */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
            style={{
              transitionDelay: isVisible ? "1000ms" : "0ms",
            }}
          >
            <div className="inline-block mb-4">
              <span className="bg-[#F4D35E] text-gray-900 px-4 py-2 rounded-xl text-sm font-medium">
                Our Vision
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To establish ourselves as the reference moving company in Virginia, recognized for our operational excellence, innovation in logistics services and the human closeness that distinguishes us.
            </p>
          </div>
        </div>

        {/* Sección de valores */}
        <div className="mb-8">
          <div 
            className={`inline-block mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "1200ms" : "0ms",
            }}
          >
            <span className="bg-[#F4D35E] text-gray-900 px-4 py-2 rounded-xl text-sm font-medium">
              Our Values
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Responsibility",
                description: "We keep our promises and take care of every detail.",
                delay: "1400ms"
              },
              {
                title: "Innovation",
                description: "We constantly seek new ways to improve our service.",
                delay: "1550ms"
              },
              {
                title: "Commitment",
                description: "We get involved in every move as if it were our own.",
                delay: "1700ms"
              },
              {
                title: "Honesty",
                description: "We act with transparency and ethics in every service.",
                delay: "1850ms"
              }
            ].map((value, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: isVisible ? value.delay : "0ms",
                }}
              >
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-700 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}