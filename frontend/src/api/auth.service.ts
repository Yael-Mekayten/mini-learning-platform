import axios from 'axios';
import * as Types from '../types/index';
type User = Types.User;

// Direct API calls to bypass any caching issues
const RENDER_API = 'https://mini-learning-platform.onrender.com/api';

export const AuthService = {
  register: (name: string, email: string, password: string) =>
    axios.post<{ success: boolean; user: User }>(`${RENDER_API}/auth/register`, { name, email, password }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }),

  login: (email: string, password: string) =>
    axios.post<{ success: boolean; user: User }>(`${RENDER_API}/auth/login`, { email, password }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }),

  me: () => axios.get<{ success: boolean; user: User }>(`${RENDER_API}/auth/me`, {
    withCredentials: true
  }),

  logout: () => axios.post(`${RENDER_API}/auth/logout`, {}, {
    withCredentials: true
  }),
};
