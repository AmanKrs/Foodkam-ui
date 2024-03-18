import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RestaurantDetails = createAsyncThunk(
  "getRestaurants",
  async (payload) => {
    try {
      console.log("called");
      const resultData = await axios.post(
        "http://localhost:8087/partner/getresturantDetails"
      );
      console.log(resultData);
      return resultData.data;
    } catch (e) {
      console.log(e);
    }
  }
);
