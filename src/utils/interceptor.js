import axios from "axios";

axios.interceptors.request.use((config) => {
  if (localStorage.getItem("token") != null) {
    config.headers["Authorization"] = localStorage.getItem("token");
  }

  return config;
});
