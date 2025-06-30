import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
import customStyles from "../common/DropdownCss";

const BookingForm = ({ bookingParams, villadata, onClose, currentVilla }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    persons: bookingParams?.person || "",
    checkIn: bookingParams?.checkIn || "",
    checkOut: bookingParams?.checkOut || "",
  });
  useEffect(() => {
    if (bookingParams?.person) {
      setFormData((prev) => ({
        ...prev,
        persons: bookingParams.person,
      }));
    }
  }, [bookingParams?.person]);

  const [selectedVillaOption, setSelectedVillaOption] = useState(null);
  const [filteredVillas, setFilteredVillas] = useState([]);
  const [villaOptions, setVillaOptions] = useState([]);

  useEffect(() => {

    if (currentVilla) {
      const currentVillaOption = {
        label: currentVilla.villaTitle,
        value: currentVilla._id,
      };

      // If we have additional villa data, filter by city
      if (villadata && villadata.length > 0) {
        const targetCity = bookingParams?.cities || currentVilla?.city;
        const filtered = villadata.filter((villa) => {
          return villa.city === targetCity;
        });

        setFilteredVillas(filtered);

        const options = filtered.map((villa) => ({
          label: villa.villaTitle,
          value: villa._id,
        }));
        setVillaOptions(options);

        // Try to find and select current villa
        const currentOption = options.find(
          (option) => option.value === currentVilla._id
        );
        setSelectedVillaOption(currentOption || options[0] || null);
      } else {
        setVillaOptions([currentVillaOption]);
        setSelectedVillaOption(currentVillaOption);
        setFilteredVillas([currentVilla]);
      }
    } else if (villadata && villadata.length > 0) {
      const targetCity = bookingParams?.cities;

      if (targetCity) {
        const filtered = villadata.filter((villa) => villa.city === targetCity);
        setFilteredVillas(filtered);

        const options = filtered.map((villa) => ({
          label: villa.villaTitle,
          value: villa._id,
        }));
        setVillaOptions(options);
        setSelectedVillaOption(options[0] || null);
      } else {
        const options = villadata.map((villa) => ({
          label: villa.villaTitle,
          value: villa._id,
        }));
        setVillaOptions(options);
        setFilteredVillas(villadata);
        setSelectedVillaOption(options[0] || null);
      }
    } else {
      console.log("Debug - No villa data available");
      setVillaOptions([]);
      setFilteredVillas([]);
      setSelectedVillaOption(null);
    }
  }, [bookingParams, villadata, currentVilla]);

  const handleVillaChange = (option) => {
    setSelectedVillaOption(option);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.mobile.trim()) {
      toast.error("Please enter your mobile number");
      return false;
    }
    if (!selectedVillaOption) {
      toast.error("Please select a villa");
      return false;
    }
    if (!formData.checkIn) {
      toast.error("Please select check-in date");
      return false;
    }
    if (!formData.checkOut) {
      toast.error("Please select check-out date");
      return false;
    }
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      toast.error("Check-out date must be after check-in date");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      toast.error("Invalid check-in or check-out date.");
      return;
    }

    try {
      // Check availability
      const check = await Axios({
        ...SummaryApi.bookVillaCheck(selectedVillaOption.value),
        data: {
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          persons: formData.persons,
        },
      });

      if (!check.data.success) {
        setError("Selected dates are not available.");
        toast.error("Villa is not available for these dates.");
        return;
      }

      // Make booking
      const booking = await Axios({
        ...SummaryApi.bookVilla,
        data: {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          villaSelected: selectedVillaOption.value,
          cities: bookingParams?.cities || currentVilla?.city,
          person: formData.persons,
          startDate: formData.checkIn,
          endDate: formData.checkOut,
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
    <div className="fixed inset-0 h-full z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 max-h-screen">
      <div className="bg-white rounded-2xl overflow-y-auto w-full h-[500px] max-w-2xl mx-auto px-4 py-4 md:py-6 md:px-8 flex flex-col gap-6 shadow-lg text-black">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold">Book Your Villa</h1>
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="flex items-center md:flex-row flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your name"
                className="border rounded outline-none p-2"
                required
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="border rounded outline-none p-2"
                required
              />
            </div>
          </div>

          {/* Mobile and Location */}
          <div className="flex items-center md:flex-row flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="mobile">Mobile *</label>
              <input
                type="tel"
                id="mobile"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                placeholder="Enter your mobile number"
                className="border rounded outline-none p-2"
                required
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label>Location</label>
              <input
                type="text"
                value={bookingParams?.cities || currentVilla?.city || ""}
                readOnly
                className="border rounded outline-none p-2 bg-gray-50"
              />
            </div>
          </div>

          {/* Villa Selection and Persons */}
          <div className="flex items-center md:flex-row flex-col gap-2 w-full">
            <div className="flex items-center gap-2 w-full">
              <div className="w-full flex flex-col gap-1">
                <label>Select Villa *</label>
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
                value={formData.persons}
                onChange={(e) =>
                  handleInputChange("persons", parseInt(e.target.value) || 0)
                }
                min="1"
                className="border rounded outline-none p-2"
              />
            </div>
          </div>

          {/* Check-in and Check-out Dates */}
          <div className="flex items-center md:flex-row flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
              <label>Check-in *</label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => handleInputChange("checkIn", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="border rounded outline-none p-2"
                required
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label>Check-out *</label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => handleInputChange("checkOut", e.target.value)}
                min={formData.checkIn || new Date().toISOString().split("T")[0]}
                className="border rounded outline-none p-2"
                required
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
