// Simple JSON-only task service (no file upload yet)
import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:9090/api';

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${authService.getToken()}`,
    'Content-Type': 'application/json'
  }
});

export const getAllTodosApi = async () => {
  const res = await axios.get(`${API_URL}/todo`, authHeader());
  return res.data;
};

export const createTodoApi = async (data) => {
  const res = await axios.post(`${API_URL}/todo`, data, authHeader());
  return res.data;
};

export const updateTodoApi = async (id, data) => {
  const res = await axios.put(`${API_URL}/todo/${id}`, data, authHeader());
  return res.data;
};

export const deleteTodoApi = async (id) => {
  const res = await axios.delete(`${API_URL}/todo/${id}`, authHeader());
  return res.data;
};
