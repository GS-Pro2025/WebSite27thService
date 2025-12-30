import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CTASection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

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

  const handleRequestMove = () => {
    navigate("/your-move#calculator-section");
    // Pequeño delay para asegurar que la página cargue antes de hacer scroll
    setTimeout(() => {
      const calculatorElement = document.getElementById("calculator-section");
      if (calculatorElement) {
        calculatorElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-11/12 py-40 px-4 bg-[#0E6F7E]/40"
    >
      <div className="max-w-8xl mx-auto text-center">
        {/* Main Heading - First Line */}
        <h2 
          className={`text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-3 font-[Poppins] leading-tight transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          Moving will no longer be a difficult task,
        </h2>

        {/* Main Heading - Second Line */}
        <h2 
          className={`text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0E6F7E] mb-10 font-[Poppins] leading-tight transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          leave it in the expert hands of Twenty Seventh Group, they do it for you
        </h2>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-75"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <button
            onClick={handleRequestMove}
            className="bg-[#FFE67B] text-gray-900 font-semibold px-10 py-4 rounded-lg text-lg hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-[Manrope]"
          >
            Request your move
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;