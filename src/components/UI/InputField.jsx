import React from "react";

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
    <div className="input-field">
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
