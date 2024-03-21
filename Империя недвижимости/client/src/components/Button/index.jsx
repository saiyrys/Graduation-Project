import React from "react";

import styles from "./Button.module.scss";

const Button = ({ label, disabled, style, onClick }) => {
  return (
    <>
      {disabled ? (
        <button
          className={styles["btn"]}
          style={style}
          type='submit'
          onClick={onClick}
          disabled
        >
          {label}
        </button>
      ) : (
        <button
          className={styles["btn"]}
          style={style}
          type='submit'
          onClick={onClick}
        >
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
