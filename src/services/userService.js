import axios from "axios";
import { authService } from "./authService";

const API_URL = "http://localhost:9090/api/person";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${authService.getToken()}`,
  },
});

export const getAllUsersApi = async () => {
  const response = await axios.get(API_URL, authHeader());
  return response.data; // Array of PersonDto
};
