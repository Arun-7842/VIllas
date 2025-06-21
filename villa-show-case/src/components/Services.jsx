import React from "react";
import {
  FaUmbrellaBeach,
  FaSwimmingPool,
  FaWifi,
  FaConciergeBell,
  FaBroom,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaUmbrellaBeach size={40} className="text-primary-400" />,
      title: "Private Villa on Rent",
      description:
        "Enjoy exclusive access to our fully furnished, luxurious villas surrounded by nature.",
    },
    {
      icon: <FaSwimmingPool size={40} className="text-primary-400" />,
      title: "Private Swimming Pool",
      description:
        "Relax in a crystal-clear private pool with scenic views, perfect for groups or families.",
    },
    {
      icon: <FaWifi size={40} className="text-primary-400" />,
      title: "High-Speed Wi-Fi",
      description:
        "Stay connected with complimentary high-speed internet throughout the villa.",
    },
    {
      icon: <FaConciergeBell size={40} className="text-primary-400" />,
      title: "Caretaker Support",
      description:
        "Basic on-site support available to help with check-in, cleaning and assistance.",
    },
    {
      icon: <FaBroom size={40} className="text-primary-400" />,
      title: "Daily Housekeeping",
      description:
        "Clean and fresh surroundings ensured every day for a stress-free vacation.",
    },
  ];

  return (
    <section className="container mx-auto flex flex-col gap-11 px-4 md:px-10 lg:px-20 py-12">
      <div className="services max-w-6xl rounded-lg mx-auto ">
        <div className="rounded-lg bg-gradient-to-b from-[#014D4E]/10 via-[#014D4E]/80 to-[#014D4E]/80 w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold  text-white">OUR SERVICES</h1>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-400">
          What We Offer
        </h1>
        <p className="text-lg text-primary-400 mt-4 max-w-2xl mx-auto">
          We go beyond just renting a villa — we deliver a memorable vacation
          experience tailored to your comfort.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center gap-4"
          >
            <div className="bg-primary-100 p-4 rounded-full">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-primary-400">
              {service.title}
            </h3>
            <p className="text-primary-400">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
