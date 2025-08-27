import React from "react";
import { FaUser, FaPhoneAlt, FaSearch } from "react-icons/fa";

const CoverageSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-8 text-white bg-cover bg-center z-20 -mt-15 md:-mt-35">
      <div className="absolute inset-0 z-0">
        <img
          src="assets/banner10.svg"
          alt="Coverage map"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 mt-40">
        <img
          src="assets/banner11.svg"
          alt="Coverage map"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto relative z-10 -mt-16">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0F6F7C]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            COVERAGE
          </h2>
          <p
            className="text-2xl md:text-3xl font-semibold text-[#FFE67B] mt-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            We want to go with you where you need us
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
          <div className="w-full lg:w-4/12 bg-white/38 px-8 py-20 rounded-4xl space-y-10 mt-10">
            <div>
              <h3 className="text-black text-xl font-bold mb-2">
                1. Does your move originate in Virginia?
              </h3>
              <p className="text-black text-base font-light">
                If you are here, our moving service can go with you to any state
                in the country. We take care of the professional logistics to
                make your move safe.
              </p>
            </div>
            <div>
              <h3 className="text-black text-xl font-bold mb-2">
                2. Does your move start in another state?
              </h3>
              <p className="text-black text-base font-light">
                We have a coverage perimeter for states near Virginia. Use our
                assistant and check if you are within our range.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-7/12 lg:-mt-5">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="name"
                  className="w-full bg-white text-gray-800 py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
                />
              </div>

              <div className="relative">
                <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="number"
                  className="w-full bg-white text-gray-800 py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
                />
              </div>

              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="destination"
                  className="w-full bg-white text-gray-800 py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
                />
              </div>

              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="origin"
                  className="w-full bg-white text-gray-800 py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#FFE67B] text-white font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors duration-300 text-lg"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  CHECK HERE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
