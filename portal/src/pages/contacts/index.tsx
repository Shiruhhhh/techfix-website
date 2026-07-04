import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef } from 'react';
import {
  archiveContact,
  type Contact,
  listContacts,
  markRead,
  unarchiveContact,
} from './service';

export default function ContactsPage() {
  const actionRef = useRef<ActionType>(undefined);

  const columns: ProColumns<Contact>[] = [
    { title: 'Nome', dataIndex: 'name', search: false },
    { title: 'Email', dataIndex: 'email', search: false },
    { title: 'Telefone', dataIndex: 'phone', search: false },
    { title: 'Mensagem', dataIndex: 'message', search: false, ellipsis: true },
    { title: 'Data', dataIndex: 'createdAt', search: false, width: 160 },
    {
      title: 'Estado',
      dataIndex: 'archived',
      valueType: 'select',
      valueEnum: { 0: { text: 'Ativo' }, 1: { text: 'Arquivado' } },
      render: (_, record) => (
        <>
          {!record.readAt && <Tag color="blue">Não lido</Tag>}
          {record.archived ? (
            <Tag>Arquivado</Tag>
          ) : (
            <Tag color="green">Ativo</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Ações',
      valueType: 'option',
      render: (_, record) =>
        [
          !record.readAt && (
            <a
              key="read"
              onClick={async () => {
                await markRead(record.id);
                actionRef.current?.reload();
              }}
            >
              Marcar lido
            </a>
          ),
          <a
            key="archive"
            onClick={async () => {
              if (record.archived) await unarchiveContact(record.id);
              else await archiveContact(record.id);
              actionRef.current?.reload();
            }}
          >
            {record.archived ? 'Desarquivar' : 'Arquivar'}
          </a>,
        ].filter(Boolean),
    },
  ];

  return (
    <PageContainer>
      <ProTable<Contact>
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        request={async (params) => {
          const archived =
            params.archived === undefined ? undefined : params.archived === '1';
          const data = await listContacts(archived);
          return { data, success: true, total: data.length };
        }}
        columns={columns}
      />
    </PageContainer>
  );
}
