import bcrypt from "bcryptjs";

import axios from "../utils/axios";

import { CURRENT_API, AUTH_TOKEN, CONTACT_GROUP } from "../constants";

export async function getMe() {
  const { data } = await axios.get(
    CURRENT_API + "/" + localStorage.getItem(AUTH_TOKEN)
  );

  return data;
}

export async function register({
  userName,
  surname,
  email,
  phone,
  password,
  photoUrl,
  gender,
}) {
  const { data } = await axios.get(CURRENT_API);

  let uniqueUser = [];

  if (data) {
    uniqueUser = data?.filter((el) => el.phone === phone || el.email === email);
  }

  if (uniqueUser.length > 0) {
    return { message: "User with the same email or phone already exists" };
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data } = await axios.post(CURRENT_API, {
      userName,
      surname,
      email,
      phone,
      password: hashedPassword,
      photoUrl,
      gender,
      contacts: [],
      groups: [CONTACT_GROUP.ALL, CONTACT_GROUP.FAVORITE],
    });

    if (data._id) {
      localStorage.setItem(AUTH_TOKEN, data._id);
    }

    return data;
  }
}

export async function editUser({
  id,
  userName,
  surname,
  email,
  phone,
  password,
  newPassword,
  photoUrl,
  gender,
  contacts,
}) {
  const { data } = await axios.get(CURRENT_API + "/" + id);

  if (data) {
    const isPasswordCorrect = await bcrypt.compare(password, data.password);

    if (isPasswordCorrect) {
      let hashedPassword = null;
      if (newPassword.length > 0) {
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }

      await axios.put(
        CURRENT_API + "/" + id,
        {
          userName,
          surname,
          email,
          phone,
          password: hashedPassword ? hashedPassword : data.password,
          photoUrl,
          gender,
          contacts,
          groups: data.groups,
        },
      );

      return { message: "Change user success" };
    }

    return { message: "Change user fail" };
  } else {
    return {
      message: "Incorrect user",
    };
  }
}
