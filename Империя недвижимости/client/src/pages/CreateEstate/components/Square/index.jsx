import React from "react";

import style from "../../CreateEstate.module.scss";

const Square = ({ register, errors }) => {
  return (
    <div className={style["square"]}>
      <p className={style["title"]}>Площадь</p>
      <div>
        <div className={style["square-input_box"]}>
          <input
            className={style["square-input"]}
            type='number'
            {...register("square", {
              required: "Square is require field!",
            })}
          />
          <p>
            м<sup>2</sup>
          </p>
        </div>
        {errors?.square && (
          <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
            {errors.square.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Square;
