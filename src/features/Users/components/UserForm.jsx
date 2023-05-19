import { useEffect, useState } from "react";
import { InputField } from "../../../components/UI/InputField";
import { Button } from "../../../components/UI/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  validateAll,
  validateUserFormField,
} from "../../../utils/validateUserForm";

const baseURL = "https://onelity.azurewebsites.net/users";

export const UserForm = ({ user }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [validations, setValidations] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const navigate = useNavigate();

  const { firstName, lastName, email, phone, avatar } = formValues;

  useEffect(() => {
    if (user) {
      setFormValues(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidations({ ...validations, ...validateUserFormField(name, value) });
  };

  const saveClickHandler = () => {
    if (user) {
      axios.put(`${baseURL}/${user.id}`, formValues);
    } else {
      axios.post(baseURL, formValues).then(reset);
    }
  };

  const deleteClickHandler = () => {
    axios.delete(`${baseURL}/${user.id}`).then(() => navigate("/users"));
  };

  const reset = () => {
    const fields = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      avatar: "",
    };

    setFormValues(user ? user : fields);
    setValidations(fields);
  };

  return (
    <>
      <InputField
        type="text"
        value={firstName}
        placeholder="place your first name"
        label="First name"
        name="firstName"
        id="firstName"
        onChange={handleChange}
        error={validations.firstName}
      />
      <InputField
        type="text"
        value={lastName}
        placeholder="place your last name"
        label="Last name"
        name="lastName"
        id="lastName"
        onChange={handleChange}
        error={validations.lastName}
      />
      <InputField
        type="text"
        value={email}
        placeholder="place your email"
        label="Email"
        name="email"
        id="email"
        onChange={handleChange}
        error={validations.email}
      />
      <InputField
        type="text"
        value={phone}
        placeholder="place your phone"
        label="Phone"
        name="phone"
        id="phone"
        onChange={handleChange}
        error={validations.phone}
      />
      <InputField
        type="text"
        value={avatar}
        placeholder="place your avatar"
        label="Avatar"
        name="avatar"
        id="avatar"
        onChange={handleChange}
        error={validations.avatar}
      />
      <div className="actions-container">
        <div>
          <Button
            id="btnSubmit"
            type="Submit"
            className="btn-save mr-10"
            value="Save"
            isDisabled={!validateAll(formValues)}
            clickHandler={saveClickHandler}
          />
          <Button
            id="btnReset"
            className="btn-reset"
            value="Reset"
            isDisabled={false}
            clickHandler={reset}
          />
        </div>
        {user && (
          <Button
            id="btnDelete"
            className="btn-delete"
            value="Delete"
            isDisabled={false}
            clickHandler={deleteClickHandler}
          />
        )}
      </div>
    </>
  );
};
