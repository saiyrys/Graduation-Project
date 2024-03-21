import React from "react";
import { useDispatch } from "react-redux";

import style from "./Search.module.scss";
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

import { setSearch } from "../../redux/slices/filter";
import { useDebounce } from "../../Hooks/useDebounce";

const Search = () => {
  const dispatch = useDispatch();

  const inputRef = React.useRef();
  const [searchValue, setSearchValue] = React.useState("");

  const debounceValue = useDebounce(searchValue);

  React.useEffect(() => {
    dispatch(setSearch(debounceValue));
  }, [debounceValue]);

  const onClickRemove = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  return (
    <div className={style["search-block"]}>
      <div className={style["search"]}>
        <input
          ref={inputRef}
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={style["search-input"]}
          placeholder='Поиск недвижимости'
        />
        <IoIosSearch className={style["search-icon"]} />
        {searchValue !== "" && (
          <IoIosClose className={style["close"]} onClick={onClickRemove} />
        )}
      </div>
    </div>
  );
};

export default Search;
