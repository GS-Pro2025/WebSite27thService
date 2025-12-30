import React from "react";
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
