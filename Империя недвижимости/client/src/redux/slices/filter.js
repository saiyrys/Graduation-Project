import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "house",
  search: "",
  filter: {},
  pagination: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setEstatesPagination(state, action) {
      state.pagination = action.payload;
    },
  },
});

export const { setSort, setSearch, setFilter, setEstatesPagination } =
  filterSlice.actions;

export const filterReducer = filterSlice.reducer;
