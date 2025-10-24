import React, { useState, useEffect, useRef } from "react";

type TabKey = "kitchen" | "bedroom" | "office";

const ICONS: Record<TabKey, { src: string; alt: string; peso: string }[]> = {
  kitchen: [
    { src: "/assets/estufa.svg", alt: "Stove 3D", peso: "176 - 331 lb" },
    { src: "/assets/nevera.svg", alt: "Fridge 3D", peso: "200 - 400 lb" },
    {
      src: "/assets/horno.svg",
      alt: "Microwave 3D",
      peso: "50 - 120 lb",
    },
  ],
  bedroom: [
    { src: "/assets/cama.svg", alt: "Bed 3D", peso: "220 - 350 lb" },
    { src: "/assets/armario.svg", alt: "Wardrobe 3D", peso: "300 - 500 lb" },
    { src: "/assets/gavetas.svg", alt: "Dresser 3D", peso: "180 - 280 lb" },
  ],
  office: [
    { src: "/assets/silla.svg", alt: "Chair 3D", peso: "40 - 90 lb" },
    {
      src: "/assets/estanteria.svg",
      alt: "Bookshelf 3D",
      peso: "150 - 250 lb",
    },
    {
      src: "/assets/escritorio.svg",
      alt: "Desk 3D",
      peso: "200 - 320 lb",
    },
  ],
};

const TAB_LABELS: Record<TabKey, string> = {
  kitchen: "Kitchen",
  bedroom: "Bedroom",
  office: "Office",
};

const CalculatorSection: React.FC = () => {
  const [active, setActive] = useState<TabKey>("kitchen");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px"
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

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[linear-gradient(90deg,#002C3D_0%,#0E6F7E_45%,#FFE67B_80%,#FFF7E6_100%)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12 mb-20">
          {(Object.keys(TAB_LABELS) as TabKey[]).map((key, index) => (
            <div 
              key={key} 
              className={`flex flex-col items-center gap-y-6 transition-all duration-700 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <button
                onClick={() => setActive(key)}
                className={`text-[#0E6F7E] font-bold text-4xl py-3 px-12 rounded-2xl shadow-lg border border-black transition-all duration-300 w-full max-w-xs
    ${active === key ? "bg-[#FFE67B] scale-105" : "bg-white hover:bg-gray-100"}`}
              >
                {TAB_LABELS[key]}
              </button>

              <div className="relative w-full h-auto max-w-[300px] mx-auto">
                <img
                  src={ICONS[active][index].src}
                  alt={ICONS[active][index].alt}
                  className={`w-full h-auto transform transition-all duration-500 hover:scale-110 ${
                    isVisible ? "scale-100 rotate-0" : "scale-75 rotate-12"
                  }`}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                />
              </div>

              <div 
                className={`bg-white text-[#0E6F7E] font-bold text-lg py-3 px-2 rounded-2xl shadow-md border border-black w-full max-w-[200px] transition-all duration-700 ease-out ${
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
              >
                {ICONS[active][index].peso}
              </div>
            </div>
          ))}
        </div>

        <div 
          className={`transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <p className="text-xl md:text-4xl font-bold text-[#2D2A26]">
            Don't worry, we'll calculate the weight for you
          </p>
          <a
            href="#contactanos"
            className={`inline-block mt-5 bg-[#FFE67B] text-[#0E6F7E] font-bold 
             text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
             py-3 sm:py-4 
             px-6 sm:px-10 md:px-14 lg:px-20 
             rounded-full shadow-lg 
             hover:bg-yellow-300 transition-all transform hover:scale-105 ${
               isVisible ? "animate-pulse-subtle" : ""
             }`}
          >
            Contact Us
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CalculatorSection;