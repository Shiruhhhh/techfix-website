import {
  ModalForm,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-components';
import { type Brand, createBrand, updateBrand } from './service';

export default function BrandForm({
  brand,
  onClose,
  onSaved,
}: {
  brand: Brand | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!brand;

  return (
    <ModalForm<Brand>
      title={isEdit ? 'Editar marca' : 'Nova marca'}
      open
      initialValues={brand ?? { displayOrder: 0 }}
      onFinish={async (values) => {
        if (isEdit) await updateBrand(brand!.id, values);
        else await createBrand(values);
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
      <ProFormText name="iconSlug" label="Icon slug (Simple Icons)" />
      <ProFormText name="iconColor" label="Icon color (HEX sem #)" />
      <ProFormDigit name="displayOrder" label="Ordem" />
    </ModalForm>
  );
}
