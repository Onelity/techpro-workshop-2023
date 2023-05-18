import "../styles.css";

export const InputField = ({
  value,
  label,
  name,
  placeholder,
  type,
  onChange,
  error,
}) => (
  <div className="form-group">
    {label && <label htmlFor="input-field">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
    />
    {error && <span className="error">{error}</span>}
  </div>
);
