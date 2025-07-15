import React from 'react';
import HeroSection from '../components/heroSection';
import ProcessSection from '../components/processSection';
import UsSection  from '../components/UsSection';
import ServicesSection from '../components/ServicesSection';  
import OpinionSection from '../components/OpinionSection';
import MidSection from '../components/MidSection';

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-visible">
      {/* <HeroSection />
      <ProcessSection />
      <UsSection />
      <MidSection />
      <ServicesSection /> */}
      <OpinionSection />
    </div>
  );
};

export default Home;