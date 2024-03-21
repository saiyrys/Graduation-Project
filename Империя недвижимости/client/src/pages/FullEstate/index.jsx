import React from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

import style from "./FullEstate.module.scss";

const FullEstate = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    axios
      .get(`/estates/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <div className={style["content"]}>
      {isLoading ? (
        <h2
          style={{ margin: "auto", backgroundColor: "rgba(var(--accent), 1)" }}
        >
          Загрузка...
        </h2>
      ) : (
        <>
          <img
            src={`http://localhost:4444${data.imageUrl}`}
            alt=''
            className={style["photo"]}
          />
          <div className={style["top-block"]}>
            <p className={style["price"]}>
              {data.price}{" "}
              <span className={style["currency"]}>{data.currency}</span>
            </p>
            <div className={style["views-block"]}>
              <p className={style["views-count"]}>{data.viewsCount}</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 -960 960 960'
                width='24'
                className={style["img"]}
              >
                <path
                  fill='#000'
                  d='M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z'
                />
              </svg>
            </div>
          </div>
          <div className={style["info"]}>
            <p className={style["info-title"]}>Характеристика</p>
            <div className={style["square"]}>
              <p className={style["title"]}>Площадь</p>
              <span className={style["property"]}>
                {data.square}
                <span>
                  м<sup>2</sup>
                </span>
              </span>
            </div>
            <div className={style["count-floor"]}>
              <p className={style["title"]}>Этаж</p>
              <span className={style["property"]}>{data.floor}</span>
            </div>
            <div className={style["count-bedroom"]}>
              <p className={style["title"]}>Количество комнат</p>
              <span className={style["property"]}>{data.countRoom}</span>
            </div>
            <div className={style["status"]}>
              <p className={style["title"]}>Статус</p>
              <span className={style["property"]}>{data.status}</span>
            </div>
            <div className={style["price-per-meter"]}>
              <p className={style["title"]}>Цена за метр</p>
              <span className={style["property"]}>
                {Math.floor(data.price / data.square)}{" "}
                <span className={style["currency"]}>{data.currency}</span>
              </span>
            </div>
            <div className={style["address"]}>
              <p className={style["title"]}>Адрес</p>
              <span className={style["property"]}>{data.address}</span>
            </div>
            <div className={style["contact"]}>
              <p className={style["title"]}>email</p>
              <span className={style["property"]}>{data.user?.email}</span>
            </div>
            <div className={style["full-name"]}>
              <p className={style["title"]}>Full name</p>
              <span className={style["property"]}>{data.user?.fullName}</span>
            </div>
            <div className={style["createdAt"]}>
              <p className={style["title"]}>Объявление созданно</p>
              <span className={style["property"]}>
                {data?.createdAt.slice(0, 10)}
              </span>
            </div>
          </div>

          <div className={style["description"]}>
            <p className={style["title"]}>Описание</p>
            <p className={style["property"]}>{data.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FullEstate;
