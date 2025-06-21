import React, { useState, useEffect } from "react";
import { FaUser, FaHotel, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { persone } from "../store/Dropdown.jsx";
import { useNavigate } from "react-router-dom";
const BookingBar = ({
  data,
  bookingParams,
  setBookingParams,
  onBook,
  isLoggedIn,
}) => {
  const navigate = useNavigate();
  const cities = [...new Set(data.map((v) => v.city))];

  const handleBooking = () => {
    if (isLoggedIn) {
      onBook();
    } else {
      navigate("/login");
    }
  };
  return (
    <section className="px-4 sm:px-8 md:px-0">
      <div className="bg-primary-400 rounded-2xl px-4 py-4 md:py-6 md:px-8 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 shadow-lg text-white w-full max-w-6xl mx-auto">
        {/* Location */}
        <div className="flex items-start gap-2 min-w-[120px]">
          <FaMapMarkerAlt />
          <div className="flex flex-col gap-1 text-sm">
            <span className="opacity-80">Location</span>
            <select
              value={bookingParams.cities}
              onChange={(e) =>
                setBookingParams((prev) => ({
                  ...prev,
                  cities: e.target.value,
                }))
              }
              className="bg-transparent outline-none"
            >
              <option value="" disabled className="text-primary-400">
                Select Location
              </option>
              {cities.map((city) => (
                <option
                  key={city}
                  value={city}
                  className="text-primary-400 p-1"
                >
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Person */}
        <div className="flex items-start gap-2 min-w-[100px]">
          <FaUser />
          <div className="flex flex-col gap-1 text-sm">
            <span className="opacity-80">Person</span>
            <select
              value={bookingParams.person}
              onChange={(e) =>
                setBookingParams((prev) => ({
                  ...prev,
                  person: parseInt(e.target.value),
                }))
              }
              className="bg-transparent outline-none"
            >
              <option value="" disabled className="text-primary-400">
                0
              </option>
              {persone.map((person, i) => (
                <option
                  key={i}
                  value={person.value}
                  className="text-primary-400 p-4"
                >
                  {person.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Check-in */}
        <div className="flex items-start gap-2 min-w-[150px]">
          <FaCalendarAlt />
          <div className="flex flex-col gap-1 text-sm">
            <span className="opacity-80">Check in</span>
            <input
              type="date"
              value={bookingParams.checkIn}
              onChange={(e) =>
                setBookingParams((prev) => ({
                  ...prev,
                  checkIn: e.target.value,
                }))
              }
              className="bg-transparent outline-none text-white "
              defaultValue="2023-03-09"
            />
          </div>
        </div>
        {/* Check-out */}
        <div className="flex items-start gap-2 min-w-[150px]">
          <FaCalendarAlt />
          <div className="flex flex-col gap-1 text-sm">
            <span className="opacity-80">Check out</span>
            <input
              type="date"
              value={bookingParams.checkOut}
              onChange={(e) =>
                setBookingParams((prev) => ({
                  ...prev,
                  checkOut: e.target.value,
                }))
              }
              className="bg-transparent outline-none text-white"
              defaultValue="2023-03-13"
            />
          </div>
        </div>
        {/* Button */}
        <button
          onClick={handleBooking}
          className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 px-6 rounded-full transition"
        >
          Book Now
        </button>
      </div>
    </section>
  );
};

export default BookingBar;
