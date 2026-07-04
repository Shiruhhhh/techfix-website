import { request } from '@umijs/max';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  readAt: string | null;
  archived: number;
  createdAt: string;
}

export async function listContacts(archived?: boolean): Promise<Contact[]> {
  return request('/api/admin/contacts', {
    params:
      archived === undefined ? undefined : { archived: archived ? '1' : '0' },
  });
}

export async function markRead(id: number) {
  return request(`/api/admin/contacts/${id}/read`, { method: 'PATCH' });
}

export async function archiveContact(id: number) {
  return request(`/api/admin/contacts/${id}/archive`, { method: 'PATCH' });
}

export async function unarchiveContact(id: number) {
  return request(`/api/admin/contacts/${id}/unarchive`, { method: 'PATCH' });
}
