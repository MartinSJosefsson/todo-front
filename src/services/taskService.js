//*todo: implement taskService and call the API

import axios from 'axios';
import {authService} from './authService';

const API_URL = 'localhost9090/api'; // Replace with your API URL
const config = {
  headers: {
    Authorization: `Bearer ${authService.getToken()}`,
  },
};

export const getAllTodosApi = async () => {
  const response = await axios.get(`${API_URL}/todo`, config);

  const payload = response.data;
  console.log(payload);
  return payload;
};