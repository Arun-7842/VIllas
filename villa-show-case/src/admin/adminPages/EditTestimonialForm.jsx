import React, { useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";

const EditTestimonialForm = ({ initialData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: initialData.name,
    designation: initialData.designation,
    quote: initialData.quote,
    imageUrl: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quote" && value.length > 150) {
      toast.error("Quote cannot exceed 200 characters.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("designation", formData.designation);
    data.append("quote", formData.quote);
    if (formData.imageUrl) {
      data.append("imageUrl", formData.imageUrl);
    }

    try {
      await Axios({
        ...SummaryApi.updateTestimonial,
        url: SummaryApi.updateTestimonial.url.replace(":id", initialData._id),
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onSuccess();
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Testimonial</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="designation"
            value={formData.designation}
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <textarea
            name="quote"
            value={formData.quote}
            className="w-full border p-2 rounded resize-none"
            onChange={handleChange}
            required
            maxLength={150}
          ></textarea>
          <div className="flex justify-end">
            <span className="text-xs text-gray-500">
              {formData.quote.length}/150
            </span>
          </div>
          <input type="file" name="imageUrl" onChange={handleImageChange} />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTestimonialForm;
