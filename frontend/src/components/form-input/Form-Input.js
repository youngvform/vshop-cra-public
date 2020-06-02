import React from "react";

import "./Form-Input.scss";

const FormInput = ({ handleChange, label, value, ...others }) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...others} />
    {label && (
      <label className={`${value.length ? "shrink" : ""} form-input-label`}>
        {label}
      </label>
    )}
  </div>
);

export default FormInput;
