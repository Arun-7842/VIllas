import React from "react";
import villaStory from "../assets/about-img.webp";
const About = () => {
  return (
    <section className="container mx-auto px-4 md:px-10 lg:px-20 flex flex-col gap-14 py-12">
      <div className="aboutus max-w-6xl rounded-lg mx-auto ">
        <div className="rounded-lg bg-gradient-to-b from-[#014D4E]/10 via-[#014D4E]/30 to-[#014D4E] w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold  text-white">ABOUT US</h1>
        </div>
      </div>
      <div className="flex flex-col gap-10 md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <img
            src={villaStory}
            alt="Our Villa Story"
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <h1 className="text-primary-400 lg:text-5xl md:text-3xl text-2xl font-bold">
            Welcome to Your Dream Escape
          </h1>
          <p className="text-primary-400 text-lg">
            Nestled in the heart of nature, our villa was born from a passion to
            offer travelers a blend of comfort, style, and tranquility. Whether
            you're planning a romantic getaway, a family vacation, or a group
            retreat, our villa is thoughtfully designed to deliver a luxury
            experience with a personal touch.
          </p>
          <p className="text-primary-400 text-lg">
            Our team is dedicated to making every moment of your stay seamless
            and memorable. From modern amenities to local hospitality, we aim to
            be your home away from home.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-primary-400 text-3xl font-semibold">Our Mission</h2>
        <p className="text-center text-primary-400 max-w-3xl text-lg">
          To create a luxurious, peaceful, and personalized stay that allows our
          guests to reconnect with themselves, their loved ones, and nature —
          while ensuring world-class hospitality and comfort.
        </p>
      </div>
    </section>
  );
};

export default About;
