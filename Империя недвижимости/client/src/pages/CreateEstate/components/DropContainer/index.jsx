import React from "react";
import axios from "../../../../axios";

import { FaImage } from "react-icons/fa6";

import style from "./DropContainer.module.scss";

const DropContainer = ({ onChange, url }) => {
  const [imageUrl, setImageUrl] = React.useState("");

  React.useEffect(() => {
    setImageUrl(url);
  }, [url]);

  onChange(imageUrl);
  console.log(imageUrl);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);

      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Не удалось загрузить фотогрфию!");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  return (
    <>
      {imageUrl === "" ? (
        <>
          <label className={style["drop-container"]} htmlFor='file'>
            <FaImage className={style["img-icon"]} />
            <span className={style["drop-title"]}>Перетащите файл сюда</span>
            или
            <input
              onChange={handleChangeFile}
              type='file'
              className={style["input-file"]}
              id='file'
              accept='image/*'
            />
          </label>
        </>
      ) : (
        <>
          <img
            className={style["img"]}
            src={`http://localhost:4444${imageUrl}`}
            alt='Uploaded'
          />
          <div>
            <button className={style["remove"]} onClick={onClickRemoveImage}>
              Удалить
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DropContainer;
