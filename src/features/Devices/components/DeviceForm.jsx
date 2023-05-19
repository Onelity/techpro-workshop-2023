import { useEffect, useState } from "react";
import { InputField } from "../../../components/UI/InputField";
import { Button } from "../../../components/UI/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  validateAll,
  validateDeviceFormField,
} from "../../../utils/validateDeviceForm";

const baseURL = "https://onelity.azurewebsites.net/devices";

export const DeviceForm = ({ device }) => {
  const [formValues, setFormValues] = useState({
    name: "",
  });
  const [validations, setValidations] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const { name } = formValues;

  useEffect(() => {
    if (device) {
      setFormValues(device);
    }
  }, [device]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidations({ ...validations, ...validateDeviceFormField(name, value) });
  };

  const saveClickHandler = () => {
    if (device) {
      axios.put(`${baseURL}/${device.id}`, formValues);
    } else {
      axios.post(baseURL, formValues).then(reset);
    }
  };

  const deleteClickHandler = () => {
    axios.delete(`${baseURL}/${device.id}`).then(() => navigate("/devices"));
  };

  const reset = () => {
    const fields = {
      name: "",
    };

    setFormValues(device ? device : fields);
    setValidations(fields);
  };

  return (
    <>
      <InputField
        type="text"
        value={name}
        placeholder="place your device name"
        label="Device name"
        name="name"
        id="name"
        onChange={handleChange}
        error={validations.name}
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
        {device && (
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
