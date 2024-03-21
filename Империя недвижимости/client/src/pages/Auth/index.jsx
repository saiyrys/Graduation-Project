import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import background from "../../assets/background.png";
import { Button } from "../../components";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import style from "./Auth.module.scss";

const Auth = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      alert("Неверный логин или пароль!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) return <Navigate to='/' />;

  return (
    <div className={style["content"]}>
      <img className={style["img"]} src={background} alt='image' />
      <div className={style["auth-window"]}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style["text-field_box"]}>
            <div className={style["text-field"]}>
              <input
                className={style["text-field__input"]}
                type='email'
                id='email'
                placeholder='1'
                autoComplete='email'
                {...register("email", {
                  required: "Почта - обязательное поле!",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i,
                    message: "Пожалуйста введите правильную почту!",
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
                {...register("password", {
                  required: "Пароль - обязательное поле!",
                })}
                className={style["text-field__input"]}
                type={isVisible ? "text" : "password"}
                id='password'
                placeholder='1'
                autoComplete='off'
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
          <div className={style["bottom"]}>
            <Button
              label={"Войти"}
              disabled={!isValid}
              style={{ width: "125px", height: "37px" }}
            />
            <Link className={style["register"]} to='/register'>
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
