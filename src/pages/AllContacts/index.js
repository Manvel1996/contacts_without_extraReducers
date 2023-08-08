import React, { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";

import { List, Filter, Form } from "../../components/Contacts";
import { Button, Modal, Pagination } from "../../components/UI";

import { CONTACT_PAGE_GET_COUNT, CONTACT_GROUP } from "../../constants";

import { getContacts } from "../../redux/slices/ContactsSlice/contactsSelector";
import { getGroups } from "../../redux/slices/GroupsSlice/groupSelector";

import { contactsFilter, paginationSlice } from "../../Utils/helper";

import "./index.scss";

export default function AllContacts() {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [group, setGroup] = useState(CONTACT_GROUP.ALL);
  const [search, setSearch] = useState("");
  const [editedContact, setEditedContact] = useState(null);

  const contactsGroups = useSelector(getGroups);
  const contactsList = useSelector(getContacts);

  const filteredContactsList = useMemo(
    () => contactsFilter(contactsList, group, search),
    [contactsList, search, group]
  );

  const contactsListSlice = useMemo(
    () => paginationSlice(filteredContactsList, currentPage),
    [filteredContactsList, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  function changeGroup(value) {
    setGroup(value);
    setCurrentPage(1);
  }

  function closeModal() {
    setVisible(false);
  }

  function openModal() {
    setVisible(true);
  }

  function changeEditedContact(contact) {
    setEditedContact(contact);
  }

  function openAddContact() {
    setEditedContact(null);
    setVisible(true);
  }

  return (
    <div className="all-contacts">
      <Filter
        contactsGroups={contactsGroups}
        group={group}
        search={search}
        setSearch={setSearch}
        changeGroup={changeGroup}
      />

      <Button onClick={openAddContact}>Add Contact</Button>

      <List
        contactsList={contactsListSlice}
        openModal={openModal}
        changeEditedContact={changeEditedContact}
      />

      {filteredContactsList?.length !== 0 && (
        <Pagination
          totalItems={filteredContactsList?.length}
          itemsPerPage={CONTACT_PAGE_GET_COUNT}
          pageChange={setCurrentPage}
          currentPage={currentPage}
        />
      )}

      <Modal visible={visible} setVisible={setVisible}>
        <Form
          editedContact={editedContact}
          closeModal={closeModal}
          visible={visible}
        />
      </Modal>
    </div>
  );
}
