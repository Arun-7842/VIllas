import React, { useState, useEffect } from "react";
import Axios from "../../utils/Axios";
import Select from "react-select";
import SummaryApi from "../../common/SummaryApi";
import toast from "react-hot-toast";
import { IoMdCloudUpload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { roomTypes, villaTypes, amenities } from "../../store/Dropdown";
import customStyles from "../../common/DropdownCss";
import AxiosToastError from "../../utils/AxiosToastError";
import uploadImage from "../../utils/uploadImage";
import Loding from "../../common/Loading";
const UpdateVillaInfo = ({ close, fetchData, data: villadata }) => {
  const [data, setData] = useState({
    _id: villadata._id,
    villaTitle: villadata.villaTitle,
    villaType: villadata.villaType,
    pricePerNight: villadata.pricePerNight,
    discountOffer: villadata.discountOffer,
    numberOfBedrooms: villadata.numberOfBedrooms,
    numberOfBathrooms: villadata.numberOfBathrooms,
    capacity: villadata.capacity,
    roomType: villadata.roomType,
    aminities: villadata.aminities,
    availableDate: villadata.availableDate,
    description: villadata.description,
    coverImage: villadata.coverImage,
    images: villadata.images,
  });

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedVillaType, setSelectedVillaType] = useState([]);
  const [coverLoading, setCoverLoading] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [villaImagesPreview, setVillaImagesPreview] = useState([]);
  useEffect(() => {
    if (villadata) {
      setSelectedVillaType(
        villaTypes.find((item) =>
          (villadata?.villaType || []).includes(item.value)
        )
      );

      setSelectedRoomType(
        roomTypes.filter((item) =>
          (villadata?.roomType || []).includes(item.value)
        )
      );

      setSelectedAmenities(
        amenities.filter((item) =>
          (villadata?.aminities || []).some((a) => a.label === item.label)
        )
      );

      setCoverImagePreview(villadata.coverImage);

      setVillaImagesPreview(
        (villadata.images || []).map((url) => ({
          previewUrl: url,
          isOld: true,
        }))
      );
    }
  }, [villadata]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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

    // Create previews immediately for UI feedback
    const previews = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      isNew: true,
      uploading: true, // Add uploading state
    }));

    setVillaImagesPreview((prev) => [...prev, ...previews]);
    setImageLoading(true);

    try {
      const response = await uploadImage(files, "images");
      const { data: imageResponse } = response;
      const imageUrls = imageResponse?.data?.images || [];

      if (imageUrls.length > 0) {
        // Update the main data state with new image URLs
        setData((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...imageUrls],
        }));

        // Update previews to replace temporary URLs with actual URLs
        setVillaImagesPreview((prev) => {
          const updatedPreviews = [...prev];
          const newItemsStartIndex = updatedPreviews.length - files.length;

          imageUrls.forEach((url, index) => {
            const previewIndex = newItemsStartIndex + index;
            if (updatedPreviews[previewIndex]) {
              updatedPreviews[previewIndex] = {
                previewUrl: url,
                isOld: false,
                uploading: false,
              };
            }
          });

          return updatedPreviews;
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");

      // Remove failed uploads from preview
      setVillaImagesPreview((prev) =>
        prev.slice(0, prev.length - files.length)
      );
    } finally {
      setImageLoading(false);
      // Clear the input to allow re-uploading the same files
      e.target.value = "";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedData = {
        ...data,
        images: data.images || [],
        coverImage: data.coverImage || coverImagePreview,
      };
      const response = await Axios({
        ...SummaryApi.updateVilla,
        url: SummaryApi.updateVilla.url.replace(":id", data._id),
        data: updatedData,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchData();
        close();
      }
    } catch (error) {
      AxiosToastError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const removeCoverImage = () => {
    setCoverImagePreview(null);
    setData((prev) => ({ ...prev, coverImage: "" }));
    document.getElementById("coverImage").value = null;
  };

  const removeVillaImage = (index) => {
    // Remove from preview
    setVillaImagesPreview((prev) => prev.filter((_, i) => i !== index));

    // Remove from data.images array
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  return (
    <section className="h-[600px] overflow-y-scroll">
      <div className="bg-white max-w-2xl w-full py-4 px-8 rounded flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Update Villa</h1>
          <button onClick={close}>
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <form className=" flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 w-full">
                <div className=" grid gap-1 w-full">
                  <label htmlFor="villaTitle" className="text-sm font-semibold">
                    Villa Title
                  </label>
                  <input
                    type="text"
                    name="villaTitle"
                    id="villaTitle"
                    placeholder="Enter Villa Title"
                    value={data.villaTitle}
                    onChange={handleOnChange}
                    className="border rounded outline-none p-2"
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
              <div className="flex flex-col gap-4 w-full">
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
                    value={data.pricePerNight}
                    onChange={handleOnChange}
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
                    value={data.discountOffer}
                    onChange={handleOnChange}
                    className="border rounded outline-none p-2"
                    placeholder="Enter discount/offer like (50%) "
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
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
                    value={data.numberOfBedrooms}
                    onChange={handleOnChange}
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
                    value={data.numberOfBathrooms}
                    onChange={handleOnChange}
                    className="border rounded outline-none p-2"
                    placeholder="Enter number of bathrooms"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full ">
                <div className=" grid gap-1  w-full ">
                  <label htmlFor="capacity" className="text-sm font-semibold">
                    Capacity
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    id="capacity"
                    value={data.capacity}
                    onChange={handleOnChange}
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
                  value={data.availableDate}
                  onChange={handleOnChange}
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
                  value={data.description}
                  onChange={handleOnChange}
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
              <button
                type="submit"
                className="py-2 px-6 bg-secondary-200 text-md cursor-pointer  font-semibold rounded-full "
              >
                {loading ? "Updating..." : "Update Villa"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateVillaInfo;
