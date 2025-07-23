import { Router } from "express";
import {
  adminLoginCreate,
  adminRegistrationController,
  approveReview,
  getAdminDashboardSummaryController,
  getAdminDetalisController,
  getPendingReviews,
  logoutAdminController,
  rejectReview,
} from "../controllers/adminLogin.controller.js";
import auth from "../middleware/auth.js";
const adminLoginRouter = Router();

adminLoginRouter.post("/registration", adminRegistrationController);
adminLoginRouter.post("/admin-login", adminLoginCreate);
adminLoginRouter.get("/logout", auth, logoutAdminController);
adminLoginRouter.get("/admnDetails", auth, getAdminDetalisController);
adminLoginRouter.get("/summary", getAdminDashboardSummaryController);
adminLoginRouter.get("/pending-reviews", getPendingReviews);
adminLoginRouter.post("/approve-review/:villaId/:reviewId", approveReview);
adminLoginRouter.delete("/reject/:villaId/:reviewId", rejectReview);

export default adminLoginRouter;
// adminLoginCreate
