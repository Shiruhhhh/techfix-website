import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Switch } from 'antd';
import { useRef, useState } from 'react';
import { type Brand, listBrands } from '../brands/service';
import ModelFamilyForm from './ModelFamilyForm';
import {
  deleteModelFamily,
  listModelFamilies,
  type ModelFamily,
  restoreModelFamily,
} from './service';

export default function ModelFamiliesPage() {
  const actionRef = useRef<ActionType>(undefined);
  const [editing, setEditing] = useState<ModelFamily | null>(null);
  const [creating, setCreating] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);

  const columns: ProColumns<ModelFamily>[] = [
    { title: 'ID', dataIndex: 'id', width: 200, search: false },
    {
      title: 'Marca',
      dataIndex: 'brandId',
      valueType: 'select',
      fieldProps: {
        options: brands.map((b) => ({ label: b.name, value: b.id })),
      },
    },
    { title: 'Nome', dataIndex: 'name' },
    { title: 'Ordem', dataIndex: 'displayOrder', width: 80, search: false },
    {
      title: 'Ativo',
      dataIndex: 'enabled',
      search: false,
      width: 90,
      render: (_, record) => (
        <Switch
          checked={!!record.enabled}
          onChange={async (checked) => {
            if (checked) await restoreModelFamily(record.id);
            else await deleteModelFamily(record.id);
            actionRef.current?.reload();
          }}
        />
      ),
    },
    {
      title: 'Ações',
      valueType: 'option',
      render: (_, record) => [
        <a key="edit" onClick={() => setEditing(record)}>
          Editar
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<ModelFamily>
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        params={{}}
        request={async (params) => {
          if (brands.length === 0) setBrands(await listBrands());
          const data = await listModelFamilies(params.brandId);
          return { data, success: true, total: data.length };
        }}
        columns={columns}
        toolBarRender={() => [
          <Button key="create" type="primary" onClick={() => setCreating(true)}>
            Nova gama
          </Button>,
        ]}
      />
      {(creating || editing) && (
        <ModelFamilyForm
          modelFamily={editing}
          brands={brands}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            setCreating(false);
            setEditing(null);
            actionRef.current?.reload();
            message.success('Guardado');
          }}
        />
      )}
    </PageContainer>
  );
}
