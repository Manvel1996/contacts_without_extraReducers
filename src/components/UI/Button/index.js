import React from "react";

import "./Button.scss";

export default function Button({ children, ...props }) {
  return (
    <button {...props} className="button button--blue">
      <span>{children}</span>
    </button>
  );
}
