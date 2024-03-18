import { createSlice } from "@reduxjs/toolkit";
import { RestaurantDetails } from "./action";

const initialState = {
  restDetails: [],
  loading: true,
  error: false,
};

const RestaurantsSlice = createSlice({
  name: "restaurantsSlice",

  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(RestaurantDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.restDetails = action.payload;
      console.log(action.payload);
    });
    builder.addCase(RestaurantDetails.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(RestaurantDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default RestaurantsSlice.reducer;
