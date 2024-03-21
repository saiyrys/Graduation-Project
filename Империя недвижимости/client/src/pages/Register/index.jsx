import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Button from "../../components/Button";

import { selectIsAuth } from "../../redux/slices/auth";
import { fetchRegister } from "../../redux/slices/auth";

import background from "../../assets/background.png";

import style from "./Register.module.scss";

const Register = () => {
  const [roll, setRoll] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  const options = [
    {
      value: "owner",
      label: "Собственик",
    },
    {
      value: "agent",
      label: "Агент",
    },
  ];

  const getValue = (value) =>
    value ? options.find((option) => option.value === value) : "Собственик";

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      roll: "owner",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      alert("Не удалось зарегестрироваться!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className={style["content"]}>
      <img className={style["img"]} src={background} alt='image' />
      <div className={style["register-window"]}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style["text-field_box"]}>
            <div className={style["text-field"]}>
              <input
                className={style["text-field__input"]}
                type='text'
                id='fullName'
                placeholder='1'
                autoComplete='family-name'
                {...register("fullName", {
                  required: "User name is require field!",
                  minLength: 3,
                })}
              />
              {errors?.fullName && (
                <div
                  style={{ color: "red", marginTop: "10px", fontSize: "14px" }}
                >
                  {errors.fullName.message}
                </div>
              )}
              <label htmlFor='fullName' className={style["text-field__label"]}>
                Имя пользователя
              </label>
            </div>
            <div className={style["text-field"]}>
              <input
                className={style["text-field__input"]}
                type='email'
                id='email'
                placeholder='1'
                autoComplete='email'
                {...register("email", {
                  required: "Email is require field!",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i,
                    message: "Please enter valid email!",
                  },
                })}
              />
              {errors?.email && (
                <div
                  style={{ color: "red", marginTop: "10px", fontSize: "14px" }}
                >
                  {errors.email.message}
                </div>
              )}
              <label htmlFor='email' className={style["text-field__label"]}>
                Почта
              </label>
            </div>
            <div className={style["text-field"]}>
              <input
                className={style["text-field__input"]}
                type={isVisible ? "text" : "password"}
                id='password'
                placeholder='1'
                {...register("password", {
                  required: "Password is require field!",
                  minLength: 5,
                })}
              />
              {errors?.password && (
                <div
                  style={{ color: "red", marginTop: "10px", fontSize: "14px" }}
                >
                  {errors.password.message}
                </div>
              )}
              <label htmlFor='password' className={style["text-field__label"]}>
                Пароль
              </label>
              {isVisible ? (
                <MdOutlineVisibilityOff
                  className={style["visibility-icon"]}
                  onClick={() => setIsVisible(!isVisible)}
                />
              ) : (
                <MdOutlineVisibility
                  className={style["visibility-icon"]}
                  onClick={() => setIsVisible(!isVisible)}
                />
              )}
            </div>
          </div>
          <div className={style["user-type"]}>
            <p>Кто вы?</p>
            <Controller
              control={control}
              name='roll'
              render={({ field: { onChange, value } }) => (
                <ul className={style["list"]}>
                  {options.map((obj, index) => {
                    return (
                      <li
                        key={obj.value}
                        onClick={() => {
                          setRoll(index);
                          onChange(obj.value);
                        }}
                        className={roll === index ? style["active"] : ""}
                        value={getValue(value)}
                      >
                        {obj.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            />
          </div>
          <div className={style["bottom"]}>
            <Button
              label={"Зарегестрироваться"}
              disabled={!isValid}
              style={{ height: "37px" }}
            />
            <Link className={style["auth"]} to='/auth'>
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
