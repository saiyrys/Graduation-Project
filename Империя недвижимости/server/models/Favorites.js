import mongoose from "mongoose";

const FavoritesModel = new mongoose.Schema(
  {
    price: {
      type: String,
    },
    square: {
      type: String,
      unique: false,
    },
    address: {
      type: String,
      unique: true,
    },
    countRoom: {
      type: String,
    },
    floor: {
      type: String,
    },
    description: {
      type: String,
    },
    currency: {
      type: String,
    },
    type: {
      type: String,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
    },
    estateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estate",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Favorites", FavoritesModel);
