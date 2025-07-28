import React from "react";
import HeroSection from "../components/Home/heroSection";
import ProcessSection from "../components/Home/processSection";
import EquipmentSection from "../components/Home/EquipmentSection";
import OpinionSection from "../components/Home/OpinionSection";
const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-visible">
      <HeroSection />
      <ProcessSection />
      <EquipmentSection />
      <OpinionSection /> 
    </div>
  );
};

export default Home;
