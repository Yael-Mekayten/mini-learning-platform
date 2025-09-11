import axios from 'axios';

// Direct URL to bypass any caching issues - Updated at 2025-01-11
const api = axios.create({
  baseURL: 'https://mini-learning-platform.onrender.com/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

console.log('API configured for Render:', 'https://mini-learning-platform.onrender.com/api');
console.log('Build timestamp:', '2025-01-11-21:00');

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
);

export default api;
