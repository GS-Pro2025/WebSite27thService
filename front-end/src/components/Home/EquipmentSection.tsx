import React from "react";

const EquipmentSection: React.FC = () => {
  return (
    <>
      <section className="w-full pt-20 pb-30 -mt-67 relative z-10 ">
        <img
          src="/assets/banner3.svg"
          alt="Fondo equipment section"
          className="w-full h-auto"
        />
      </section>

      {/* Imagen banner4 */}
      <div className="w-full -mt-75">
        <img
          src="/assets/banner4.svg"
          alt="Decoración inferior"
          className="w-full h-auto"
        />
      </div>
    </>
  );
};

export default EquipmentSection;