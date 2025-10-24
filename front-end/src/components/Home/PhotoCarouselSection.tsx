import React from "react";
import ImageCarousel from "./ImageCarousel";
import mudanza1 from "/assets/mudanza1.jpg";
import mudanza2 from "/assets/mudanza2.svg";
import mudanza3 from "/assets/mudanza3.svg";
import mudanza4 from "/assets/mudanza4.svg";

const PhotoCarouselSection: React.FC = () => {
  const carouselImages = [
    {
      src: mudanza1,
      alt: "Moving equipment 1",
      title: "Freight Transport",
    },
    {
      src: mudanza2,
      alt: "Moving equipment 2",
      title: "Home Relocation",
    },
    {
      src: mudanza3,
      alt: "Moving equipment 3",
      title: "Commercial Moving",
    },
    {
      src: mudanza4,
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

