import jwt from "jsonwebtoken";
import adminLoginModel from "../models/Admin.model.js";

const generetRefreshToken = async (adminId) => {
  const token = jwt.sign(
    { id: adminId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );

  await adminLoginModel.updateOne({ _id: adminId }, { refresh_token: token });

  return token;
};
export default generetRefreshToken;
