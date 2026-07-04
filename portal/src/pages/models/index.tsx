import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Switch } from 'antd';
import { useRef, useState } from 'react';
import { type Brand, listBrands } from '../brands/service';
import { listModelFamilies, type ModelFamily } from '../model-families/service';
import ModelForm from './ModelForm';
import { deleteModel, listModels, type Model, restoreModel } from './service';

export default function ModelsPage() {
  const actionRef = useRef<ActionType>(undefined);
  const [editing, setEditing] = useState<Model | null>(null);
  const [creating, setCreating] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [families, setFamilies] = useState<ModelFamily[]>([]);

  const columns: ProColumns<Model>[] = [
    { title: 'ID', dataIndex: 'id', width: 220, search: false },
    {
      title: 'Marca',
      dataIndex: 'brandId',
      valueType: 'select',
      fieldProps: {
        options: brands.map((b) => ({ label: b.name, value: b.id })),
      },
    },
    {
      title: 'Gama',
      dataIndex: 'familyId',
      valueType: 'select',
      fieldProps: {
        options: families.map((f) => ({ label: f.name, value: f.id })),
      },
    },
    { title: 'Nome', dataIndex: 'name' },
    {
      title: 'Categoria',
      dataIndex: 'category',
      valueType: 'select',
      search: false,
    },
    { title: 'Lançamento', dataIndex: 'releaseDate', search: false },
    {
      title: 'Ativo',
      dataIndex: 'enabled',
      search: false,
      width: 90,
      render: (_, record) => (
        <Switch
          checked={!!record.enabled}
          onChange={async (checked) => {
            if (checked) await restoreModel(record.id);
            else await deleteModel(record.id);
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
      <ProTable<Model>
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        request={async (params) => {
          if (brands.length === 0) setBrands(await listBrands());
          if (families.length === 0) setFamilies(await listModelFamilies());
          const data = await listModels(params.brandId, params.familyId);
          return { data, success: true, total: data.length };
        }}
        columns={columns}
        toolBarRender={() => [
          <Button key="create" type="primary" onClick={() => setCreating(true)}>
            Novo modelo
          </Button>,
        ]}
      />
      {(creating || editing) && (
        <ModelForm
          model={editing}
          brands={brands}
          families={families}
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
