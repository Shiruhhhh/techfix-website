import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import type { Brand } from '../brands/service';
import type { ModelFamily } from '../model-families/service';
import { CATEGORIES, createModel, type Model, updateModel } from './service';

export default function ModelForm({
  model,
  brands,
  families,
  onClose,
  onSaved,
}: {
  model: Model | null;
  brands: Brand[];
  families: ModelFamily[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!model;

  return (
    <ModalForm<Model>
      title={isEdit ? 'Editar modelo' : 'Novo modelo'}
      open
      initialValues={model ?? {}}
      onFinish={async (values) => {
        if (isEdit) await updateModel(model!.id, values);
        else await createModel(values);
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
      <ProFormSelect
        name="familyId"
        label="Gama"
        options={families.map((f) => ({ label: f.name, value: f.id }))}
      />
      <ProFormText name="name" label="Nome" rules={[{ required: true }]} />
      <ProFormSelect
        name="category"
        label="Categoria"
        rules={[{ required: true }]}
        options={CATEGORIES.map((c) => ({ label: c, value: c }))}
      />
      <ProFormDatePicker name="releaseDate" label="Data de lançamento" />
    </ModalForm>
  );
}
