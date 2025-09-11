import axios from 'axios';

const baseURL = (import.meta as any).env.VITE_API_URL || 'https://mini-learning-platform.onrender.com/api';
console.log('API Base URL:', baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
);

export default api;
