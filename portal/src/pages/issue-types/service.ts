import { request } from '@umijs/max';

export interface IssueType {
  id: string;
  name: string;
  description: string | null;
  iconKey: string | null;
  displayOrder: number;
  enabled: number;
  createdAt: string;
}

export async function listIssueTypes(): Promise<IssueType[]> {
  return request('/api/admin/issue-types');
}

export async function createIssueType(data: Partial<IssueType>) {
  return request('/api/admin/issue-types', { method: 'POST', data });
}

export async function updateIssueType(id: string, data: Partial<IssueType>) {
  return request(`/api/admin/issue-types/${id}`, { method: 'PUT', data });
}

export async function deleteIssueType(id: string) {
  return request(`/api/admin/issue-types/${id}`, { method: 'DELETE' });
}

export async function restoreIssueType(id: string) {
  return request(`/api/admin/issue-types/${id}/restore`, { method: 'POST' });
}
