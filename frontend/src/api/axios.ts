import axios from 'axios';

// Load API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'https://mini-learning-platform.onrender.com/api';

// Log warning if using fallback
if (!import.meta.env.VITE_API_URL) {
  console.warn('⚠️ VITE_API_URL not found, using fallback URL');
}

console.log('Environment VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Final API_URL used:', API_URL);

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
