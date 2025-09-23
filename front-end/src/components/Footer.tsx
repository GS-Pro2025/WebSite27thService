import React from "react";
import banner12 from "/assets/banner14.svg";
import logoFooter2 from "/assets/logoFooter2.svg";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative -mt-30 z-10 overflow-hidden">
      <div className="relative w-full">
        <img src={banner12} alt="banner" className="w-full" />

        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-10 md:px-20 py-10 mt-15">
          <div className="text-black space-y-3 max-w-md">
            <h3 className="font-bold">LOCATION & CONTACT</h3>
            <p>
              <span className="font-semibold">Headquarters:</span> <br />
              Chesapeake, Virginia
            </p>
            <p>
              <span className="font-semibold">Phone:</span> <br />
              +1 (407) 541-7478
            </p>
            <p>
              <span className="font-semibold">Email:</span> <br />
              administrative.manager@twentyseventhservicesgroup.com
            </p>

            <div className="mt-4">
              <h3 className="font-bold mb-2">FIND US ON SOCIAL</h3>
              <div className="flex space-x-4 text-xl">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-gray-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="hover:text-gray-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-gray-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="hover:text-gray-300"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
