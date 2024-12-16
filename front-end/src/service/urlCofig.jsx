import axios from "axios";

export const BASE_URL = "http://localhost:3000/";
export const BASE_URL_IMG = "http://localhost:3000/public/imgs/";

export const http = axios.create({
  baseURL: BASE_URL,
});
