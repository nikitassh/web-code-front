import axios from "axios";
import { API_URL } from "./urls";

export const http = axios.create({
  baseURL: `${API_URL}/api/`,
});
