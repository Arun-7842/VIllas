import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { FaRegHeart, FaHeart } from "react-icons/fa";
const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        toast.error("User not logged in");
        return;
      }

      const loggedInUser = JSON.parse(userString);
      const userId =
        loggedInUser?.user?.id || loggedInUser?.id || loggedInUser?._id;

      if (!userId) {
        toast.error("User ID not found");
        return;
      }

      const url = SummaryApi.userWishlist.url.replace(":userId", userId);
      const response = await Axios.get(url);

      if (response.data.success) {
        setWishlist(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch wishlist");
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const userString = localStorage.getItem("user");
      const loggedInUser = JSON.parse(userString);
      const userId =
        loggedInUser?.user?.id || loggedInUser?.id || loggedInUser?._id;

      const url = SummaryApi.userRemoveWishlist.url
        .replace(":userId", userId)
        .replace(":itemId", itemId);

      const response = await Axios.delete(url);

      if (response.data.success) {
        setWishlist((prev) => prev.filter((item) => item._id !== itemId));
        toast.success("Item removed from wishlist");
      } else {
        toast.error(response.data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">♡</div>
          <h3 className="text-xl text-gray-600 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Start adding items you love!</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-7 overflow-hidden">
          {wishlist.map((villa) => (
            <div
              key={villa._id}
              className="border p-4 bg-white rounded-md flex flex-col md:flex-row gap-4 shadow-md"
            >
              <div className="w-full h-[200px] md:h-[300px] relative">
                <img
                  src={
                    villa.coverImage ||
                    villa.images?.[0] ||
                    "https://via.placeholder.com/500x300?text=No+Image"
                  }
                  alt={villa.villaTitle || villa.title || "No Title"}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={() => removeFromWishlist(villa._id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full z-10"
                >
                  <FaHeart size={18} className="text-red-600 fill-red-600" />
                </button>
              </div>

              <div className="w-full flex flex-col gap-2">
                <h2 className="text-xl font-semibold">
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

                <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 mt-2">
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

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => navigate(`/VillaDetails/${villa._id}`)}
                    className="py-1 px-4 hover:text-black hover:bg-secondary-500 bg-primary-400 text-sm rounded-full text-white font-semibold"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserWishlist;
