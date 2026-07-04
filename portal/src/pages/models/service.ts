import { request } from '@umijs/max';

export const CATEGORIES = [
  'phone',
  'tablet',
  'laptop',
  'desktop',
  'watch',
  'console',
  'vacuum',
  'audio',
] as const;

export interface Model {
  id: string;
  brandId: string;
  familyId: string | null;
  name: string;
  category: (typeof CATEGORIES)[number];
  imageKey: string | null;
  releaseDate: string | null;
  enabled: number;
  createdAt: string;
}

export async function listModels(
  brandId?: string,
  familyId?: string,
): Promise<Model[]> {
  return request('/api/admin/models', { params: { brandId, familyId } });
}

export async function createModel(data: Partial<Model>) {
  return request('/api/admin/models', { method: 'POST', data });
}

export async function updateModel(id: string, data: Partial<Model>) {
  return request(`/api/admin/models/${id}`, { method: 'PUT', data });
}

export async function deleteModel(id: string) {
  return request(`/api/admin/models/${id}`, { method: 'DELETE' });
}

export async function restoreModel(id: string) {
  return request(`/api/admin/models/${id}/restore`, { method: 'POST' });
}
