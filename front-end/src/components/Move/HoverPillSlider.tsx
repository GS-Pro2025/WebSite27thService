import React, { useState, useEffect, useRef } from "react";

type Item = {
  title: string;
  subtitle: string;
  desc: string;
  cta: string;
  iconSrc: string;
};

const ITEMS: Item[] = [
  {
    title: "Ant Team",
    subtitle: "(Labor only)",
    desc: "For those who already have transportation and just need a professional team to load, unload, or move within your home or office.",
    cta: "GET IT",
    iconSrc: "ant.svg",
  },
  {
    title: "Beaver Team",
    subtitle: "(Heavy lifting)",
    desc: "Perfect for bulky and heavy items that need specialized handling.",
    cta: "Get Quote",
    iconSrc: "beaver.svg",
  },
  {
    title: "Butterfly Pack",
    subtitle: "(Premium packing)",
    desc: "Top-tier packing for delicate and high-value items.",
    cta: "See Details",
    iconSrc: "butterfly.svg",
  },
  {
    title: "Eagle Move",
    subtitle: "(Express moving)",
    desc: "Fast service with tight time windows and priority handling.",
    cta: "Book Now",
    iconSrc: "eagle.svg",
  },
  {
    title: "Bull Fleet",
    subtitle: "(Full transport)",
    desc: "Includes truck, crew, and protective materials.",
    cta: "Get Started",
    iconSrc: "bull.svg",
  },
  {
    title: "Kangaroo Care",
    subtitle: "(Extra protection)",
    desc: "Covers, blankets, and corner guards for maximum safety.",
    cta: "Activate",
    iconSrc: "kangaroo.svg",
  },
  {
    title: "Turtle Store",
    subtitle: "(Temporary storage)",
    desc: "Storage for days or weeks while you relocate.",
    cta: "Learn More",
    iconSrc: "turtle.svg",
  },
  {
    title: "Bee Assist",
    subtitle: "(Hourly helper)",
    desc: "Extra help for a limited time to tackle specific tasks.",
    cta: "Request",
    iconSrc: "bee.svg",
  },
];

const BG_LIGHT = "#F7F7F7EB";
const BG_BLUE = "#33A8BAE0";
const TEAL_TEXT = "#0E6F7E";
const YELLOW_TEXT = "#FFE67B";

export default function HoverPillSlider() {
  const [active, setActive] = useState(0);
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
    <section ref={sectionRef} className="relative w-full overflow-x-auto">
      <div className="flex items-end gap-3 md:gap-4 py-10 px-4 min-w-full">
        {ITEMS.map((item, i) => {
          const isActive = active === i;
          const isEven = i % 2 === 0;
          const bg = isEven ? BG_LIGHT : BG_BLUE;
          const dark = !isEven;

          const circleBg = isEven ? "#FFE67B" : "#C6D7CE";

          return (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group relative outline-none flex-shrink-0 transition-all duration-700 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              aria-expanded={isActive}
            >
              <div
                className="transition-all duration-300 ease-out rounded-[3rem] shadow-md border border-black/10 overflow-hidden relative flex hover:shadow-xl"
                style={{
                  backgroundColor: bg,
                  width: isActive ? "26rem" : "5rem",
                  height: "28rem",
                }}
              >
                {/* Internal content */}
                <div
                  className={`flex flex-col h-full w-full px-6 pt-6 pb-32
                    ${dark ? "text-white" : "text-slate-900"}`}
                >
                  <div
                    className={`${
                      isActive ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                  >
                    <h3
                      className="text-3xl font-extrabold leading-tight"
                      style={
                        dark ? { color: YELLOW_TEXT } : { color: TEAL_TEXT }
                      }
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`mt-1 text-sm ${
                        dark ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                    <p
                      className={`mt-4 text-base ${
                        dark ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>

                {isActive ? (
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between animate-fadeInUp">
                    {/* Button on the left */}
                    <a
                      href="#contactanos"
                      className={`rounded-full px-8 py-4 text-base font-extrabold shadow transition-all transform hover:scale-105
        ${
          dark
            ? "bg-white text-slate-900 hover:bg-white/90"
            : "bg-white hover:bg-white/90"
        }`}
                      style={{ color: dark ? YELLOW_TEXT : TEAL_TEXT }}
                    >
                      {item.cta}
                    </a>

                    {/* Icon on the right with circle */}
                    <div
                      className="w-16 h-16 rounded-full shadow flex items-center justify-center relative transform hover:scale-110 transition-transform"
                      style={{ backgroundColor: circleBg }}
                    >
                      <img
                        src={`/assets/${item.iconSrc}`}
                        alt={item.title}
                        className="w-24 h-24 object-contain absolute -top-2 animate-bounce-subtle"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full shadow flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: circleBg }}
                  >
                    <img
                      src={`/assets/${item.iconSrc}`}
                      alt={item.title}
                      className="w-24 h-24 object-contain relative"
                    />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceSub {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounceSub 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}