/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // 1. Importamos Helmet
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
    const scrollToIdFromState = (id?: string) => {
      if (!id) return;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    };

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
      {/* 2. Añadimos los Metadatos de SEO */}
      <Helmet>
        <title>Twenty Seventh Services Group | Professional Moving Company in Virginia</title>
        <meta name="description" content="Reliable, efficient, and affordable moving solutions for residential and commercial needs with Twenty Seventh Services Group. Get a free quote today!" />
        <link rel="canonical" href="https://twentyseventhsg.com/" />
        
        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="Twenty Seventh Services Group | Moving Company" />
        <meta property="og:description" content="Professional moving services in Chesapeake and surrounding areas. Residential and commercial relocation." />
        <meta property="og:url" content="https://twentyseventhsg.com/" />
      </Helmet>

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