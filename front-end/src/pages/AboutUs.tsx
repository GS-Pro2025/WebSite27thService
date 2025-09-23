import React from "react";
import CompanyStoryV2 from "../components/AboutUs/CompanyStorySection";
import TeamSection from "../components/AboutUs/TeamSection";
import TeamArrowSection from "../components/AboutUs/TeamArrowSection";
import CompanyValuesSection from "../components/AboutUs/CompanyValuesSection";
import JoinTeamSection from "../components/AboutUs/JoinTeamSection";
import PackingSection from "../components/PackingSection";
import Footer from "../components/Footer";

const AboutUs: React.FC = () => {
  return (
    <>
      <CompanyStoryV2 />
      <TeamSection />
      <TeamArrowSection />
      <CompanyValuesSection />
      <JoinTeamSection />
      <PackingSection />
      <div className="-mt-10 md:-mt-50">
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
