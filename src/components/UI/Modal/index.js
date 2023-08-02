import React from "react";

import { AiOutlineClose } from "react-icons/ai";

import "./Modal.scss";

export default function Modal({ children, visible, setVisible }) {
  return (
    <div
      className={`modal ${visible && "modal--active"}`}
      onClick={() => setVisible(false)}
    >
      <div
        className={`modal-content  ${visible && "modal--active"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <AiOutlineClose
          className="modal-content__close"
          onClick={() => setVisible(false)}
        />
        {children}
      </div>
    </div>
  );
}
