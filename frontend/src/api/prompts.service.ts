import api from './axios';
import * as Types from '../types/index';
type Prompt = Types.Prompt;

export const PromptsService = {
  create: (categoryId: number, subCategoryId: number | null, prompt: string) =>
    api.post<{ success: boolean; data: Prompt }>('/prompts', { categoryId, subCategoryId, prompt }),

  getHistory: () =>
    api.get<{ success: boolean; data: Prompt[] }>('/prompts/me'),
};
