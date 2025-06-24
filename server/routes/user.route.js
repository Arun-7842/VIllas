import { Router } from "express";
// import auth from "../middleware/auth.js";
import {
  getWishlistController,
  addToWishlistController,
  getUserProfileController,
  removeFromWishlistController,
  updateUserProfileController,
  userLoginController,
  userRegistrationController,
  userLogoutController,
  forgotPasswordController,
  verifyForgotPasswordOtpController,
  resetPasswordController,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", userRegistrationController);
userRouter.post("/login", userLoginController);
userRouter.get("/logout", userLogoutController);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-otp", verifyForgotPasswordOtpController);
userRouter.put("/reset-password", resetPasswordController);

// User Profile
userRouter.get("/profile/:id", getUserProfileController);
userRouter.put("/profile/update/:id", updateUserProfileController);

// Wishlist
userRouter.post("/wishlist/:userId", addToWishlistController);
userRouter.delete("/wishlist/:userId/:itemId", removeFromWishlistController);
userRouter.get("/wishlist/:userId", getWishlistController);

export default userRouter;
