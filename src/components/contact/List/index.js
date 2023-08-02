import React from "react";

import Item from "../Item";

import "./List.scss";

export default function List({
  contactsList,
  openModal,
  changeEditedContact,
}) {
  return (
    <div className="contact-list">
      {contactsList?.length === 0 ? (
        <h2 className="contact-list__title">Contacts list is empty</h2>
      ) : (
        contactsList.map((contact) => (
          <Item
            key={contact?.id}
            contact={contact}
            openModal={openModal}
            changeEditedContact={changeEditedContact}
          />
        ))
      )}
    </div>
  );
}
