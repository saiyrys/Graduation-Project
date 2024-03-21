import React from "react";

import style from "../../CreateEstate.module.scss";

const Floor = ({ register, errors }) => {
  return (
    <div className={style["floor"]}>
      <p className={style["title"]}>Этаж</p>
      <div className={style["floor-input_box"]}>
        <input
          className={style["floor-input"]}
          type='number'
          {...register("floor", {
            required: "Floor is require field!",
          })}
        />
        {errors?.floor && (
          <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
            {errors.floor.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Floor;
