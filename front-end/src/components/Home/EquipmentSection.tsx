import React from "react";
import ImageCarousel from "./ImageCarousel";

const EquipmentSection: React.FC = () => {
  const carouselImages = [
    { src: "/assets/mudanza1.jpg", alt: "Equipamiento de mudanza 1" },
    { src: "/assets/mudanza2.svg", alt: "Equipamiento de mudanza 2" },
    { src: "/assets/mudanza3.svg", alt: "Equipamiento de mudanza 3" },
    { src: "/assets/mudanza4.svg", alt: "Equipamiento de mudanza 4" },
  ];
  return (
    <section className="relative w-full bg-[#68A2A6]">
      {/* Imagen superior (banner3) - Aplicando márgenes responsivos como en ProcessSection */}
      <div className="relative z-10 pt-20 pb-30 -mt-[30px] sm:-mt-[60px] md:-mt-[80px] lg:-mt-[120px] xl:-mt-[120px]">
        <img
          src="/assets/banner3.svg"
          alt="Fondo equipment section"
          className="w-full h-auto"
        />
      </div>

      {/* Carrusel de imágenes */}
      <ImageCarousel
        images={carouselImages}
        autoPlay={true}
        autoPlayInterval={4000}
      />
    </section>
  );
};

export default EquipmentSection;
