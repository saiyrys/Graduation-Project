import React from "react";

import style from "../../CreateEstate.module.scss";

const statusOptions = ["Аренда", "Продажа"];

const Status = ({ onChange, status }) => {
  return (
    <div className={style["status"]}>
      <p className={style["title"]}>Статус</p>

      <div className={style["input-box"]}>
        {statusOptions.map((element, index) => {
          return (
            <div key={index} className={style["inp_radio"]}>
              <input
                type='radio'
                id={`${element}`}
                name='status'
                onClick={() => onChange(element)}
                defaultChecked={element === status}
              />
              <label htmlFor={`${element}`}>{element}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Status;
