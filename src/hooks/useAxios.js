import instance from "axios";

import { AUTH_TOKEN, BASE_URL, CURRENT_API } from "../Constants";

const axios = instance.create({
  baseURL: BASE_URL,
  headers: { "content-type": "application/json; charset=utf-8" },
});

export function useAxios() {
  async function getUsers() {
    const { data } = await axios.get(CURRENT_API);
    return data;
  }

  async function getUserById() {
    const { data } = await axios.get(
      CURRENT_API + localStorage.getItem(AUTH_TOKEN)
    );

    return data;
  }

  async function putUser(id, user) {
    const data = await axios.put(CURRENT_API + id, user);

    return data;
  }

  async function postUser(user) {
    const { data } = await axios.post(CURRENT_API, user);

    return data;
  }

  return { getUsers, getUserById, putUser, postUser };
}
