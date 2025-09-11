import axios from 'axios';

// Load API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Log warning if API_URL is undefined
if (!API_URL) {
  console.warn('⚠️ VITE_API_URL is not defined in environment variables');
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

console.log('API configured with baseURL:', API_URL);
console.log('Build timestamp:', new Date().toISOString());

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
);

export default api;
