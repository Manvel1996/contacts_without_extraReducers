import { CONTACT_PAGE_GET_COUNT } from "../constants";

export default function usePaginationSlice(contactsList, currentPage) {
  const sliceStart = CONTACT_PAGE_GET_COUNT * (currentPage - 1);
  const contactsListSlice = contactsList?.slice(
    sliceStart,
    sliceStart + CONTACT_PAGE_GET_COUNT
  );
  return contactsListSlice
}
