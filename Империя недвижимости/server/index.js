import express from "express";
import multer from "multer";
import cors from "cors";

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  estateCreateValidation,
} from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import {
  EstateController,
  UserController,
  FavoritesController,
} from "./controllers/index.js";

const PORT = 4444;

const DATABASE_URL =
  "mongodb+srv://saiyrys:t55061700@test.s18a4me.mongodb.net/test?retryWrites=true&w=majority&appName=EmpireEstate";

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error: ", err));

const App = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

App.use(express.json());
App.use(cors());
App.use("/uploads", express.static("uploads"));

App.post(
  "/auth",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
App.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
App.get("/auth/me", checkAuth, UserController.getMe);

App.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

App.get("/estates", EstateController.getAll);
App.get("/estates/filter", EstateController.getFilter);
App.get("/estates/:id", EstateController.getOne);
App.post(
  "/estates",
  checkAuth,
  estateCreateValidation,
  handleValidationErrors,
  EstateController.create
);
App.delete("/estates/:id", checkAuth, EstateController.remove);
App.patch(
  "/estates/:id",
  checkAuth,
  estateCreateValidation,
  handleValidationErrors,
  EstateController.update
);

App.get("/favoritesEstates", FavoritesController.getAll);
App.post("/favoritesEstates", checkAuth, FavoritesController.addFavorites);
App.delete("/favoritesEstates/:id", FavoritesController.remove);

App.listen(PORT, (err) => {
  err ? console.log("Error: ", err) : console.log("Server OK");
});
