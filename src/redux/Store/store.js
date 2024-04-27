import { configureStore } from "@reduxjs/toolkit";
import RestaurantsSlice from "../Restaurants/slice";
import RestaurantInfoSlice from "../RestaurantsMenu/slice";
import CartSlice from "../Cart/slice";

const store = configureStore({
  reducer: {
    data: RestaurantsSlice,
    restInfo: RestaurantInfoSlice,
    cartDetails: CartSlice,
  },
});

export default store;
