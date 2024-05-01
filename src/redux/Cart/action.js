import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "../../utils/interceptor";

export const AddToCart = createAsyncThunk(
  "addtoCart",

  async ({ payload }) => {
    console.log(payload);
    try {
      const cartItemResult = await axios.post(
        "http://localhost:8087/cart/addtocart",
        payload
      );
      console.log(cartItemResult.data.result[0].qauntOfItem);
      return cartItemResult.data.result[0].qauntOfItem;
    } catch (error) {
      console.log(error);
    }
  }
);

export const DelfromCart = createAsyncThunk(
  "delfromCart",

  async ({ payload }) => {
    console.log(payload);
    try {
      const delItemResult = await axios.post(
        "http://localhost:8087/cart/removeCartItem",
        payload
      );
      console.log(delItemResult.data.result[0].qauntOfItem);
      return delItemResult.data.result[0].qauntOfItem;
    } catch (error) {
      console.log(error);
    }
  }
);