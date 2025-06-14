import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
import customStyles from "../common/DropdownCss";

const BookingForm = ({ bookingParams, villadata, onClose }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [selectedVillaOption, setSelectedVillaOption] = useState(null);
  const [filteredVillas, setFilteredVillas] = useState([]);
  const [villaOptions, setVillaOptions] = useState([]);

  useEffect(() => {
    const filtered = villadata.filter(
      (villa) => villa.city === bookingParams.cities
    );
    setFilteredVillas(filtered);

    const options = filtered.map((villa) => ({
      label: villa.villaTitle,
      value: villa._id,
    }));
    setVillaOptions(options);

    if (options.length > 0) {
      setSelectedVillaOption(options[0]);
    } else {
      setSelectedVillaOption(null);
    }
  }, [bookingParams, villadata]);

  const handleVillaChange = (option) => {
    setSelectedVillaOption(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVillaOption) {
      setError("No villa selected.");
      toast.error("Please select a villa.");
      return;
    }

    const checkInDate = new Date(bookingParams.checkIn);
    const checkOutDate = new Date(bookingParams.checkOut);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      toast.error("Invalid check-in or check-out date.");
      return;
    }

    try {
      const check = await Axios({
        ...SummaryApi.bookVillaCheck(selectedVillaOption.value),
        data: {
          checkIn: bookingParams.checkIn,
          checkOut: bookingParams.checkOut,
          persons: bookingParams.person,
        },
      });

      if (!check.data.success) {
        setError("Selected dates are not available.");
        toast.error("Villa is not available for these dates.");
        return;
      }

      const booking = await Axios({
        ...SummaryApi.bookVilla,
        data: {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          villaSelected: selectedVillaOption.value,
          cities: bookingParams.cities,
          person: bookingParams.person,
          startDate: bookingParams.checkIn,
          endDate: bookingParams.checkOut,
        },
      });

      if (booking.data.success) {
        toast.success("Booking successful!");
        onClose();
      } else {
        setError(booking.data.message || "Booking failed.");
        toast.error(booking.data.message || "Booking failed.");
      }
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 h-full z-50 bg-black bg-opacity-50 flex items-center justify-center p-4  max-h-screen">
      <div className="bg-white rounded-2xl overflow-y-auto w-full h-[400px] max-w-2xl mx-auto px-4 py-4 md:py-6 md:px-8 flex flex-col gap-6 shadow-lg text-black">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold">Book Your Villa</h1>
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div className="flex items-center md:flex-row flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
                className="border rounded outline-none p-2"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="border rounded outline-none p-2"
              />
            </div>
          </div>
          <div className="flex items-center md:flex-row flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="number"
                id="mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                placeholder="Enter your mobile number"
                className="border rounded outline-none p-2"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label>Location</label>
              <input
                type="text"
                value={bookingParams.cities}
                readOnly
                className="border rounded outline-none p-2"
              />
            </div>
          </div>
          <div className="flex items-center md:flex-row flex-col gap-2 w-full">
            <div className="flex items-center gap-2 w-full">
              <div className="w-full flex flex-col gap-1">
                <label>Select Villa</label>
                <Select
                  options={villaOptions}
                  value={selectedVillaOption}
                  onChange={handleVillaChange}
                  styles={customStyles}
                  placeholder="Select a villa"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label>Persons</label>
              <input
                type="number"
                value={bookingParams.person}
                readOnly
                className="border rounded outline-none p-2"
              />
            </div>
          </div>
          <div className="flex items-center md:flex-row flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
              <label>Check-in</label>
              <input
                type="date"
                value={bookingParams.checkIn}
                readOnly
                className="border rounded outline-none p-2"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label>Check-out</label>
              <input
                type="date"
                value={bookingParams.checkOut}
                readOnly
                className="border rounded outline-none p-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 px-6 rounded-full transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
