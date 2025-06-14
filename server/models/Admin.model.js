import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Provide name"],
    },
    email: {
      type: String,
      require: [true, "Provide email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Provide password"],
    },
    mobile: {
      type: Number,
      default: "",
    },
    refresh_token: {
      type: String,
      default: "",
    },
    last_login_date: {
      type: Date,
      default: "",
    },
   
    role: {
      type: String,
      enum: ["Admin", " "],
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

const adminLoginModel = mongoose.model("adminLogin", adminSchema);

export default adminLoginModel;
