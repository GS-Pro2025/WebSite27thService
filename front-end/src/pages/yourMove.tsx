import React from "react";
import ProfessionalMovingSection from "../components/Move/ProfessionalMovingSection";
import MovingStagesSection from "../components/Move/MovingStagesSection";
import CoverageSection from "../components/Move/CoverageSection";
import WeightSection from "../components/Move/WeightSection";
import PackingSection from "../components/PackingSection";

const YourMove: React.FC = () => {
  return (
    <div className="w-full min-h-scree overflow-visible">
      <ProfessionalMovingSection />
      <MovingStagesSection />
      <CoverageSection />
      <WeightSection />
      <PackingSection />
    </div>
  );
};

export default YourMove;
