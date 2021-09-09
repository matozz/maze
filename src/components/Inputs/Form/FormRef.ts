export type FormRef = {
  clearFields: () => void;
  resetFields: () => void;
  getFieldValue: (fieldName: string) => string;
  setFieldValue: (fieldName: string, value: string) => void;
};
