import axios, { AxiosInstance } from "axios";
const BASE_URL = "http://localhost:3001";

export const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default instance;

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
