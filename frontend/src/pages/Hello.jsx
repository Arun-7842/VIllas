import React, { useEffect, useState, useRef } from "react";
import heroImage from "../assets/here-imge.webp";
import SummaryApi from "../common/SummaryApi.js";
import Axios from "../utils/Axios.js";
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
import { TbBrandAirbnb } from "react-icons/tb";
import { IoCallSharp, IoClose } from "react-icons/io5";
import {
  FaElevator,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward, IoIosCall } from "react-icons/io";
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
import BookingBar from "../components/BookingBar.jsx";
import BookingForm from "../components/BookingForm.jsx";
import { cardData, whySection } from "../store/Dropdown.jsx";
import { useNavigate } from "react-router-dom";
import why_choose from "../assets/why_main.png";
import AnimatedTestimonialsDemo from "../components/AnimatedTestimonialsDemo.jsx";
import villaSub from "../assets/sub-section.png";
import { FaRegHeart, FaHeart, FaWhatsapp, FaAngleRight } from "react-icons/fa";
import toast from "react-hot-toast";
const getAverageRating = (reviews) => {
  const approvedReviews = reviews.filter((r) => r.isApproved);
  if (approvedReviews.length === 0) return 0;
  const total = approvedReviews.reduce((acc, curr) => acc + curr.rating, 0);
  return total / approvedReviews.length;
};
const renderStars = (avg) => {
  const fullStars = Math.floor(avg);
  const hasHalfStar = avg - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500 text-xl">
          ★
        </span>
      ))}
      {hasHalfStar && <span className="text-yellow-500  text-xl">☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-400 text-xl">
          ★
        </span>
      ))}
    </>
  );
};
const Hello = () => {
  const [villadata, setVillaData] = useState([]);
  const [bookingParams, setBookingParams] = useState({
    location: "",
    roomType: "",
    person: 1,
    checkIn: "",
    checkOut: "",
  });
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
  const [openPopup, setOpenPopup] = useState(false);
  const [detailsPopup, setDetailsPopup] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const navigate = useNavigate();
  const handleOpenBooking = () => setOpenPopup(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");
  const villafet = async () => {
    try {
      const response = await Axios({
        ...SummaryApi?.getVilla,
      });
      const { data: ResponseData } = response;

      if (ResponseData?.success) {
        setVillaData(ResponseData?.data);
      }
    } catch (error) {
      console.error("Failed to fetch villas:", error?.message || error);
    }
  };
  useEffect(() => {
    villafet();
  }, []);
  const getUserIdFromStorage = () => {
    try {
      const userString = localStorage.getItem("user");

      if (!userString) return null;

      const parsed = JSON.parse(userString);
      return parsed?.user?.id || parsed?.id || parsed?._id || null;
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = getUserIdFromStorage();
      if (!userId) return;

      try {
        const url = SummaryApi?.userWishlist?.url.replace(":userId", userId);
        const response = await Axios.get(url);
        if (response?.data?.success) {
          setWishlist(response?.data?.data.map((villa) => villa?._id));
        }
      } catch (err) {
        console.error("Failed to load wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

  const handleWishlistToggle = async (villaId) => {
    const userId = getUserIdFromStorage();

    if (!userId) {
      toast.error("Please login first");
      return;
    }

    const isWishlisted = wishlist.includes(villaId);

    try {
      if (isWishlisted) {
        const url = SummaryApi?.userRemoveWishlist?.url
          .replace(":userId", userId)
          .replace(":itemId", villaId);
        const response = await Axios.delete(url);
        if (response?.data?.success) {
          setWishlist((prev) => prev.filter((id) => id !== villaId));
          toast.success("Removed from wishlist");
        }
      } else {
        const url = SummaryApi?.userAddWishlist?.url.replace(":userId", userId);
        const response = await Axios.post(url, { itemId: villaId });
        if (response?.data?.success) {
          setWishlist((prev) => [...prev, villaId]);
          toast.success("Added to wishlist");
        }
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      toast.error("Something went wrong");
    }
  };
  const handleReviewSubmit = async () => {
    if (!rating || !reviewText) {
      return alert("Please provide both rating and review text.");
    }

    setLoading(true);
    try {
      const apiUrl = SummaryApi.addReview.url.replace(":id", selectedVilla._id);

      const response = await fetch(apiUrl, {
        method: SummaryApi.addReview.method,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          review: rating,
          message: reviewText,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          "Review submitted successfully! Your review is awaiting admin approval."
        );
        setShowReviewModal(false);
      } else {
        toast.error(data.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something went wrong while submitting the review.");
    } finally {
      setLoading(false);
    }
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const handleScrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  const handleDetailsPopup = () => {
    setDetailsPopup(true);
  };
  return (
    <div>
      <div className="flex flex-col gap-16">
        <section>
          <div className="hero_section">
            <div className="flex items-start md:flex-row flex-col md:gap-6 md:px-0 px-6 lg:gap-10 h-full w-full">
              <div className="w-full h-full md:flex flex-col justify-between hidden ">
                <div className="flex w-full justify-start px-20">
                  <div className="flex flex-col gap-4">
                    <p className="text-white text-sm">
                      Find your perfect villa experience — curated and brought
                      to your <br /> screen.
                    </p>
                    {/* <div className="w-20 h-2 bg-secondary-200"></div> */}
                  </div>
                </div>
                <div>
                  <img src={heroImage} alt="heroimage" className="w-[600px]" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-8">
                <div>
                  <div className="flex flex-col gap-0">
                    <h1 className="text-[54px] lg:text-[64px] leading-snug font-bold text-white">
                      LONAVALA
                    </h1>
                    <h1 className="text-[54px] lg:text-[64px] leading-snug font-bold text-white">
                      STAY-VILLA
                    </h1>
                  </div>
                  <p className="text-white text-sm">
                    Step into a world of elegance, comfort, and visual
                    inspiration. Explore <br /> handpicked villas from stunning
                    locations, crafted for those who appreciate <br /> the art
                    of living well.
                  </p>
                </div>
                <div className="flex justify-end md:justify-start">
                  {villadata.length > 0 && (
                    <div className="flex items-center gap-4 bg-[#727B94] w-fit px-4 py-3 rounded-xl">
                      <img
                        src={villadata[0].coverImage}
                        alt={villadata[0].villaTitle}
                        className="w-[130px] h-[100px] object-cover rounded-xl"
                      />
                      <div className="flex flex-col gap-2">
                        <h2 className="text-sm font-semibold text-white">
                          Check our latest <br /> property
                        </h2>
                        <a
                          href={`/VillaDetails/${villadata[0]._id}`}
                          className="text-white hover:text-secondary-200 flex items-center gap-1"
                        >
                          Learn More <FaAngleRight />
                        </a>{" "}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="here_letest_villa">
            <div className="">
              <BookingBar
                data={villadata}
                bookingParams={bookingParams}
                setBookingParams={setBookingParams}
                onBook={handleOpenBooking}
                isLoggedIn={user !== null}
              />
              {openPopup && (
                <BookingForm
                  bookingParams={bookingParams}
                  villadata={villadata}
                  onClose={() => setOpenPopup(false)}
                />
              )}
            </div>
            <div className="px-4 sm:px-10 md:px-0">
              {villadata.length > 0 && (
                <div className="container mx-auto max-w-3xl flex md:flex-row flex-col items-start gap-6 md:gap-10">
                  <div className="here_letest_img">
                    <img
                      src={villadata[0].coverImage}
                      alt={villadata[0].villaTitle}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-6">
                    <h6 className="font-semibold text-sm text-secondary-200">
                      ABOUT US
                    </h6>
                    <div className="flex flex-col gap-4">
                      <h1 className="text-3xl font-bold text-white">
                        {villadata[0].villaTitle}
                      </h1>
                      <p className="text-sm  font-normal text-white">
                        {villadata[0].description
                          ? villadata[0].description
                              .split(" ")
                              .slice(0, 30)
                              .join(" ") + "..."
                          : ""}
                      </p>
                    </div>
                    <a
                      href={`/VillaDetails/${villadata[0]._id}`}
                      className="w-fit bg-secondary-200 py-2 px-4 rounded-full text-sm font-semibold"
                    >
                      Learn Mote
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="luxury_section">
          <div className="luxury_card_section">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-3xl font-bold text-white">
                  Luxurious Rooms
                </h1>
                <div>
                  <div className="w-[100px] h-2 bg-white"></div>
                </div>
                <p className="text-white text-sm opacity-90">
                  Showcasing the finest spaces crafted for elegance and peace.
                </p>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {cardData.map((card, i) => (
                  <div
                    key={card._id || i}
                    className="flex flex-col gap-2 bg-white rounded p-4"
                  >
                    <div className="w-[100%] object-cover relative">
                      <img
                        src={card.image}
                        alt={card.label}
                        className="w-[100%] h-[200px] rounded"
                      />
                      <p className="absolute top-2 right-2 text-white font-semibold py-2 px-4 bg-primary-400">
                        Luxury Rooms
                      </p>
                    </div>
                    <p>{card.label}</p>
                  </div>
                ))}{" "}
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 md:px-10 lg:px-20  flex flex-col gap-10">
          <div className="flex justify-center flex-col gap-2 items-center">
            <h6 className="font-semibold text-sm text-primary-400">
              Our Villas
            </h6>
            <h2 className="text-3xl font-bold text-primary-400">Our Villas</h2>
          </div>
          {villadata.length === 0 ? (
            <p>No villas available to display.</p>
          ) : (
            <div className="w-full flex flex-col gap-7 overflow-hidden">
              <div
                ref={containerRef}
                className="flex gap-4 overflow-x-auto scroll-smooth w-full snap-x snap-mandatory flex-nowrap hide-scrollbar"
              >
                {villadata.map((villa) => (
                  <div
                    key={villa._id}
                    className="min-w-full h-full snap-start border p-6 bg-white rounded-md flex flex-col md:flex-row gap-4 md:gap-6"
                  >
                    <div className="flex flex-col gap-4 w-full">
                      <div className="w-full h-[200px] md:h-[300px] relative">
                        <img
                          src={
                            villa.coverImage ||
                            "https://via.placeholder.com/500x300?text=No+Image"
                          }
                          alt={villa.villaTitle || "No Title"}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          onClick={() => handleWishlistToggle(villa._id)}
                          className="absolute top-2 right-2 bg-white p-2 rounded-full z-10"
                        >
                          {wishlist.includes(villa._id) ? (
                            <FaHeart
                              size={18}
                              className="text-red-600 fill-red-600"
                            />
                          ) : (
                            <FaRegHeart size={18} className="text-red-600" />
                          )}
                        </button>
                      </div>
                      <div>
                        <div>
                          <div>
                            <div className="flex flex-col lg:flex-row lg:items-center  gap-2">
                              <div>
                                {renderStars(getAverageRating(villa.review))}
                                <span className="text-sm text-gray-600">
                                  (
                                  {
                                    villa.review.filter((r) => r.isApproved)
                                      .length
                                  }{" "}
                                  <span>Reviews</span>)
                                </span>
                              </div>
                              <div>
                                <button
                                  className="text-sm text-blue-600 underline"
                                  onClick={() => {
                                    setSelectedVilla(villa);
                                    setShowReviewModal(true);
                                    setReviewText("");
                                    setRating(0);
                                  }}
                                >
                                  Add / View Review
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <strong>Avalable on :</strong>
                          <h4 className="text-green-700 text-md font-semibold">
                            {" "}
                            {villa.availableDate}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-2 md:gap-4">
                      <h2 className="text-xl font-semibold ">
                        {villa.villaTitle
                          ? villa.villaTitle.split(" ").slice(0, 5).join(" ") +
                            "..."
                          : "N/A"}
                      </h2>
                      <p className="text-md text-gray-600">
                        {villa.description
                          ? villa.description
                              .split(" ")
                              .slice(0, 20)
                              .join(" ") + "..."
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
                          <strong>Bedrooms:</strong>{" "}
                          {villa.numberOfBedrooms || "N/A"}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>Bathrooms:</strong>{" "}
                          {villa.numberOfBathrooms || "N/A"}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <strong>Amenities:</strong>{" "}
                        <div className="grid grid-cols-2 lg:grid-cols-3 items-conter gap-4">
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
                          className=" py-1 px-4  hover:text-black  hover:bg-secondary-500  bg-primary-400 text-sm rounded-full text-white font-semibold"
                          onClick={() => navigate(`/VillaDetails/${villa._id}`)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden lg:flex w-full justify-end gap-4 ">
                <button
                  onClick={handleScrollLeft}
                  className="bg-primary-400 hover:bg-secondary-200 text-white hover:text-black  p-2 rounded-full shadow-md"
                >
                  <IoIosArrowBack size={24} />
                </button>
                <button
                  onClick={handleScrollRight}
                  className="bg-primary-400 hover:bg-secondary-200 text-white hover:text-black p-2 rounded-full shadow-md"
                >
                  <IoIosArrowForward size={24} />
                </button>
              </div>
            </div>
          )}
          {showReviewModal && selectedVilla && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md w-full max-w-[22rem] md:max-w-[40rem] lg:max-w-[47rem] shadow-lg relative">
                <button
                  className="absolute top-2 right-2 text-gray-600"
                  onClick={() => setShowReviewModal(false)}
                >
                  ✖
                </button>
                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Add Review Form */}
                  <div className="space-y-3 w-full">
                    <h3 className="font-semibold">Write a Review:</h3>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setRating(star)}
                          className={`cursor-pointer text-2xl ${
                            star <= rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <textarea
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Write your review..."
                      className="w-full border p-2 rounded"
                    ></textarea>
                    <div className="flex justify-end">
                      <button
                        disabled={loading}
                        onClick={() => {
                          if (!user) {
                            navigate("/login");
                          } else {
                            handleReviewSubmit();
                          }
                        }}
                        className="bg-primary-400 text-white px-4 py-2 rounded hover:bg-primary-500"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <h2 className="text-md font-semibold mb-4">
                      Reviews for {selectedVilla.villaTitle}
                    </h2>
                    {/* Display Approved Reviews */}
                    <div className="max-h-52 overflow-y-auto mb-4">
                      {selectedVilla.review
                        .filter((r) => r.isApproved)
                        .map((r) => (
                          <div key={r._id} className="border-b py-2">
                            <div className="flex items-center gap-2">
                              {renderStars(r.rating)}
                              <span className="text-gray-500 text-sm">
                                ({new Date(r.createdAt).toLocaleDateString()})
                              </span>
                            </div>
                            <p className="text-gray-700">{r.message}</p>
                          </div>
                        ))}
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          )}
        </section>
        <section>
          <div className="container mx-auto lg:px-20 md:px-10 px-4 flex flex-col lg:flex-row gap-4">
            <div className="Luxury_section">
              <div className="flex md:flex-row flex-col items-end gap-8 px-4 md:px-12 py-6 md:py-11 bg-gradient-to-b from-[#001B1D]/10 via-[#001B1D]/90 to-[#001B1D] h-full rounded-3xl">
                <div className="w-full flex flex-col gap-4">
                  <h6 className="text-gray-200 text-sm">United Kingdom</h6>
                  <div>
                    <h1 className="text-4xl font-bold text-white ">
                      Authentic
                    </h1>
                    <h1 className="text-4xl font-bold text-white ">
                      House in Nature
                    </h1>
                  </div>
                  <p className="text-gray-200 text-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus malesuada neque sed pellentesque ullamcorper.
                  </p>
                </div>
                <div className="w-full ">
                  <div className="flex flex-col gap-6 bg-[#fff]/10 p-4 lg:p-10 rounded-xl backdrop-blur-md text-white shadow-lg w-full">
                    <h3 className="flex items-center gap-2">
                      <IoCallSharp size={18} /> +91 - 7499810250 / 8483099923
                    </h3>
                    <h1 className="text-xl font-semibold text-white">
                      Unit Detail
                    </h1>
                    <div className="flex justify-between text-sm">
                      <div className="flex flex-col gap-1">
                        <h6 className="text-gray-300">Size</h6>
                        <h4 className="text-lg">250 M²</h4>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h6 className="text-gray-300">Room</h6>
                        <h4 className="text-lg">4 Rooms</h4>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h6 className="text-gray-300">Bathroom</h6>
                        <h4 className="text-lg">2 Bathrooms</h4>
                      </div>
                    </div>
                    <button
                      onClick={handleDetailsPopup}
                      className="w-fit py-2 px-6 rounded-full bg-cyan-400 text-sm font-bold text-black hover:bg-cyan-300 transition"
                    >
                      Go to Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 md:px-10 lg:px-20  flex flex-col gap-10">
          <div className="flex flex-col gap-11 md:px-8 px-4">
            <div className="flex md:flex-row flex-col items-start gap-10">
              <div>
                <img src={why_choose} alt={why_choose} />
              </div>
              <div className="flex flex-col gap-4">
                <h6 className="font-semibold text-sm text-primary-400">
                  WHY CHOOSE US
                </h6>
                <div>
                  <h1 className="text-primary-400 lg:text-5xl md:text-3xl text-2xl font-bold">
                    You Will Get the Best
                  </h1>
                  <h1 className="text-primary-400 lg:text-5xl md:text-3xl text-2xl font-bold">
                    Villa Experience
                  </h1>
                </div>
                <p className="text-primary-400 text-lg">
                  From architectural wonders to peaceful surroundings, we ensure
                  your villa journey is not just beautiful — it's unforgettable.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {whySection.map((why, i) => (
                <div
                  key={why.label || i}
                  className="bg-white py-6 px-8 flex flex-col items-center text-center gap-2 rounded-[16px]"
                >
                  <img src={why.image} alt={why.label} className="w-16" />
                  <p>{why.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <AnimatedTestimonialsDemo />
        </section>
        <section className="container mx-auto px-4 md:px-10 lg:px-20  flex flex-col gap-10">
          <div className="subscribe_section">
            <div>
              <div>
                <h1 className="text-xl md:text-4xl lg:text-6xl font-bold text-white">
                  Find Your Dream Villa Today!
                </h1>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-start gap-4 h-full w-full">
              <div className="flex flex-col gap-4 justify-between h-[100%] w-full">
                <p className=" text-md md:text-lg font-medium text-white">
                  Get the latest listings for luxury villas on rent. From
                  beachside retreats to serene countryside escapes we'll help
                  you find the perfect villa.
                </p>
                <a
                  href="https://wa.me/7499810250"
                  target="_blank"
                  className="w-fit py-2 px-6 rounded-full bg-cyan-400 text-sm font-bold text-black hover:bg-cyan-300 transition"
                >
                  Connect
                </a>
              </div>
              <div className="h-full w-full">
                <img src={villaSub} alt={villaSub} />
              </div>
            </div>
          </div>
        </section>
      </div>
      {detailsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-4">
            <div className="flex justify-end">
              <button
                onClick={() => setDetailsPopup(false)}
                className="text-gray-500 hover:text-black"
              >
                <IoClose size={24} />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-primary-500">
              Welcome to Lonavala Stay Villas
            </h2>
            <p className="text-gray-600">
              Discover luxury, comfort, and convenience at one place. Our
              platform helps you find handpicked villas in Lonavala with premium
              amenities, scenic views, and hassle-free booking.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>🏠 Verified luxury villas listed</li>
              <li>📍 Easy location-based filtering</li>
              <li>📞 Instant booking support</li>
              <li>💰 Best price guarantee & exclusive discounts</li>
              <li>🔒 Secure, trustworthy, and fast</li>
            </ul>

            <p className="text-sm text-gray-500">
              Our mission is to simplify your holiday planning and give you a
              memorable stay experience in the heart of Lonavala.
            </p>

            <div className="text-right">
              <button
                onClick={() => setDetailsPopup(false)}
                className="bg-primary-400 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition"
              >
                Let's Explore
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed top-1/2 right-0 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <a
            href="https://wa.me/7499810250"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-400 p-2 rounded-tl-xl rounded-bl-xl text-white hover:text-secondary-200 transition-all"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href="tel:7499810250"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-400 p-2 rounded-tl-xl rounded-bl-xl text-white hover:text-secondary-200 transition-all"
          >
            <IoIosCall size={20} />
          </a>
        </div>
        <div className="bg-primary-400 p-2 rounded-tl-xl rounded-bl-xl flex flex-col gap-3">
          <a
            href="https://www.instagram.com/__travel_moments?igsh=MWh0cHRqZWpwNjB6Mg=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-secondary-200 transition-all"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.facebook.com/share/16fuuPAbkd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-secondary-200 transition-all"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.airbnb.co.in/rooms/1425122551068313566?guests=1&adults=1&s=67&unique_share_id=d9d79364-c20b-42f7-aa9e-d0903a66e47b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-secondary-200 transition-all"
          >
            <TbBrandAirbnb size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hello;
