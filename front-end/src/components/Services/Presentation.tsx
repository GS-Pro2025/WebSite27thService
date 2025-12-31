import { useState, useEffect, useRef } from "react";
import Image1 from "../../../public/assets/slider1.png";
import Image2 from "../../../public/assets/slider2.png";
import Image3 from "../../../public/assets/slider3.png";
import Image4 from "../../../public/assets/slider4.png";
import Image5 from "../../../public/assets/slider5.png";
import Image6 from "../../../public/assets/slider6.png";
import Image7 from "../../../public/assets/slider7.png";

interface Slide {
  title: string;
  description: string;
  image: string;
  icon: string;
}

const slides: Slide[] = [
  {
    title: "Twenty-seventh\nchoice",
    description: "Professional moving services tailored to your needs",
    image: Image1,
    icon: "/assets/icono1.png",
  },
  {
    title: "Commercial\nrelocation",
    description: "Efficient business moving solutions",
    image: Image2,
    icon: "/assets/icono2.png",
  },
  {
    title: "Fast\nmoves",
    description: "Quick and reliable moving services",
    image: Image3,
    icon: "/assets/icono3.png",
  },
  {
    title: "Residential\nrelocation",
    description: "Safe home moving for families",
    image: Image4,
    icon: "/assets/icono4.png",
  },
  {
    title: "International\nrelocation",
    description: "Global moving expertise",
    image: Image5,
    icon: "/assets/icono5.png",
  },
  {
    title: "Storage\nsolutions",
    description: "Secure storage facilities",
    image:Image6,
    icon: "/assets/icono6.png",
  },
  {
    title: "Reliable\nchoice",
    description: "Your trusted moving partner",
    image: Image7,
    icon: "/assets/icono7.png",
  },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-auto lg:h-screen overflow-hidden"
    >
      {/* Background Image Container with Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-auto object-contain md:object-cover object-top"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 md:bg-[#0E6F7E]/20" />
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-start lg:justify-center h-full px-4 py-8 md:py-12 pt-16 md:pt-20 lg:pt-0">
        {/* Hero Text */}
        <div 
          className={`text-center transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold font-[Poppins] text-white mb-4 md:mb-6 drop-shadow-2xl px-2">
            Know what we move for you
          </h1>
          <p 
            className={`hidden lg:block text-xs sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg px-4 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            Knowing the type of move you're going to make helps us manage your
            move in record time.
          </p>
        </div>

        {/* Feature Badges - Ocultas en móvil, visibles en tablet+ */}
        <div 
          className={`hidden md:block w-full lg:absolute lg:bottom-8 lg:left-0 lg:right-0 transition-all duration-1000 ease-out mt-0 md:mt-20 lg:mt-0 ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-20"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto px-2">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-lg transition-all duration-500 
                  w-28 flex-shrink-0
                  ${
                    index === currentSlide
                      ? "bg-[#FFE67B] shadow-lg scale-105 -translate-y-2"
                      : "bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:scale-105 hover:-translate-y-1"
                  }
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-transform duration-300">
                  <img
                    src={slide.icon}
                    alt={slide.title}
                    className={`w-full h-full object-contain transition-transform duration-300 ${
                      index === currentSlide ? "scale-110" : ""
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-xs text-center leading-tight whitespace-pre-line ${
                    index === currentSlide ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {slide.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;