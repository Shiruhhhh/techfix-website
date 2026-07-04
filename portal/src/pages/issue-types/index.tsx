import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Switch } from 'antd';
import { useRef, useState } from 'react';
import IssueTypeForm from './IssueTypeForm';
import {
  deleteIssueType,
  type IssueType,
  listIssueTypes,
  restoreIssueType,
} from './service';

export default function IssueTypesPage() {
  const actionRef = useRef<ActionType>(undefined);
  const [editing, setEditing] = useState<IssueType | null>(null);
  const [creating, setCreating] = useState(false);

  const columns: ProColumns<IssueType>[] = [
    { title: 'ID', dataIndex: 'id', width: 160 },
    { title: 'Nome', dataIndex: 'name' },
    {
      title: 'Descrição',
      dataIndex: 'description',
      search: false,
      ellipsis: true,
    },
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
            if (checked) await restoreIssueType(record.id);
            else await deleteIssueType(record.id);
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
      <ProTable<IssueType>
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        request={async () => {
          const data = await listIssueTypes();
          return { data, success: true, total: data.length };
        }}
        columns={columns}
        toolBarRender={() => [
          <Button key="create" type="primary" onClick={() => setCreating(true)}>
            Novo tipo de avaria
          </Button>,
        ]}
      />
      {(creating || editing) && (
        <IssueTypeForm
          issueType={editing}
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
