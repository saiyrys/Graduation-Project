import FavoritesModel from "../models/Favorites.js";

export const getAll = async (req, res) => {
  try {
    const favoritesEstate = await FavoritesModel.find();

    res.json(favoritesEstate);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить избранное",
    });
  }
};

export const addFavorites = async (req, res) => {
  try {
    const doc = new FavoritesModel({
      price: req.body.price,
      square: req.body.square,
      address: req.body.address,
      countRoom: req.body.countRoom,
      floor: req.body.floor,
      description: req.body.description,
      currency: req.body.currency,
      type: req.body.type,
      status: req.body.status,
      imageUrl: req.body.imageUrl,
      estateId: req.body.id,
      userId: req.userId,
    });

    const estate = await doc.save();

    res.json(estate);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось добавить в избранное",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const estateId = req.params.id;

    FavoritesModel.findOneAndDelete({
      estateId: estateId,
    }).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить объявление",
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: "Объявление не найдено",
        });
      }

      res.json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить объявление",
    });
  }
};
