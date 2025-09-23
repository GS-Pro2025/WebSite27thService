import React from "react";
import ProfessionalMovingSection from "../components/Move/ProfessionalMovingSection";
import MovingStagesSection from "../components/Move/MovingStagesSection";
import CoverageSection from "../components/Move/CoverageSection";
import WeightSection from "../components/Move/WeightSection";
import CalculatorSection from "../components/Move/CalculatorSection";
import HoverPillSlider from "../components/Move/HoverPillSlider";
// import Footer from "../components/Footer";

const YourMove: React.FC = () => {
  return (
    <div className="w-full min-h-screen overflow-visible">
      <ProfessionalMovingSection />
      <MovingStagesSection />
      <CoverageSection />
      <WeightSection />

      <div className="relative">
        <div className="absolute inset-x-0 -top-10 md:-top-15 z-20 flex justify-center pointer-events-none select-none">
          <img
            src="/assets/linea2.svg"
            alt="Separador curvo"
            className="w-full"
          />
        </div>

        <div className="relative">
          <CalculatorSection />
        </div>
      </div>
      <HoverPillSlider />
      {/* <div className="-mt-50"><Footer /></div> */}
    </div>
  );
};

export default YourMove;
