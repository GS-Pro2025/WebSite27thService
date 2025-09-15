import React from "react";

type Props = {
  title: string;
  icon: string;
};

const ValueCard: React.FC<Props> = ({ title, icon }) => (
  <div
    className="
      bg-white rounded-2xl md:rounded-3xl p-4 md:p-5
      shadow-lg border border-black/5
      w-36 h-40 sm:w-48 sm:h-48 md:w-56 md:h-52
      flex flex-col items-center justify-between text-center
      transition-transform duration-300 hover:-translate-y-1
    "
  >
    <h3 className="text-[#0E6F7E] text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-wide">
      {title}
    </h3>

    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
      <img src={icon} alt={title} className="w-full h-full object-contain" />
    </div>
  </div>
);

export default ValueCard;
