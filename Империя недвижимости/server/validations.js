import { body } from "express-validator";

export const registerValidation = [
  body("email", "Укажите правильный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум из 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Ваша фамилия и имя должны быть больше 3 символов").isLength(
    { min: 3 }
  ),
];

export const loginValidation = [
  body("email", "Укажите правильный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум из 5 символов").isLength({
    min: 5,
  }),
];

export const estateCreateValidation = [
  body("price", "Укажите стоимость").isString(),
  body("square", "Укажите площадь").isString(),
  body("address", "Укажите адрес").isLength({ min: 5 }).isString(),
  body("countRoom", "Укажите количество комнат").isString(),
  body("floor", "Укажите количетво этажей или на котором этаже").isString(),
  body("description", "Укажите описание").isLength({ min: 20 }).isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
