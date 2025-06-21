import { Router } from "express";
import {
  bookVillaController,
  checkAvailabilityController,
  getAllBookingsController,
} from "../controllers/bookingVilla.controller.js";

const bookingRouter = Router();

bookingRouter.post("/bookingVilla", bookVillaController);
bookingRouter.post("/villa/:id/availability", checkAvailabilityController);
bookingRouter.get("/all", getAllBookingsController);

export default bookingRouter;
