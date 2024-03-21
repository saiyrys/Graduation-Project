import style from "./Admin.module.scss";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectIsAuth } from "../../redux/slices/auth";

import { UsersBlock } from "../../components";

const Admin = () => {
  const isAuth = useSelector(selectIsAuth);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to='/' />;
  }
  return (
    <div className={style["content"]}>
      <div className={style["top"]}>
        {/* <div className={style["search"]}>
          <img src={search} alt='' className={style["search-icon"]} />
          <input
            type='text'
            className={style["search-input"]}
            placeholder='Поисковая строка'
          />
        </div>
        <div className={style["sort"]}>
          <p>Сортировка: </p>
          <div className={style["choose-sort"]}>
            <span>по алфавиту</span>
            <img src={arrow_up} alt='' />
          </div>
          <div className={style["sort-popup"]}>
            <ul className={style["list"]}>
              <li className={style["alphabet"]}>по алфавиту</li>
              <li className={style["date"]}>по дате</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={style["container"]}>
        <div className={style["submenu"]}>
          <div className={style["users-btn"]}>
            <img className={style["icon"]} src={group} alt='' />
          </div>
          <div className={style["logs-btn"]}>
            <img className={style["icon"]} src={schedule} alt='' />
          </div>
        </div>
        <UsersBlock /> */}
      </div>
    </div>
  );
};

export default Admin;
