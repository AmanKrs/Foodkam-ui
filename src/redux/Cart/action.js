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
