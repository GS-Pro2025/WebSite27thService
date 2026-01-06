import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import your stage images
import stage1Image from "/assets/sliderM1.webp";
import stage2Image from "/assets/sliderM2.webp";
import stage3Image from "/assets/sliderM3.webp";
import stage4Image from "/assets/sliderM4.webp";
import stage5Image from "/assets/sliderM5.webp";
import stage6Image from "/assets/sliderM6.webp";
import stage7Image from "/assets/sliderM7.webp";

interface Stage {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
}

const MovingStages: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stages: Stage[] = [
    {
      id: 1,
      number: "01",
      title: "Packing",
      description: "Professional packing of all your belongings with quality materials",
      image: stage1Image,
    },
    {
      id: 2,
      number: "02",
      title: "Packaging",
      description: "Secure wrapping and protection for safe transportation",
      image: stage2Image,
    },
    {
      id: 3,
      number: "03",
      title: "Loading",
      description: "Strategic loading to maximize space and ensure safety",
      image: stage3Image,
    },
    {
      id: 4,
      number: "04",
      title: "Transportation",
      description: "Reliable and secure transport to your destination",
      image: stage4Image,
    },
    {
      id: 5,
      number: "05",
      title: "Unloading",
      description: "Careful unloading and handling of your items",
      image: stage5Image,
    },
    {
      id: 6,
      number: "06",
      title: "Organization",
      description: "Placement and arrangement according to your preferences",
      image: stage6Image,
    },
    {
      id: 7,
      number: "07",
      title: "Verification",
      description: "Final inspection to ensure everything is in perfect condition",
      image: stage7Image,
    },
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev === stages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [stages.length]);

  const handlePrevStage = () => {
    setCurrentStage((prev) => (prev === 0 ? stages.length - 1 : prev - 1));
  };

  const handleNextStage = () => {
    setCurrentStage((prev) => (prev === stages.length - 1 ? 0 : prev + 1));
  };

  const handleStageClick = (index: number) => {
    setCurrentStage(index);
  };

  return (
    <section ref={sectionRef} className="relative py-20 px-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 font-[Poppins]">
            Stages of your move
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-[Manrope]">
            Planned to ensure a flawless experience.
          </p>
        </div>

        {/* Main Image Container */}
        <div 
          className={`relative rounded-3xl overflow-hidden shadow-2xl mb-8 transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Images with crossfade transition */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentStage ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

                {/* Content Container - Left Aligned */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 lg:p-12">
                  <div className="flex justify-end"/>
                  {/* Title and Description - Bottom Left */}
                  <div className="max-w-2xl">
                    <div className="text-6xl md:text-7xl lg:text-8xl font-semibold text-[#0E6F7E] mb-4 drop-shadow-lg font-[Manrope]">
                      {stage.number}
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0E6F7E] mb-3 md:mb-4 drop-shadow-lg font-[Manrope]">
                      {stage.title}
                    </h3>
                    <p className="text-lg md:text-xl lg:text-2xl text-[#0E6F7E] font-medium drop-shadow-md font-[Manrope]">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Inside Image */}
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 pointer-events-none">
            {/* Previous Button */}
            <button
              onClick={handlePrevStage}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white text-[#0E6F7E] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
              aria-label="Previous stage"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextStage}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white text-[#0E6F7E] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
              aria-label="Next stage"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Stage Numbers Navigation */}
        <div 
          className={`flex items-center justify-center gap-3 transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Navigation Buttons Container */}
          <div className="flex items-center gap-4 bg-white rounded-full shadow-lg px-4 md:px-6 py-3 overflow-x-auto max-w-full">
            {/* Stage Number Buttons */}
            <div className="flex gap-2">
              {stages.map((stage, index) => (
                <button
                  key={stage.id}
                  onClick={() => handleStageClick(index)}
                  className={`min-w-[50px] md:min-w-[60px] px-3 md:px-4 py-2 font-[Manrope] rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
                    currentStage === index
                      ? "bg-[#FFE67B] text-gray-900 scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {stage.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingStages;