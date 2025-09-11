import axios from 'axios';
import * as Types from '../types/index';
type User = Types.User;

// Load API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Log warning if API_URL is undefined
if (!API_URL) {
  console.warn('⚠️ VITE_API_URL is not defined in environment variables');
}

export const AuthService = {
  register: (name: string, email: string, password: string) =>
    axios.post<{ success: boolean; user: User }>(`${API_URL}/auth/register`, { name, email, password }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }),

  login: (email: string, password: string) =>
    axios.post<{ success: boolean; user: User }>(`${API_URL}/auth/login`, { email, password }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }),

  me: () => axios.get<{ success: boolean; user: User }>(`${API_URL}/auth/me`, {
    withCredentials: true
  }),

  logout: () => axios.post(`${API_URL}/auth/logout`, {}, {
    withCredentials: true
  }),
};
