import React from "react";

import style from "../../CreateEstate.module.scss";

const Description = ({ register, errors }) => {
  return (
    <div className={style["description"]}>
      <p className={style["title"]}>Описание</p>
      <textarea
        cols='100'
        rows='10'
        {...register("description", {
          required: "Description is require field!",
        })}
      />
      {errors?.description && (
        <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
          {errors.description.message}
        </div>
      )}
    </div>
  );
};

export default Description;
