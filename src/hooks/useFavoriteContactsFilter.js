import { CONTACT_GROUP } from "../constants";

export default function useFavoriteContactsFilter(contactsList, search) {
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
