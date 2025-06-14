import { Router } from "express";
import {
  bookVillaController,
  checkAvailabilityController,
} from "../controllers/bookingVilla.controller.js";

const bookingRouter = Router();

bookingRouter.post("/bookingVilla", bookVillaController);
bookingRouter.post("/villa/:id/availability", checkAvailabilityController);

export default bookingRouter;
