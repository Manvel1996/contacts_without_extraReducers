import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";

import { setIsLoading, setStatus, setToken } from "../redux/slices/App";
import { setUser } from "../redux/slices/Auth";
import { setContacts } from "../redux/slices/Contacts";
import { setGroups } from "../redux/slices/Groups";

import { AUTH_TOKEN, CONTACT_GROUP } from "../constants";

import { useAxios } from "./useAxios";

export function useAxiosAuth() {
  const dispatch = useDispatch();

  const { getUsers, getUserById, putUser, postUser } = useAxios();

  async function getMe() {
    try {
      dispatch(setIsLoading(true));
      const data = await getUserById();

      dispatch(setUser(data));
      dispatch(setToken(data?._id));
      dispatch(setStatus(null));
      dispatch(setContacts(data?.contacts));
      dispatch(setGroups(data?.groups));
    } catch (error) {
      dispatch(setStatus(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function register(newUser) {
    try {
      dispatch(setIsLoading(true));
      dispatch(setStatus(null));
      const data = await getUsers();

      let uniqueUser = [];

      if (data) {
        uniqueUser = data?.filter(
          (el) => el.phone === newUser.phone || el.email === newUser.email
        );
      }

      if (uniqueUser.length > 0) {
        dispatch(
          setStatus({
            message: "User with the same email or phone already exists",
          })
        );
      } else {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        const data = await postUser({
          userName: newUser.userName,
          surname: newUser.surname,
          email: newUser.email,
          phone: newUser.phone,
          password: hashedPassword,
          photoUrl: newUser.photoUrl,
          gender: newUser.gender,
          contacts: [],
          groups: [CONTACT_GROUP.ALL, CONTACT_GROUP.FAVORITE],
        });

        if (data?._id) {
          localStorage.setItem(AUTH_TOKEN, data._id);

          dispatch(setUser(data));
          dispatch(setToken(data?._id));
          dispatch(setStatus(`Welcome ${data?.userName}`));
          dispatch(setContacts(data?.contacts));
          dispatch(setGroups(data?.groups));
        }
      }
    } catch (error) {
      dispatch(setStatus(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function login(loginUser) {
    try {
      dispatch(setIsLoading(true));
      dispatch(setStatus(null));

      const data = await getUsers();

      const user = data?.filter(
        (el) =>
          el.phone === loginUser.mailOrPhone ||
          el.email === loginUser.mailOrPhone
      );

      if (user?.length > 0) {
        if (user[0]?._id) {
          const isPasswordCorrect = await bcrypt.compare(
            loginUser.password,
            user[0].password
          );

          if (isPasswordCorrect) {
            localStorage.setItem(AUTH_TOKEN, user[0]?._id);

            dispatch(setUser(user[0]));
            dispatch(setToken(user[0]?._id));
            dispatch(setStatus(`Welcome ${user[0]?.userName}`));
            dispatch(setContacts(user[0]?.contacts));
            dispatch(setGroups(user[0]?.groups));
          } else {
            dispatch(setStatus({ message: "Incorrect login or password" }));
          }
        }
      } else {
        dispatch(setStatus({ message: "PLease register" }));
      }
    } catch (error) {
      dispatch(setStatus(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function editUser(editedUser) {
    try {
      dispatch(setIsLoading(true));
      dispatch(setStatus(null));
      dispatch(setUser(null));

      const data = await getUserById();

      if (data) {
        const isPasswordCorrect = await bcrypt.compare(
          editedUser?.password,
          data.password
        );

        if (isPasswordCorrect) {
          let hashedPassword = null;
          if (editedUser?.newPassword.length > 0) {
            hashedPassword = await bcrypt.hash(editedUser?.newPassword, 10);
          }

          const success = await putUser(editedUser?.id, {
            userName: editedUser?.userName,
            surname: editedUser?.surname,
            email: editedUser?.email,
            phone: editedUser?.phone,
            password: hashedPassword ? hashedPassword : data.password,
            photoUrl: editedUser.photoUrl,
            gender: editedUser.gender,
            contacts: data.contacts,
            groups: data.groups,
          });

          if (success.status === 200) {
            dispatch(setStatus({ message: "Change user success" }));
          }
        } else {
          dispatch(setStatus({ message: "Change user fail" }));
        }
      }
    } catch (error) {
      dispatch(setStatus(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return { getMe, register, login, editUser };
}
