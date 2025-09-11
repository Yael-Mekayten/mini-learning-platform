import api from './axios';
import * as Types from '../types/index';
type Category = Types.Category;
type SubCategory = Types.SubCategory;

export const CategoriesService = {
  getCategories: () =>
    api.get<{ success: boolean; data: Category[] }>('/categories'),

  getSubCategories: (categoryId: number) =>
    api.get<{ success: boolean; data: SubCategory[] }>(`/categories/${categoryId}/subcategories`),
};
