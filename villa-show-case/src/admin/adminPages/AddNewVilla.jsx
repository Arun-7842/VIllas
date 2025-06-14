import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
// import roomType from "../store/Dropdown";
import { roomTypes, villaTypes, amenities } from "../../store/Dropdown.jsx";
import Axios from "../../utils/Axios.js";
import customStyles from "../../common/DropdownCss.jsx";
import { IoMdCloudUpload } from "react-icons/io";
import Loding from "../../common/Loading.jsx";
import SummaryApi from "../../common/SummaryApi.js";
import AxiosToastError from "../../utils/AxiosToastError.js";
import uploadImage from "../../utils/uploadImage.js";
import toast from "react-hot-toast";
import axios from "axios";
const AddNewVilla = () => {
  const [data, setData] = useState({
    villaTitle: "",
    villaType: "",
    state: "",
    city: "",
    pricePerNight: 0,
    discountOffer: "",
    numberOfBedrooms: 0,
    numberOfBathrooms: "",
    capacity: "",
    roomType: [],
    aminities: [],
    availableDate: "",
    description: "",
    coverImage: "",
    images: [],
  });
  const formRef = useRef(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState([]);
  const [selectedVillaType, setSelectedVillaType] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [villaImagesPreview, setVillaImagesPreview] = useState([]);
  const fetchStates = async (inputValue = "") => {
    try {
      const response = await axios.get(
        "https://api.countrystatecity.in/v1/countries/IN/states",
        {
          headers: {
            "X-CSCAPI-KEY": import.meta.env.VITE_STATE_API_KEY,
          },
        }
      );

      const stateOptions = response.data
        .filter((state) =>
          state.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((state) => ({
          value: state.iso2,
          label: state.name,
        }));

      setStates(stateOptions);
      return stateOptions;
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Failed to fetch states. Please try again.");
      return [];
    } 
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStates();
  }, []);
  const handleStateChange = async (selectedOption) => {
    try {
      // Reset city selection when state changes
      setSelectedCity(null);
      setCities([]);
      setSelectedState(selectedOption);

      // Update data state
      setData((prev) => ({
        ...prev,
        state: selectedOption?.label || "",
        city: "", // Reset city when state changes
      }));

      if (!selectedOption) return;

      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/IN/states/${selectedOption.value}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY": import.meta.env.VITE_STATE_API_KEY,
          },
        }
      );

      const cityOptions = response.data.map((city) => ({
        value: city.name,
        label: city.name,
      }));

      setCities(cityOptions);
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Failed to fetch cities. Please try again.");
    }
  };
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setData((prev) => ({
      ...prev,
      city: selectedOption?.value || "",
    }));
  };
  // Single Cover Image Upload
  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
    }
    setCoverLoading(true);
    const Response = await uploadImage(file, "coverImage");
    const { data: ImageResponse } = Response;
    const imageUrl = ImageResponse?.data?.coverImage;
    if (imageUrl) {
      setData((prev) => ({ ...prev, coverImage: imageUrl }));
    }
    setCoverLoading(false);
  };
  // Multiple Villa Images Upload
  const handleVillaImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const previews = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setVillaImagesPreview((prev) => [...prev, ...previews]);
    setImageLoading(true);
    const Response = await uploadImage(files, "images");
    const { data: ImageResponse } = Response;

    const imageUrls = ImageResponse?.data?.images || [];
    if (imageUrls.length > 0) {
      setData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
    }
    setImageLoading(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.addVilla,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData?.message || "Villa uploaded successfully!");
        setData({
          villaTitle: "",
          villaType: "",
          state: "",
          city: "",
          pricePerNight: 0,
          discountOffer: "",
          numberOfBedrooms: 0,
          numberOfBathrooms: "",
          capacity: "",
          roomType: [],
          aminities: [],
          availableDate: "",
          description: "",
          coverImage: "",
          images: [],
        });
        setSelectedState(null);
        setSelectedCity(null);
        setSelectedRoomType([]);
        setSelectedVillaType([]);
        setSelectedAmenities([]);
        setCities([]);
        // Reset image previews
        setCoverImagePreview(null);
        setVillaImagesPreview([]);

        // Reset input file fields
        document.getElementById("coverImage").value = null;
        document.getElementById("images").value = null;
        formRef.current?.reset();
      } else {
        toast.error(responseData?.message || "Something went wrong");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const removeCoverImage = () => {
    setCoverImagePreview(null);
    setData((prev) => ({ ...prev, coverImage: "" }));
    document.getElementById("coverImage").value = null;
  };

  const removeVillaImage = (index) => {
    setVillaImagesPreview((prev) => prev.filter((_, i) => i !== index));
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    document.getElementById("images").value = null;
  };
  return (
    <section className="container mx-auto w-full px-11 py-6 ">
      <div className="px-10 py-6 bg-white flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-bold">Add New Villa here</h1>
        </div>
        <div>
          <form
            className=" flex flex-col gap-8"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 w-full">
                <div className=" grid gap-1 w-full">
                  <label htmlFor="villaTitle" className="text-sm font-semibold">
                    Villa Title
                  </label>
                  <input
                    type="text"
                    name="villaTitle"
                    id="villaTitle"
                    onChange={handleChange}
                    className="border rounded outline-none p-2"
                    placeholder="Enter Villa Title"
                  />
                </div>
                <div className=" grid gap-1 w-full">
                  <label htmlFor="villaType" className="text-sm font-semibold">
                    Villa Type
                  </label>
                  <Select
                    options={villaTypes}
                    styles={customStyles}
                    value={selectedVillaType}
                    onChange={(selectedOption) => {
                      setSelectedVillaType(selectedOption);
                      setData((prev) => ({
                        ...prev,
                        villaType: selectedOption?.value,
                      }));
                    }}
                  ></Select>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className=" grid gap-1 w-full">
                  <label htmlFor="name" className="text-sm font-semibold">
                    State
                  </label>
                  <Select
                    id="state"
                    options={states}
                    value={selectedState}
                    onChange={handleStateChange}
                    placeholder="Select State"
                    styles={customStyles}
                    isClearable
                  ></Select>
                </div>
                <div className=" grid gap-1 w-full">
                  <label htmlFor="name" className="text-sm font-semibold">
                    City
                  </label>
                  <Select
                    id="city"
                    options={cities}
                    value={selectedCity}
                    placeholder="Select City"
                    onChange={handleCityChange}
                    isDisabled={!selectedState}
                    styles={customStyles}
                    isClearable
                  ></Select>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className=" grid gap-1 w-full">
                  <label
                    htmlFor="pricePerNight"
                    className="text-sm font-semibold"
                  >
                    Price per night
                  </label>
                  <input
                    type="number"
                    name="pricePerNight"
                    id="pricePerNight"
                    onChange={handleChange}
                    className="border rounded outline-none p-2"
                    placeholder="Enter price per night (1200)"
                  />
                </div>
                <div className=" grid gap-1 w-full">
                  <label
                    htmlFor="discountOffer"
                    className="text-sm font-semibold"
                  >
                    Discount/Offer
                  </label>
                  <input
                    type="text"
                    name="discountOffer"
                    id="discountOffer"
                    onChange={handleChange}
                    className="border rounded outline-none p-2"
                    placeholder="Enter discount/offer like (50%) "
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className=" grid gap-1  w-full">
                  <label
                    htmlFor="numberOfBedrooms"
                    className="text-sm font-semibold"
                  >
                    Number of Bedrooms
                  </label>
                  <input
                    type="number"
                    name="numberOfBedrooms"
                    id="numberOfBedrooms"
                    onChange={handleChange}
                    className="border rounded outline-none p-2"
                    placeholder="Enter number of bedrooms"
                  />
                </div>
                <div className=" grid gap-1  w-full">
                  <label
                    htmlFor="numberOfBathrooms"
                    className="text-sm font-semibold"
                  >
                    Number of Bathrooms
                  </label>
                  <input
                    type="text"
                    name="numberOfBathrooms"
                    id="numberOfBathrooms"
                    onChange={handleChange}
                    className="border rounded outline-none p-2"
                    placeholder="Enter number of bathrooms"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 w-full ">
                <div className=" grid gap-1  w-full ">
                  <label htmlFor="capacity" className="text-sm font-semibold">
                    Capacity
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    id="capacity"
                    onChange={handleChange}
                    className="border rounded outline-none p-2"
                    placeholder="Enter villa persone capacity"
                  />
                </div>
                <div className=" grid gap-1  w-full ">
                  <label htmlFor="roomType" className="text-sm font-semibold">
                    Room Types
                  </label>
                  <Select
                    options={roomTypes}
                    styles={customStyles}
                    value={selectedRoomType}
                    onChange={(selectedOptions) => {
                      setSelectedRoomType(selectedOptions);
                      setData((prev) => ({
                        ...prev,
                        roomType: selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [],
                      }));
                    }}
                    isMulti
                  ></Select>
                </div>
              </div>
              <div className=" grid gap-1">
                <label htmlFor="aminities" className="text-sm font-semibold">
                  Amenities
                </label>
                <Select
                  options={amenities}
                  styles={customStyles}
                  value={selectedAmenities}
                  onChange={(selectedOptions) => {
                    setSelectedAmenities(selectedOptions);
                    setData((prev) => ({
                      ...prev,
                      aminities: selectedOptions.map((option) => ({
                        label: option.label,
                        icon: option.icon,
                      })),
                    }));
                  }}
                  isMulti
                ></Select>
              </div>
              <div className=" grid gap-1">
                <label
                  htmlFor="availableDate"
                  className="text-sm font-semibold"
                >
                  Availability Dates{" "}
                </label>
                <input
                  type="date"
                  name="availableDate"
                  id="availableDate"
                  onChange={handleChange}
                  className="border rounded outline-none p-2"
                  placeholder="select availability date"
                />
              </div>
              <div className=" grid gap-1">
                <label htmlFor="description" className="text-sm font-semibold">
                  Discription
                </label>
                <textarea
                  name="description"
                  id="description"
                  onChange={handleChange}
                  className="border rounded outline-none p-2 resize-none h-20"
                  placeholder="Enter discription"
                ></textarea>
              </div>
              <div className="flex items-center flex-col gap-4">
                {/* Cover Image Upload */}
                <div className="grid gap-1 w-full">
                  <h6 className="text-sm font-semibold">Cover Image</h6>
                  <label
                    htmlFor="coverImage"
                    className="bg-white h-44 border rounded flex justify-center items-center cursor-pointer"
                  >
                    {coverImagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={coverImagePreview}
                          alt="Cover Preview"
                          className="object-cover w-full h-full rounded"
                        />
                        <button
                          type="button"
                          onClick={removeCoverImage}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center">
                        {coverLoading ? (
                          <Loding />
                        ) : (
                          <>
                            <IoMdCloudUpload size={32} />
                            <p className="text-sm font-semibold">
                              Upload Cover Image
                            </p>
                          </>
                        )}
                      </div>
                    )}
                    <input
                      type="file"
                      name="coverImage"
                      id="coverImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                    />
                  </label>
                </div>
                {/* Multiple Villa Images Upload */}
                <div className="grid gap-1 w-full">
                  <h6 className="text-sm font-semibold">Villa image</h6>
                  <label
                    htmlFor="images"
                    className="bg-white h-44 border rounded flex justify-center items-center cursor-pointer"
                  >
                    <div className="flex flex-col justify-center items-center">
                      {imageLoading ? (
                        <Loding />
                      ) : (
                        <>
                          <IoMdCloudUpload size={32} />
                          <p className="text-sm font-semibold">
                            Upload Villa Image
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      name="images"
                      id="images"
                      accept="image/*"
                      className="hidden"
                      multiple
                      onChange={handleVillaImagesUpload}
                    />
                  </label>

                  <div className="flex flex-wrap gap-3 mt-2">
                    {villaImagesPreview.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-28 h-28 border rounded overflow-hidden"
                      >
                        <img
                          src={img.previewUrl}
                          alt={`Villa ${index}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeVillaImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded px-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button className="py-2 px-6 bg-secondary-200 text-md cursor-pointer  font-semibold rounded-full ">
                Add villa
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNewVilla;
