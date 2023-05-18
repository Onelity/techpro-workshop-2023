export const Button = (props) => {
  const btnEnableDisable = !props.isDisabled ? "btn-enable" : "btn-disabled";
  const btnClass = props.className ? props.className : "";

  return (
    <button
      id={props.id}
      className={`btn ${btnEnableDisable} ${btnClass}`}
      onClick={props.clickHandler}
      type={props.type}
      disabled={props.isDisabled}
    >
      {props.value}
    </button>
  );
};
