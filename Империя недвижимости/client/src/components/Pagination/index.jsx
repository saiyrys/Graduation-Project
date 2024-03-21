import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setEstatesPagination } from "../../redux/slices/filter.js";

import style from "./Pagination.module.scss";

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = () => {
  const dispatch = useDispatch();

  const { estates } = useSelector((state) => state.estates);

  const [active, setActive] = React.useState(0);

  const size = 10;
  let subarray = [];
  for (let i = 0; i < Math.ceil(estates.items.length / size); i++) {
    subarray[i] = estates.items.slice(i * size, i * size + size);
  }

  React.useEffect(() => {
    estates.status === "loading"
      ? dispatch(setEstatesPagination([]))
      : subarray.length > 0 && dispatch(setEstatesPagination(subarray[active]));
  }, [subarray.length, active]);

  const onClickOnPagination = (array, index) => {
    // console.log(value);
    dispatch(setEstatesPagination(array));
    window.scrollTo(0, 0);
    setActive(index);
  };

  return (
    <div className={style["pagination"]}>
      <MdKeyboardDoubleArrowLeft onClick={() => setActive(0)} />
      <MdKeyboardArrowLeft
        onClick={() => setActive(active !== 0 ? active - 1 : active)}
      />
      {subarray.map((array, index) => (
        <span
          key={index}
          className={style[active === index ? "active" : ""]}
          onClick={() => onClickOnPagination(array, index)}
        >
          {index + 1}
        </span>
      ))}
      <MdKeyboardArrowRight
        onClick={() =>
          setActive(active !== subarray.length - 1 ? active + 1 : active)
        }
      />
      <MdKeyboardDoubleArrowRight
        onClick={() => setActive(subarray.length - 1)}
      />
    </div>
  );
};

export default Pagination;
