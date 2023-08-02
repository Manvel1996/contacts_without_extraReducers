import React from "react";

import { AiOutlineClose } from "react-icons/ai";

import "./ModalConfirm.scss";

export default function ModalConfirm({
  title,
  visibleConfirm,
  setVisibleConfirm,
  confirmFunc,
}) {
  return (
    <div
      className={`modal-confirm ${visibleConfirm && "modal-confirm--active"}`}
      onClick={() => setVisibleConfirm(false)}
    >
      <div
        className={`modal-confirm-content ${visibleConfirm && "modal--active"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <AiOutlineClose
          className="modal-confirm-content__close"
          onClick={() => setVisibleConfirm(false)}
        />

        <h2 className="modal-confirm__title">{title}</h2>

        <div className="modal-confirm__buttons">
          <button
            className="button--green"
            onClick={() => {
              setVisibleConfirm(false);
              confirmFunc();
            }}
          >
            Yes
          </button>

          <button
            className="button--red"
            onClick={() => setVisibleConfirm(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
