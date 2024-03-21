import React from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./Favorites.module.scss";

import { FaRegHeart } from "react-icons/fa";

import { Estate } from "../../components";
import { fetchFavoritesEstates } from "../../redux/slices/favorites.js";
import { selectIsAuth } from "../../redux/slices/auth.js";

const Favorites = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { favorites } = useSelector((state) => state.favorites);

  const [update, setUpdate] = React.useState(false);

  const FavoritesEstates =
    favorites.items.length > 0
      ? favorites.items.filter((obj) => userData?._id === obj.userId)
      : [];

  const isEstatesLoading = favorites.status === "loading";

  React.useEffect(() => {
    dispatch(fetchFavoritesEstates());
    setUpdate(false);
  }, [update]);

  const isAuth = useSelector(selectIsAuth);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className={style["content"]}>
      <div className={style["container"]}>
        <h2>Избранное</h2>
        <div className={style["grid-box"]}>
          {isEstatesLoading ? (
            [...Array(8)].map((_, index) => (
              <Estate key={index} isLoading={true} />
            ))
          ) : FavoritesEstates.length > 0 ? (
            FavoritesEstates.map((obj, index) => (
              <Estate
                id={obj.estateId}
                key={obj.estateId}
                price={obj.price}
                currency={obj.currency}
                imageUrl={obj.imageUrl}
                countRoom={obj.countRoom}
                createdAt={obj.createdAt}
                floor={obj.floor}
                address={obj.address}
                status={obj.status}
                square={obj.square}
                estateId={obj.estateId}
                userId={obj.userId}
                viewsCount={obj.viewsCount}
                isLike={userData?._id === obj.userId}
                setUpdate={setUpdate}
              />
            ))
          ) : (
            <div className={style["empty"]}>
              <FaRegHeart className={style["img"]} />
              <h2 className={style["title"]}>Тут пока пусто!</h2>
              <p className={style["text"]}>
                Но вы можете добавить любое объявление в избранное
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
