import React from "react";

import style from "./Profile.module.scss";
import { MdOutlineModeEditOutline } from "react-icons/md";

const Profile = () => {
  return (
    <div className={style["wrap"]}>
      <h2>Профиль</h2>

      <form>
        <div className={style["fullName"]}>
          <p>Full Name</p>
          <div>
            <input type='text' className={style["fullName-input"]} />
            <MdOutlineModeEditOutline />
          </div>
        </div>
        <div className={style["email"]}>
          <p>Email</p>
          <div>
            <input type='email' className={style["email-input"]} />
            <MdOutlineModeEditOutline />
          </div>
        </div>
        <div className={style["password"]}>
          <p>Password</p>
          <div>
            <input type='password' className={style["password-input"]} />
            <MdOutlineModeEditOutline />
          </div>
        </div>
        <div className={style["number"]}>
          <p>Number</p>
          <div>
            <input type='text' className={style["number-input"]} />
            <MdOutlineModeEditOutline />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
