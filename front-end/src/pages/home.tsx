import React from "react";
import HeroSection from "../components/Home/heroSection";
import ProcessSection from "../components/Home/processSection";
import EquipmentSection from "../components/Home/EquipmentSection";
import OpinionSection from "../components/Home/OpinionSection";
import PhotoCarouselSection from "../components/Home/PhotoCarouselSection";
import CallToActionBanner from "../components/CallToActionBanner";
import Footer from "../components/Footer";
const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-visible">
      <HeroSection />
      <ProcessSection />
      <EquipmentSection />
      <PhotoCarouselSection />
      <OpinionSection />
      <div className="-mt-16">
      <CallToActionBanner />
      </div>
      <div className="-mt-36">
      <Footer />
      </div>
    </div>
  );
};

export default Home;
