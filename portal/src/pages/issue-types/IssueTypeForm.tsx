import {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { createIssueType, type IssueType, updateIssueType } from './service';

export default function IssueTypeForm({
  issueType,
  onClose,
  onSaved,
}: {
  issueType: IssueType | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!issueType;

  return (
    <ModalForm<IssueType>
      title={isEdit ? 'Editar tipo de avaria' : 'Novo tipo de avaria'}
      open
      initialValues={issueType ?? { displayOrder: 0 }}
      onFinish={async (values) => {
        if (isEdit) await updateIssueType(issueType!.id, values);
        else await createIssueType(values);
        onSaved();
        return true;
      }}
      modalProps={{ onCancel: onClose, destroyOnHidden: true }}
    >
      <ProFormText
        name="id"
        label="ID"
        disabled={isEdit}
        rules={[{ required: true }]}
      />
      <ProFormText name="name" label="Nome" rules={[{ required: true }]} />
      <ProFormTextArea name="description" label="Descrição" />
      <ProFormText name="iconKey" label="Icon key" />
      <ProFormDigit name="displayOrder" label="Ordem" />
    </ModalForm>
  );
}
