import React from "react";
import ValueCard from "../AboutUs/ValueCard";
import flechaValues from "/assets/flechaValues.svg";

const VALUES = [
  { title: "RESPONSIBILITY", icon: "/assets/resp_hand_box.svg" },
  { title: "HONESTY", icon: "/assets/honest_lock.svg" },
  { title: "RESPECT", icon: "/assets/respect_people.svg" },
  { title: "DEDICATION", icon: "/assets/dedication_gear.svg" },
];

const CompanyValuesSection: React.FC = () => {
  return (
    <section className="bg-[#C6D7CE] py-8 md:py-12">
      {/* Barra con flecha y texto */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative -translate-x-51 -translate-y-12 mx-0 w-[320px] sm:w-[480px] md:w-full">
          <img
            src={flechaValues}
            alt=""
            className="w-full h-auto select-none pointer-events-none"
          />
          {/* texto centrado sobre la flecha */}
          <div className="absolute inset-0 flex items-center justify-center px-10 sm:px-12">
            <span className="text-[#FFE67B] -translate-y-5 font-extrabold tracking-wide text-lg sm:text-2xl md:text-3xl">
              COMPANY VALUES
            </span>
          </div>
        </div>

        {/* Reuso de la tarjeta */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {VALUES.map((v) => (
            <ValueCard
              key={v.title}
              title={v.title.toUpperCase()}
              icon={v.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValuesSection;
