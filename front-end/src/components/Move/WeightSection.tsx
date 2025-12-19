import React, { useEffect, useRef, useState } from "react";
import QuoteForm from "./quoteForm";
import type { QuoteFormData } from "./quoteForm";

// Import the images
import safeImage from "/assets/cajaFuerte.png";
import safeImage2 from "/assets/piano.png";
import safeImage3 from "/assets/reloj.png";
import safeImage4 from "/assets/moto.png";
import safeImage5 from "/assets/alacena.png";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  weight: string;
  description: string;
}

const WeightGuideSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);

  const items: CarouselItem[] = [
    {
      id: 1,
      image: safeImage,
      title: "Safe Box",
      weight: "500-700 lbs",
      description: "Heavy-duty safes require special handling and equipment. Our team has experience moving safes of all sizes safely and securely."
    },
    {
      id: 2,
      image: safeImage2,
      title: "Piano",
      weight: "300-600 lbs",
      description: "Pianos are delicate and heavy. We use specialized equipment and techniques to ensure your piano arrives in perfect condition."
    },
    {
      id: 3,
      image: safeImage3,
      title: "Grandfather Clock",
      weight: "100-200 lbs",
      description: "Antique clocks require careful disassembly and packing. Trust our experts to handle these precious timepieces with care."
    },
    {
      id: 4,
      image: safeImage4,
      title: "Motorcycle",
      weight: "400-800 lbs",
      description: "We have specialized equipment to safely transport motorcycles, ensuring they arrive without a scratch."
    },
    {
      id: 5,
      image: safeImage5,
      title: "China Cabinet",
      weight: "200-400 lbs",
      description: "Large furniture pieces are our specialty. We'll disassemble, transport, and reassemble your cabinet at your new location."
    }
  ];

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

  const handleGetQuote = () => {
    const currentItem = items[currentIndex];
    setSelectedItem(currentItem);
    setShowForm(true);
    
    setTimeout(() => {
      document.getElementById('quote-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleFormSubmit = (formData: QuoteFormData) => {
    console.log("Quote submitted:", formData);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 7000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [items.length]);

  return (
    <>
      <section ref={sectionRef} className="relative py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-8xl mx-auto">
          {/* Badge */}
          <div 
            className={`flex justify-start mb-8 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-block bg-[#B8CCC5] text-gray-800 px-6 py-2 rounded-full text-sm font-semibold shadow-md">
              Special moving
            </span>
          </div>

          {/* Title */}
          <div 
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 -translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 font-[Poppins] leading-tight">
              discover how much your move weighs
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-[Manrope] max-w-4xl mx-auto leading-relaxed">
              We give you a guide of objects and their approximate weights so you can reference your next move. 
              Doubts about the total weight? Don't worry, we'll do it for you, request more information at the button below.
            </p>
          </div>

          {/* Carousel Container */}
          <div 
            className={`relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-12 scale-95"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {/* Main Image Display */}
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute top-[10%] left-8 md:left-16 max-w-xl text-white z-10">
                  <div className="font-bold tracking-[8px] text-xs md:text-sm mb-3 opacity-90">
                    WEIGHT GUIDE
                  </div>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-3">
                    {item.title}
                  </h3>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#FFE67B] mb-4">
                    {item.weight}
                  </div>
                  <p className="text-sm md:text-base leading-relaxed mb-6 max-w-md">
                    {item.description}
                  </p>
                  <button
                    onClick={handleGetQuote}
                    className="bg-[#FFE67B] hover:bg-[#FFD700] text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 font-[Manrope] tracking-wide text-sm shadow-lg"
                  >
                    GET QUOTE
                  </button>
                </div>
              </div>
            ))}

            {/* Thumbnail Navigation - Inside Image at Bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-3 md:gap-4 z-20 overflow-x-auto max-w-[98%] p-4">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-28 h-16 md:w-44 md:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-4 ring-[#FFE67B] scale-105"
                      : "ring-2 ring-white/50 hover:ring-white hover:scale-105"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-1 left-2 right-2 text-white">
                    <div className="font-semibold text-[10px] md:text-xs truncate">
                      {item.title}
                    </div>
                    <div className="font-light text-[8px] md:text-[10px] text-gray-300">
                      {item.weight}
                    </div>
                  </div>
                  {/* Active Indicator */}
                  {index === currentIndex && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#FFE67B] rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      {showForm && selectedItem && (
        <section id="quote-form" className="bg-gray-50 py-12 px-4">
          <QuoteForm
            selectedItem={{
              title: selectedItem.title,
              weight: selectedItem.weight,
              image: selectedItem.image,
            }}
            onSubmit={handleFormSubmit}
            onClose={handleCloseForm}
          />
        </section>
      )}
    </>
  );
};

export default WeightGuideSection;