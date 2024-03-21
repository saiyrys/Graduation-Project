import { Link } from "react-router-dom";

import style from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={style["not_found-block"]}>
      <h1>
        4<span className={style["zero"]}>0</span>4
      </h1>
      <h3>PAGE NOT FOUND</h3>
      <div className={style["text-block"]}>
        <p>Страницы с такой ссылкой не существует.</p>
        <p>Убедитесь в правильности ссылки или перейдите на</p>
        <Link to='/'>главную</Link>
      </div>
    </div>
  );
};

export default NotFound;
