import React from "react";
import ImageCarousel from "./ImageCarousel";
import mudanza1 from "/assets/mudanza1.png";
import mudanza2 from "/assets/mudanza2.png";
import mudanza3 from "/assets/mudanza3.png";
import mudanza4 from "/assets/mudanza4.png";
import mudanza5 from "/assets/mudanza5.png";
import mudanza6 from "/assets/mudanza6.png";

const PhotoCarouselSection: React.FC = () => {
  const carouselImages = [
    {
      src: mudanza2,
      alt: "Commercial moving service",
      title: "Commercial",
    },
    {
      src: mudanza1,
      alt: "Home moving service",
      title: "Home",
    },
    {
      src: mudanza3,
      alt: "Packing and unpacking service",
      title: "Packing and unpacking",
    },
    {
      src: mudanza4,
      alt: "Furniture removal service",
      title: "Furniture removal",
    },
    {
      src: mudanza5,
      alt: "Home organization service",
      title: "Home organization",
    },
    {
      src: mudanza6,
      alt: "Freight transport service",
      title: "Freight transport",
    },
  ];

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Get to know our services
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Short introductory text with a maximum of two lines
        </p>
      </div>

      {/* Carousel Container with Services Wheel */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <ImageCarousel
            images={carouselImages}
            autoPlay={true}
            autoPlayInterval={4000}
          />
        </div>
      </div>
    </section>
  );
};

export default PhotoCarouselSection;