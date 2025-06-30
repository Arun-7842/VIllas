import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  FaSwimmingPool,
  FaDumbbell,
  FaSnowflake,
  FaWifi,
  FaParking,
  FaDog,
  FaFireExtinguisher,
  FaUsers,
  FaWalking,
} from "react-icons/fa";
import { FaElevator } from "react-icons/fa6";
import { GiPlantRoots, GiWaterDrop, GiSolarPower } from "react-icons/gi";
import {
  MdTheaters,
  MdKitchen,
  MdHotTub,
  MdOutlineSecurity,
  MdPower,
  MdChildCare,
  MdDeck,
} from "react-icons/md";
import BookingForm from "./BookingForm";
const VillaDetailsForUser = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [villadata, setVilladata] = useState([]);
  const containerRef = useRef(null);
  const iconMap = {
    FaSwimmingPool: <FaSwimmingPool size={28} className="text-primary-400" />,
    GiPlantRoots: <GiPlantRoots size={28} className="text-primary-400" />,
    FaDumbbell: <FaDumbbell size={28} className="text-primary-400" />,
    MdTheaters: <MdTheaters size={28} className="text-primary-400" />,
    MdKitchen: <MdKitchen size={28} className="text-primary-400" />,
    FaSnowflake: <FaSnowflake size={28} className="text-primary-400" />,
    FaWifi: <FaWifi size={28} className="text-primary-400" />,
    MdOutlineSecurity: (
      <MdOutlineSecurity size={28} className="text-primary-400" />
    ),
    MdPower: <MdPower size={28} className="text-primary-400" />,
    FaParking: <FaParking size={28} className="text-primary-400" />,
    MdChildCare: <MdChildCare size={28} className="text-primary-400" />,
    FaDog: <FaDog size={28} className="text-primary-400" />,
    MdDeck: <MdDeck size={28} className="text-primary-400" />,
    MdHotTub: <MdHotTub size={28} className="text-primary-400" />,
    GiWaterDrop: <GiWaterDrop size={28} className="text-primary-400" />,
    GiSolarPower: <GiSolarPower size={28} className="text-primary-400" />,
    FaFireExtinguisher: (
      <FaFireExtinguisher size={28} className="text-primary-400" />
    ),
    FaElevator: <FaElevator size={28} className="text-primary-400" />,
    FaUsers: <FaUsers size={28} className="text-primary-400" />,
    FaWalking: <FaWalking size={28} className="text-primary-400" />,
  };
  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const response = await Axios.get(
          SummaryApi.getVillaDetails.url.replace(":id", id)
        );
        if (response.data.success) {
          setVilla(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching villa:", err);
      }
    };

    fetchVilla();
  }, [id]);
  useEffect(() => {
    if (!villa?.images?.length) return;

    const interval = setInterval(() => {
      const scrollContainer = containerRef.current;
      if (!scrollContainer) return;

      const card = scrollContainer.querySelector("div"); // first child div (slide)
      if (!card) return;

      const scrollAmount = card.clientWidth + 16; // add margin if needed (like gap-4 = 16px)

      const maxScrollLeft =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const currentScrollLeft = scrollContainer.scrollLeft;

      if (currentScrollLeft >= maxScrollLeft - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [villa]);
  if (!villa) return <div>Loading...</div>;
  const initialBookingParams = {
    cities: villa?.city || "",
    person: 1,
    checkIn: "",
    checkOut: "",
  };
  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollBy({ left: -1104, behavior: "smooth" });
  };
  const handleScrollRight = () => {
    containerRef.current.scrollBy({ left: 1104, behavior: "smooth" });
  };
  return (
    <section className="container mx-auto lg:px-20 md:px-10 px-4 py-6">
      <div className="flex flex-col md:gap-8 gap-4">
        {/* Display Villa Images */}
        <div className="relative w-full ">
          <div
            className="flex gap-4 overflow-x-auto px-4 scroll-smooth scrollbar-none scrollBar"
            ref={containerRef}
          >
            {villa.images.map((img, i) => (
              <div
                key={i}
                className="min-w-full lg:h-[500px] h-[200px]  flex-shrink-0"
              >
                <img
                  src={img}
                  alt={`villa-${i}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-3">
            <span className="rounded-full text-xl font-bold bg-secondary-200 p-4 shadow-md animate-bounce">
              {villa.discountOffer}%
            </span>
          </div>
          {/* Left/Right Arrows for large screens only */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-4 z-10">
            <button
              onClick={handleScrollLeft}
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md"
            >
              <IoIosArrowBack size={24} />
            </button>
            <button
              onClick={handleScrollRight}
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md"
            >
              <IoIosArrowForward size={24} />
            </button>
          </div>
        </div>

        {/* Villa Details */}
        <div className="px-4">
          <div className="py-4 md:px-6 px-4 flex flex-col gap-8 bg-white rounded-md">
            <div className=" flex items-start md:flex-row flex-col gap-6 ">
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col gap-4">
                  <h1 className="text-2xl font-bold">{villa.villaTitle}</h1>
                  <div className="flex flex-col gap-1">
                    <strong>About the place</strong>
                    <p className=" text-gray-700">{villa.description}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <strong>Room Type </strong>
                    <h4>
                      {villa.roomType && villa.roomType.length > 0
                        ? villa.roomType.slice(0, 2).join(" , ")
                        : "N/A"}
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <strong>Villa Type</strong>{" "}
                      {villa.villaType && villa.villaType.length > 0
                        ? villa.villaType.join(", ")
                        : "N/A"}
                    </div>
                    <p className="flex flex-col gap-1">
                      <strong>State</strong> {villa.state || "N/A"}
                    </p>
                    <p className="flex flex-col gap-1 ">
                      <strong>City</strong> {villa.city || "N/A"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <p className="flex flex-col gap-1">
                      <strong>Price</strong> ₹{villa.pricePerNight}
                    </p>
                    <p className="flex flex-col gap-1">
                      <strong>Capacity</strong> {villa.capacity}
                    </p>
                    <p className="flex flex-col gap-1">
                      <strong>Bedrooms</strong> {villa.numberOfBedrooms}
                    </p>
                    <p className="flex flex-col gap-1">
                      <strong>Bathrooms</strong> {villa.numberOfBathrooms}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <strong>Amenities</strong>{" "}
                  <div className="grid lg:grid-cols-3 md:grid-cols-4 grid-cols-2 items-conter gap-4">
                    {villa.aminities && villa.aminities.length > 0
                      ? villa.aminities.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-sm bg-body-bg_body-color p-2 rounded flex flex-col gap-2 items-start"
                          >
                            {iconMap[item.icon] || null}
                            {item.label}
                          </span>
                        ))
                      : "N/A"}{" "}
                  </div>
                </div>
              </div>
              <div className="w-full rounded-lg py-8 lg:px-10  ">
                <div className="w-full border border-gray-300 rounded-lg py-8 px-10 flex flex-col gap-8 ">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-semibold">Start Booking</h1>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-primary-400">
                        {villa.pricePerNight}
                      </h1>
                      <span className="text-2xl font-normal text-gray-400">
                        per day
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Avalable on :</strong>
                      <h4 className="text-green-700 text-md font-semibold">
                        {" "}
                        {villa.availableDate}
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={handleBookNowClick}
                    className="py-2 px-4 rounded-full w-full bg-secondary-500 text-stone-950"
                  >
                    Book now
                  </button>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <strong>Villa Location on Map</strong>
                  <div className="w-full h-80 rounded-lg overflow-hidden">
                    <iframe
                      src={villa.mapLink}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <strong>Gallary</strong>{" "}
              <div className="flex flex-col gap-4">
                <div className="w-full ">
                  <img
                    src={
                      villa.coverImage && villa.coverImage.trim() !== ""
                        ? villa.coverImage
                        : "https://via.placeholder.com/600x400?text=No+Image+Available"
                    }
                    alt="Villa Image"
                    className="rounded-lg"
                  />
                </div>
                <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                  {villa.images.map((img, i) => (
                    <div
                      key={i}
                      className="min-w-full lg:h-[400px]  h-full  flex-shrink-0"
                    >
                      <img
                        src={img}
                        alt={`villa-${i}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showBookingForm && (
        <BookingForm
          bookingParams={initialBookingParams}
          villadata={villadata}
          currentVilla={villa}
          onClose={handleCloseBookingForm}
        />
      )}
    </section>
  );
};

export default VillaDetailsForUser;
