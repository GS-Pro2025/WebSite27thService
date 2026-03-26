import React from "react";
import { Helmet } from "react-helmet-async"; // 1. Importamos Helmet
import CompanyStoryV2 from "../components/AboutUs/CompanyStorySection";
import TeamSection from "../components/AboutUs/TeamSection";
import TeamArrowSection from "../components/AboutUs/TeamArrowSection";
import CompanyValuesSection from "../components/AboutUs/CompanyValuesSection";
import JoinTeamSection from "../components/AboutUs/JoinTeamSection";
import CalculatorSection from "../components/Move/CalculatorSection";
import Footer from "../components/Footer";

const AboutUs: React.FC = () => {
  return (
    <>
      {/* 2. Metadatos de SEO para Identidad y Confianza */}
      <Helmet>
        <title>About Us | Who We Are - Twenty Seventh Services Group</title>
        <meta name="description" content="Get to know the team behind Twenty Seventh Services Group. Learn about our story, our commitment to excellence, and why we are the preferred moving company in Virginia." />
        <link rel="canonical" href="https://twentyseventhsg.com/about-us" />
        
        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="Our Story & Values | Twenty Seventh Services Group" />
        <meta property="og:description" content="Meet the team dedicated to making your move stress-free. Reliability and professionalism at your service." />
        <meta property="og:url" content="https://twentyseventhsg.com/about-us" />
      </Helmet>

      <CompanyStoryV2 />
      <JoinTeamSection />
      <TeamArrowSection />
      <CompanyValuesSection />
      <TeamSection />
      <CalculatorSection />
      <Footer />
    </>
  );
};

export default AboutUs;