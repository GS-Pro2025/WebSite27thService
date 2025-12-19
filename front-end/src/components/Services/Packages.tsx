import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import your images here
import basicImage1 from "/assets/Labor.png";
import basicImage2 from "/assets/Packing.png";
import basicImage3 from "/assets/Unpacking.png";
import basicImage4 from "/assets/Loading.png";
import basicImage5 from "/assets/ItemTransport.png";
import basicImage6 from "/assets/ItemRemoval.png";

import mediumImage1 from "/assets/FullPackage.png";
import mediumImage2 from "/assets/Residential.png";
import mediumImage3 from "/assets/Commercial.png";
import mediumImage4 from "/assets/Transport.png";

import premiumImage1 from "/assets/FullService.png";
import premiumImage2 from "/assets/Way.png";

interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
  badge?: string;
  additionalBadge?: string;
}

const SpecialPackages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const packages: Record<string, Service[]> = {
    basic: [
      {
        id: 1,
        name: "Labor",
        description:
          "For those who already have transportation and only need a professional team to load, unload, or move items within the home or office.",
        image: basicImage1,
        badge: "basic",
      },
      {
        id: 2,
        name: "Packing",
        description:
          "Our team carefully packs all your belongings with high-quality materials, ensuring every item arrives intact.",
        image: basicImage2,
        badge: "basic",
      },
      {
        id: 3,
        name: "Unpacking",
        description:
          "We arrive at your new home or business, organize and unpack your belongings so you don't have to worry about anything.",
        image: basicImage3,
        badge: "basic",
      },
      {
        id: 4,
        name: "Loading",
        description:
          "Perfect if you already have transportation: we take care of safely loading all your heavy and delicate items.",
        image: basicImage4,
        badge: "basic",
      },
      {
        id: 5,
        name: "Item Transport",
        description:
          "For moving specific items like appliances, furniture, pianos, or heavy boxes that require special care.",
        image: basicImage5,
        badge: "basic",
      },
      {
        id: 6,
        name: "Item Removal",
        description:
          "We take care of removing and properly disposing of objects, old furniture, or items you no longer need.",
        image: basicImage6,
        badge: "basic",
      },
    ],
    medium: [
      {
        id: 1,
        name: "Full Package Service",
        description:
          "Complete packing service at origin and unpacking at destination, designed to make your move smooth and stress-free.",
        image: mediumImage1,
        badge: "Medium",
        additionalBadge: "additional info",
      },
      {
        id: 2,
        name: "Residential Moving",
        description:
          "Designed for families moving homes or apartments. Includes safe transportation of all household items.",
        image: mediumImage2,
        badge: "Medium",
      },
      {
        id: 3,
        name: "Commercial Moving",
        description:
          "Special for offices, stores, or warehouses. We move desks, computer equipment, documents, and furniture in an organized manner.",
        image: mediumImage3,
        badge: "Medium",
      },
      {
        id: 4,
        name: "Freight Transport",
        description:
          "Fast and reliable service for transporting goods and general cargo, ideal for businesses and distributors.",
        image: mediumImage4,
        badge: "Medium",
      },
    ],
    premium: [
      {
        id: 1,
        name: "Full Service",
        description:
          "The most complete package: we pack, load, transport, and unpack everything for you. You just focus on enjoying your new space.",
        image: premiumImage1,
        badge: "Premium",
      },
      {
        id: 2,
        name: "Your Way",
        description:
          "Like a chameleon that adapts to any environment, this package lets you customize your move: choose only the services you really need.",
        image: premiumImage2,
        badge: "Premium",
      },
    ],
  };

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
        rootMargin: "0px 0px -100px 0px"
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

  const currentServices = packages[activeTab];
  const visibleServices = currentServices.slice(currentIndex, currentIndex + 4);

  const handleNext = () => {
    if (currentIndex + 4 < currentServices.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="relative py-12 md:py-20 px-4 bg-gradient-to-b from-[#D4E8E8] to-[#C9E1EC] overflow-hidden"
      >
        <div className="max-w-8xl mx-auto relative z-10">
          {/* Header */}
          <div 
            className={`text-center mb-8 md:mb-12 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 -translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-3 md:mb-4 font-[Poppins]">
              Special Packages
            </h2>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg font-[Manrope]">
              designed to suit your needs.
            </p>
          </div>

          {/* Tabs */}
          <div 
            className={`flex justify-center mb-8 md:mb-12 overflow-x-auto px-4 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-90"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="bg-white rounded-xl shadow-lg p-1.5 md:p-2 inline-flex gap-1 md:gap-2 min-w-max">
              <button
                onClick={() => handleTabChange("basic")}
                className={`px-6 md:px-12 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === "basic"
                    ? "bg-[#FFE67B] text-gray-900 scale-105"
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                basic
              </button>
              <button
                onClick={() => handleTabChange("medium")}
                className={`px-6 md:px-12 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === "medium"
                    ? "bg-[#FFE67B] text-gray-900 scale-105"
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                medium
              </button>
              <button
                onClick={() => handleTabChange("premium")}
                className={`px-6 md:px-12 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === "premium"
                    ? "bg-[#FFE67B] text-gray-900 scale-105"
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                premium
              </button>
            </div>
          </div>

          {/* Cards Container */}
          <div className="relative">
            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
              {visibleServices.map((service, index) => (
                <div
                  key={service.id}
                  className={`group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:bg-[#FFE67B] hover:-translate-y-2 transition-all duration-1000 ease-out ${
                    isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ transitionDelay: `${500 + index * 150}ms` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden p-4">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <span className="bg-[#B8E0E8] text-[#0E6F7E] text-xs font-semibold px-4 py-1 rounded-full">
                        {service.badge}
                      </span>
                      {service.additionalBadge && (
                        <span className="bg-[#E8F4F8] text-[#0E6F7E] text-xs font-semibold px-4 py-1 rounded-full">
                          {service.additionalBadge}
                        </span>
                      )}
                    </div>

                    {/* Service Name */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 font-[Poppins]">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 font-[Manrope] text-justify">
                      {service.description}
                    </p>

                    {/* Button */}
                    <button className="w-full bg-[#FFE67B] group-hover:bg-white text-gray-900 font-semibold py-3 rounded-full transition-all duration-300 font-[Manrope] hover:scale-105">
                      I want it!
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View - Horizontal Scroll with Snap */}
            <div className="md:hidden mb-6">
              <div 
                className={`flex gap-4 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 -mx-4 transition-all duration-1000 ease-out ${
                  isVisible 
                    ? "opacity-100" 
                    : "opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {currentServices.map((service) => (
                  <div
                    key={service.id}
                    className="group bg-white rounded-3xl shadow-xl overflow-hidden flex-shrink-0 snap-center"
                    style={{ width: 'calc(100vw - 3rem)' }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden p-4">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Badges */}
                      <div className="flex gap-2 mb-3 flex-wrap">
                        <span className="bg-[#B8E0E8] text-[#0E6F7E] text-xs font-semibold px-3 py-1 rounded-full">
                          {service.badge}
                        </span>
                        {service.additionalBadge && (
                          <span className="bg-[#E8F4F8] text-[#0E6F7E] text-xs font-semibold px-3 py-1 rounded-full">
                            {service.additionalBadge}
                          </span>
                        )}
                      </div>

                      {/* Service Name */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-[Poppins]">
                        {service.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 font-[Manrope] line-clamp-3 text-justify">
                        {service.description}
                      </p>

                      {/* Button */}
                      <button className="w-full bg-[#FFE67B] text-gray-900 font-semibold py-2.5 rounded-full transition-colors duration-300 font-[Manrope]">
                        I want it!
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile Scroll Indicator */}
              <div className="flex justify-center gap-1.5 mt-4">
                {currentServices.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === 0 ? 'w-6 bg-[#FFE67B]' : 'w-1.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Only for Desktop */}
            <div 
              className={`hidden md:flex justify-center gap-4 transition-all duration-1000 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentIndex === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#FFE67B] text-gray-900 hover:bg-[#FFD700] shadow-lg hover:shadow-xl hover:scale-110"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex + 4 >= currentServices.length}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentIndex + 4 >= currentServices.length
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#FFE67B] text-gray-900 hover:bg-[#FFD700] shadow-lg hover:shadow-xl hover:scale-110"
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialPackages;