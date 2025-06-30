import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
const Registration = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
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
        ...SummaryApi.userRegistration,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-xl mx-auto rounded p-7">
        <p>Registration</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="flex items-center flex-col md:flex-row gap-4">
            <div className="grid gap-1 w-full">
              <label htmlFor="firstName">First Name : </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoFocus
                className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
                value={data.firstName}
                onChange={handleChange}
                placeholder="enter your first name"
              />
            </div>
            <div className="grid gap-1 w-full">
              <label htmlFor="lastName">Last Name : </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                autoFocus
                className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
                value={data.lastName}
                onChange={handleChange}
                placeholder="enter your last name"
              />
            </div>
          </div>
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
          <div className="grid gap-1">
            <label htmlFor="phone">Phone No. : </label>
            <input
              type="number"
              name="phone"
              id="phone"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
              value={data.phone}
              onChange={handleChange}
              placeholder="enter your phone"
            />
          </div>
          <div className="flex items-center flex-col md:flex-row gap-4">
            <div className="grid gap-1 w-full">
              <label htmlFor="password">Password : </label>
              <div className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-primary-200">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoFocus
                  className="outline-none w-full bg-transparent"
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
            <div className="grid gap-1 w-full">
              <label htmlFor="confirmPassword">Confirm password: </label>
              <div className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-primary-200">
                <input
                  type={confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  autoFocus
                  className="outline-none w-full bg-transparent"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="enter your c-password"
                />
                <div
                  onClick={() => setConfirmPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {confirmPassword ? <FaRegEye /> : <FaEyeSlash />}
                </div>{" "}
              </div>
            </div>{" "}
          </div>
          <button
            disabled={!validvalue}
            className={`${
              validvalue
                ? "bg-secondary-200 hover:bg-primary-400"
                : "bg-gray-500 "
            } text-white py-2 px-6 rounded font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>
        <p>
          Already you have an account?{" "}
          <Link
            to={"/login"}
            className="text-primary-200 font-semibold text "
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Registration;
