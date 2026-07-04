import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import type { Brand } from '../brands/service';
import {
  createModelFamily,
  type ModelFamily,
  updateModelFamily,
} from './service';

export default function ModelFamilyForm({
  modelFamily,
  brands,
  onClose,
  onSaved,
}: {
  modelFamily: ModelFamily | null;
  brands: Brand[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!modelFamily;

  return (
    <ModalForm<ModelFamily>
      title={isEdit ? 'Editar gama' : 'Nova gama'}
      open
      initialValues={modelFamily ?? { displayOrder: 0 }}
      onFinish={async (values) => {
        if (isEdit) await updateModelFamily(modelFamily!.id, values);
        else await createModelFamily(values);
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
      <ProFormSelect
        name="brandId"
        label="Marca"
        disabled={isEdit}
        rules={[{ required: true }]}
        options={brands.map((b) => ({ label: b.name, value: b.id }))}
      />
      <ProFormText name="name" label="Nome" rules={[{ required: true }]} />
      <ProFormDigit name="displayOrder" label="Ordem" />
    </ModalForm>
  );
}
