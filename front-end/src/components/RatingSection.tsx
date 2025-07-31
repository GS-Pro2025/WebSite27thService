import React, { useCallback, useMemo, useState } from "react";

const RatingSection: React.FC<{ className: string }> = ({ className }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRatingSubmit = useCallback(() => {
    alert(
      `Calificación enviada: ${rating} estrellas. Comentario: "${feedback}"`
    );
  }, [rating, feedback]);

  const stars = useMemo(() => [1, 2, 3, 4, 5], []);

  return (
    <div className={className}>
      {/* Título y descripción */}
      <h2 className="text-[13px] sm:text-xl md:text-3xl lg:text-[40px] font-[Montserrat] font-semibold leading-tight text-center whitespace-nowrap">
        <span className="text-[#FFE67B]">Your opinion </span>
        <span className="text-white">is important to us!</span>
      </h2>
      <p className="font-[Montserrat] text-white text-center mt-2 leading-relaxed px-6 sm:px-4 md:px-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-[28px]">
        Tell us about your service experience, it helps us improve every day to
        provide you with the best quality in moving services.
      </p>

      {/* Caja de calificación */}
      <div className="mt-4 sm:mt-6 bg-white/75 rounded-md px-3 sm:px-4 md:px-6 py-2 sm:py-3 mx-auto w-full max-w-[55%] sm:max-w-sm md:max-w-md shadow">
        {/* Estrellas */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          {stars.map((star) => (
            <div
              key={star}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            >
              <svg
                fill={star <= (hovered || rating) ? "#FCD21C" : "#0E6F7E"}
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-all duration-200"
              >
                <path d="M12 2l2.6 6.5H22l-5.2 4.2L18.6 20 12 16.3 5.4 20l1.4-7.3L2 8.5h7.4L12 2z" />
              </svg>
              <span className="text-[8px] sm:text-[10px] text-[#0E6F7E] mt-0.5 sm:mt-1 whitespace-nowrap">
                Tab {star}
              </span>
            </div>
          ))}
        </div>
        {/* Textarea */}
        <div className="mb-3 sm:mb-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts with us"
            className="text-[#606060] bg-white w-full px-2 sm:px-3 py-0.5 sm:py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0E6F7E] focus:border-transparent resize-none placeholder-[#606060] text-center placeholder:text-center text-xs sm:text-sm md:text-base"
            rows={2}
          />
        </div>
        {/* Botón de envío */}
        <div className="flex justify-center">
          <button
            onClick={handleRatingSubmit}
            className="bg-[#FFE67B]/40 text-[#606060] font-semibold px-4 sm:px-6 py-1 sm:py-2 rounded-full border border-[#FFE67B] hover:brightness-105 transition text-xs sm:text-sm md:text-base"
          >
            Submit your rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
