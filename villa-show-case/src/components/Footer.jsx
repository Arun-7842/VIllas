import React from "react";
import footerLogo from "../assets/LSTV-01.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <section className=" bg-primary-200 mt-20 flex flex-col gap-3">
      <div className="container mx-auto  py-12 px-4 md:px-10 lg:px-20 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white p-2 rounded-lg w-[100px] h-[100px] lg:w-40  lg:h-40 flex items-center justify-center">
            <img src={footerLogo} alt="" className="object-cover" />
          </div>
          <p className="text-sm text-gray-200">
            Nestled in the heart of Lonavala, our villas offer a luxurious
            escape with private pools, serene surroundings, and unforgettable
            memories. Perfect for families, friends, and couples.
          </p>
          <div className="flex flex-col gap-3">
            <h1 className="text-sm text-secondary-200 font-semibold">
              Social Media
            </h1>
            <div className="flex items-center gap-3">
              <a
                href="tel:7499810250"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary-200 transition-all"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="tel:7499810250"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary-200 transition-all"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="tel:7499810250"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary-200 transition-all"
              >
                <FaXTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-lg text-secondary-200 font-semibold">
              Quick Links
            </h1>
            <ul className="flex flex-col gap-1">
              <li className="text-sm text-gray-200">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="text-sm text-gray-200">
                <Link to={"/about-us"}>About Us</Link>
              </li>
              <li className="text-sm text-gray-200">
                <Link to={"/services"}>Services</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-lg text-secondary-200 font-semibold">
                News Letter
              </h1>
              <p className="text-sm text-gray-200">
                Subscribe to our newsletter and be the first to know about
                exclusive deals, new villa launches, and travel tips for your
                next Lonavala escape
              </p>
            </div>
            <a
              href="/register"
              target="_blank"
              className="w-fit py-2 px-6 rounded-full bg-cyan-400 text-sm font-bold text-black hover:bg-cyan-300 transition"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
      <div className=" px-4 md:px-0 lg:px-0 container mx-auto flex items-center justify-end gap-2 w-full text-sm text-gray-200">
        <Link to="/terms-and-conditions" target="_blank">
          Team & conditions
        </Link>
        <div>||</div>
        <Link to="/privacy-policy" target="_blank">
          Privacy policy
        </Link>
      </div>
      <div className="w-full h-[1px] bg-gray-600"></div>
      <div className="p-3">
        <p className="text-center text-sm text-gray-200">
          &copy; 2023 LSTV. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
