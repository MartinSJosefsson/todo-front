import axios from "axios";

const API_URL = "http://localhost:9090/api/person";

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const getAllUsersApi = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};
