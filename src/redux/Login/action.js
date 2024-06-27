import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "../../utils/interceptor";

const apiurl = process.env.REACT_APP_API_URL;

export const LoginCustomer = createAsyncThunk(
  "logincustomer",

  async ({ payload, cb }) => {
    console.log(payload);
    try {
      const custLoginResult = await axios.post(`${apiurl}/user/login`, payload);

      cb?.(custLoginResult);
      return custLoginResult.data.token;
    } catch (error) {
      cb?.(error);
    }
  }
);

export const LoginRestaurant = createAsyncThunk(
  "loginrestaurant",

  async ({ payload, cb }) => {
    console.log(payload);
    try {
      const resLoginResult = await axios.post(
        `${apiurl}/partner/login`,
        payload
      );

      cb?.(resLoginResult);
      return resLoginResult.data.token;
    } catch (error) {
      cb?.(error);
    }
  }
);
