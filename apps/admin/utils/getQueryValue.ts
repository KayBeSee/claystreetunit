export const getQueryValue = (value: string | string[]) => {
  return Array.isArray(value) ? value[0] : value;
};
