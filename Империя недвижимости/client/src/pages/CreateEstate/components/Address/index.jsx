import React from "react";

import style from "../../CreateEstate.module.scss";

const Address = ({ register, errors }) => {
  return (
    <div className={style["address"]}>
      <p className={style["title"]}>Адрес</p>
      <input
        type='text'
        {...register("address", {
          required: "Address is require field!",
        })}
      />
      {errors?.address && (
        <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
          {errors.address.message}
        </div>
      )}
    </div>
  );
};

export default Address;
