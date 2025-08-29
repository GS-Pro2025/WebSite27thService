import React from 'react';
import Presentation from '../components/Services/Presentation';
import SliderServices from '../components/Services/SliderServices';
import Question from '../components/Services/Question';
import ValuableObjects from '../components/Services/ValuableObjects';
import Carousel from '../components/Services/Carousel';
import OpinionSection from '../components/Services/OpinionSection';
import CallToActionBanner from '../components/CallToActionBanner';

const Service: React.FC = () => {
  return (
    <section id="services" className="relative w-full bg-[#7AACAE] overflow-visible">
      {/* Presentation como bloque normal */}
      <div className="relative z-10 w-full">
        <Presentation/>
      </div>
      {/* SliderServices */}
      <div className="relative z-10">
        <SliderServices/>
      </div>
      {/* Question */}
      <div className="relative z-11 ">
        <Question/>
      </div>
      
      {/* Línea curva punteada de transición */}
      <div className="relative z-15 w-full h-auto -my-6 md:-my-8 md:mb-10">
        <img
          src="/assets/linea2.svg"
          alt="Decorative curved transition line"
          className="w-full h-auto object-contain opacity-60"
        />
      </div>
      
      {/* ValuableObjects */}
      <div className="relative z-12 sm:-mt-0 -mt-50">
        <ValuableObjects/>
      </div>
      {/* Carousel objects */}
      <div className="relative z-13 sm:-mt-60 -mt-50">
        <Carousel/>
      </div>
      {/* OpinionSection */}
      <div className="relative z-14">
        <OpinionSection/>
      </div>
      {/* CallToActionBanner */}
      <div className="relative z-15">
        <CallToActionBanner/>
      </div>

    </section>
  );
};

export default Service;