import React from "react";

const TestimonialCard: React.FC<{ text: string; containerClassName: string }> =
  React.memo(({ text, containerClassName }) => (
    <div className={containerClassName}>
      <div className="bg-[#0E6F7E] text-white p-2 lg:p-3 rounded-lg shadow-lg">
        <p className="font-montserrat text-[10px] sm:text-xs lg:text-sm mb-1.5 leading-tight">
          "{text}"
        </p>
        <div className="flex items-center">
          <div className="flex text-yellow-400 text-[9px] sm:text-[11px] lg:text-xs">
            ★★★★★
          </div>
        </div>
      </div>
    </div>
  ));

export default TestimonialCard;
