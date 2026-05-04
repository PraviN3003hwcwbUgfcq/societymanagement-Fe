// import api from "../src/utils/axiosInstance"; 
// export default api

import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACKEND}/api/v1`,
  withCredentials: true,
});

export default api;