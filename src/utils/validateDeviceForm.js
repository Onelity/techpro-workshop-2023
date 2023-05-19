export const validateDeviceFormField = (name, value) => {
  let formErrors = {};

  switch (name) {
    case "name":
      const nameValid = value.trim().length > 0;
      formErrors.name = nameValid ? "" : "First name required";
      break;
    default:
      break;
  }

  if (value === "") {
    formErrors = {
      [name]: "",
    };
  }

  return formErrors;
};

export const validateAll = (formValues) => {
  const { name } = formValues;
  const validations = {
    name: "",
  };
  let isValid = true;

  if (!name) {
    validations.name = "First name is required";
    isValid = false;
  }

  if ((name && name.length < 3) || name.length > 50) {
    validations.name = "First name must contain between 3 and 50 characters";
    isValid = false;
  }

  return isValid;
};
