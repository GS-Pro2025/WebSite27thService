import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <>
        {/** BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-visible ">
            <img
                src="/assets/hero_group.svg"
                alt="Hero Background"
                className="w-full h-auto object-cover"
            />
        </div>
    </>
  );
};

export default HeroSection;