import { request } from '@umijs/max';

export interface Brand {
  id: string;
  name: string;
  imageKey: string | null;
  iconSlug: string | null;
  iconColor: string | null;
  displayOrder: number;
  enabled: number;
  createdAt: string;
}

export async function listBrands(): Promise<Brand[]> {
  return request('/api/admin/brands');
}

export async function createBrand(data: Partial<Brand>) {
  return request('/api/admin/brands', { method: 'POST', data });
}

export async function updateBrand(id: string, data: Partial<Brand>) {
  return request(`/api/admin/brands/${id}`, { method: 'PUT', data });
}

export async function deleteBrand(id: string) {
  return request(`/api/admin/brands/${id}`, { method: 'DELETE' });
}

export async function restoreBrand(id: string) {
  return request(`/api/admin/brands/${id}/restore`, { method: 'POST' });
}
