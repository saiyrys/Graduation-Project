import React from "react";

import style from "../../CreateEstate.module.scss";

const Popup = ({
  onChange,
  setCurrency,
  currencyOptions,
  isVisiblePopup,
  setIsVisiblePopup,
}) => {
  return (
    <div className={style["currency_popup"]}>
      <ul
        className={style["currency_list"]}
        onClick={() => setIsVisiblePopup(!isVisiblePopup)}
      >
        {currencyOptions.map((element, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                onChange(element);
                setCurrency(index);
              }}
            >
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Popup;
