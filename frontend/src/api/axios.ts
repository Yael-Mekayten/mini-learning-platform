import axios from 'axios';

// Load API URL from environment variables with fallback
const envApiUrl = import.meta.env?.VITE_API_URL;
const FALLBACK_URL = 'https://mini-learning-platform.onrender.com/api';
const API_URL = envApiUrl && envApiUrl.trim() !== '' ? envApiUrl : FALLBACK_URL;

// Debug logging
console.log('Raw env VITE_API_URL:', envApiUrl);
console.log('Using fallback?', !envApiUrl || envApiUrl.trim() === '');
console.log('Final API_URL:', API_URL);

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
