import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "../../utils/interceptor";
const apiurl = process.env.REACT_APP_API_URL;

export const ResturantInfo = createAsyncThunk(
  "getResturantInfo",
  async (payload) => {
    try {
      const restaurantInfoResult = await axios.post(
       `${apiurl}/restaurant/getRestaurantInfo`,
        { id: payload }
      );
      console.log(restaurantInfoResult);
      return restaurantInfoResult.data.resinfo;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ResturantsMenu = createAsyncThunk(
  "getResturantItem",
  async (payload) => {
    try {
      const restaurantInfoResult = await axios.post(
        `${apiurl}/restaurant/getRestaurantInfo`,
        { id: payload }
      );
      if (restaurantInfoResult.status === 200) {
        const result = await axios.post(
           `${apiurl}/restaurant/getItems`,
          { id: payload }
        );
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
