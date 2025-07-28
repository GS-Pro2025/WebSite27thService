import React from "react";
import ImageCarousel from "./ImageCarousel";

const PhotoCarouselSection: React.FC = () => {
  const carouselImages = [
    { src: "/assets/mudanza1.jpg", alt: "Equipamiento de mudanza 1" },
    { src: "/assets/mudanza2.svg", alt: "Equipamiento de mudanza 2" },
    { src: "/assets/mudanza3.svg", alt: "Equipamiento de mudanza 3" },
    { src: "/assets/mudanza4.svg", alt: "Equipamiento de mudanza 4" },
  ];

  return (
    <section className="relative w-full -mt-24 lg:-mt-85">
      <ImageCarousel
        images={carouselImages}
        autoPlay={true}
        autoPlayInterval={4000}
      />
    </section>
  );
};

export default PhotoCarouselSection;