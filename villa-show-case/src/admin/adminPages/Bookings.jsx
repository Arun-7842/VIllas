import React, { useEffect, useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchBookings = async (page = 1) => {
    try {
      const response = await Axios.get(
        `${SummaryApi.getAllBookings.url}?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      if (response.data.success) {
        setBookings(response.data.data);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePageChange = (page) => {
    setLoading(true);
    fetchBookings(page);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">All Villa Bookings</h2>
        <div className="h-[70vh] border bg-white">
          <table className=" w-full border rounded-lg">
            <thead>
              <tr className="bg-primary-400 text-white text-start">
                <th className="py-2 px-4 text-start">Name</th>
                <th className="py-2 px-4 text-start">Email</th>
                <th className="py-2 px-4 text-start">Mobile</th>
                <th className="py-2 px-4 text-start">Villa</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t text-start">
                  <td
                    className="py-2 px-4 cursor-pointer text-blue-600 underline"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    {booking.name}
                  </td>
                  <td className="py-2 px-4">{booking.email}</td>
                  <td className="py-2 px-4">{booking.mobile}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/dashboard/VillaDetails/${booking.villaSelected?._id}`}
                      className="underline"
                    >
                      {booking.villaSelected?.villaTitle}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? "bg-primary-400 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Popup for details */}
      {selectedBooking && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 relative">
            <button
              className="absolute top-2 right-2 text-red-600 text-xl"
              onClick={() => setSelectedBooking(null)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Booking Details</h3>
            <p>
              <strong>City:</strong> {selectedBooking.cities}
            </p>
            <p>
              <strong>Persons:</strong> {selectedBooking.person}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(selectedBooking.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {new Date(selectedBooking.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Bookings;
