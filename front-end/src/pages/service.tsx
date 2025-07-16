import React from 'react';
import Presentation from '../components/Services/Presentation';
import SliderServices from '../components/Services/SliderServices';


const Service: React.FC = () => {
  return (
    <section id="services" className="relative w-full bg-[#68A2A6] overflow-visible">
      {/* Presentation como bloque normal */}
      <div className="relative z-10 w-full">
        <Presentation/>
      </div>

      {/* SliderServices */}
      <div className="relative z-10 ">
        <SliderServices/>
      </div>
    </section>
  );
};

export default Service;