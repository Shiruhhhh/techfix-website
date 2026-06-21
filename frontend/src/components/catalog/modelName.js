export function fullModelName(model) {
  return model.name.toLowerCase().startsWith(model.brand.name.toLowerCase())
    ? model.name
    : `${model.brand.name} ${model.name}`;
}
