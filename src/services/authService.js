import axios from "axios";

const AUTH_URL = "http://localhost:9090/api/auth/login";

export const authService = {
  login: async (username, password) => {
    const response = await axios.post(AUTH_URL, { username, password });
    const token = response.data.token;

    // Save token in localStorage
    localStorage.setItem("token", token);

    return token;
  },

  getToken: () => localStorage.getItem("token"),

  logout: () => {
    localStorage.removeItem("token");
  },
};
