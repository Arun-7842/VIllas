import adminLoginModel from "../models/Admin.model.js";
import bcrypt from "bcryptjs";
import genereteAccessToken from "../utils/generetAccessToken.js";
import generetRefreshToken from "../utils/generedRefreshToken.js";
import VillaShowCase from "../models/villaShowCase.model.js";
import userModel from "../models/user.model.js";

export const adminRegistrationController = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const existingAdminCount = await adminLoginModel.countDocuments();

    if (existingAdminCount > 0) {
      return res.status(403).json({
        message: "Admin registration is not allowed. Admin already exists.",
        success: false,
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      mobile,
      password: hashedPassword,
    };

    const newAdmin = await adminLoginModel.create(payload);

    return res.status(201).json({
      message: "Admin created successfully",
      success: true,
      error: false,
      data: newAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};
export async function adminLoginCreate(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const admin = await adminLoginModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        messages: "admin not found",
        success: false,
        error: true,
      });
    }
    const checkPassword = await bcrypt.compare(password, admin.password);

    if (!checkPassword) {
      return res.status(400).json({
        messages: "password is incorrect",
        success: false,
        error: true,
      });
    }

    const accessToken = await genereteAccessToken(admin._id);
    const refreshToken = await generetRefreshToken(admin._id);

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
      error: false,
      data: {
        accessToken,
        refreshToken,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          mobile: admin.mobile,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
export async function logoutAdminController(req, res) {
  try {
    const adminid = req.adminId;

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await adminLoginModel.findByIdAndUpdate(
      adminid,
      { refresh_token: null }
    );

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
}
export const getAdminDetalisController = async (req, res) => {
  try {
    const admin = await adminLoginModel.findById(req.adminId);
    return res.status(200).json({
      success: true,
      error: false,
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// export const getAdminDashboardSummaryController = async (req, res) => {
//   try {
//     const totalVillas = await VillaShowCase.countDocuments();
//     const totalUser = await userModel.countDocuments();

//     return res.status(200).json({
//       success: true,
//       error: false,
//       data: {
//         totalVillas,
//         totalUser,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };
export const getAdminDashboardSummaryController = async (req, res) => {
  try {
    // Basic counts
    const totalVillas = await VillaShowCase.countDocuments();
    const totalUsers = await userModel.countDocuments();

    // Additional analytics data
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Monthly data for charts (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const startDate = new Date();
      startDate.setMonth(currentDate.getMonth() - i);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date();
      endDate.setMonth(currentDate.getMonth() - i + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);

      const monthVillas = await VillaShowCase.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
      });

      const monthUsers = await userModel.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
      });

      monthlyData.push({
        month: startDate.toLocaleDateString("en-US", { month: "short" }),
        villas: monthVillas,
        users: monthUsers,
        date: startDate,
      });
    }

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    const recentVillas = await VillaShowCase.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    const recentUsers = await userModel.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Calculate growth rate
    const previousMonthVillas = await VillaShowCase.countDocuments({
      createdAt: {
        $gte: new Date(thirtyDaysAgo.getTime() - 30 * 24 * 60 * 60 * 1000),
        $lt: thirtyDaysAgo,
      },
    }); 

    const growthRate =
      previousMonthVillas > 0
        ? (
            ((recentVillas - previousMonthVillas) / previousMonthVillas) *
            100
          ).toFixed(1)
        : 0;

    // Villa types distribution (optional - if you have villa types)
    const villaTypeDistribution = await VillaShowCase.aggregate([
      {
        $group: {
          _id: "$villaType",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Mock revenue calculation (replace with your actual booking/payment model)
    const totalRevenue = totalVillas * 1500; // Assuming average revenue per villa

    return res.status(200).json({
      success: true,
      error: false,
      data: {
        totalVillas,
        totalUsers,
        recentVillas,
        recentUsers,
        growthRate,
        totalRevenue,
        monthlyData,
        villaTypeDistribution,
        summary: {
          totalVillas,
          totalUsers,
          growthRate: `+${growthRate}%`,
          totalRevenue: `$${totalRevenue.toLocaleString()}`,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard Summary Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
