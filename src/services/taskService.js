import axios from "axios";

const API_URL = "http://localhost:9090/api/todos";

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const getAllTodosApi = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

export const createTodoApi = async (todo) => {
  const response = await axios.post(API_URL, todo, { headers: getAuthHeaders() });
  return response.data;
};

export const updateTodoApi = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo, { headers: getAuthHeaders() });
  return response.data;
};

export const deleteTodoApi = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
