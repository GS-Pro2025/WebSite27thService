import React from "react";
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