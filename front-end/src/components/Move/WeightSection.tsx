import React from "react";

const WeightSection: React.FC = () => {
  return (
    <section className="relative py-16 md:pt-24 pb-52 bg-gradient-to-b from-[#C6D7CE] via-[#DCE3D7] to-[#FFF7E6] overflow-hidden">
      <div className="absolute top-0 right-0 w-full md:w-[85%] z-0">
        <img
          src="assets/derecha.svg"
          alt="Flecha decorativa derecha"
          className="w-full h-full"
        />
        <div className="absolute top-0 right-0 h-full w-full flex justify-center items-center">
          <h2
            className="text-xl md:text-3xl font-bold text-center px-4"
            style={{
              color: "#FFE67B",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            How much does your move weigh?
          </h2>
        </div>
      </div>

      <div className="absolute bottom-0 md:-bottom-4 left-0 w-full md:w-[85%] z-0">
        <img
          src="assets/izquierda.svg"
          alt="Flecha decorativa izquierda"
          className="w-full h-auto"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <h3
            className="text-xl md:text-2xl font-bold text-center px-4"
            style={{
              color: "#FFE67B",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Find what your move needs here
          </h3>
        </div>
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl ml-auto text-left text-[#0F6F7C] mb-12 md:mb-16 pt-24 md:pt-16">
          <p className="text-base md:text-lg mb-4">
            The weight of your move is an important reference for it to be
            scheduled with the best logistics. Therefore, knowing this data:
          </p>
          <ol className="list-decimal list-inside text-left inline-block space-y-2">
            <li className="text-base md:text-lg">
              Will allow us to establish a cost estimate.
            </li>
            <li className="text-base md:text-lg">
              Will ensure the move is carried out with the highest quality
              standards and without any setbacks.
            </li>
          </ol>
        </div>

        <div className="relative rounded-3xl bg-[#0F6F7C]/22 p-8 md:p-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center text-[#2D2A26] mb-8">
            <p>
              We know it can be difficult to determine the weight of your entire
              move, but we will help you with a simple guide.
            </p>
            <p>
              Be clear about how many rooms/spaces you want to move, then
              determine the largest objects and make a list per space.
            </p>
            <p>
              We will give you some data on common objects and their approximate
              weights so you have a reference.
            </p>
          </div>

          <div className="flex justify-center my-8">
            <img
              src="assets/lineaPunteada2.svg"
              alt="Dotted line separator"
              className="w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-40">
            <p className="text-2xl md:text-3xl font-semibold text-[#848484] text-center">
              We always help you with every step, <br />
              here we do it for you
            </p>
            <button className="bg-white text-[#848484] font-bold py-3 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 text-lg flex-shrink-0">
              Quote Here
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightSection;
