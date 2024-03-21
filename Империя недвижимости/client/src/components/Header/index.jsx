import React from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";

import Theme from "../ThemeProvider";
import Menu from "../Menu";

const Header = () => {
  const fullName = useSelector((state) => state.auth.data?.fullName);

  const [isVisibleMenu, setIsVisibleMenu] = React.useState(false);

  return (
    <div className={style["header"]}>
      <div className={style["start"]}>
        <Link to='/'>
          <img src={logo} alt='' className={style["logo"]} />
          <div className={style["line"]}></div>
          <div className={style["title"]}>Империя недвижимости</div>
        </Link>
        <div className={style["theme"]}>
          <Theme.Toggler />
        </div>
      </div>
      <div
        className={style["end"]}
        onClick={() => setIsVisibleMenu(!isVisibleMenu)}
      >
        <div className={style["name"]}>{fullName ? fullName : "Guest"}</div>
        <FaUserCircle className={style["avatar"]} />
        {isVisibleMenu && <Menu />}
      </div>
    </div>
  );
};

export default Header;
