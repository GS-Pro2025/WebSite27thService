import React, { useState, useEffect, useRef } from 'react';
import CarouselItem5 from '/assets/Carousel_item_5.svg';
import CarouselItem6 from '/assets/Carousel_item_6.svg';
import CarouselItem7 from '/assets/Carousel_item_7.svg';
import CarouselItem8 from '/assets/Carousel_item_8.svg';

const Carousel: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            const timer = setTimeout(() => setAnimateCards(true), 300);
            return () => clearTimeout(timer);
          } else {
            setIsVisible(false);
            setAnimateCards(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-80px 0px -80px 0px"
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

  const carouselItems = [
    {
      id: 1,
      title: 'Special Packaging',
      image: CarouselItem5,
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      description: 'Professional packaging materials and techniques designed to protect your most valuable items during transport.'
    },
    {
      id: 2,
      title: 'Protection Guarantee',
      image: CarouselItem6,
      bgColor: 'bg-gradient-to-br from-blue-50 to-gray-100',
      description: 'Full coverage guarantee ensuring complete protection for all your valuable belongings throughout the move.'
    },
    {
      id: 3,
      title: 'Premium Loading/Transport',
      image: CarouselItem7,
      bgColor: 'bg-gradient-to-br from-purple-50 to-gray-100',
      description: 'Expert handling with premium transport services ensuring safe delivery of your items to destination.'
    },
    {
      id: 4,
      title: 'Complete Installation at Destination',
      image: CarouselItem8,
      bgColor: 'bg-gradient-to-br from-green-50 to-gray-100',
      description: 'Professional installation service at your new location, ensuring everything is perfectly set up.'
    }
  ];

  const handleItemClick = (itemId: number) => {
    if (isMobile) {
      setActiveItem(activeItem === itemId ? null : itemId);
    }
  };

  function getInitialCardPosition(index: number) {
    if (scrollDirection === 'down') {
      const positions = [
        'translate-x-24 translate-y-16',
        'translate-x-12 translate-y-24',
        '-translate-x-12 translate-y-24',
        '-translate-x-24 translate-y-16'
      ];
      return positions[index] || 'translate-y-24';
    } else {
      const positions = [
        'translate-x-24 -translate-y-16',
        'translate-x-12 -translate-y-24',
        '-translate-x-12 -translate-y-24',
        '-translate-x-24 -translate-y-16'
      ];
      return positions[index] || '-translate-y-24';
    }
  }

  return (
    <div 
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 overflow-visible"
    >
      {/* Animated background effects */}
      <div className={`absolute inset-0 transform transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="absolute top-10 left-10 md:top-16 md:left-16 w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 md:top-40 md:right-24 w-10 h-10 md:w-16 md:h-16 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-32 md:bottom-28 md:left-40 w-12 h-12 md:w-20 md:h-20 bg-white/8 rounded-full animate-pulse"></div>
      </div>

      <div className={`max-w-7xl mx-auto relative z-10 transform transition-all duration-1000 delay-100 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : scrollDirection === 'down'
            ? 'translate-y-16 opacity-0'
            : '-translate-y-16 opacity-0'
      }`}>
        {/* Mobile: Grid layout, Desktop: Flex layout */}
        <div className={`
          ${isMobile 
            ? 'grid grid-cols-2 gap-6 md:gap-8' 
            : 'flex gap-8 lg:gap-10 justify-center items-center overflow-visible'
          }
        `}>
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                perspective-1000
                ${isMobile ? 'w-full h-56' : 'flex-shrink-0 w-72 h-80 lg:w-80 lg:h-96'}
                ${animateCards 
                  ? 'translate-x-0 translate-y-0 opacity-100 scale-100' 
                  : `${getInitialCardPosition(index)} opacity-0 scale-75`
                }
              `}
              style={{
                transitionDelay: animateCards ? '0ms' : `${300 + index * 150}ms`,
                transitionDuration: '900ms',
                transition: 'all 0.9s ease-out'
              }}
              onClick={() => handleItemClick(item.id)}
            >
              {/* Card container with flip effect */}
              <div 
                className={`
                  relative w-full h-full
                  card-flip
                  ${(isMobile && activeItem === item.id) || (!isMobile && hoveredItem === item.id) ? 'is-flipped' : ''}
                  cursor-pointer
                `}
                onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
                onMouseLeave={() => !isMobile && setHoveredItem(null)}
              >
                
                {/* Front of card */}
                <div className={`
                  absolute inset-0
                  ${item.bgColor}
                  rounded-2xl md:rounded-3xl
                  p-4 md:p-6 lg:p-8
                  shadow-xl
                  backface-hidden
                  flex flex-col items-center justify-between
                  text-center
                  transform
                  transition-all duration-500
                `}>
                  
                  {/* Title */}
                  <h3 className="text-[#2D3748] text-sm md:text-lg lg:text-xl leading-tight font-bold">
                    {item.title}
                  </h3>

                  {/* Image container */}
                  <div className="w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>

                  {/* Hover indicator for desktop */}
                  {!isMobile && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-gray-500 font-medium">Hover to see details</p>
                    </div>
                  )}

                  {/* Mobile tap indicator */}
                  {isMobile && (
                    <div className={`
                      absolute bottom-3 right-3
                      w-8 h-8 rounded-full
                      bg-white/30
                      flex items-center justify-center
                      transition-all duration-300
                      ${activeItem === item.id ? 'bg-white/50 scale-110' : ''}
                    `}>
                      <div className={`
                        w-2.5 h-2.5 rounded-full bg-white/80
                        ${activeItem === item.id ? 'animate-ping' : 'animate-pulse'}
                      `}></div>
                    </div>
                  )}
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0E6F7E] to-[#0a5260] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl backface-hidden flex flex-col items-center justify-center text-center" style={{ transform: 'rotateY(180deg)' }}>
                  
                  {/* Icon on back */}
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4 md:mb-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain opacity-80 drop-shadow-xl"
                    />
                  </div>

                  {/* Title on back */}
                  <h3 className="text-white text-base md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 drop-shadow-lg">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/90 text-xs md:text-sm lg:text-base leading-relaxed max-w-xs">
                    {item.description}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-4 left-6 w-1 h-1 bg-white/25 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile hint text */}
        {isMobile && (
          <div className={`text-center mt-8 md:mt-10 transform transition-all duration-800 delay-700 ease-out ${
            animateCards 
              ? 'translate-y-0 opacity-100' 
              : scrollDirection === 'down'
                ? 'translate-y-8 opacity-0'
                : '-translate-y-8 opacity-0'
          }`}>
            <p className="text-white/80 text-sm md:text-base font-medium">
              👆 Tap the cards to see more information
            </p>
          </div>
        )}

        {/* Desktop hint */}
        {!isMobile && (
          <div className={`text-center mt-10 lg:mt-12 transform transition-all duration-800 delay-700 ease-out ${
            animateCards 
              ? 'translate-y-0 opacity-100' 
              : scrollDirection === 'down'
                ? 'translate-y-8 opacity-0'
                : '-translate-y-8 opacity-0'
          }`}>
            <p className="text-white/80 text-base lg:text-lg font-medium">
              🖱️ Hover over the cards to discover more details
            </p>
          </div>
        )}
      </div>

      {/* Enhanced CSS for 3D flip effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .perspective-1000 {
            perspective: 1000px;
          }
          
          .card-flip {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.7s ease-out;
          }
          
          .card-flip.is-flipped {
            transform: rotateY(180deg);
          }
          
          .card-flip > div {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          
          .card-flip > div:last-child {
            transform: rotateY(180deg);
          }
          
          .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `
      }} />
    </div>
  );
};

export default Carousel;