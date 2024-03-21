import React from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./Home.module.scss";

import { MdOutlineScreenSearchDesktop } from "react-icons/md";

import { Search, Filter, Estate, Pagination } from "../../components";
import { fetchEstatesFilter } from "../../redux/slices/estates";
import { fetchFavoritesEstates } from "../../redux/slices/favorites";
import { setSort } from "../../redux/slices/filter";

const Main = () => {
  const dispatch = useDispatch();

  const { estates } = useSelector((state) => state.estates);
  const { favorites } = useSelector((state) => state.favorites);
  const { sort, search, filter, pagination } = useSelector(
    (state) => state.filter
  );

  const isEstatesLoading = estates.status === "loading";

  const [typeEstate, setTypeEstate] = React.useState(0);

  const userData = useSelector((state) => state.auth.data);

  const optionEstate = [
    {
      value: "house",
      label: "Дома",
    },
    {
      value: "flat",
      label: "Квартиры",
    },
  ];

  const onClickSort = (i) => {
    setTypeEstate(i);
    dispatch(setSort(optionEstate[i].value));
  };

  React.useEffect(() => {
    dispatch(fetchEstatesFilter({ sort, search, filter }));
    dispatch(fetchFavoritesEstates());
  }, [sort, search, filter]);

  const favoritesEstates =
    favorites.items.length > 0
      ? favorites.items.filter((obj) => userData?._id === obj.userId)
      : [];

  return (
    <>
      <div className={style["top-contant"]}>
        <h1>Недвижимость по выгодным ценам</h1>
        <Search />
        <div className={style["top-contant_bottom"]}>
          <div className={style["count-estate"]}>
            <div className={style["count"]}>{estates.items.length}</div>
            <p>объявлений</p>
          </div>
        </div>
      </div>
      <div className={style["choose-box"]}>
        <ul className={style["choose-box_ul"]}>
          {optionEstate.map((option, i) => (
            <li
              key={i}
              onClick={() => onClickSort(i)}
              className={typeEstate === i ? style["active"] : ""}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={style["content"]}>
        <Filter />
        <div className={style["container"]}>
          <div className={style["grid-box"]}>
            {isEstatesLoading ? (
              [...Array(8)].map((obj, index) => (
                <Estate key={index} isLoading={true} />
              ))
            ) : pagination.length > 0 ? (
              pagination.map((obj, index) => (
                <Estate
                  key={obj._id}
                  id={obj._id}
                  price={obj.price}
                  currency={obj.currency}
                  imageUrl={obj.imageUrl}
                  countRoom={obj.countRoom}
                  createdAt={obj.createdAt}
                  floor={obj.floor}
                  address={obj.address}
                  status={obj.status}
                  square={obj.square}
                  isLike={favoritesEstates
                    .map((obj) => obj.estateId)
                    .includes(obj._id)}
                  estateId={favoritesEstates.map((obj) => obj.estateId)[index]}
                  viewsCount={obj.viewsCount}
                  description={obj.description}
                  type={obj.type}
                  isEditable={userData?._id === obj.user._id}
                />
              ))
            ) : (
              <div className={style["notFound"]}>
                <MdOutlineScreenSearchDesktop className={style["icon"]} />
                <p className={style["title"]}>
                  По вашему запросу ничего не найденно!
                </p>
              </div>
            )}
          </div>
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Main;
