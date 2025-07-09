import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
        {/** BACKGROUND */}
        <div className="absolute inset-0 z-0">
            {/* Imagen para móviles */}
            <img
                src="/assets/hero_group.svg"
                alt="Hero Background"
                className="block sm:hidden w-full h-full object-cover object-left"
            />
            {/* Imagen para tablets */}
            <img
                src="/assets/hero_group.svg"
                alt="Hero Background"
                className="hidden sm:block lg:hidden w-full h-full object-cover object-center"
            />
            {/* Imagen para desktop */}
            <img
                src="/assets/hero_group.svg"
                alt="Hero Background"
                className="hidden lg:block w-full h-full object-cover object-center"
            />
        </div>
        
        {/** Quote here */}
        <div className="absolute inset-0 z-10 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left text-white max-w-lg ml-8 lg:ml-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6 uppercase leading-tight">
                        Un nuevo comienzo<br />
                        <span className="text-yellow">inicia aquí</span>
                    </h1>
                    <button className="bg-yellow hover:bg-yellow/80 text-black font-semibold px-6 py-3 sm:px-8 sm:py-3 rounded-full transition-colors uppercase tracking-wide text-sm sm:text-base">
                        Cotiza aquí
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;