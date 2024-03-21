import React from "react";
import { Controller, useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";

import { setFilter } from "../../redux/slices/filter";

import style from "./Filter.module.scss";

import { Button } from "../../components";

const Filter = () => {
  const dispatch = useDispatch();

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      priceFrom: "",
      priceTo: "",
      currency: "",
      squareFrom: "",
      squareTo: "",
      countRoom: "",
      floorFrom: "",
      floorTo: "",
      status: "",
    },
  });

  const onSubmit = (values) => {
    dispatch(setFilter(values));
  };

  return (
    <div className={style["filter"]}>
      <h3>Фильтрация</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style["price"]}>
          <p>Стоимость</p>
          <div className={style["input-box"]}>
            <input
              type='number'
              autoComplete='off'
              className={style["input-from"]}
              placeholder='От'
              {...register("priceFrom")}
            />
            <input
              type='number'
              autoComplete='off'
              className={style["input-to"]}
              placeholder='До'
              {...register("priceTo")}
            />
          </div>
        </div>
        <div className={style["currency"]}>
          <p>Валюта</p>
          <Controller
            control={control}
            name='currency'
            render={({ field: { onChange } }) => (
              <div className={style["input-box"]}>
                <div className={style["input-radio"]}>
                  <input
                    type='radio'
                    name='currency'
                    id='rub'
                    onChange={() => onChange("RUB")}
                  />
                  <label htmlFor='rub'>RUB</label>
                </div>
                <div className={style["input-radio"]}>
                  <input
                    type='radio'
                    name='currency'
                    id='usd'
                    onChange={() => onChange("USD")}
                  />
                  <label htmlFor='usd'>USD</label>
                </div>
                <div className={style["input-radio"]}>
                  <input
                    type='radio'
                    name='currency'
                    id='eur'
                    onChange={() => onChange("EUR")}
                  />
                  <label htmlFor='eur'>EUR</label>
                </div>
              </div>
            )}
          />
        </div>
        <div className={style["square"]}>
          <p>Площадь</p>
          <div className={style["input-box"]}>
            <input
              type='number'
              autoComplete='off'
              className={style["input-from"]}
              placeholder='От'
              {...register("squareFrom")}
            />
            <input
              type='number'
              autoComplete='off'
              className={style["input-to"]}
              placeholder='До'
              {...register("squareTo")}
            />
          </div>
        </div>
        <Controller
          control={control}
          name='countRoom'
          render={({ field: { onChange } }) => (
            <div className={style["count-bedroom"]}>
              <p>Количество комнат</p>
              <div className={style["input-box"]}>
                <div className={style["input-chbox"]}>
                  <input
                    type='radio'
                    name='count-room'
                    id='one'
                    onChange={() => onChange("1")}
                  />
                  <label htmlFor='one'>1 комната</label>
                </div>
                <div className={style["input-chbox"]}>
                  <input
                    type='radio'
                    name='count-room'
                    id='two'
                    onChange={() => onChange("2")}
                  />
                  <label htmlFor='two'>2 комнаты</label>
                </div>
                <div className={style["input-chbox"]}>
                  <input
                    type='radio'
                    name='count-room'
                    id='three'
                    onChange={() => onChange("3")}
                  />
                  <label htmlFor='three'>3 комнаты</label>
                </div>
                <div className={style["input-chbox"]}>
                  <input
                    type='radio'
                    name='count-room'
                    id='four'
                    onChange={() => onChange("4")}
                  />
                  <label htmlFor='four'>4 комнаты</label>
                </div>
                <div className={style["input-chbox"]}>
                  <input
                    type='radio'
                    name='count-room'
                    id='five-plus'
                    onChange={() => onChange("5")}
                  />
                  <label htmlFor='five-plus'>5+ комнат</label>
                </div>
              </div>
            </div>
          )}
        />

        <div className={style["floor"]}>
          <p>Расположение на этаже</p>
          <div className={style["input-box"]}>
            <input
              type='number'
              autoComplete='off'
              className={style["input-from"]}
              placeholder='От'
              {...register("floorFrom")}
            />
            <input
              type='number'
              autoComplete='off'
              className={style["input-to"]}
              placeholder='До'
              {...register("floorTo")}
            />
          </div>
        </div>
        <div className={style["status"]}>
          <p>Статус</p>
          <Controller
            control={control}
            name='status'
            render={({ field: { onChange } }) => (
              <div className={style["input-box"]}>
                <div className={style["input-radio"]}>
                  <input
                    type='radio'
                    name='status'
                    id='sale'
                    onChange={() => onChange("Продажа")}
                  />
                  <label htmlFor='sale'>Продажа</label>
                </div>
                <div className={style["input-radio"]}>
                  <input
                    type='radio'
                    name='status'
                    id='rent'
                    onChange={() => onChange("Аренда")}
                  />
                  <label htmlFor='rent'>Аренда</label>
                </div>
              </div>
            )}
          />
        </div>
        <Button
          label={"Применить"}
          disabled={false}
          style={{ width: "120px" }}
        />
      </form>
    </div>
  );
};

export default Filter;
