import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchEstates = createAsyncThunk(
  "estates/fetchEstates",
  async () => {
    const { data } = await axios.get("/estates");
    return data;
  }
);

export const fetchEstatesFilter = createAsyncThunk(
  "estates/fetchEstatesFilter",
  async ({ sort, search, filter }) => {
    try {
      const { data } = await axios.get(
        `/estates/filter?sort=${sort}${
          search.length > 0 ? `&search=${search}` : ""
        }${
          filter.priceFrom || filter.priceTo
            ? `&priceFrom=${filter.priceFrom}&priceTo=${filter.priceTo}`
            : ""
        }${filter.currency ? `&currency=${filter.currency}` : ""}${
          filter.squareFrom || filter.squareTo
            ? `&squareFrom=${filter.squareFrom}&squareTo=${filter.squareTo}`
            : ""
        }${filter.countRoom ? `&countRoom=${filter.countRoom}` : ""}${
          filter.floorFrom || filter.floorTo
            ? `&floorFrom=${filter.floorFrom}&floorTo=${filter.floorTo}`
            : ""
        }${filter.status ? `&status=${filter.status}` : ""}`
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCreateEstate = createAsyncThunk(
  "estates/fetchCreateEstate",
  async (params) => {
    const { data } = await axios.post("/estates", params);
    return data;
  }
);

export const fetchUpdateEstate = createAsyncThunk(
  "estates/fetchUpdateEstate",
  async ({ id, values }) => {
    const { data } = await axios.patch(`/estates/${id}`, values);
    return data;
  }
);

export const fetchRemoveEstate = createAsyncThunk(
  "estates/fetchRemoveEstate",
  async (id) => await axios.delete(`/estates/${id}`)
);

const initialState = {
  estates: {
    items: [],
    status: "loading",
  },
};

const estatesSlice = createSlice({
  name: "estates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Получение объявлений
      .addCase(fetchEstates.pending, (state) => {
        state.estates.items = [];
        state.estates.status = "loading";
      })
      .addCase(fetchEstates.fulfilled, (state, action) => {
        state.estates.items = action.payload;
        state.estates.status = "loaded";
      })
      .addCase(fetchEstates.rejected, (state) => {
        state.estates.items = [];
        state.estates.status = "error";
      })
      //Получение отфильтрованных объявлений
      .addCase(fetchEstatesFilter.pending, (state) => {
        state.estates.items = [];
        state.estates.status = "loading";
      })
      .addCase(fetchEstatesFilter.fulfilled, (state, action) => {
        state.estates.items = action.payload;
        state.estates.status = "loaded";
      })
      .addCase(fetchEstatesFilter.rejected, (state) => {
        state.estates.items = [];
        state.estates.status = "error";
      })
      //Создание объявления
      .addCase(fetchCreateEstate.pending, (state) => {
        state.estates.items = [];
        state.estates.status = "loading";
      })
      .addCase(fetchCreateEstate.fulfilled, (state, action) => {
        state.estates.items = action.payload;
        state.estates.status = "loaded";
      })
      .addCase(fetchCreateEstate.rejected, (state) => {
        state.estates.items = [];
        state.estates.status = "error";
      })
      //Обновление объявления
      .addCase(fetchUpdateEstate.pending, (state, action) => {
        state.estates.items = state.estates.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
      //Удаление объявлений
      .addCase(fetchRemoveEstate.pending, (state, action) => {
        state.estates.items = state.estates.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      });
  },
});

export const estatesReducer = estatesSlice.reducer;
