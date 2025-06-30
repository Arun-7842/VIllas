import express from "express";
// import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
// import userRoutes from "./routes/userRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import villaShowCaseRouter from "./routes/villaShowCase.route.js";
import connectDB from "./config/connectDB.js";
import adminLoginRouter from "./routes/adminLogin.route.js";
import bookingRouter from "./routes/booking.routes.js";
import testimonialRouter from "./routes/villaTestimonial.route.js";
import userRouter from "./routes/user.route.js";
import uploadRouter from "./routes/upload.route.js";

const app = express();
// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL,
//   })
// );
const corsOptions = {
  origin: ["https://lonavalastayvilla.in", "https://www.lonavalastayvilla.in"],

  // origin: process.env.FRONTEND_URL,

  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.json({
    message: "Hello from server" + PORT,
  });
});

app.use("/api/villaShowCase", villaShowCaseRouter);
app.use("/api/book", bookingRouter);
app.use("/api/admin", adminLoginRouter);
app.use("/api/user", userRouter);
app.use("/api/file", uploadRouter);
app.use("/api/tesimonial", testimonialRouter);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
app.use(express.urlencoded({ extended: true }));
