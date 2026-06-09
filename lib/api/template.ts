import { api } from '@/lib/api';

export interface WeddingTemplate {
  id: number;
  name: string;
  category: string;
  theme: string;
  description?: string;
  previewImageUrl?: string;
  active: boolean;
}

export class TemplateAPI {
  static async listTemplates(): Promise<WeddingTemplate[]> {
    return api.get<WeddingTemplate[]>('/templates');
  }

  static async toggleFavorite(templateId: number): Promise<boolean> {
    return api.post<boolean>(`/templates/${templateId}/favorite`);
  }

  static async getFavorites(): Promise<WeddingTemplate[]> {
    return api.get<WeddingTemplate[]>('/templates/favorites');
  }
}
