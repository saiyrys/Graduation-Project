import EstateModel from "../models/Estate.js";

export const getAll = async (req, res) => {
  try {
    const estates = await EstateModel.find().populate({
      path: "user",
      select: ["fullName", "email"],
    });

    res.json(estates);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить объявления",
    });
  }
};

export const getFilter = async (req, res) => {
  try {
    const { sort, search, ...filter } = req.query;

    const estates = await EstateModel.find().populate({
      path: "user",
      select: ["fullName", "email"],
    });

    let sortEstate = estates.filter((obj) => obj.type === sort);

    sortEstate = sortEstate.filter((obj) =>
      obj.address.toLowerCase().includes(search ? search.toLowerCase() : "")
    );

    sortEstate = sortEstate.filter((obj) =>
      filter.priceFrom || filter.priceTo
        ? Number(obj.price) >= Number(filter.priceFrom) &&
          Number(obj.price) <= Number(filter.priceTo)
        : true
    );

    sortEstate = sortEstate.filter((obj) =>
      filter.squareFrom || filter.squareTo
        ? Number(obj.square) >= Number(filter.squareFrom) &&
          Number(obj.square) <= Number(filter.squareTo)
        : true
    );

    sortEstate = sortEstate.filter((obj) =>
      filter.floorFrom || filter.floorTo
        ? Number(obj.floor) >= Number(filter.floorFrom) &&
          Number(obj.floor) <= Number(filter.floorTo)
        : true
    );

    sortEstate = sortEstate.filter((obj) =>
      filter.countRoom
        ? Number(filter.countRoom) === 5
          ? Number(obj.countRoom) >= 5
          : Number(obj.countRoom) === Number(filter.countRoom)
        : true
    );

    sortEstate = sortEstate.filter((obj) =>
      filter.currency ? obj.currency === filter.currency : true
    );

    sortEstate = sortEstate.filter((obj) =>
      filter.status ? obj.status === filter.status : true
    );

    res.json(sortEstate);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить объявления",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new EstateModel({
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
      user: req.userId,
    });

    const estate = await doc.save();

    res.json(estate);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать объявление",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const estateId = req.params.id;

    EstateModel.findOneAndUpdate(
      {
        _id: estateId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    )
      .populate({
        path: "user",
        select: ["fullName", "email"],
      })
      .then((doc, err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось вернуть объявление",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Объявление не найдено",
          });
        }

        res.json(doc);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить объявление",
    });
  }
};

export const update = async (req, res) => {
  try {
    const estateId = req.params.id;

    await EstateModel.updateOne(
      {
        _id: estateId,
      },
      {
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
        user: req.userId,
      }
    ).then(
      res.json({
        success: true,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить объявление",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const estateId = req.params.id;

    EstateModel.findOneAndDelete({
      _id: estateId,
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
