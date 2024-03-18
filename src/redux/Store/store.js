import { configureStore } from "@reduxjs/toolkit";
import RestaurantsSlice from "../Restaurants/slice";

const store = configureStore({
  reducer: {
    data: RestaurantsSlice,
  },
});

export default store;
