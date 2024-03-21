import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "./MyEstate.module.scss";

import { MdApartment } from "react-icons/md";

import { Estate } from "../../components";
import { fetchEstates } from "../../redux/slices/estates";

const MyEstate = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { estates } = useSelector((state) => state.estates);

  const filterEstates =
    estates.items.length > 0
      ? estates.items.filter((obj) => userData?._id === obj.user._id)
      : [];

  const isEstatesLoading = estates.status === "loading";

  React.useEffect(() => {
    dispatch(fetchEstates());
  }, []);

  return (
    <div className={style["content"]}>
      <div className={style["top"]}>
        <h2>Мои объявления</h2>
        <Link to='/create-estate' className={style["create-estate"]}>
          Cоздать объявление +
        </Link>
      </div>
      <div className={style["grid-box"]}>
        {isEstatesLoading ? (
          [...Array(8)].map((_, index) => (
            <Estate key={index} isLoading={true} />
          ))
        ) : filterEstates.length > 0 ? (
          filterEstates.map((obj, index) => (
            <Estate
              id={obj._id}
              key={obj._id}
              price={obj.price}
              currency={obj.currency}
              imageUrl={obj.imageUrl}
              countRoom={obj.countRoom}
              createdAt={obj.createdAt}
              floor={obj.floor}
              address={obj.address}
              status={obj.status}
              square={obj.square}
              userId={obj.user}
              viewsCount={obj.viewsCount}
              isEditable={true}
            />
          ))
        ) : (
          <div className={style["empty"]}>
            <MdApartment className={style["img"]} />
            <h2 className={style["title"]}>Тут пока пусто!</h2>
            <p className={style["text"]}>
              Но вы можете создать объявление прямо сейчас
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEstate;
