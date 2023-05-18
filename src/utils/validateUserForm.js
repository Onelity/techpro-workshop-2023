export const validateUserFormField = (name, value) => {
  let formErrors = {};

  switch (name) {
    case "email":
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      formErrors.email = emailValid ? "" : "Invalid email";
      break;
    case "phone":
      const phoneValid = value.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
      formErrors.phone = phoneValid ? "" : "Invalid phone";
      break;
    case "avatar":
      const avatarValid = isUrlValid(value);
      formErrors.avatar = avatarValid ? "" : "Invalid avatar";
      break;
    case "firstName":
      const firstNameValid = value.trim().length > 0;
      formErrors.firstName = firstNameValid ? "" : "First name required";
      break;
    case "lastName":
      const lastNameValid = value.trim().length > 0;
      formErrors.lastName = lastNameValid ? "" : "Last name required";
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
  const { email, phone, avatar, firstName, lastName } = formValues;
  const validations = {
    firstName: "",
    email: "",
    phone: "",
    avatar: "",
    lastName: "",
  };
  let isValid = true;

  if (!phone) {
    validations.phone = "Phone is required";
    isValid = false;
  }

  if (!phone.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)) {
    validations.phone = "Invalid phone";
    isValid = false;
  }

  if (!firstName) {
    validations.firstName = "First name is required";
    isValid = false;
  }

  if ((firstName && firstName.length < 3) || firstName.length > 50) {
    validations.firstName =
      "First name must contain between 3 and 50 characters";
    isValid = false;
  }

  if (!lastName) {
    validations.lastName = "Last name is required";
    isValid = false;
  }

  if ((lastName && lastName.length < 3) || lastName.length > 50) {
    validations.lastName = "Last name must contain between 3 and 50 characters";
    isValid = false;
  }

  if (!email) {
    validations.email = "Email is required";
    isValid = false;
  }

  if (email && !/\S+@\S+\.\S+/.test(email)) {
    validations.email = "Email format must be as example@mail.com";
    isValid = false;
  }

  if (!avatar) {
    validations.avatar = "Avatar is required";
    isValid = false;
  }

  if (!isUrlValid(avatar)) {
    validations.avatar = "Invalid avatar";
    isValid = false;
  }

  return isValid;
};

const isUrlValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};
