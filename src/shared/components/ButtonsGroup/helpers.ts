export function itemIsChecked(
  fieldValue: string | string[],
  itemValue: string,
): boolean {
  return Array.isArray(fieldValue)
    ? fieldValue.includes(itemValue)
    : fieldValue === itemValue;
}
