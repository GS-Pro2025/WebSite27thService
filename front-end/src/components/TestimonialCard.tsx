import React from "react";

interface TestimonialCardProps {
  text: string;
  containerClassName: string;
  rating?: number; // Añadimos rating como prop opcional
}

const TestimonialCard: React.FC<TestimonialCardProps> = React.memo(({ 
  text, 
  containerClassName, 
  rating = 5 // Default 5 estrellas si no hay rating
}) => {
  // Generar estrellas basadas en el rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    return (
      <>
        {/* Estrellas llenas */}
        {Array(fullStars).fill(0).map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {/* Estrella media (si aplica) */}
        {hasHalfStar && <span className="text-yellow-400">☆</span>}
        {/* Estrellas vacías */}
        {Array(emptyStars).fill(0).map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">☆</span>
        ))}
      </>
    );
  };

  return (
    <div className={containerClassName}>
      <div className="bg-[#0E6F7E] text-white p-3 lg:p-4 xl:p-5 rounded-lg shadow-lg max-w-full">
        <p className="font-montserrat text-xs sm:text-sm lg:text-base xl:text-lg mb-2 lg:mb-3 leading-snug">
          "{text}"
        </p>
        <div className="flex items-center justify-between">
          <div className="flex text-[11px] sm:text-xs lg:text-sm xl:text-base">
            {renderStars(rating)}
          </div>
          <span className="text-yellow-400 text-[10px] sm:text-xs lg:text-sm font-semibold">
            {rating}/5
          </span>
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
