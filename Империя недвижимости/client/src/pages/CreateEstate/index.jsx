import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import style from "./CreateEstate.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { selectIsAuth } from "../../redux/slices/auth";
import {
  fetchCreateEstate,
  fetchUpdateEstate,
} from "../../redux/slices/estates";
import axios from "../../axios";

import {
  Address,
  CountRoom,
  Description,
  DropContainer,
  Floor,
  Popup,
  Square,
  Status,
  TypeEstate,
} from "./components";

const CreateEstate = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [isVisiblePopup, setIsVisiblePopup] = React.useState(false);
  const [currency, setCurrency] = React.useState(0);
  const [values, setValues] = React.useState(undefined);

  const currencyOptions = ["RUB", "EUR", "USD"];

  React.useEffect(() => {
    window.scrollTo(0, 0);

    setValues({
      type: "house",
      price: "",
      square: "",
      address: "",
      countRoom: "",
      floor: "",
      description: "",
      currency: "RUB",
      status: "Продажа",
      imageUrl: "",
    });

    if (id) {
      axios
        .get(`/estates/${id}`)
        .then(({ data }) => {
          const value = {
            type: data.type,
            price: data.price,
            square: data.square,
            address: data.address,
            countRoom: data.countRoom,
            floor: data.floor,
            description: data.description,
            currency: data.currency,
            status: data.status,
            imageUrl: data.imageUrl,
          };
          setValues(value);
        })
        .catch((error) => {
          console.warn(error);
          alert("Ошибка при получении объявления!");
        });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      type: "house",
      price: "",
      square: "",
      address: "",
      countRoom: "",
      floor: "",
      description: "",
      currency: "RUB",
      status: "Продажа",
      imageUrl: "",
    },
    values,
  });

  const onSubmit = async (values) => {
    const data = isEditing
      ? await dispatch(fetchUpdateEstate({ id, values }))
      : await dispatch(fetchCreateEstate(values));

    const _id = isEditing ? id : data?.payload?._id;

    if (!data.payload) {
      alert("Не удалось отправить форму!");
    }
    if (data.payload) {
      navigate(`/estates/${_id}`);
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className={style["content"]}>
      <h3>Создание обявления</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='type'
          render={({ field: { onChange } }) => (
            <TypeEstate onChange={onChange} type={values?.type} />
          )}
        />
        <Address register={register} errors={errors} />
        <div className={style["price"]}>
          <p className={style["title"]}>Цена</p>
          <div>
            <div className={style["input-box"]}>
              <input
                type='text'
                className={style["price-input"]}
                {...register("price", {
                  required: "Price is require field!",
                })}
              />
              <div
                className={style["currency"]}
                onClick={() => setIsVisiblePopup(!isVisiblePopup)}
              >
                <p>{values ? values?.currency : currencyOptions[currency]}</p>
                {isVisiblePopup ? (
                  <IoIosArrowUp className={style["arrow"]} />
                ) : (
                  <IoIosArrowDown className={style["arrow"]} />
                )}
              </div>
              {isVisiblePopup && (
                <Controller
                  control={control}
                  name='currency'
                  render={({ field: { onChange } }) => (
                    <Popup
                      onChange={onChange}
                      setCurrency={setCurrency}
                      currencyOptions={currencyOptions}
                      isVisiblePopup={isVisiblePopup}
                      setIsVisiblePopup={setIsVisiblePopup}
                    />
                  )}
                />
              )}
            </div>
            {errors?.price && (
              <div
                style={{ color: "red", marginTop: "10px", fontSize: "14px" }}
              >
                {errors.price.message}
              </div>
            )}
          </div>
        </div>
        <Square register={register} errors={errors} />
        <CountRoom register={register} errors={errors} />
        <Floor register={register} errors={errors} />
        <Controller
          control={control}
          name='status'
          render={({ field: { onChange } }) => (
            <Status onChange={onChange} status={values?.status} />
          )}
        />
        <Controller
          control={control}
          name='imageUrl'
          render={({ field: { onChange } }) => {
            return <DropContainer onChange={onChange} url={values?.imageUrl} />;
          }}
        />
        <Description register={register} errors={errors} />
        <button type='submit' className={style["publish"]}>
          {isEditing ? "Сохранить" : "Опубликовать"}
        </button>
      </form>
    </div>
  );
};

export default CreateEstate;
