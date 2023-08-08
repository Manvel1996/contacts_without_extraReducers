import { CONTACT_GROUP, CONTACT_PAGE_GET_COUNT } from "../constants";

export function contactsFilter(contactsList, group, search) {
  if (group === CONTACT_GROUP.ALL && search.trim()?.length === 0) {
    return contactsList;
  }

  return contactsList?.filter((el) => {
    if (
      (el.group === group || group === CONTACT_GROUP.ALL) &&
      search.trim()?.length === 0
    ) {
      return true;
    } else if (
      (el.group === group || group === CONTACT_GROUP.ALL) &&
      search.trim()?.length > 0 &&
      (el.userName.toLowerCase().includes(search.trim().toLowerCase()) ||
        el.surname.toLowerCase().includes(search.trim().toLowerCase()) ||
        el.email.toLowerCase().includes(search.trim().toLowerCase()) ||
        el.phone.toLowerCase().includes(search.trim().toLowerCase()))
    ) {
      return true;
    }
    return false;
  });
}

export function favoriteContactsFilter(contactsList, search) {
  return contactsList.filter((el) => {
    if (
      el.group === CONTACT_GROUP.FAVORITE &&
      search.trim().toLowerCase()?.length === 0
    ) {
      return true;
    } else if (
      el.group === CONTACT_GROUP.FAVORITE &&
      search.trim().toLowerCase()?.length > 0 &&
      (el.userName.toLowerCase().includes(search.trim().toLowerCase()) ||
        el.surname.toLowerCase().includes(search.trim().toLowerCase()) ||
        el.email.toLowerCase().includes(search.trim().toLowerCase()) ||
        el.phone.toLowerCase().includes(search.trim().toLowerCase()))
    ) {
      return true;
    }
    return false;
  });
}

export  function paginationSlice(contactsList, currentPage) {
  const sliceStart = CONTACT_PAGE_GET_COUNT * (currentPage - 1);
  const contactsListSlice = contactsList?.slice(
    sliceStart,
    sliceStart + CONTACT_PAGE_GET_COUNT
  );
  return contactsListSlice;
}
