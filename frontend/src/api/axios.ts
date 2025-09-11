import axios from 'axios';

// Environment variable check
const envVar = import.meta.env.VITE_API_URL;
const renderUrl = `https://mini-learning-platform.onrender.com/api`;

// Use environment variable or fallback
let apiBaseUrl: string;
if (envVar && typeof envVar === 'string' && envVar.length > 0) {
  apiBaseUrl = envVar;
  console.log('Using environment VITE_API_URL:', envVar);
} else {
  apiBaseUrl = renderUrl;
  console.log('Environment variable not found, using fallback:', renderUrl);
}

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

console.log('Final axios baseURL configured:', apiBaseUrl);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
);

export default api;
