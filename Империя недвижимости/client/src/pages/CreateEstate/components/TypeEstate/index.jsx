import React from "react";

import style from "../../CreateEstate.module.scss";

const estateOptions = [
  {
    value: "house",
    label: "Дом",
  },
  {
    value: "flat",
    label: "Квартира",
  },
];

const TypeEstate = ({ onChange, type }) => {
  return (
    <div className={style["type-estate"]}>
      <p className={style["title"]}>Тип недвижимости</p>
      <div className={style["input-box"]}>
        {estateOptions.map((obj, index) => {
          return (
            <div key={index} className={style["inp_radio"]}>
              <input
                type='radio'
                id={`${obj.value}`}
                name='typeEstate'
                onClick={() => onChange(obj.value)}
                defaultChecked={obj.value === type}
              />
              <label htmlFor={`${obj.value}`}>{obj.label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypeEstate;
