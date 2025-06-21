import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    villaTitle: {
      type: String,
      default: "",
      required: true,
    },
    villaType: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    pricePerNight: {
      type: Number,
      default: 0,
    },
    discountOffer: {
      type: Number,
      default: 0,
    },
    numberOfBedrooms: {
      type: Number,
      default: 0,
    },
    numberOfBathrooms: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
      default: 0,
    },
    roomType: {
      type: [String],
      default: [],
    },
    aminities: {
      type: [
        {
          label: { type: String },
          icon: { type: String },
        },
      ],
      default: [],
    },
    availableDate: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      default: "",
    },
    // review: [
    //   {
    //     name:{ type: String, required: true },
    //     email: { type: String, required: true },
    //     rating: { type: Number, min: 1, max: 5, required: true },
    //     message: { type: String },
    //     createdAt: { type: Date, default: Date.now },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const VillaShowCase = mongoose.model("villaShowCase", categorySchema);
export default VillaShowCase;
