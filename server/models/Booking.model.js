import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  villaSelected: {
    type: String,
    required: true,
  },
  cities: {
    type: String,
    required: true,
  },
  // roomType: {
  //   type: String,
  //   required: true,
  // },
  person: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const bookingModel = mongoose.model("booking", bookingSchema);

export default bookingModel;
