import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { List, Form } from "../../components/contact";
import { Modal, Pagination, Input } from "../../components/UI";

import { CONTACT_PAGE_GET_COUNT } from "../../constants";

import { getContacts } from "../../redux/selector/auth";

import { useFavoriteContactsFilter, usePaginationSlice } from "../../hooks";

import "./Home.scss";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [editedContact, setEditedContact] = useState(null);

  const contactsList = useSelector(getContacts);

  const favoriteContactsList = useFavoriteContactsFilter(contactsList, search);
  const contactsListSlice = usePaginationSlice(
    favoriteContactsList,
    currentPage
  );

  function pageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function searchContact(e) {
    setSearch(e.target.value);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="home">
      <Input
        label=""
        id="search-id"
        type="search"
        placeholder="Search..."
        onChange={searchContact}
        value={search}
      />

      <List
        contactsList={contactsListSlice}
        openModal={openModal}
        changeEditedContact={changeEditedContact}
      />

      {favoriteContactsList?.length !== 0 && (
        <Pagination
          totalItems={favoriteContactsList?.length}
          itemsPerPage={CONTACT_PAGE_GET_COUNT}
          pageChange={pageChange}
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
