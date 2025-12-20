import React, { useEffect, useRef, useState } from "react";

type Member = {
  name: string;
  photoSrc?: string;
};

const TEAM: Member[] = [
  {
    name: "Julie Perilla",
    photoSrc: "/assets/julie.png",
  },
  {
    name: "Andres Londoño",
    photoSrc: "/assets/andres.png",
  },
];

const TeamCard: React.FC<Member & { index: number }> = ({ name, photoSrc, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasAnimated) {
              setTimeout(() => {
                setIsVisible(true);
                setHasAnimated(true);
              }, index * 200);
            } else {
              setIsVisible(true);
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-3xl p-8 shadow-xl max-w-sm mx-auto transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Foto del miembro con efecto hover */}
      <div className="relative w-full h-64 sm:h-80 md:aspect-square rounded-2xl overflow-hidden mb-6 group">
        {photoSrc ? (
          <>
            <img
              src={photoSrc}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div
            className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"
            aria-label="Placeholder"
          />
        )}
      </div>

      {/* Nombre del miembro */}
      <h3 className="text-gray-900 font-bold text-2xl text-center">
        {name}
      </h3>
    </div>
  );
};

const TeamSection: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [hasHeaderAnimated, setHasHeaderAnimated] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
            if (!hasHeaderAnimated) {
              setHasHeaderAnimated(true);
            }
          } else {
            setIsHeaderVisible(false);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-50px" }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, [hasHeaderAnimated]);

  // Animación inicial al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
      setHasHeaderAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#C9E1EC] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Badge y título con animación */}
        <div
          ref={headerRef}
          className="flex flex-col items-center mb-4"
        >
          <div
            className={`absolute top-4 left-4 z-10 transform transition-all duration-700 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <span className="bg-[#F4D35E] text-gray-900 px-6 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
              Safe Moves
            </span>
          </div>
          
          <h2
            className={`text-center text-gray-900 font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 transform transition-all duration-700 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
            style={{
              transitionDelay: isHeaderVisible ? "200ms" : "0ms",
            }}
          >
            Our Team
          </h2>
          
          <p
            className={`text-center text-gray-600 max-w-2xl text-lg mb-12 transform transition-all duration-700 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isHeaderVisible ? "300ms" : "0ms",
            }}
          >
            We'll guide you through the process of getting a quote for your next move
          </p>
        </div>

        {/* Grid de miembros del equipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {TEAM.map((member, index) => (
            <TeamCard key={index} {...member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;