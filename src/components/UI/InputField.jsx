import React from "react";
import "../styles.css";

export const InputField = ({
  type,
  value,
  placeholder,
  label,
  name,
  id,
  onChange,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        id={id}
        onChange={onChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
