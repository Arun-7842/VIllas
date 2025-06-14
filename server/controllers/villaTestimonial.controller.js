import testimonialModel from "../models/Testimonial.model.js";

export const testimonialController = async (req, res) => {
  try {
    const { name, imageUrl, message } = req.body;

    const newTestimonial = await testimonialModel.create({
      name,
      imageUrl,
      message,
    });

    const savedTestimonial = await newTestimonial.save();

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
