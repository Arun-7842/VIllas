import React, { useState, useEffect } from "react";
import SummaryApi from "../../common/SummaryApi";
import Axios from "../../utils/Axios";
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
import { useNavigate } from "react-router-dom";
import AxiosToastError from "../../utils/AxiosToastError";
import toast from "react-hot-toast";
import UpdateVillaInfo from "./UpdateVillaInfo";
const Villa = () => {
  const [villadata, setVillaData] = useState([]);
  const [selectedVillaId, setSelectedVillaId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
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
  const navigate = useNavigate();
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

  const fetchVillas = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getVilla,
      });
      const { data: ResponseData } = response;

      if (ResponseData.success) {
        setVillaData(ResponseData.data);
      }
    } catch (error) {
      console.error("Failed to fetch villas:", error.message || error);
    }
  };
  useEffect(() => {
    fetchVillas();
  }, []);
  const deleteVillaHandler = async () => {
    try {
      const response = await Axios({
        method: SummaryApi.deleteVilla.method,
        url: SummaryApi.deleteVilla.url.replace(":id", selectedVillaId),
      });

      if (response.data.success) {
        setVillaData((prev) =>
          prev.filter((villa) => villa._id !== selectedVillaId)
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setShowConfirmModal(false);
      setSelectedVillaId(null);
    }
  };

  return (
    <section style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Total Villas: {villadata.length}</h1>

      {villadata.length === 0 ? (
        <p>No villas available to display.</p>
      ) : (
        <div className="flex flex-col gap-6 ">
          {villadata.map((villa) => (
            <div
              key={villa._id}
              className="border p-6 bg-white rounded-md w-full flex flex-col md:flex-row gap-6"
            >
              <div className="flex flex-col gap-4 w-full">
                <div className="w-full h-[300px] ">
                  <img
                    src={
                      villa.coverImage ||
                      "https://via.placeholder.com/500x300?text=No+Image"
                    }
                    alt={villa.villaTitle || "No Title"}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <strong>Avalable on :</strong>
                  <h4 className="text-green-700 text-md font-semibold">
                    {" "}
                    {villa.availableDate}
                  </h4>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <h2 className="text-xl font-semibold ">
                  {villa.villaTitle
                    ? villa.villaTitle.split(" ").slice(0, 5).join(" ") + "..."
                    : "N/A"}
                </h2>
                <p className="text-md text-gray-600">
                  {villa.description
                    ? villa.description.split(" ").slice(0, 20).join(" ") +
                      "..."
                    : "No description provided."}
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <p className="flex flex-col gap-1">
                    <strong>Price/Night:</strong> ₹
                    {villa.pricePerNight || "N/A"}
                  </p>
                  <p className="flex flex-col gap-1">
                    <strong>Capacity:</strong> {villa.capacity || "N/A"}
                  </p>
                  <p className="flex flex-col gap-1">
                    <strong>Bedrooms:</strong> {villa.numberOfBedrooms || "N/A"}
                  </p>
                  <p className="flex flex-col gap-1">
                    <strong>Bathrooms:</strong>{" "}
                    {villa.numberOfBathrooms || "N/A"}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <strong>Amenities:</strong>{" "}
                  <div className="grid grid-cols-3 items-conter gap-4">
                    {villa.aminities && villa.aminities.length > 0
                      ? villa.aminities.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="text-sm bg-body-bg_body-color px-2 py-1 rounded flex flex-col gap-1 items-center"
                          >
                            {iconMap[item.icon] || null}
                            {item.label}
                          </span>
                        ))
                      : "N/A"}{" "}
                  </div>
                </div>
                <div className="flex gap-4 items-center justify-end">
                  <button
                    className=" py-1 px-4 border border-red-300 bg-red-50 hover:bg-red-100 text-sm text-red-600 rounded-full font-semibold"
                    onClick={() => {
                      setSelectedVillaId(villa._id);
                      setShowConfirmModal(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className=" py-1 px-4 border  hover:bg-primary-400 text-sm rounded-full hover:text-white font-semibold"
                    onClick={() => {
                      setOpenEdit(true);
                      setEditData(villa);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className=" py-1 px-4  hover:text-black  hover:bg-secondary-500  bg-primary-400 text-sm rounded-full text-white font-semibold"
                    onClick={() =>
                      navigate(`/dashboard/VillaDetails/${villa._id}`)
                    }
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Confirm Deletion
            </h2>
            <p className="mb-6">Are you sure you want to delete this villa?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedVillaId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={deleteVillaHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {openEdit && (
        <div className="fixed top-0 bottom-0 left-0 right-0 p-4 flex items-center justify-center bg-neutral-800 bg-opacity-70 z-50">
          <UpdateVillaInfo
            data={editData}
            close={() => setOpenEdit(false)}
            fetchData={fetchVillas}
          />
        </div>
      )}
    </section>
  );
};

export default Villa;
