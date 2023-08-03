import axios from "../utils/axios";

import { CURRENT_API } from "../constants";

export async function addContact({ newContact, userId }) {
  const { data } = await axios.get(CURRENT_API + "/" + userId);

  if (data) {
    const newUser = {
      userName: data.userName,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      photoUrl: data.photoUrl,
      gender: data.gender,
      contacts: [newContact, ...data.contacts],
      groups: data.groups,
    };

    const success = await axios.put(CURRENT_API + "/" + userId, newUser);
    if (success.status === 200) {
      return { message: "Add contact success" };
    }
  }

  return { message: "Add contact fail" };
}

export async function editContact({ newContact, userId }) {
  const { data } = await axios.get(CURRENT_API + "/" + userId);

  const contacts = data?.contacts?.map((el) => {
    if (el.id === newContact.id) {
      return newContact;
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

    const success = await axios.put(CURRENT_API + "/" + userId, newUser);

    if (success.status === 200) {
      return { message: "Edit contact success" };
    }
  }

  return { message: "Edit contact fail" };
}

export async function removeContact({ id, userId }) {
  const { data } = await axios.get(CURRENT_API + "/" + userId);

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

    const success = await axios.put(CURRENT_API + "/" + userId, newUser);

    if (success.status === 200) {
      return { message: "Remove contact success" };
    }
  }

  return { message: "Remove contact fail" };
}

export async function addNewGroup({ groupName, userId }) {
  const { data } = await axios.get(CURRENT_API + "/" + userId);

  if (data) {
    const newUser = {
      userName: data.userName,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      photoUrl: data.photoUrl,
      gender: data.gender,
      contacts: data.contacts,
      groups: [...data.groups, groupName],
    };

    const success = await axios.put(CURRENT_API + "/" + userId, newUser);

    if (success.status === 200) {
      return { message: "Add group success" };
    }
  }

  return { message: "Add group fail" };
}
