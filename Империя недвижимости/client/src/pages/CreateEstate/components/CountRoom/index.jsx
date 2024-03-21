import React from "react";

import style from "../../CreateEstate.module.scss";

const CountRoom = ({ register, errors }) => {
  return (
    <div className={style["count-room"]}>
      <p className={style["title"]}>Количество комнат</p>
      <div className={style["count-room-input_box"]}>
        <input
          className={style["count-room-input"]}
          type='number'
          {...register("countRoom", {
            required: "Is require field!",
          })}
        />
        {errors?.countRoom && (
          <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
            {errors.countRoom.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountRoom;
