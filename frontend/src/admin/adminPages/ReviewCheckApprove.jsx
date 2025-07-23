import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";

const ReviewCheckApprove = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingReviews = async () => {
    try {
      setLoading(true);
      const res = await Axios({ ...SummaryApi.pendingReviews });
      setReviews(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (villaId, reviewId) => {
    try {
      await axios.post(`/api/admin/approve-review/${villaId}/${reviewId}`);
      toast.success("Review approved");
      // Remove from list
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (error) {
      toast.error("Failed to approve");
    }
  };

  const handleReject = async (villaId, reviewId) => {
    try {
      await axios.delete(`/api/admin/reject/${villaId}/${reviewId}`);
      toast.success("Review rejected ");
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (error) {
      toast.error("Failed to reject");
    }
  };

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Villa Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No pending reviews.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-lg shadow-sm bg-white mb-4"
            >
              <h3 className="font-semibold text-lg mb-1">
                Villa Name: {review.villaTitle}
              </h3>

              {/* ⭐ Star Rating */}
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${
                      star <= review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mb-4">{review.message}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(review.villaId, review._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 w-full"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(review.villaId, review._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 w-full"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCheckApprove;
