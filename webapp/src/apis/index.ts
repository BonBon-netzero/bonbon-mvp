import { getAxiosErrorMessage } from "@/helpers/handleError";
import axios from "axios";

const requester = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 300000,
  headers: {
    "Access-Control-Max-Age": 600,
  },
});

requester.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(getAxiosErrorMessage(error));
  }
);

export default requester;
