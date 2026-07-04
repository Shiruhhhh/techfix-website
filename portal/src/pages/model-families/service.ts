import { request } from '@umijs/max';

export interface ModelFamily {
  id: string;
  brandId: string;
  name: string;
  displayOrder: number;
  enabled: number;
  createdAt: string;
}

export async function listModelFamilies(
  brandId?: string,
): Promise<ModelFamily[]> {
  return request('/api/admin/model-families', {
    params: brandId ? { brandId } : undefined,
  });
}

export async function createModelFamily(data: Partial<ModelFamily>) {
  return request('/api/admin/model-families', { method: 'POST', data });
}

export async function updateModelFamily(
  id: string,
  data: Partial<ModelFamily>,
) {
  return request(`/api/admin/model-families/${id}`, { method: 'PUT', data });
}

export async function deleteModelFamily(id: string) {
  return request(`/api/admin/model-families/${id}`, { method: 'DELETE' });
}

export async function restoreModelFamily(id: string) {
  return request(`/api/admin/model-families/${id}/restore`, { method: 'POST' });
}
