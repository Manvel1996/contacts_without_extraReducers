import { CONTACT_GROUP } from "../constants";

export default function useContactsFilter(contactsList, group, search) {
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
