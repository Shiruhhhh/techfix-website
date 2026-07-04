import { PageContainer, ProFormSelect } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Switch,
  Table,
} from 'antd';
import { useEffect, useState } from 'react';
import { type Brand, listBrands } from '../brands/service';
import { type IssueType, listIssueTypes } from '../issue-types/service';
import { listModels, type Model } from '../models/service';
import {
  type BatchItem,
  deleteModelIssueType,
  listModelIssueTypes,
  type ModelIssueType,
  restoreModelIssueType,
  saveModelIssueTypes,
} from './service';

interface Row {
  issueTypeId: string;
  name: string;
  price: number | null;
  eta: string | null;
  enabled: number;
}

export default function ModelIssueTypesPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandId, setBrandId] = useState<string>();
  const [models, setModels] = useState<Model[]>([]);
  const [modelId, setModelId] = useState<string>();
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listBrands().then(setBrands);
    listIssueTypes().then(setIssueTypes);
  }, []);

  useEffect(() => {
    if (!brandId) {
      setModels([]);
      return;
    }
    listModels(brandId).then(setModels);
    setModelId(undefined);
  }, [brandId]);

  useEffect(() => {
    if (!modelId || issueTypes.length === 0) {
      setRows([]);
      return;
    }
    listModelIssueTypes(modelId).then((existing: ModelIssueType[]) => {
      const byIssueType = new Map(existing.map((e) => [e.issueTypeId, e]));
      setRows(
        issueTypes.map((it) => {
          const found = byIssueType.get(it.id);
          return {
            issueTypeId: it.id,
            name: it.name,
            price: found?.price ?? null,
            eta: found?.eta ?? null,
            enabled: found ? found.enabled : 1,
          };
        }),
      );
    });
  }, [modelId, issueTypes]);

  const updateRow = (issueTypeId: string, patch: Partial<Row>) => {
    setRows((prev) =>
      prev.map((r) => (r.issueTypeId === issueTypeId ? { ...r, ...patch } : r)),
    );
  };

  const handleSave = async () => {
    if (!modelId) return;
    setSaving(true);
    try {
      const items: BatchItem[] = rows.map((r) => ({
        issueTypeId: r.issueTypeId,
        price: r.price,
        eta: r.eta,
      }));
      await saveModelIssueTypes(modelId, items);
      message.success('Preços guardados');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer>
      <Card style={{ marginBottom: 16 }}>
        <Form layout="inline">
          <Form.Item label="Marca">
            <ProFormSelect
              width={200}
              fieldProps={{ value: brandId, onChange: setBrandId }}
              options={brands.map((b) => ({ label: b.name, value: b.id }))}
              noStyle
            />
          </Form.Item>
          <Form.Item label="Modelo">
            <ProFormSelect
              width={280}
              fieldProps={{ value: modelId, onChange: setModelId }}
              options={models.map((m) => ({ label: m.name, value: m.id }))}
              noStyle
            />
          </Form.Item>
        </Form>
      </Card>

      {modelId && (
        <Card
          title="Preços por avaria"
          extra={
            <Button type="primary" loading={saving} onClick={handleSave}>
              Guardar
            </Button>
          }
        >
          <Table<Row>
            rowKey="issueTypeId"
            dataSource={rows}
            pagination={false}
            columns={[
              { title: 'Avaria', dataIndex: 'name' },
              {
                title: 'Preço (cêntimos)',
                dataIndex: 'price',
                render: (_, row) => (
                  <InputNumber
                    value={row.price ?? undefined}
                    onChange={(v) =>
                      updateRow(row.issueTypeId, { price: v ?? null })
                    }
                  />
                ),
              },
              {
                title: 'ETA',
                dataIndex: 'eta',
                render: (_, row) => (
                  <Input
                    value={row.eta ?? ''}
                    onChange={(e) =>
                      updateRow(row.issueTypeId, {
                        eta: e.target.value || null,
                      })
                    }
                  />
                ),
              },
              {
                title: 'Ativo',
                dataIndex: 'enabled',
                render: (_, row) => (
                  <Switch
                    checked={!!row.enabled}
                    onChange={async (checked) => {
                      if (checked)
                        await restoreModelIssueType(modelId, row.issueTypeId);
                      else await deleteModelIssueType(modelId, row.issueTypeId);
                      updateRow(row.issueTypeId, { enabled: checked ? 1 : 0 });
                    }}
                  />
                ),
              },
            ]}
          />
        </Card>
      )}
    </PageContainer>
  );
}
