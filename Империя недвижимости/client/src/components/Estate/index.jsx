import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveEstate } from "../../redux/slices/estates";

import { CgTrash } from "react-icons/cg";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";

import Skeleton from "./Skeleton";

import style from "./Estate.module.scss";
import {
  fetchAddFavoriteEstate,
  fetchRemoveFavoriteEstate,
} from "../../redux/slices/favorites";
import { selectIsAuth } from "../../redux/slices/auth";

const Estate = ({
  id,
  imageUrl,
  price,
  countRoom,
  floor,
  address,
  status,
  userId,
  estateId,
  currency,
  isLike,
  square,
  type,
  isLoading,
  isEditable,
  description,
  setUpdate,
}) => {
  const dispatch = useDispatch();

  const [like, setLike] = React.useState(isLike);

  const isAuth = useSelector(selectIsAuth);

  const estate = {
    id,
    imageUrl,
    price,
    countRoom,
    floor,
    address,
    status,
    estateId,
    userId,
    currency,
    square,
    type,
    description,
  };

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить это объявление?")) {
      dispatch(fetchRemoveEstate(id));
    }
  };

  const onClickFavorites = () => {
    if (!window.localStorage.getItem("token") && !isAuth) {
      alert("Для добавления в избронное нужно авторизоваться");
      return;
    }

    like
      ? dispatch(fetchRemoveFavoriteEstate(estateId !== undefined && estateId))
      : dispatch(fetchAddFavoriteEstate(estate));
    if (setUpdate) setUpdate(true);
    setLike(!like);
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className={style["card"]}>
      <img
        src={`http://localhost:4444${imageUrl}`}
        alt='фотография'
        className={style["photo"]}
      />
      <div className={style["title"]}>
        <div className={style["price"]}>
          <span>{price}</span> <span className='currency'>{currency}</span>
        </div>
        <div className={style["status"]}>{status}</div>
      </div>
      <div className='info'>
        <p>
          <span className={style["count-bedroom"]}>{countRoom}</span> комнатная
          квартира
        </p>
        <p>
          Площадь <span className={style["square"]}>{square}</span> м
          <sup>2</sup>
        </p>
        <p>
          <span className={style["floor"]}>{floor}</span> этаж
        </p>
        <span className={style["address"]}>{address}</span>
      </div>

      <Link to={`/estates/${id}`} className={style["view-estate"]}>
        Просмотр
      </Link>

      {isEditable ? (
        <div className={style["edit-block"]}>
          <Link className={style["edit"]} to={`/estates/${id}/edit`}>
            <MdOutlineModeEditOutline />
          </Link>
          <CgTrash className={style["trash"]} onClick={onClickRemove} />
        </div>
      ) : like ? (
        <FaHeart className={style["favorites"]} onClick={onClickFavorites} />
      ) : (
        <FaRegHeart
          className={style["favorites"]}
          onClick={onClickFavorites}
          style={{ color: "rgba(var(--text), 0.6)" }}
        />
      )}
    </div>
  );
};

export default Estate;
