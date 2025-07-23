import React, { useEffect, useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import EditTestimonialForm from "./EditTestimonialForm";

const ShowTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const response = await Axios(SummaryApi.getTestimonials);
      if (response.data.success) {
        setTestimonials(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const response = await Axios({
          ...SummaryApi.deleteTestimonial,
          url: `/api/tesimonial/delete-testimonial/${id}`,
        });
        if (response.data.success) {
          fetchTestimonials();
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleEdit = (testimonial) => {
    setEditData(testimonial);
  };

  const handleEditSuccess = () => {
    setEditData(null);
    fetchTestimonials();
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);
  const getEmbedUrl = (url) => {
    const match = url.match(/\/d\/([^/]+)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  };
  if (loading)
    return <p className="text-center mt-10">Loading testimonials...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Client Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow p-4 relative"
          >
            {item.imageUrl ? (
              <img
                src={item?.imageUrl}
                alt={item.name}
                className="w-full h-40 rounded-sm object-scale-down object-top mx-auto mb-4"
              />
            ) : item.videoUrl ? (
              <iframe
                className="w-full h-40"
                src={getEmbedUrl(item?.videoUrl)}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Testimonial Video"
              />
            ) : null}
            <h3 className="text-lg font-semibold text-center">{item.name}</h3>
            <p className="text-sm text-center text-gray-500">
              {item.designation}
            </p>
            <blockquote className="mt-4 text-gray-700 italic text-center">
              “{item.quote}”
            </blockquote>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-400 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 px-3 py-1 rounded text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editData && (
        <EditTestimonialForm
          initialData={editData}
          onClose={() => setEditData(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default ShowTestimonials;
