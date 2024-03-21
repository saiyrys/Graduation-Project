import style from "./Help.module.scss";

import { Button } from "../../components";

const Help = () => {
  return (
    <div className={style["content"]}>
      <h3>Задайте интересующий вас вопрос и мы свяжемся с вами по почте.</h3>
      <div className={style["issue"]}>
        <p className={style["title"]}>Тема</p>
        <input className='' type='text' name='' id='' />
      </div>
      <div className={style["question"]}>
        <p className={style["title"]}>Вопрос</p>
        <textarea name='' id='' cols='120' rows='15'></textarea>
      </div>
      <Button label={"Отправить"} disabled={false} style={{ width: "150px" }} />
    </div>
  );
};

export default Help;
