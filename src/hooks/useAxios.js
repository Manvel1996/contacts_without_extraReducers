import instance from "axios";

import { BASE_URL, CURRENT_API, AUTH_TOKEN, CONTACT_GROUP } from "../constants";

const axios = instance.create({
  baseURL: BASE_URL,
  headers: { "content-type": "application/json; charset=utf-8" },
});

export function useAxiosAuth(newUser, loginUser, editedUser) {
  async function getMe() {
    try {
      dispatch(setPending());
      const { data } = await axios.get(
        CURRENT_API + localStorage.getItem(AUTH_TOKEN)
      );

      dispatch(setUser(data));
    } catch (e) {
      dispatch(setError(e));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function register(
  //   {
  //   userName,
  //   surname,
  //   email,
  //   phone,
  //   password,
  //   photoUrl,
  //   gender,
  // }
  ) {
    try {
      dispatch(setPending());
      const { data } = await axios.get(CURRENT_API);

      let uniqueUser = [];

      if (data) {
        uniqueUser = data?.filter(
          (el) => el.phone === phone || el.email === email
        );
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
    } catch (e) {
      dispatch(setError(e));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return { getMe, register };
}
