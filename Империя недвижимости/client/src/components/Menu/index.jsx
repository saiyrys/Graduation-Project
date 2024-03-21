import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, loguot } from "../../redux/slices/auth";

import style from "./Menu.module.scss";

import { IoIosHelpCircleOutline, IoMdPerson } from "react-icons/io";
import { CiLogin, CiLogout } from "react-icons/ci";
import { IoDocumentText } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { fetchFavoritesEstates } from "../../redux/slices/favorites";

const Menu = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { favorites } = useSelector((state) => state.favorites);

  const favoritesLengt = favorites?.items.length;

  React.useEffect(() => {
    dispatch(fetchFavoritesEstates());
  }, []);

  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(loguot());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={style["menu"]}>
      {isAuth ? (
        <>
          <ul>
            <li>
              <Link to={`/user/${userData._id}`} className={style["profile"]}>
                <span>Профиль</span>
                <IoMdPerson className={style["icon"]} />
              </Link>
            </li>
            <li>
              <Link to='/favorites' className={style["favorites"]}>
                <span>Избранное</span>
                <div>
                  <FaRegHeart className={style["icon"]} />
                  <span className={style["countFavorites"]}>
                    {favoritesLengt > 10 ? "9+" : favoritesLengt}
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/my-estate' className={style["myEstate"]}>
                <span>Мои объявления</span>
                <IoDocumentText className={style["icon"]} />
              </Link>
            </li>
            <li>
              <Link to='/help' className={style["help"]}>
                <span>Помощь</span>
                <IoIosHelpCircleOutline className={style["icon"]} />
              </Link>
            </li>

            <li>
              <Link to='/' onClick={onClickLogout} className={style["logout"]}>
                <span>Выйти</span>
                <CiLogout className={style["icon"]} />
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul>
            <li>
              <Link to='/help' className={style["help"]}>
                <span>Помощь</span>
                <IoIosHelpCircleOutline className={style["icon"]} />
              </Link>
            </li>
            <li>
              <Link to='/auth' className={style["login"]}>
                <span>Войти</span>
                <CiLogin className={style["icon"]} />
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Menu;
