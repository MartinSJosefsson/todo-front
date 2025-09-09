import axios from "axios";

const API_URL = "http://localhost:9090/api/todos";

// Create axios instance with token
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- CRUD APIs ---

export const getAllTodosApi = async () => {
  const response = await axiosInstance.get("");
  return response.data;
};

export const createTodoApi = async (todoData) => {
  const response = await axiosInstance.post("", todoData);
  return response.data;
};

export const updateTodoApi = async (id, todoData) => {
  const response = await axiosInstance.put(`/${id}`, todoData);
  return response.data;
};

export const deleteTodoApi = async (id) => {
  await axiosInstance.delete(`/${id}`);
};

// --- Attachment APIs (if used later) ---

export const uploadAttachmentsApi = async (id, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await axiosInstance.post(`/${id}/attachments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getAttachmentsApi = async (id) => {
  const response = await axiosInstance.get(`/${id}/attachments`);
  return response.data;
};

export const downloadAttachmentApi = async (todoId, attachmentId) => {
  const response = await axiosInstance.get(
    `/${todoId}/attachments/${attachmentId}`,
    { responseType: "blob" }
  );
  return response.data;
};

export const deleteAttachmentApi = async (todoId, attachmentId) => {
  await axiosInstance.delete(`/${todoId}/attachments/${attachmentId}`);
};
