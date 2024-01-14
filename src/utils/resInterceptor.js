import axios from "axios";

axios.interceptors.request.use((config) => {
  if (localStorage.getItem("restoken") != null) {
    config.headers["Authorization"] = localStorage.getItem("restoken");
  }

  return config;
});
