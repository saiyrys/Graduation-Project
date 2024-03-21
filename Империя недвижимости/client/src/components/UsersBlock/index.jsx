import style from "./UsersBlock.module.scss";

const UsersBlock = () => {
  return (
    <div className={style["users-block"]}>
      <div className="user"></div>
    </div>
  );
};

export default UsersBlock;
