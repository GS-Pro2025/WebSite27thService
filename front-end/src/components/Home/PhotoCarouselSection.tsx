import React from "react";
import ImageCarousel from "./ImageCarousel";

const PhotoCarouselSection: React.FC = () => {
  const carouselImages = [
    {
      src: "/assets/mudanza1.jpg",
      alt: "Moving equipment 1",
      title: "Freight Transport",
    },
    {
      src: "/assets/mudanza2.svg",
      alt: "Moving equipment 2",
      title: "Home Relocation",
    },
    {
      src: "/assets/mudanza3.svg",
      alt: "Moving equipment 3",
      title: "Commercial Moving",
    },
    {
      src: "/assets/mudanza4.svg",
      alt: "Moving equipment 4",
      title: "Home Organization",
    },
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
