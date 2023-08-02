import React, { useState } from "react";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { ConfirmModal } from "../../UI";

// import { getUserId, removeContact } from "../redux/features/auth/AuthActions";

import { CONTACT_STATUS, AUTH_DEFAULT_IMG } from "../../../constants";

import "./Item.scss";

export default function Item({ contact, openModal, changeEditedContact }) {
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const dispatch = useDispatch();
  // const userId = useSelector(getUserId);
  const userId = 5;

  const id = contact?.id;

  function confirmFunc() {
    // dispatch(removeContact({ id, userId }));
  }

  function editContact(contact) {
    changeEditedContact(contact);
    openModal();
  }

  return (
    <div className="contact-item">
      <div className="contact-info">
        <img
          className="contact-info__img"
          src={contact.photoUrl ? contact.photoUrl : AUTH_DEFAULT_IMG}
        />

        <div
          className={`contact-info__status ${
            contact.status === CONTACT_STATUS.ONLINE
              ? "contact-info__status--green"
              : "contact-info__status--red"
          }`}
        />
      </div>

      <p className="contact-item__name">{contact.userName}</p>
      <p className="contact-item__surname">{contact.surname}</p>
      <p className="contact-item__email">{contact.email}</p>
      <p className="contact-item__phone">{contact.phone}</p>

      <div className="contact-buttons">
        <AiFillEdit
          className="contact-buttons__button"
          onClick={() => editContact(contact)}
        />

        <AiFillDelete
          className="contact-buttons__button"
          onClick={() => setVisibleConfirm(true)}
        />
      </div>

      <ConfirmModal
        title="Are you sure you want to delete the contact?"
        visibleConfirm={visibleConfirm}
        setVisibleConfirm={setVisibleConfirm}
        confirmFunc={confirmFunc}
      />
    </div>
  );
}
