import { Router } from "express";
import { testimonialController } from "../controllers/villaTestimonial.controller.js";

const testimonialRouter = Router();

testimonialRouter.post("/add-testimonial", testimonialController);

export default testimonialRouter;
