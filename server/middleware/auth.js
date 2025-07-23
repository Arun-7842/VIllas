import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.acceessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized",
        error: true,
        success: false,
      });
    }

    req.user = {
      _id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export default auth;
