import axios from 'axios';

// Hardcoded URL that Vite cannot optimize away
const RENDER_API_BASE = ['https://', 'mini-learning-platform', '.onrender.com', '/api'].join('');

// Try environment variable first
const envApiUrl = import.meta.env?.VITE_API_URL;
const finalBaseUrl = envApiUrl || RENDER_API_BASE;

console.log('Environment VITE_API_URL:', envApiUrl);
console.log('Hardcoded fallback:', RENDER_API_BASE);
console.log('Final baseURL used:', finalBaseUrl);

const api = axios.create({
  baseURL: finalBaseUrl,
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
