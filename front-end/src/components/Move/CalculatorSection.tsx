import React, { useState, useEffect, useRef } from "react";
import QuoteFormCard from "../Home/QuoteFormCard";
import banner from "../../../public/assets/carroF.png";

// Importar el tipo desde el componente QuoteFormCard
interface QuoteFormData {
  from: string;
  to: string;
  date: string;
  services: string;
  packageType: 'basic' | 'medium' | 'premium';
  selectedServices: string[];
  name: string;
  email: string;
  phone: string;
}

const CalculatorSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
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
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleQuoteSubmit = (data: QuoteFormData) => {
    console.log("Quote submitted:", data);
  };

  return (
    <section ref={sectionRef} className="min-h-screen pt-16" style={{ backgroundColor: '#C9E1EC' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          {/* Badge */}
          <div 
            className={`mb-4 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="bg-[#FFE67B] text-gray-900 px-6 py-2 rounded-lg text-sm font-medium">
              Safe moves
            </span>
          </div>
          
          {/* Title */}
          <h2 
            className={`text-4xl md:text-5xl font-semibold text-gray-900 mb-4 text-center transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 -translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Quick and simple quote
          </h2>
          
          {/* Subtitle */}
          <p 
            className={`text-gray-600 text-lg mb-8 text-center transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 -translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            We explain how to continue quoting your next move
          </p>
          
          {/* Steps */}
          <div 
            className={`text-gray-700 space-y-2 text-center transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p>1. Choose your origin and destination</p>
            <p>2. Complete your quote</p>
            <p>3. We take care of moving you</p>
          </div>
        </div>

        {/* Quote Form */}
        <div 
          className={`transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <QuoteFormCard onSubmit={handleQuoteSubmit} />
        </div>
      </div>
      
      {/* Banner Image */}
      <div 
        className={`transition-all duration-1000 ease-out ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-12"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <img src={banner} alt="Moving truck" className="w-full mt-8" />
      </div>
    </section>
  );
};

export default CalculatorSection;