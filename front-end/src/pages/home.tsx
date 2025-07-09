import React from 'react';
import HeroSection from '../components/heroSection';
import ProcessSection from '../components/processSection';

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-visible">
      <HeroSection />
      <ProcessSection />
    </div>
  );
};

export default Home;