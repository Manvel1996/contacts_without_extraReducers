import { useDispatch } from "react-redux";

import { setIsLoading, setStatus } from "../redux/slices/App";

import { useAxios } from "./useAxios";

export function useAxiosGroups() {
  const dispatch = useDispatch();

  const { getUserById, putUser } = useAxios();

  async function addGroup(groupName) {
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
          contacts: data.contacts,
          groups: [...data.groups, groupName],
        };

        const success = await putUser(data?._id, newUser);

        if (success.status === 200) {
          dispatch(setStatus({ message: "Add group success" }));
        } else {
          dispatch(setStatus({ message: "Add group fail" }));
        }
      }
    } catch (error) {
      dispatch(setStatus(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return { addGroup };
}
