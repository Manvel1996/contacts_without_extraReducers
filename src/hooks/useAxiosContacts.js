import { useDispatch } from "react-redux";

import { setIsLoading, setStatus } from "../redux/slices/AppSlice";

import { useAxios } from "./useAxios";

export function useAxiosContacts() {
  const dispatch = useDispatch();

  const { getUserById, putUser } = useAxios();

  async function addContact(contact) {
    try {
      dispatch(setIsLoading(true));
      dispatch(setStatus(null));

      const data = await getUserById();

      if (data) {
        const newUser = {
          userName: data.userName,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          password: data.password,
          photoUrl: data.photoUrl,
          gender: data.gender,
          contacts: [contact, ...data.contacts],
          groups: data.groups,
        };

        const success = await putUser(data?._id, newUser);

        if (success.status === 200) {
          dispatch(setStatus({ message: "Add contact success" }));
        } else {
          dispatch(setStatus({ message: "Add contact fail" }));
        }
      }
    } catch (error) {
      dispatch(setStatus(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function editContact(editedContact) {
    try {
      const data = await getUserById();

      const contacts = data?.contacts?.map((el) => {
        if (el.id === editedContact.id) {
          return editedContact;
        }
        return el;
      });

      if (contacts) {
        const newUser = {
          userName: data.userName,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          password: data.password,
          photoUrl: data.photoUrl,
          gender: data.gender,
          contacts,
          groups: data.groups,
        };

        const success = await putUser(data?._id, newUser);

        if (success.status === 200) {
          dispatch(setStatus({ message: "Edit contact success" }));
        } else {
          dispatch(setStatus({ message: "Edit contact fail" }));
        }
      }
    } catch (error) {
      dispatch(setStatus(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function removeContact(id) {
    try {
      const data = await getUserById();

      const contacts = data?.contacts?.filter((el) => el.id !== id);

      if (data) {
        const newUser = {
          userName: data.userName,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          password: data.password,
          photoUrl: data.photoUrl,
          gender: data.gender,
          contacts,
          groups: data.groups,
        };

        const success = await putUser(data?._id, newUser);

        if (success.status === 200) {
          dispatch(setStatus({ message: "Remove contact success" }));
        } else {
          dispatch(setStatus({ message: "Remove contact fail" }));
        }
      }
    } catch (error) {
      dispatch(setStatus(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return { addContact, editContact, removeContact };
}
