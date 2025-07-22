import React from 'react';
import Presentation from '../components/Services/Presentation';
import SliderServices from '../components/Services/SliderServices';
import Question from '../components/Services/Question';
import ValuableObjects from '../components/Services/ValuableObjects';
import Carousel from '../components/Services/Carousel';
import OpinionSection from '../components/Services/OpinionSection';

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
      <div className="relative z-11 mb-[-200px]">
        <Question/>
      </div>
      {/* ValuableObjects */}
      <div className="relative z-12 ">
        <ValuableObjects/>
      </div>
      {/* Carousel objects */}
      <div className="relative z-13 ">
        <Carousel/>
      </div>
      {/* OpinionSection */
      <div className="relative z-14">
        <OpinionSection/>
      </div>}
    </section>
  );
};

export default Service;