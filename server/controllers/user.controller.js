import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";
import genereteAccessToken from "../utils/generetAccessToken.js";
import generetRefreshToken from "../utils/generedRefreshToken.js";
import generatedOtp from "../utils/generaredOtp.js";
import sendEmail from "../config/sendEmail.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import adminLoginModel from "../models/Admin.model.js";
export const userRegistrationController = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password, confirmPassword } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match",
        success: false,
        error: true,
      });
    }
    const existingUser = await userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const payload = {
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(payload);
    const savedUser = await newUser.save();

    return res.status(200).json({
      message: "User registered successfully",
      success: true,
      error: false,
      data: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user =
      (await userModel.findOne({ email })) ||
      (await adminLoginModel.findOne({ email }));
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    console.log("thisis user chek9ing", user);
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const accessToken = await genereteAccessToken(user._id);
    const refreshToken = await generetRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("acceessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
    });
  }
};
export const userLogoutController = async (req, res) => {
  try {
    const userid = req.userId;
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("acceessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);
    const removeRefreshToken = await userModel.findByIdAndUpdate(userid, {
      refresh_token: null,
    });
    return res.status(200).json({
      message: "Logout successful",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const otp = generatedOtp();
    console.log("this is then otp", otp);

    const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour in milliseconds
    await userModel.findByIdAndUpdate(user._id, {
      forget_password_otp: otp,
      forget_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "forgot password",
      html: forgotPasswordTemplate({
        name: user.firstName,
        otp: otp,
      }),
    });

    return res.json({
      message: "OTP sent to your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function verifyForgotPasswordOtpController(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required field email, otp",
        error: true,
        success: false,
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (
      user.forget_password_expiry &&
      new Date(user.forget_password_expiry) < currentTime
    ) {
      return res.status(400).json({
        message: "OTP expired",
        error: true,
        success: false,
      });
    }
    console.log("Stored OTP:", user.forget_password_otp);
    console.log("Entered OTP:", otp);

    if (
      String(otp).trim().toLowerCase() !==
      String(user.forget_password_otp).trim().toLowerCase()
    ) {
      return res.status(400).json({
        message: "Invalid otp",
        error: true,
        success: false,
      });
    }
    await userModel.findByIdAndUpdate(user?._id, {
      forget_password_otp: "",
      forget_password_expiry: "",
    });
    return res.json({
      message: "OTP verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User found",
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
export const updateUserProfileController = async (req, res) => {
  try {
    const updatedUser = await userModel
      .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .select("-password");

    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
export const addToWishlistController = async (req, res) => {
  const { userId } = req.params;
  const { itemId } = req.body; // Villa or Product ID

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (!user.wishlist.includes(itemId)) {
      user.wishlist.push(itemId);
      await user.save();
    }

    return res.status(200).json({
      message: "Item added to wishlist",
      success: true,
      data: user.wishlist,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
export const removeFromWishlistController = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== itemId);
    await user.save();

    return res.status(200).json({
      message: "Item removed from wishlist",
      success: true,
      data: user.wishlist,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
export const getWishlistController = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.userId)
      .populate("wishlist");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Wishlist fetched",
      success: true,
      data: user.wishlist,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
