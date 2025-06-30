import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError.js";
import {
  MdSpaceDashboard,
  MdHomeFilled,
  MdAddCircle,
  MdBookmarkAdd,
  MdAddPhotoAlternate,
} from "react-icons/md";
import Axios from "../utils/Axios";
import { IoTicket, IoLogOutSharp } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import { logoutAdmin } from "../store/adminSlice.js";
import toast from "react-hot-toast";
const AdminMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const villaData = [
    {
      icon: <MdSpaceDashboard size={24} />,
      path: "/dashboard",
      name: "Dashboard",
    },
    {
      icon: <MdHomeFilled size={24} />,
      path: "/dashboard/Villa",
      name: "Villa",
    },
    {
      icon: <MdAddCircle size={24} />,
      path: "/dashboard/Add-New-Villa",
      name: "Add new villa",
    },
    {
      icon: <MdBookmarkAdd size={24} />,
      path: "/dashboard/booking",
      name: "Bookings",
    },
    {
      icon: <MdAddPhotoAlternate size={24} />,
      path: "/dashboard/Add-testimonials",
      name: "Add Testimonials",
    },
    {
      icon: <MdAddPhotoAlternate size={24} />,
      path: "/dashboard/testimonials",
      name: "Testimonials",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.adminLogout,
        withCredentials: true,
      });
      if (response?.data?.success) {
        dispatch(logoutAdmin());
        localStorage.clear();
        toast.success(response?.data?.message);
        window.dispatchEvent(new Event("userLogin"));
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="border w-full h-full p-4 flex flex-col gap-6">
      <div className="grid gap-4">
        {villaData.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.path}
              className="flex gap-2 items-center py-2 px-4 hover:bg-gray-200"
            >
              {item.icon} {item.name}
            </Link>
          );
        })}
        {/* logout */}
        <button
          className="flex gap-2 items-center py-2 px-4 hover:bg-gray-200"
          onClick={handleLogout}
        >
          <IoLogOutSharp size={24} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
