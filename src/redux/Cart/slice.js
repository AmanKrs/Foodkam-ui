import { createSlice } from "@reduxjs/toolkit";
import { DelfromCart, AddToCart } from "./action";

const initialState = {
  addToCart: 0,
  delfromCart:0,
  loading: true,
  error: false,
};

const CartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(AddToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.addToCart = action.payload;
      console.log(action.payload);
    });
    builder.addCase(AddToCart.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(AddToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(DelfromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.addToCart = action.payload;
      console.log(action.payload);
    });
    builder.addCase(DelfromCart.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(DelfromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default CartSlice.reducer;
