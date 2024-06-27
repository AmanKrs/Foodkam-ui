import { createSlice } from "@reduxjs/toolkit";
import { LoginCustomer, LoginRestaurant } from "./action";

const initialState = {
  customerToken: 0,
  restaurantToken: 0,
  loading: false,
  error: false,
};

const LoginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(LoginCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customerToken = action.payload;
      console.log(action.payload);
    });
    builder.addCase(LoginCustomer.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(LoginCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(LoginRestaurant.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurantToken = action.payload;
      console.log(action.payload);
    });
    builder.addCase(LoginRestaurant.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(LoginRestaurant.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default LoginSlice.reducer;
