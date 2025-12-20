import React from "react";
import ProfessionalMovingSection from "../components/Move/ProfessionalMovingSection";
import MovingStagesSection from "../components/Move/MovingStagesSection";
import CoverageSection from "../components/Move/CoverageSection";
import WeightSection from "../components/Move/WeightSection";
import CalculatorSection from "../components/Move/CalculatorSection";
import Footer from "../components/Footer";

const YourMove: React.FC = () => {
  return (
    <div className="w-full min-h-screen overflow-visible">
      <ProfessionalMovingSection />
      <MovingStagesSection />
      <CoverageSection />
      <WeightSection />
      <CalculatorSection />
        <Footer />
    </div>
  );
};

export default YourMove;
