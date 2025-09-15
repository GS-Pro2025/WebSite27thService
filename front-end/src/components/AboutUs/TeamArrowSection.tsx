import React from "react";
import flecha from "/assets/flechaTeam.svg";
import team from "/assets/team.svg";

const TeamArrowSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Foto de equipo */}
      <img
        src={team}
        alt="Equipo Twenty Seventh"
        className="w-full h-full object-cover"
      />

      {/* Flecha + texto encima de la foto */}
      <div className="pointer-events-none absolute left-0 right-0 top-4 md:top-6 flex justify-end">
        <div className="relative ml-auto w-[520px] sm:w-[600px] md:w-[720px]">
          <img src={flecha} alt="" className="w-full h-auto" />
          <div className="absolute inset-0 flex translate-x-10 md:translate-x-40 translate-y-13">
            <span className="text-[#FFE67B] font-extrabold tracking-wide text-lg sm:text-2xl md:text-3xl">
              TRAINED PROFESSIONALS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamArrowSection;
