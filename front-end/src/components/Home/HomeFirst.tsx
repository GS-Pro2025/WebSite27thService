import React, { useState, useEffect, useRef } from "react";
import { Zap, Globe, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import banner from "../../../public/assets/bannerCamion.webp";
import banner1 from "../../../public/assets/home.webp";
import QuoteFormCard from "./QuoteFormCard";

interface QuoteFormData {
  from: string;
  to: string;
  date: string;
  services: string;
}

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      image: banner,
      title: "Your new beginning starts with a move",
      subtitle:
        "Find the security of a reliable service and expert quality to take care of your valuable belongings.",
    },
    {
      image: banner1,
      title: "Professional Moving Services",
      subtitle:
        "Experience seamless transitions with our expert team and state-of-the-art equipment.",
    },
  ];

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
        threshold: 0.1,
        rootMargin: "-30px",
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

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleQuoteSubmit = (formData: QuoteFormData) => {
    console.log("Quote form submitted:", formData);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen sm:min-h-[110vh] lg:min-h-[120vh] flex items-start justify-center overflow-hidden lg:overflow-y-auto bg-[#0E6F7E]"
    >
      {/* Background Images Carousel */}
      <div className="absolute inset-0 z-0 h-full sm:h-full lg:h-9/10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1500 ease-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          >
            <img
              src={slide.image}
              alt={`Twenty Seventh Moving - Slide ${index + 1}`}
              className="w-full h-auto object-contain lg:object-cover object-top lg:object-center"
            />
          </div>
        ))}
      </div>

      {/* Decorative animated elements */}
      <div 
        className={`absolute top-20 left-10 w-32 h-32 bg-[#FFE67B]/20 rounded-full blur-3xl transition-all duration-2000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ transitionDelay: "300ms" }}
      />
      <div 
        className={`absolute bottom-40 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-all duration-2000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ transitionDelay: "500ms" }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen sm:min-h-[140vh] lg:min-h-[150vh]">
        {/* Hero Text with Enhanced Fade Animation */}
        <div className="text-center mt-10 sm:mt-12 mb-auto pt-8 sm:pt-12">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ease-out ${
                index === currentSlide
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-8 scale-95 absolute"
              }`}
            >
              <h1 
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[manrope] font-semibold text-white mb-4 sm:mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] lg:drop-shadow-lg px-4 transition-all duration-1200 ease-out ${
                  isLoaded && isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-12"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {slide.title.split(" with a move")[0]}
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                {slide.title.includes("with a move") && "with a move"}
              </h1>
              <p 
                className={`text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] lg:drop-shadow-md px-4 transition-all duration-1200 ease-out ${
                  isLoaded && isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {slide.subtitle.split(" to take care")[0]}
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                {slide.subtitle.includes("to take care") &&
                  "to take care of your valuable belongings."}
              </p>
            </div>
          ))}
        </div>

        {/* Spacer to push content down */}
        <div className="flex-grow min-h-[8vh] sm:min-h-[15vh] lg:min-h-0"></div>

        {/* Feature Badges with Staggered Animation */}
        <div 
          className={`hidden lg:flex flex-col sm:flex-row justify-center gap-3 sm:gap-2 max-w-5xl mx-auto px-4 mb-4 transition-all duration-1000 ease-out ${
            isLoaded && isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <button
            onClick={() => scrollToSection("process")}
            className={`bg-[#FFE67B] rounded-lg px-4 py-3 flex flex-col items-center justify-center gap-2 w-full sm:w-32 shadow-md hover:shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
              isLoaded ? "animate-badge-1" : ""
            }`}
          >
            <Zap
              className="w-12 h-auto text-gray-600 flex-shrink-0 transition-transform duration-500 group-hover:rotate-12"
              strokeWidth={1.5}
            />
            <span className="text-xs font-light leading-tight text-center text-gray-600">
              Fast moves
            </span>
          </button>

          <button
            onClick={() => scrollToSection("interstate")}
            className={`bg-[#FFE67B] rounded-lg px-4 py-3 flex flex-col items-center justify-center gap-2 w-full sm:w-32 shadow-md hover:shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
              isLoaded ? "animate-badge-2" : ""
            }`}
          >
            <Globe
              className="w-12 h-auto text-gray-600 flex-shrink-0 transition-transform duration-500 group-hover:rotate-12"
              strokeWidth={1.5}
            />
            <span className="text-xs font-light leading-tight text-center text-gray-600">
              International coverage
            </span>
          </button>

          <button
            onClick={() => scrollToSection("quality")}
            className={`bg-[#FFE67B] rounded-lg px-4 py-3 flex flex-col items-center justify-center gap-2 w-full sm:w-32 shadow-md hover:shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
              isLoaded ? "animate-badge-3" : ""
            }`}
          >
            <ShieldCheck
              className="w-12 h-auto text-gray-600 flex-shrink-0 transition-transform duration-500 group-hover:rotate-12"
              strokeWidth={1.5}
            />
            <span className="text-xs font-light leading-tight text-center text-gray-600">
              Trusted choice
            </span>
          </button>
        </div>

        {/* Quote Form Container with Enhanced Animation */}
        <div 
          className={`mb-40 sm:mb-40 lg:mb-40 transition-all duration-1200 ease-out ${
            isLoaded && isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-16 scale-95"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <QuoteFormCard onSubmit={handleQuoteSubmit} />
        </div>
      </div>

      <style>{`
        @keyframes badge-entrance-1 {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          60% {
            transform: translateY(-5px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes badge-entrance-2 {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          60% {
            transform: translateY(-5px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes badge-entrance-3 {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          60% {
            transform: translateY(-5px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-badge-1 {
          animation: badge-entrance-1 0.8s ease-out 0.7s both;
        }

        .animate-badge-2 {
          animation: badge-entrance-2 0.8s ease-out 0.85s both;
        }

        .animate-badge-3 {
          animation: badge-entrance-3 0.8s ease-out 1s both;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        button:hover .lucide {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;