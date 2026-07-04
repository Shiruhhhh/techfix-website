import { request } from '@umijs/max';

export interface ModelIssueType {
  modelId: string;
  issueTypeId: string;
  price: number | null;
  eta: string | null;
  enabled: number;
}

export async function listModelIssueTypes(
  modelId: string,
): Promise<ModelIssueType[]> {
  return request('/api/admin/model-issue-types', { params: { modelId } });
}

export interface BatchItem {
  issueTypeId: string;
  price: number | null;
  eta: string | null;
}

export async function saveModelIssueTypes(modelId: string, items: BatchItem[]) {
  return request(`/api/admin/model-issue-types/model/${modelId}`, {
    method: 'PATCH',
    data: { items },
  });
}

export async function deleteModelIssueType(
  modelId: string,
  issueTypeId: string,
) {
  return request(`/api/admin/model-issue-types/${modelId}/${issueTypeId}`, {
    method: 'DELETE',
  });
}

export async function restoreModelIssueType(
  modelId: string,
  issueTypeId: string,
) {
  return request(
    `/api/admin/model-issue-types/${modelId}/${issueTypeId}/restore`,
    {
      method: 'POST',
    },
  );
}
