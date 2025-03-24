export default function createFormDataAndError(data) {
  const { applicableFields, errorFields } = Object.entries(data).reduce(
    (acc, [key, value]) => {
      acc.applicableFields[key] = {
        value: value || "",
        type: "",
      };
      acc.errorFields[key] = "";
      return acc;
    },
    { applicableFields: {}, errorFields: {} }
  );

  return {
    applicableFields,
    errorFields,
  };
}
