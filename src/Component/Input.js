import React from "react";

const Input = props => {
  return (
    <div className="log-in-form-input">
      <div className="input-label">{props.nameFrench}</div>
      <input
        type={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Input;
