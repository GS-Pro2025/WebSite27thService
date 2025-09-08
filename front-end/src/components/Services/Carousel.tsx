import React, { useState, useEffect, useRef } from 'react';

const Carousel: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer1 = setTimeout(() => setIsVisible(true), 300);
            const timer2 = setTimeout(() => setAnimateCards(true), 600);
            
            return () => {
              clearTimeout(timer1);
              clearTimeout(timer2);
            };
          }
        });
      },
      {
        threshold: 0.2,
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

  const carouselItems = [
    {
      id: 1,
      title: 'Special Packaging',
      image: '/assets/Carousel_item_5.svg',
      bgColor: 'bg-gray-100',
      description: 'Professional packaging for maximum protection'
    },
    {
      id: 2,
      title: 'Protection Guarantee',
      image: '/assets/Carousel_item_6.svg',
      bgColor: 'bg-gray-100',
      description: 'Full coverage guarantee for your valuable items'
    },
    {
      id: 3,
      title: 'Premium Loading/Transport',
      image: '/assets/Carousel_item_7.svg',
      bgColor: 'bg-gray-100',
      description: 'Careful handling and premium transport services'
    },
    {
      id: 4,
      title: 'Complete Installation at Destination',
      image: '/assets/Carousel_item_8.svg',
      bgColor: 'bg-gray-100',
      description: 'Full installation service at your new location'
    }
  ];

  const handleItemClick = (itemId: number) => {
    if (isMobile) {
      setActiveItem(activeItem === itemId ? null : itemId);
    }
  };

  const handleItemHover = (itemId: number | null) => {
    if (!isMobile) {
      setActiveItem(itemId);
    }
  };

  function getInitialCardPosition(index: number) {
    const positions = [
      'translate-x-20 translate-y-10',  // Card 1: from right-bottom
      'translate-x-10 translate-y-20',  // Card 2: from right-down
      '-translate-x-10 translate-y-20', // Card 3: from left-down
      '-translate-x-20 translate-y-10'  // Card 4: from left-bottom
    ];
    return positions[index] || 'translate-y-20';
  }

  return (
    <div 
      ref={sectionRef}
      className="relative w-full py-1 md:py-3 px-4 overflow-visible"
    >
      {/* Animated background effects */}
      <div className={`absolute inset-0 transform transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-5 left-5 md:top-10 md:left-10 w-10 h-10 md:w-20 md:h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-10 md:top-32 md:right-20 w-6 h-6 md:w-12 md:h-12 bg-white/5 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-10 left-20 md:bottom-20 md:left-32 w-8 h-8 md:w-16 md:h-16 bg-white/8 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className={`max-w-7xl mx-auto relative z-10 py-2 md:py-4 transform transition-all duration-1000 delay-200 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {/* Mobile: Grid layout, Desktop: Flex layout */}
        <div className={`
          ${isMobile 
            ? 'grid grid-cols-2 gap-4' 
            : 'flex gap-6 justify-center items-center overflow-visible px-4 md:px-8'
          }
        `}>
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                ${item.bgColor}
                rounded-xl md:rounded-2xl 
                p-3 md:p-6 
                shadow-lg
                ${isMobile ? 'w-full h-48' : 'flex-shrink-0 w-64 h-60'}
                flex 
                flex-col 
                items-center 
                justify-between
                text-center
                cursor-pointer
                transform
                transition-all
                duration-300 md:duration-500
                ease-out
                ${activeItem === item.id 
                  ? 'scale-105 md:scale-110 shadow-2xl -translate-y-1 md:-translate-y-3 rotate-1 z-20' 
                  : 'hover:scale-102 md:hover:scale-110 hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-3 hover:rotate-1'
                }
                group
                relative
                overflow-visible
                ${isMobile && activeItem === item.id ? 'ring-2 ring-white/50' : ''}
                ${animateCards 
                  ? 'translate-x-0 translate-y-0 opacity-100 scale-100' 
                  : `${getInitialCardPosition(index)} opacity-0 scale-75`
                }
              `}
              style={{
                transitionDelay: animateCards ? '0ms' : `${400 + index * 150}ms`,
                transitionDuration: '800ms'
              }}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => handleItemHover(item.id)}
              onMouseLeave={() => handleItemHover(null)}
            >
              
              {/* Floating particles - only on active for mobile */}
              {activeItem === item.id && (
                <>
                  <div className="absolute top-1 left-1 md:top-2 md:left-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-white/40 rounded-full animate-bounce"></div>
                  <div className="absolute top-4 right-2 md:top-8 md:right-4 w-1 h-1 md:w-1.5 md:h-1.5 bg-white/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-0.5 h-0.5 md:w-1 md:h-1 bg-white/50 rounded-full animate-ping"></div>
                </>
              )}

              {/* Title with effect */}
              <h3 className={`
                text-[#585858] 
                text-xs md:text-base 
                leading-tight 
                font-bold 
                mb-1 md:mb-0
                transform
                transition-all
                duration-300
                ${activeItem === item.id ? 'text-[#2D3748] scale-105' : ''}
              `}>
                {item.title}
              </h3>

              {/* Mobile description - shows when active */}
              {isMobile && activeItem === item.id && (
                <p className="text-[#585858] text-xs leading-tight mb-2 animate-fadeIn">
                  {item.description}
                </p>
              )}

              {/* Image container with effects */}
              <div className={`
                w-20 h-20 md:w-28 md:h-28 
                flex items-center justify-center
                transform
                transition-all
                duration-300 md:duration-500
                ${activeItem === item.id ? 'scale-110 md:scale-125 rotate-6 md:rotate-12' : ''}
                mb-6 md:mb-4
                mx-auto
              `}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={`
                    w-full h-full object-contain
                    transition-all duration-300
                    ${activeItem === item.id ? 'drop-shadow-lg' : ''}
                  `}
                />
              </div>

              {/* Mobile tap indicator */}
              {isMobile && (
                <div className={`
                  absolute bottom-1 right-1 
                  w-6 h-6 rounded-full 
                  bg-white/20 
                  flex items-center justify-center
                  transition-all duration-300
                  ${activeItem === item.id ? 'bg-white/40 scale-110' : ''}
                `}>
                  <div className={`
                    w-2 h-2 rounded-full bg-white/60
                    ${activeItem === item.id ? 'animate-ping' : 'animate-pulse'}
                  `}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile hint text */}
        {isMobile && (
          <div className={`text-center mt-6 transform transition-all duration-800 delay-1000 ease-out ${
            animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <p className="text-white/70 text-sm">
              Click the cards to see more information
            </p>
          </div>
        )}
      </div>

      {/* Enhanced CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
          
          @media (max-width: 768px) {
            .hover\\:scale-102 {
              transform: scale(1.02);
            }
          }
        `
      }} />
    </div>
  );
};

export default Carousel;