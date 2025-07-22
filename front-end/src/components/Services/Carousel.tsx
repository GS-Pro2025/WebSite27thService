import React, { useState } from 'react';

const Carousel: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const carouselItems = [
    {
      id: 1,
      title: 'Special Packaging',
      image: '/assets/Carousel_item_1.svg',
      bgColor: 'bg-gray-100'
    },
    {
      id: 2,
      title: 'Protection Guarantee',
      image: '/assets/Carousel_item_2.svg',
      bgColor: 'bg-gray-100'
    },
    {
      id: 3,
      title: 'Premium Loading/Transport',
      image: '/assets/Carousel_item_3.svg',
      bgColor: 'bg-gray-100'
    },
    {
      id: 4,
      title: 'Complete Installation at Destination',
      image: '/assets/Carousel_item_4.svg',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="relative w-full bg-[#7DAEB5] py-12 px-4 overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-12 h-12 bg-white/5 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-16 h-16 bg-white/8 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-40 w-8 h-8 bg-white/12 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Carousel container with effects */}
        <div className="flex gap-6 justify-center items-center overflow-x-auto pb-4 scroll-smooth">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                flex-shrink-0 
                ${item.bgColor}
                rounded-2xl 
                p-6 
                shadow-lg
                w-64 
                h-60
                flex 
                flex-col 
                items-center 
                justify-between
                text-center
                cursor-pointer
                transform
                transition-all
                duration-500
                ease-out
                hover:scale-110
                hover:shadow-2xl
                hover:-translate-y-3
                hover:rotate-1
                group
                relative
                overflow-hidden
              `}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInScale 0.6s ease-out forwards'
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Moving shine effect */}
              <div className="absolute inset-0 -top-10 -left-10 w-10 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 translate-x-[-100px] group-hover:translate-x-[300px] transition-transform duration-1000 ease-out"></div>
              
              {/* Floating particles on hover */}
              {hoveredItem === item.id && (
                <>
                  <div className="absolute top-2 left-2 w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
                  <div className="absolute top-8 right-4 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/50 rounded-full animate-ping"></div>
                </>
              )}

              {/* Title with effect */}
              <h3 className={`
                text-[#585858] 
                text-sm md:text-base 
                leading-tight 
                font-bold 
                mb-0
                transform
                transition-all
                duration-300
                ${hoveredItem === item.id ? 'text-[#2D3748] scale-105' : ''}
              `}>
                {item.title}
              </h3>

              {/* Image container with effects */}
              <div className={`
                w-28 h-28 
                flex items-center justify-center
                transform
                transition-all
                duration-500
                ${hoveredItem === item.id ? 'scale-125 rotate-12' : ''}
                mb-4
              `}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={`
                    w-full h-full object-contain
                    transition-all duration-300
                    ${hoveredItem === item.id ? 'drop-shadow-lg' : ''}
                  `}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `
      }} />
    </div>
  );
};

export default Carousel;