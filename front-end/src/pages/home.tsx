/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeFirst from "../components/Home/HomeFirst";
import Steps from "../components/Home/Steps";
import Packages from "../components/Home/Packages";
import Quality from "../components/Home/Quality";
import HomeServices from "../components/Home/HomeServices";
import Interstate from "../components/Interstate";
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
    <div className="bg-[0E6F7E]">
      <HomeFirst />

      <div id="process" className="-mt-32 md:-mt-40 lg:-mt-48">
        <Steps />
      </div>
      <div id="package">
      <Packages />
      </div>
     
      <HomeServices />
      
      <div id="quality">
        <Quality />
      </div>
      
      <div id="interstate">
        <Interstate />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;