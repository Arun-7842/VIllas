// UserProfile.jsx - Enhanced version
import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user data from localStorage
      const userString = localStorage.getItem("user");

      if (!userString) {
        setError("User not logged in");
        toast.error("Please login to view profile");
        return;
      }

      const loggedInUser = JSON.parse(userString);

      // Handle different possible structures of stored user data
      let userId;
      if (loggedInUser?.user?.id) {
        userId = loggedInUser.user.id;
      } else if (loggedInUser?.id) {
        userId = loggedInUser.id;
      } else if (loggedInUser?._id) {
        userId = loggedInUser._id;
      }

      if (!userId) {
        setError("User ID not found");
        toast.error("Invalid user data");
        return;
      }


      // Fetch user profile from API
      const url = SummaryApi.userDetails.url.replace(":id", userId);

      const response = await Axios.get(url);

      if (response.data.success) {
        setUser(response.data.data);
        setEditForm(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch user data");
        toast.error(response.data.message || "User not found");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load user profile");
      toast.error("Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateProfile = async () => {
    try {
      const userId = user._id;
      const url = SummaryApi.userUpdate.url.replace(":id", userId);

      const response = await Axios.put(url, editForm);

      if (response.data.success) {
        setUser(response.data.data);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <div className="text-red-600 text-center">
          <h3 className="font-semibold text-lg mb-2">Error</h3>
          <p>{error}</p>
          <button
            onClick={fetchUserProfile}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <div className="text-gray-600 text-center">
          <h3 className="font-semibold text-lg mb-2">No User Data</h3>
          <p>Unable to load user information</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      <div className="space-y-4">
        {!isEditing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First Name
                </label>
                <p className="text-lg text-gray-800">{user.firstName}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Name
                </label>
                <p className="text-lg text-gray-800">{user.lastName}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <p className="text-lg text-gray-800">{user.email}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <p className="text-lg text-gray-800">{user.phone}</p>
              </div>
            </div>

          </>
        ) : (
          // Edit Mode
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={editForm.firstName || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={editForm.lastName || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={editForm.gender || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={editForm.dob ? editForm.dob.split("T")[0] : ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div> */}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={editForm.address || ""}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div> */}

            <div className="flex gap-4">
              <button
                onClick={handleUpdateProfile}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
