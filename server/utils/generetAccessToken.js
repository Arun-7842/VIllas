import jwt from "jsonwebtoken";

const genereteAccessToken = async (adminId) => {
  const token = await jwt.sign(
    { id: adminId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: "5h" }
  );

  return token;
};

export default genereteAccessToken;
