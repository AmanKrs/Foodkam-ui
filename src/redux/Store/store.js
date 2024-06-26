import { configureStore } from "@reduxjs/toolkit";
import RestaurantsSlice from "../Restaurants/slice";
import RestaurantInfoSlice from "../RestaurantsMenu/slice";
import CartSlice from "../Cart/slice";
import LoginSlice from "../Login/slice";

const store = configureStore({
  reducer: {
    data: RestaurantsSlice,
    restInfo: RestaurantInfoSlice,
    cartDetails: CartSlice,
    loginDetails: LoginSlice,
  },
});

export default store;
