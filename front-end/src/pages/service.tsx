import React from "react";
import { Helmet } from "react-helmet-async"; // 1. Importamos Helmet
import Presentation from "../components/Services/Presentation";
import Moving from "../components/Services/Moving";
import Question from "../components/Services/Question";
import Packages from "../components/Services/Packages";
import Carousel from "../components/Services/Carousel";
import Footer from "../components/Footer";

const Service: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full"
    >
      {/* 2. Metadatos específicos para la página de Servicios */}
      <Helmet>
        <title>Our Moving Services | Residential & Commercial Relocation</title>
        <meta name="description" content="Explore our comprehensive moving services: from local residential moves to complex commercial relocations. We offer packing, transport, and expert care for your belongings." />
        <link rel="canonical" href="https://twentyseventhsg.com/services" />
        
        {/* Open Graph para que al compartir este link se vea bien */}
        <meta property="og:title" content="Expert Moving Services | Twenty Seventh Services Group" />
        <meta property="og:description" content="Quality moving solutions tailored to your needs. Residential, Commercial, and Long Distance." />
        <meta property="og:url" content="https://twentyseventhsg.com/services" />
      </Helmet>

      <div id="presentation">
        <Presentation />
      </div>
      <div id="moving">
        <Moving />
      </div>
      <div id="question">
        <Question />
      </div>
      <div id="packages">
        <Packages />
      </div>
      <div id="carousel">
        <Carousel />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </section>
  );
};

export default Service;