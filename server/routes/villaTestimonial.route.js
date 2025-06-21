import { Router } from "express";
import {
  deleteTestimonial,
  getTestimonials,
  testimonialController,
  updateTestimonial,
} from "../controllers/villaTestimonial.controller.js";
import upload from "../middleware/multer.js";

const testimonialRouter = Router();

testimonialRouter.post(
  "/add-testimonial",
  upload.single("imageUrl"),
  testimonialController
);
testimonialRouter.get("/get-testimonials", getTestimonials);
testimonialRouter.put(
  "/update-testimonial/:id",
  upload.single("imageUrl"),
  updateTestimonial
);
testimonialRouter.delete("/delete-testimonial/:id", deleteTestimonial);

export default testimonialRouter;
