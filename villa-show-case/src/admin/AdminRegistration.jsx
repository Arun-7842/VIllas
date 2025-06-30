import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
const AdminRegistration = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const validvalue = Object.values(data).every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("password does not match");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.registrationAdmin,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p>Admin Registration</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {/* //name */}
          <div className="grid gap-1">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
              value={data.name}
              onChange={handleChange}
              placeholder="enter your name"
            />
          </div>
          {/* //email */}
          <div className="grid gap-1">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
              value={data.email}
              onChange={handleChange}
              placeholder="enter your email"
            />
          </div>
          {/* //mobile */}
          <div className="grid gap-1">
            <label htmlFor="mobile">Phone No. : </label>
            <input
              type="number"
              name="mobile"
              id="mobile"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
              value={data.mobile}
              onChange={handleChange}
              placeholder="enter your mobile"
            />
          </div>
          {/* //password */}
          <div className="grid gap-1">
            <label htmlFor="password">Password : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoFocus
                className="outline-none w-full"
                value={data.password}
                onChange={handleChange}
                placeholder="enter your password"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </div>{" "}
            </div>
          </div>
          {/* //confirmPassword */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm password: </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-primary-200">
              <input
                type={confirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                autoFocus
                className="outline-none w-full"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="enter your confirm password"
              />
              <div
                onClick={() => setConfirmPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {confirmPassword ? <FaRegEye /> : <FaEyeSlash />}
              </div>{" "}
            </div>
          </div>
          <button
            disabled={!validvalue}
            className={`${
              validvalue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500 "
            } text-white py-2 px-6 rounded font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>
        <p>
          Already you have an account?{" "}
          <Link
            to={"/login"}
            className="text-green-700 font-semibold text hover:text-green-900"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AdminRegistration;
