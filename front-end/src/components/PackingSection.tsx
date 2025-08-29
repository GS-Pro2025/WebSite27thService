import React from "react";

const PackingSection: React.FC = () => {
  return (
    <section className="bg-[linear-gradient(to_right,_#002C3D,_#0E6F7E,_#FFE67B,_#FFF7E6)] w-full overflow-hidden">
      <div className="relative container mx-auto flex flex-col md:flex-row items-start justify-between gap-8 px-6 py-20 sm:px-12">
        <div className="md:w-3/5 z-10 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight text-center">
            We have the best packaging and materials to ensure your move is safe
            to its destination.
          </h1>
          <button className="mt-16 bg-[#FFFFFF] text-[#757575] font-semibold text-5xl py-3 px-12 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
            Product Catalog
          </button>
        </div>

        <div className="w-full md:w-1/2 mt-10 md:mt-0 md:-ml-32">
          <img
            src="assets/Box.png"
            alt="Illustration of cardboard boxes for moving"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default PackingSection;
