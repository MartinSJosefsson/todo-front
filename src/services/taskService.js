import axios from "axios";
import { authService } from "./authService";

const API_URL = "http://localhost:9090/api/todo";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${authService.getToken()}`,
  },
});

export const getAllTodosApi = async () => {
  const response = await axios.get(API_URL, authHeader());
  return response.data;
};

export const createTodoApi = async (task) => {
  const response = await axios.post(API_URL, task, authHeader());
  return response.data;
};

export const updateTodoApi = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task, authHeader());
  return response.data;
};

export const deleteTodoApi = async (id) => {
  await axios.delete(`${API_URL}/${id}`, authHeader());
};
