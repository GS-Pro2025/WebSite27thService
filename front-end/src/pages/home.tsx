import React from "react";
import HeroSection from "../components/Home/heroSection";
import ProcessSection from "../components/Home/processSection";
import EquipmentSection from "../components/Home/EquipmentSection";
import UsSection from "../components/Home/UsSection";
import ServicesSection from "../components/Home/ServicesSection";
import OpinionSection from "../components/Home/OpinionSection";
import MidSection from "../components/Home/MidSection";

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-visible">
      <HeroSection />
      <ProcessSection />
      <EquipmentSection />
      {/* <UsSection /> */}
      {/* <MidSection /> */}
      {/* <ServicesSection /> */}
      <OpinionSection />
    </div>
  );
};

export default Home;
