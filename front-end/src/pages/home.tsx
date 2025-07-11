import React from 'react';
import HeroSection from '../components/heroSection';
import ProcessSection from '../components/processSection';
import UsSection  from '../components/UsSection';
import ServicesSection from '../components/ServicesSection';  

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-visible">
      <HeroSection />
      <ProcessSection />
      <UsSection />
      <ServicesSection />
    </div>
  );
};

export default Home;