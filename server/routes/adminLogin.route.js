import { Router } from "express";
import {
  adminLoginCreate,
  adminRegistrationController,
  getAdminDashboardSummaryController,
  getAdminDetalisController,
  logoutAdminController,
} from "../controllers/adminLogin.controller.js";
import auth from "../middleware/auth.js";
const adminLoginRouter = Router();

adminLoginRouter.post("/registration", adminRegistrationController);
adminLoginRouter.post("/admin-login", adminLoginCreate);
adminLoginRouter.get("/logout", auth, logoutAdminController);
adminLoginRouter.get("/admnDetails", auth, getAdminDetalisController);
adminLoginRouter.get("/summary", getAdminDashboardSummaryController);

export default adminLoginRouter;
// adminLoginCreate
