import React, { useEffect, useRef, useState } from "react";

const WeightSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
    <section ref={sectionRef} className="w-full">
      {/* SECTION 1: Top gradient banner with title */}
      <div className="w-full bg-[linear-gradient(90deg,#002C3D_0%,#0E6F7E_45%,#FFE67B_80%,#FFF7E6_100%)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="py-10 md:py-14 text-center">
            <h2 
              className={`text-white text-3xl md:text-4xl font-extrabold transition-all duration-1000 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 -translate-y-10"
              }`}
            >
              How Much Does Your Move Weigh?
            </h2>
          </div>
        </div>
      </div>

      {/* SECTION 2: Gray card full width */}
      <div className="w-full bg-[#C6D7CE] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        {/* Container to center card content */}
        <div 
          className={`max-w-6xl mx-auto px-6 md:px-10 py-6 md:py-8 text-slate-700 transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 -translate-x-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <p>
            Knowing the weight of your move is key to planning the best logistics. Having this info helps us:
          </p>
          <ol className="mt-4 space-y-2">
            <li className="font-semibold">
              1. Give you an accurate cost estimate
            </li>
            <li className="font-semibold">
              2. Ensure your move goes smoothly with top-quality standards and no surprises.
            </li>
          </ol>
        </div>
      </div>

      {/* SECTION 3: Bottom pale yellow band */}
      <div className="w-full bg-[#FFE67B]/65">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8 md:gap-6 items-start">
            <p 
              className={`text-slate-800 leading-relaxed transition-all duration-700 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              We know figuring out the weight of your entire move can be tricky, but we've got a simple guide to help you out.
            </p>

            <ArrowRight 
              className={`hidden md:block mt-2 transition-all duration-700 ease-out ${
                isVisible 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "600ms" }}
            />

            <p 
              className={`text-slate-800 leading-relaxed transition-all duration-700 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              Get clear on how many rooms or spaces you're moving, then identify the largest items and make a list for each space.
            </p>

            <ArrowRight 
              className={`hidden md:block mt-2 transition-all duration-700 ease-out ${
                isVisible 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "900ms" }}
            />

            <p 
              className={`text-slate-800 leading-relaxed transition-all duration-700 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              We'll give you some helpful data on common items and their approximate weights so you have a good reference point.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Aesthetic thin arrow, vertically centered in the row */
const ArrowRight: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ 
  className, 
  style 
}) => (
  <svg
    className={className}
    style={style}
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 12h13M13 5l7 7-7 7"
      stroke="#0E6F7E"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default WeightSection;