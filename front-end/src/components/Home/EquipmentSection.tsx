import React from "react";

const EquipmentSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#68A2A6]">

      {/* Imagen superior (banner3) - Aplicando márgenes responsivos como en ProcessSection */}
      <div className="relative z-10 pt-20 pb-30 -mt-[30px] sm:-mt-[60px] md:-mt-[80px] lg:-mt-[120px] xl:-mt-[140px]">
        <img
          src="/assets/banner3.svg"
          alt="Fondo equipment section"
          className="w-full h-auto"
        />
      </div>

      {/* Imagen inferior (banner4) - Aplicando márgenes responsivos */}
      <div className="relative z-0 w-full -mt-[170px] sm:-mt-[230px] md:-mt-[230px] lg:-mt-[300px] xl:-mt-[320px]">
        <img
          src="/assets/mudanza2.svg"
          alt="Decoración inferior"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default EquipmentSection;