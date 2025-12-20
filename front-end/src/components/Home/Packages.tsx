import React, { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import movingBoxImage from "/assets/cajaFamilia.png";

interface PackageInfo {
  id: string;
  name: string;
  description: string;
  services: string[];
  highlight?: string;
}

const MovingPackages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const packages: Record<string, PackageInfo> = {
    basic: {
      id: "basic",
      name: "Basic",
      description: "Individual services for specific needs",
      services: [
        "Labor (Manpower only)",
        "Packing",
        "Unpacking",
        "Loading",
        "Item Transport",
        "Item Removal",
      ],
    },
    medium: {
      id: "medium",
      name: "Medium",
      description: "Combined packages for complete moves",
      services: [
        "Packing + Loading + Transport + Unpacking",
        "Residential Moving",
        "Commercial Moving",
        "Freight Transport",
      ],
    },
    premium: {
      id: "premium",
      name: "Premium",
      description: "Complete and personalized experience",
      services: [
        "Full Service",
        "Your Way",
      ],
      highlight: "Maximum flexibility and personalized service",
    },
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

  const handleLearnMore = () => {
    console.log("Navigate to services");
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-[#D9F3FF] to-[#E8F8FC] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div 
            className={`w-full transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-20"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="mb-6 md:mb-8 lg:mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-900 mb-3 md:mb-4 lg:mb-5 font-[Poppins]">
                Moving Packages
              </h2>
              <p className="text-gray-700 text-sm md:text-base lg:text-lg font-[Manrope]">
                Choose the service level that best fits your needs
              </p>
            </div>

            {/* TABS */}
            <div 
              className={`bg-white rounded-xl md:rounded-2xl shadow-lg p-1.5 md:p-2 mb-6 md:mb-8 inline-flex gap-1 md:gap-2 w-full sm:w-auto overflow-x-auto transition-all duration-1000 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <button
                onClick={() => setActiveTab("basic")}
                className={`px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                  activeTab === "basic"
                    ? "bg-[#FFE67B] text-gray-900 scale-105"
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setActiveTab("medium")}
                className={`px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                  activeTab === "medium"
                    ? "bg-[#FFE67B] text-gray-900 scale-105"
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setActiveTab("premium")}
                className={`px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                  activeTab === "premium"
                    ? "bg-[#FFE67B] text-gray-900 scale-105"
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                Premium
              </button>
            </div>

            {/* PACKAGE DETAILS */}
            <div 
              className={`bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 transition-all duration-1000 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="space-y-4 md:space-y-6">
                <div className="transition-all duration-500 ease-out">
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-3 font-[Poppins]">
                    {packages[activeTab].name} Package
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base font-[Manrope]">
                    {packages[activeTab].description}
                  </p>
                  {packages[activeTab].highlight && (
                    <p className="text-teal-600 font-semibold mt-2 text-sm md:text-base font-[Manrope]">
                      {packages[activeTab].highlight}
                    </p>
                  )}
                </div>

                {/* SERVICES LIST */}
                <div>
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 font-[Poppins]">
                    Services included:
                  </h4>
                  <ul className="space-y-2 md:space-y-3 font-[Manrope]">
                    {packages[activeTab].services.map((service, index) => (
                      <li 
                        key={index} 
                        className={`flex items-start gap-2 md:gap-3 transition-all duration-500 ease-out ${
                          isVisible 
                            ? "opacity-100 translate-x-0" 
                            : "opacity-0 -translate-x-10"
                        }`}
                        style={{ transitionDelay: `${700 + index * 100}ms` }}
                      >
                        <span className="text-teal-600 mt-0.5 md:mt-1 text-base md:text-lg flex-shrink-0">✓</span>
                        <span className="text-gray-700 text-sm md:text-base">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handleLearnMore}
                className="flex items-center gap-2 text-gray-800 font-medium mt-6 md:mt-8 hover:text-gray-900 hover:gap-3 transition-all duration-300 font-[Manrope] text-sm md:text-base"
              >
                Learn more details
                <Plus className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 hover:rotate-90" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE — IMAGE */}
          <div 
            className={`relative order-first lg:order-last transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-x-0 scale-100" 
                : "opacity-0 translate-x-20 scale-95"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl w-full max-w-md mx-auto lg:max-w-none">
              <img
                src={movingBoxImage}
                alt="Moving packages"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MovingPackages;