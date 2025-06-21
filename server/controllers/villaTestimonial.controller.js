import testimonialModel from "../models/Testimonial.model.js";
import uploadVillaImageCloadinary from "../utils/uploadVillaImg.js";

export const testimonialController = async (req, res) => {
  try {
    const { name, designation, quote } = req.body;

    if (!name || !designation || !quote) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    let imageUrl = "";
    if (req.file) {
      const uploadedImage = await uploadVillaImageCloadinary(req.file);
      imageUrl = uploadedImage.secure_url || "";
    }

    const savedTestimonial = await testimonialModel.create({
      name,
      designation,
      quote,
      imageUrl,
    });

    return res.status(200).json({
      message: "Testimonial added successfully",
      success: true,
      error: false,
      data: savedTestimonial,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Testimonials fetched successfully",
      success: true,
      error: false,
      data: testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    // Use req.body (fields from form-data)
    const { name, designation, quote } = req.body;

    let imageUrl = req.body.imageUrl;
    if (req.file) {
      const uploaded = await uploadVillaImageCloadinary(req.file);
      imageUrl = uploaded.secure_url;
    }

    const updatedTestimonial = await testimonialModel.findByIdAndUpdate(
      id,
      { name, designation, quote, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({
        message: "Testimonial not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Testimonial updated successfully",
      success: true,
      error: false,
      data: updatedTestimonial,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await testimonialModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Testimonial not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Testimonial deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
