import React from "react";
import HeroSection from "../components/Home/heroSection";
import ProcessSection from "../components/Home/processSection";
import EquipmentSection from "../components/Home/EquipmentSection";
import OpinionSection from "../components/Home/OpinionSection";
import PhotoCarouselSection from "../components/Home/PhotoCarouselSection";
import CallToActionBanner from "../components/CallToActionBanner";
const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-visible">
      <HeroSection />
      <ProcessSection />
      <EquipmentSection />
      <PhotoCarouselSection />
      <OpinionSection />
      <CallToActionBanner />
    </div>
  );
};

export default Home;
