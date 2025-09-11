import api from './axios';

export const AdminService = {
  getAllUsersWithPrompts: () =>
    api.get<{ success: boolean; data: any }>('/admin/users'),
};
