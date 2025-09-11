import axios from 'axios';

// Create base URL with guaranteed fallback
function getApiBaseUrl(): string {
  const env = import.meta.env?.VITE_API_URL;
  
  console.log('Raw env value:', env);
  console.log('Env type:', typeof env);
  
  if (env && typeof env === 'string' && env.trim().length > 0) {
    console.log('Using environment URL:', env);
    return env.trim();
  }
  
  // Dynamic URL construction that Vite cannot optimize
  const protocol = 'https';
  const domain = 'mini-learning-platform';
  const tld = 'onrender';
  const ext = 'com';
  const fallback = protocol + '://' + domain + '.' + tld + '.' + ext;
  
  console.log('Constructed fallback:', fallback);
  return fallback;
}

const baseURL = getApiBaseUrl();
console.log('FINAL baseURL for axios:', baseURL);

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Log every request to see what URL is actually being used
api.interceptors.request.use((config) => {
  console.log('Making request to:', (config.baseURL || '') + (config.url || ''));
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
);

export default api;
