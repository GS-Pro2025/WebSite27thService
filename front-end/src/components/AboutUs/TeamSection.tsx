import React, { useEffect, useRef, useState } from "react";

type Member = {
  name: string;
  photoSrc?: string;
  title: string;
  description: string;
  instagram: string;
};

const TEAM: Member[] = [
  {
    name: "Julie Perilla",
    photoSrc: "/assets/julie.png",
    title: "CEO & Co-Founder",
    description:
      "Julie leads the administrative and strategic management of Twenty Seventh Services Group, ensuring an organized, efficient operation focused on excellence in customer service.",
    instagram: "https://www.instagram.com/julie_perilla?igsh=NGEzZGs5M3VwZWlo",
  },
  {
    name: "Andres Londoño",
    photoSrc: "/assets/andres.png",
    title: "CEO & Co-Founder",
    description:
      "Andrés is responsible for logistics and moving operations, overseeing every process to guarantee safe, timely, and high-quality relocations.",
    instagram: "https://www.instagram.com/isnerl?igsh=OGRicGNwNDFuOHkz",
  },
];

const TeamCard: React.FC<Member & { index: number }> = ({
  name,
  photoSrc,
  title,
  description,
  instagram,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        aspectRatio: "3/5",
        maxWidth: "320px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Member photo */}
      <div className="relative w-full h-full">
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#ffffff] to-[#0E6F7E]" />
        )}

        {/* Name and title always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl text-[#0E6F7E] font-bold mb-1">{name}</h3>
          <p className="text-xs text-[#0E6F7E]/80">{title}</p>
        </div>
      </div>

      {/* Hover information overlay */}
      <div
        className={`absolute inset-0 bg-linear-to-br from-[#91c4be] to-[#0E6F7E] flex flex-col justify-between p-4 transition-all duration-500 ${
          isHovered ? "translate-y-0 opacity-80" : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-xs font-semibold text-[#0E6F7E] mb-3">{title}</p>
          <p className="text-xs text-white text-justify leading-relaxed">
            {description}
          </p>
        </div>

        {/* Instagram button */}
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-white/50 hover:bg-white/30 backdrop-blur-sm text-white py-2 px-3 rounded-xl transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0E6F7E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span className="text-xs font-medium">Follow on Instagram</span>
        </a>
      </div>
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
      setHasHeaderAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Safe Moves badge */}
        <div
          className={`absolute top-4 left-4 z-10 transform transition-all duration-700 ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
        >
          <span className="bg-[#F4D35E] text-gray-900 px-6 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
            Safe Moves
          </span>
        </div>

        {/* Animated title */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Team
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            We'll guide you through the process of getting a quote for your next
            move
          </p>
        </div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto justify-items-center">
          {TEAM.map((member, index) => (
            <TeamCard key={member.name} {...member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
