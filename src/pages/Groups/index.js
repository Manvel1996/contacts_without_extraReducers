import React, { useEffect, useState, useMemo } from "react";

import { useSelector } from "react-redux";

import { List, Filter, Form, AddGroup } from "../../components/contact";
import { Button, Modal, Pagination } from "../../components/UI";

import { CONTACT_PAGE_GET_COUNT, CONTACT_GROUP } from "../../constants";

import { getContacts, getContactsGroups } from "../../redux/selector/auth";

import { contactsFilter, paginationSlice } from "../../utils";

import "./Groups.scss";

export default function Groups() {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [group, setGroup] = useState(CONTACT_GROUP.ALL);
  const [isOpenAddGroup, setIsOpenAddGroup] = useState(false);

  const [search, setSearch] = useState("");
  const [editedContact, setEditedContact] = useState(null);

  const contactsGroups = useSelector(getContactsGroups);
  const contactsList = useSelector(getContacts);

  const filtredContactsList = useMemo(
    () => contactsFilter(contactsList, group, search),
    [contactsList, group, search]
  );

  const contactsListSlice = useMemo(
    () => paginationSlice(filtredContactsList, currentPage),
    [filtredContactsList, currentPage]
  );

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
    setIsOpenAddGroup(false);
    setEditedContact(null);
    setVisible(true);
  }

  function openAddGroup() {
    setIsOpenAddGroup(true);
    setVisible(true);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="contacts-group">
      <Filter
        contactsGroups={contactsGroups}
        group={group}
        search={search}
        setSearch={setSearch}
        changeGroup={changeGroup}
      />

      <div className="contacts-group-adders">
        <Button onClick={openAddContact}>Add Contact</Button>
        <Button onClick={openAddGroup}>Add Group</Button>
      </div>

      <List
        contactsList={contactsListSlice}
        openModal={openModal}
        changeEditedContact={changeEditedContact}
      />

      {filtredContactsList?.length !== 0 && (
        <Pagination
          totalItems={filtredContactsList?.length}
          itemsPerPage={CONTACT_PAGE_GET_COUNT}
          pageChange={setCurrentPage}
          currentPage={currentPage}
        />
      )}

      <Modal visible={visible} setVisible={setVisible}>
        {isOpenAddGroup ? (
          <AddGroup closeModal={closeModal} visible={visible} />
        ) : (
          <Form
            editedContact={editedContact}
            closeModal={closeModal}
            visible={visible}
          />
        )}
      </Modal>
    </div>
  );
}
