import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import decorativeLine from "/assets/lineaProgreso.svg";
import click from "/assets/Click.svg";

interface StepCard {
  number: string;
  title: string;
  frontDescription: string;
  backDescription: string;
}

const ProcessSteps: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const steps: StepCard[] = [
    {
      number: "01",
      title: "Phase",
      frontDescription: "Select your moving service",
      backDescription:
        "Choose from our comprehensive range of moving services tailored to your specific needs. From local moves to international relocations, we have you covered.",
    },
    {
      number: "02",
      title: "Phase",
      frontDescription: "Fast and simple quote",
      backDescription:
        "Get an instant quote with our transparent pricing system. No hidden fees, no surprises. Just honest pricing for quality service.",
    },
    {
      number: "03",
      title: "Phase",
      frontDescription: "Schedule a date",
      backDescription:
        "Pick a date that works for you. Our flexible scheduling ensures your move happens when it's most convenient for you.",
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

  const toggleCard = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) newFlipped.delete(index);
    else newFlipped.add(index);
    setFlippedCards(newFlipped);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-14 lg:py-16 px-4 bg-gradient-to-b from-[#0E6F7E] to-[#D9F3FF] overflow-hidden font-[Manrope]"
    >
      {/* Decorative Line SVG */}
      <div 
        className={`relative mt-6 md:mt-8 lg:mt-10 w-full transition-all duration-1000 ease-out ${
          isVisible 
            ? "opacity-70 scale-100" 
            : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "100ms" }}
      >
        <img
          src={decorativeLine}
          alt=""
          className="w-full max-w-6xl mx-auto"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div 
          className={`text-center mb-8 md:mb-10 lg:mb-12 pt-6 md:pt-8 lg:pt-10 transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 px-4 font-[Poppins]">
            Moving with us is that simple
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8 px-4 mt-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`transition-all duration-1000 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-20"
              }`}
              style={{ 
                perspective: "1000px",
                transitionDelay: `${300 + index * 150}ms` 
              }}
            >
              <div
                className="relative w-full aspect-square transition-transform duration-700 transform-style-3d cursor-pointer hover:scale-105"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards.has(index)
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                }}
                onClick={() => toggleCard(index)}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#FFE67B] rounded-3xl shadow-lg p-2 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="text-9xl font-light text-[#0E6F7E] mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-6xl font-light text-[#0E6F7E] mb-6">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-800 text-center font-medium">
                    {step.frontDescription}
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center transition-colors"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="text-base text-gray-900 text-justify leading-relaxed">
                    {step.backDescription}
                  </p>
                  <button
                    className="mt-6 text-[#0E6F7E] font-semibold hover:underline transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(index);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>

              <button
                className="flex items-center gap-2 text-gray-800 font-medium mt-6 mx-auto hover:text-gray-900 hover:gap-3 transition-all duration-300"
                onClick={() => toggleCard(index)}
              >
                Learn more
                <img src={click} alt="Quote" className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
              </button>
            </div>
          ))}
        </div>

        {/* Tablet Horizontal Scroll */}
        <div className="hidden md:block lg:hidden mt-8 md:mt-10">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 px-4" style={{ width: 'max-content' }}>
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`transition-all duration-1000 ease-out ${
                    isVisible 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 translate-x-20"
                  }`}
                  style={{ 
                    perspective: "1000px",
                    minWidth: '320px',
                    maxWidth: '320px',
                    transitionDelay: `${300 + index * 150}ms`
                  }}
                >
                  <div
                    className="relative w-full aspect-square transition-transform duration-700 transform-style-3d cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flippedCards.has(index)
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                    onClick={() => toggleCard(index)}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 w-full h-full bg-[#FFE67B] rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div className="text-5xl font-light text-[#0E6F7E] mb-2">
                        {step.number}
                      </div>
                      <h3 className="text-5xl font-light text-[#0E6F7E] mb-4">
                        {step.title}
                      </h3>
                      <p className="text-base text-gray-800 text-center font-medium">
                        {step.frontDescription}
                      </p>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center transition-colors"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-sm text-gray-900 text-justify leading-relaxed">
                        {step.backDescription}
                      </p>
                      <button
                        className="mt-4 text-[#0E6F7E] font-semibold hover:underline text-sm transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCard(index);
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </div>

                  <button
                    className="flex items-center gap-2 text-gray-800 font-medium mt-4 mx-auto hover:text-gray-900 hover:gap-3 transition-all duration-300 text-sm"
                    onClick={() => toggleCard(index)}
                  >
                    Learn more
                    <img src={click} alt="Quote" className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile with Arrow Navigation */}
        <div className="md:hidden mt-8">
          {/* Cards Container */}
          <div className="relative overflow-hidden px-4">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`w-full flex-shrink-0 px-2 transition-all duration-1000 ease-out ${
                    isVisible 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <div style={{ perspective: "1000px" }}>
                    <div
                      className="relative w-full aspect-square transition-transform duration-700 transform-style-3d cursor-pointer"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: flippedCards.has(index)
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      }}
                      onClick={() => toggleCard(index)}
                    >
                      {/* Front */}
                      <div
                        className="absolute inset-0 w-full h-full bg-[#FFE67B] rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        <div className="text-5xl font-light text-[#0E6F7E] mb-2">
                          {step.number}
                        </div>
                        <h3 className="text-5xl font-light text-[#0E6F7E] mb-4">
                          {step.title}
                        </h3>
                        <p className="text-base text-gray-800 text-center font-medium">
                          {step.frontDescription}
                        </p>
                      </div>

                      {/* Back */}
                      <div
                        className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center transition-colors"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <p className="text-sm text-gray-900 text-justify leading-relaxed">
                          {step.backDescription}
                        </p>
                        <button
                          className="mt-4 text-[#0E6F7E] font-semibold hover:underline text-sm transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCard(index);
                          }}
                        >
                          Back
                        </button>
                      </div>
                    </div>

                    <button
                      className="flex items-center gap-2 text-gray-800 font-medium mt-4 mx-auto hover:text-gray-900 hover:gap-3 transition-all duration-300 text-base"
                      onClick={() => toggleCard(index)}
                    >
                      Learn more
                      <img src={click} alt="Quote" className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
                    </button>
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
            style={{ transitionDelay: "600ms" }}
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
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 h-2 bg-[#FFE67B] rounded-full"
                      : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/75 hover:scale-125"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === steps.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === steps.length - 1
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

export default ProcessSteps;