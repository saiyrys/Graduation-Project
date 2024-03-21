import mongoose from "mongoose";

const EstateModel = new mongoose.Schema(
  {
    price: {
      type: String,
      required: true,
    },
    square: {
      type: String,
      required: true,
      unique: false,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    countRoom: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Estates", EstateModel);
