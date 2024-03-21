import { configureStore } from "@reduxjs/toolkit";
import { estatesReducer } from "./slices/estates";
import { authReducer } from "./slices/auth";
import { filterReducer } from "./slices/filter";
import { favoritesRiducer } from "./slices/favorites";

const store = configureStore({
  reducer: {
    estates: estatesReducer,
    auth: authReducer,
    filter: filterReducer,
    favorites: favoritesRiducer,
  },
});

export default store;
