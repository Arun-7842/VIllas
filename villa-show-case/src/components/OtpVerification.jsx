import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  console.log("location", location);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const validealue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.verifyOtp,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: { data: response.data, email: location?.state?.email },
        });
      }
    } catch (error) {
      console.log("error", error);
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p className="grid gap-4 py-4 text-semibold">Enter OTP</p>
        <form className="grid gap-4 mt-1" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP: </label>
            <div className="flex align-center gap-2 justify-between">
              {data.map((e, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log("value", value);
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1]?.focus();
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 mt-3 p-2 border rounded outline-none focus-within:border-primary-200 text-center"
                  />
                );
              })}
            </div>
          </div>
          <button
            disabled={!validealue}
            className={`${
              validealue
                ? "bg-primary-200 hover:bg-primary-400"
                : "bg-gray-500 "
            } text-white py-2 px-6 rounded font-semibold my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </form>
        <p>
          Already you have account?{" "}
          <Link
            to={"/login"}
            className="text-primary-200 font-semibold text hover:text-primary-400"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
