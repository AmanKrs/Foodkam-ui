import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;

export const RestaurantDetails = createAsyncThunk(
  "getRestaurants",
  async (payload) => {
    try {
      console.log("called");
      const resultData = await axios.post(
        `${apiurl}/partner/getresturantDetails`
      );
      console.log(resultData);
      return resultData.data;
    } catch (e) {
      console.log(e);
    }
  }
);
