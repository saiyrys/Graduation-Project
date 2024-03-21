import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchFavoritesEstates = createAsyncThunk(
  "fetchFavoritesEstates",
  async () => {
    const { data } = await axios.get("/favoritesEstates");
    return data;
  }
);

export const fetchAddFavoriteEstate = createAsyncThunk(
  "fetchAddFavoriteEstate",
  async (params) => {
    const { data } = await axios.post("/favoritesEstates", params);
    return data;
  }
);

export const fetchRemoveFavoriteEstate = createAsyncThunk(
  "estates/fetchRemoveFavoriteEstate",
  async (id) => {
    const { data } = await axios.delete(`/favoritesEstates/${id}`);
    return data;
  }
);

const initialState = {
  favorites: {
    items: [],
    status: "loading",
  },
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorites: (state, { payload: estate }) => {
      const isExists = state.items.some((e) => e.id === estate.id);
      if (isExists) {
        const index = state.items.findIndex((item) => item.id === estate.id);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      } else state.items.push(estate);
    },
  },
  extraReducers: (builder) => {
    builder
      //Получение избранных
      .addCase(fetchFavoritesEstates.pending, (state) => {
        state.favorites.items = [];
        state.favorites.status = "loading";
      })
      .addCase(fetchFavoritesEstates.fulfilled, (state, action) => {
        state.favorites.items = action.payload;
        state.favorites.status = "loaded";
      })
      .addCase(fetchFavoritesEstates.rejected, (state) => {
        state.favorites.items = [];
        state.favorites.status = "error";
      })
      //Добавление в избранное
      .addCase(fetchAddFavoriteEstate.pending, (state) => {
        state.favorites.items = [];
        state.favorites.status = "loading";
      })
      .addCase(fetchAddFavoriteEstate.fulfilled, (state, action) => {
        state.favorites.items = action.payload;
        state.favorites.status = "loaded";
      })
      .addCase(fetchAddFavoriteEstate.rejected, (state) => {
        state.favorites.items = [];
        state.favorites.status = "error";
      })
      //Удаление из избранного
      .addCase(fetchRemoveFavoriteEstate.pending, (state, action) => {
        state.favorites.items = state.favorites.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      });
  },
});

export const { toggleFavorites } = favoritesSlice.actions;

export const favoritesRiducer = favoritesSlice.reducer;
