/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/Home/heroSection";
import ProcessSection from "../components/Home/processSection";
import EquipmentSection from "../components/Home/EquipmentSection";
import OpinionSection from "../components/Home/OpinionSection";
import PhotoCarouselSection from "../components/Home/PhotoCarouselSection";
import CallToActionBanner from "../components/CallToActionBanner";
import Footer from "../components/Footer";
const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // support navigation with state or hash
    const scrollToIdFromState = (id?: string) => {
      if (!id) return;
      // slight delay to allow page layout to settle after navigation
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    };

    // precedence: location.state.scrollTo -> location.hash
    const stateAny = location.state as any;
    if (stateAny && stateAny.scrollTo) {
      scrollToIdFromState(stateAny.scrollTo);
      return;
    }

    if (location.hash) {
      const id = location.hash.replace("#", "");
      scrollToIdFromState(id);
    }
  }, [location]);

  return (
    <div className="bg-[0E6F7E] overflow-visible">
      <HeroSection />

      <div id="process-section" className="-mt-32 md:-mt-40 lg:-mt-48">
        <ProcessSection />
      </div>
      
      <EquipmentSection />
      <PhotoCarouselSection />
      <OpinionSection />
      <CallToActionBanner />
      <Footer />

    </div>
  );
};

export default Home;
