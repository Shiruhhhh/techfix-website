import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Switch } from 'antd';
import { useRef, useState } from 'react';
import BrandForm from './BrandForm';
import { type Brand, deleteBrand, listBrands, restoreBrand } from './service';

export default function BrandsPage() {
  const actionRef = useRef<ActionType>(undefined);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [creating, setCreating] = useState(false);

  const columns: ProColumns<Brand>[] = [
    { title: 'ID', dataIndex: 'id', width: 160 },
    { title: 'Nome', dataIndex: 'name' },
    { title: 'Icon slug', dataIndex: 'iconSlug', search: false },
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
            if (checked) await restoreBrand(record.id);
            else await deleteBrand(record.id);
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
      <ProTable<Brand>
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        request={async () => {
          const data = await listBrands();
          return { data, success: true, total: data.length };
        }}
        columns={columns}
        toolBarRender={() => [
          <Button key="create" type="primary" onClick={() => setCreating(true)}>
            Nova marca
          </Button>,
        ]}
      />
      {(creating || editing) && (
        <BrandForm
          brand={editing}
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
