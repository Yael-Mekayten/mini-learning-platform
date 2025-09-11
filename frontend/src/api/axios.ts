import axios from 'axios';

// Direct URL to bypass any caching issues
const api = axios.create({
  baseURL: 'https://mini-learning-platform.onrender.com/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

console.log('API configured for:', 'https://mini-learning-platform.onrender.com/api');

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
);

export default api;
