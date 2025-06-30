import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError.js";
import { MdSpaceDashboard, MdHomeFilled, MdAddCircle } from "react-icons/md";
import Axios from "../utils/Axios";
import { IoTicket, IoLogOutSharp } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import { logoutAdmin } from "../store/adminSlice.js";
import toast from "react-hot-toast";
const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = [
    {
      icon: <MdSpaceDashboard size={24} />,
      path: "/user-data",
      name: "Dashboard",
    },
    {
      icon: <MdHomeFilled size={24} />,
      path: "/user-data/Wishlist",
      name: "Wishlist",
    },
    {
      icon: <MdAddCircle size={24} />,
      path: "/about-us",
      name: "About us",
    },
  ];
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.userLogout,
        withCredentials: true,
      });
      if (response?.data?.success) {
        dispatch(logoutAdmin());
        localStorage.clear();
        toast.success(response?.data?.message);
        window.dispatchEvent(new Event("userLogin"));
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="border w-full h-full p-4 flex flex-col gap-6">
      <div className="grid gap-4">
        {userData.map((item, index) => {
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

export default UserMenu;
