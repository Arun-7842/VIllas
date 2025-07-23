import React, { useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import toast from "react-hot-toast";

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    quote: "",
    imageUrl: null,
    videoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [mediaType, setMediaType] = useState(null);

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
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: file,
        videoUrl: "", // Clear video URL when image is selected
      }));
      setMediaType("image");
    }
  };
  const handleVideoUrlChange = (e) => {
    const { value } = e.target;
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        videoUrl: value,
        imageUrl: null, // Clear image when video URL is entered
      }));
      setMediaType("video");
    } else {
      setFormData((prev) => ({
        ...prev,
        videoUrl: value,
      }));
      if (!formData.imageUrl) {
        setMediaType(null);
      }
    }
  };
  const handleMediaReset = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: null,
      videoUrl: "",
    }));
    setMediaType(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that either image or video is provided
    if (!formData.imageUrl && !formData.videoUrl.trim()) {
      toast.error("Please provide either an image or video URL.");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("designation", formData.designation);
      form.append("quote", formData.quote);

      if (formData.imageUrl) {
        form.append("imageUrl", formData.imageUrl);
      }
      if (formData.videoUrl) {
        form.append("videoUrl", formData.videoUrl);
      }

      const response = await Axios({
        ...SummaryApi.testimonial,
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          designation: "",
          quote: "",
          imageUrl: null,
          videoUrl: "",
        });
        setMediaType(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        toast.error("Failed to add testimonial.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Testimonial</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Designation</label>
          <input
            type="text"
            name="designation"
            className="w-full border p-2 rounded"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Quote</label>
          <textarea
            name="quote"
            className="w-full border p-2 rounded mt-1 resize-none h-32 overflow-hidden"
            value={formData.quote}
            onChange={handleChange}
            required
            maxLength={150}
          ></textarea>
          <div className="flex justify-end">
            <span className="text-xs text-gray-500">
              {formData.quote.length}/150
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Media (Choose Image OR Video)
            </label>
            {mediaType && (
              <button
                type="button"
                onClick={handleMediaReset}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Reset Selection
              </button>
            )}
          </div>
          {(!mediaType || mediaType === "image") && (
            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                name="imageUrl"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border p-2 rounded"
                disabled={mediaType === "video"}
              />
            </div>
          )}
          {/* <input
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={handleImageChange}
            required
          /> */}
          {(!mediaType || mediaType === "video") && (
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Video URL
              </label>
              <input
                type="url"
                name="videoUrl"
                className="w-full border p-2 rounded"
                value={formData.videoUrl}
                onChange={handleVideoUrlChange}
                placeholder="YouTube or Vimeo video link"
                disabled={mediaType === "image"}
              />
            </div>
          )}
          {mediaType && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
              <span className="text-green-600">
                ✓{" "}
                {mediaType === "image"
                  ? "Image selected"
                  : "Video URL provided"}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddTestimonial;

// import React, { useState } from "react";
// import Axios from "../../utils/Axios";
// import SummaryApi from "../../common/SummaryApi";
// import toast from "react-hot-toast";

// const AddTestimonial = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     designation: "",
//     quote: "",
//     imageUrl: null,
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "quote" && value.length > 150) {
//       toast.error("Quote cannot exceed 200 characters.");
//       return;
//     }
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       imageUrl: e.target.files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const form = new FormData();
//       form.append("name", formData.name);
//       form.append("designation", formData.designation);
//       form.append("quote", formData.quote);
//       form.append("imageUrl", formData.imageUrl); // 👈 Key for multer

//       const response = await Axios({
//         ...SummaryApi.testimonial,
//         data: form,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setFormData({
//           name: "",
//           designation: "",
//           quote: "",
//           imageUrl: null,
//         });
//       } else {
//         toast.error("Failed to add testimonial.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Add Testimonial</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             className="w-full border p-2 rounded"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Designation</label>
//           <input
//             type="text"
//             name="designation"
//             className="w-full border p-2 rounded"
//             value={formData.designation}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Quote</label>
//           <textarea
//             name="quote"
//             className="w-full border p-2 rounded mt-1 resize-none h-32 overflow-hidden"
//             value={formData.quote}
//             onChange={handleChange}
//             required
//             maxLength={150}
//           ></textarea>
//           <div className="flex justify-end">
//             <span className="text-xs text-gray-500">
//               {formData.quote.length}/150
//             </span>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Image</label>
//           <input
//             type="file"
//             name="imageUrl"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//           />
//           <input
//             type="text"
//             name="videoUrl"
//             className="w-full border p-2 rounded mt-2"
//             value={formData.videoUrl}
//             onChange={handleChange}
//             placeholder="YouTube or Vimeo video link"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
//           disabled={loading}
//         >
//           {loading ? "Uploading..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTestimonial;
