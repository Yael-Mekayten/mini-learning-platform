import api from './axios';
import * as Types from '../types/index';
type User = Types.User;

export const AuthService = {
  register: (name: string, email: string, password: string) =>
    api.post<{ success: boolean; user: User }>('/auth/register', { name, email, password }),

  login: (email: string, password: string) =>
    api.post<{ success: boolean; user: User }>('/auth/login', { email, password }),

  me: () => api.get<{ success: boolean; user: User }>('/auth/me'),

  logout: () => api.post('/auth/logout'),
};
