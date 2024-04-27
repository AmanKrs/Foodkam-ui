import { createSlice } from "@reduxjs/toolkit";
import { ResturantInfo, ResturantsMenu } from "./action";

const initialState = {
  restaurantData: {},
  menuData: [],
  loading: true,
  error: false,
};

const RestaurantInfoSlice = createSlice({
  name: "restaurantsInfoSlice",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(ResturantInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurantData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(ResturantInfo.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ResturantInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(ResturantsMenu.fulfilled, (state, action) => {
      state.loading = false;
      state.menuData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(ResturantsMenu.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ResturantsMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default RestaurantInfoSlice.reducer;
