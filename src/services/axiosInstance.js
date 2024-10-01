// apiClient.js (Create a separate file for your Axios instance)
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL, // Set your base URL
  headers: {
    "x-secret-key": process.env.NEXT_PUBLIC_SECRET_KEY, // Add your default headers here
  },
});

export default axiosInstance;
