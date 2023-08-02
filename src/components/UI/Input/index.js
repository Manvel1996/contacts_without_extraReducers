import React from "react";
import "./Input.scss";

export default function Input({
  label="",
  id,
  type,
  placeholder,
  value,
  onChange,
  err = false,
  errText = "",
}) {
  return (
    <>
      <label htmlFor={id} className="input-label">{label}</label>
      <div className="input-info">
        <input
          className="input"
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {err && <p className="input-info__err">{errText}</p>}
      </div>
    </>
  );
}
