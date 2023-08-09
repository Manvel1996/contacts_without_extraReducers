import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getStatus } from "../../../redux/slices/App/selector";
import { getUser } from "../../../redux/slices/Auth/selector";

import { Input, Select } from "../../UI";

import {
  AUTH_GENDER,
  AUTH_TOKEN,
  AUTH_DEFAULT_IMG,
  PHONE_START,
  VALID_EMAIL,
  VALID_PHONE,
  VALID_PHOTO_URL,
  INPUT_ERR,
} from "../../../Constants";

import {
  emailControl,
  passwordControl,
  phoneControl,
  photoUrlControl,
  textControl,
} from "../../../Utils/controller";

import { useAxiosAuth } from "../../../Hooks/useAxiosAuth";

import "./index.scss";

export default function AuthForm() {
  const [userName, setUserName] = useState("");
  const [userNameErr, setUserNameErr] = useState(false);

  const [surname, setSurname] = useState("");
  const [surnameErr, setSurnameErr] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const [phone, setPhone] = useState(PHONE_START);
  const [phoneErr, setPhoneErr] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordErr, setRepeatPasswordErr] = useState(false);

  const [photoUrl, setPhotoUrl] = useState("");
  const [photoUrlErr, setPhotoUrlErr] = useState(false);

  const [gender, setGender] = useState("");

  const user = useSelector(getUser);
  const status = useSelector(getStatus);

  const { getMe, editUser } = useAxiosAuth();

  useEffect(() => {
    if (user) {
      setUserName(user?.userName);
      setSurname(user?.surname);
      setEmail(user?.email);
      setPhone(user?.phone);
      setPhotoUrl(user?.photoUrl);
      setGender(user?.gender);
    } else if (localStorage.getItem(AUTH_TOKEN) && !user) {
      if (status) {
        toast(status, { toastId: 1 });
      }
      getMe();
    }
  }, [status, user]);

  function submit(e) {
    e.preventDefault();

    if (userName?.length < 2 || userName?.length > 20) {
      setUserNameErr(true);
    }

    if (surname?.length < 2 || surname?.length > 20) {
      setSurnameErr(true);
    }

    if (
      email?.length === 0 ||
      !VALID_EMAIL.test(email) ||
      email?.length >= 30
    ) {
      setEmailErr(true);
    }

    if (!VALID_PHONE.test(phone)) {
      setPhoneErr(true);
    }

    if (password?.length < 5) {
      setPasswordErr(true);
    }

    if (newPassword?.length > 0 && newPassword?.length < 5) {
      setPasswordErr(true);
    }

    if (newPassword !== repeatPassword) {
      setRepeatPasswordErr(true);
    }

    if (photoUrl?.length > 0 && !VALID_PHOTO_URL.test(photoUrl)) {
      setPhotoUrlErr(true);
    }

    if (
      userName?.length < 2 ||
      userName?.length > 20 ||
      surname?.length < 2 ||
      surname?.length > 20 ||
      email?.length === 0 ||
      !VALID_EMAIL.test(email) ||
      email?.length >= 30 ||
      !VALID_PHONE.test(phone) ||
      password?.length < 5 ||
      (newPassword?.length > 0 && newPassword?.length < 5) ||
      newPassword !== repeatPassword ||
      (photoUrl?.length > 0 && !VALID_PHOTO_URL.test(photoUrl))
    ) {
      return;
    }

    editUser({
      id: user?._id,
      userName,
      surname,
      email,
      phone,
      password,
      newPassword,
      photoUrl,
      gender,
      contacts: user?.contacts,
    });

    clearForm();
  }

  function clearForm() {
    setPhotoUrl("");
    setPhotoUrlErr(false);
    setUserName("");
    setUserNameErr(false);
    setSurname("");
    setSurnameErr(false);
    setEmail("");
    setEmailErr(false);
    setPhone(PHONE_START);
    setPhoneErr(false);
    setPassword("");
    setPasswordErr(false);
    setRepeatPassword("");
    setRepeatPasswordErr(false);
    setNewPassword("");
    setNewPasswordErr(false);
    setGender("");
  }

  return (
    <form onSubmit={submit} className="profile-form">
      <h1 className="profile-title">My profile</h1>

      <img
        className="profile-form__img"
        src={photoUrl ? photoUrl : AUTH_DEFAULT_IMG}
        alt="user"
      />

      <Input
        label="Photo URL"
        id="photo-url-id"
        type="text"
        placeholder="Photo URL"
        onChange={(e) => photoUrlControl(e, setPhotoUrl, setPhotoUrlErr)}
        value={photoUrl}
        err={photoUrlErr}
        errText={INPUT_ERR.PHOTO_URL}
      />

      <Input
        label="Name*"
        id="user-name-id"
        type="text"
        placeholder="Name"
        onChange={(e) => textControl(e, setUserName, setUserNameErr)}
        value={userName}
        err={userNameErr}
        errText={INPUT_ERR.TEXT}
      />

      <Input
        label="Surname*"
        id="surname-id"
        type="text"
        placeholder="Surname"
        onChange={(e) => textControl(e, setSurname, setSurnameErr)}
        value={surname}
        err={surnameErr}
        errText={INPUT_ERR.TEXT}
      />

      <Input
        label="Email*"
        id="email-id"
        type="email"
        placeholder="Email"
        onChange={(e) => emailControl(e, setEmail, setEmailErr)}
        value={email}
        err={emailErr}
        errText={INPUT_ERR.EMAIL}
      />

      <Input
        label="Phone*"
        id="phone-id"
        type="tel"
        placeholder="Phone"
        onChange={(e) => phoneControl(e, setPhone, setPhoneErr)}
        value={phone}
        err={phoneErr}
        errText={INPUT_ERR.PHONE}
      />

      <Input
        label="Password*"
        id="password-id"
        type="password"
        placeholder="Password"
        onChange={(e) => passwordControl(e, setPassword, setPasswordErr)}
        value={password}
        err={passwordErr}
        errText={INPUT_ERR.PASSWORD}
      />

      <Input
        label="New password"
        id="new-password-id"
        type="password"
        placeholder="New password"
        onChange={(e) => {
          if (e.target.value?.length > 0) {
            passwordControl(e, setNewPassword, setNewPasswordErr);
          } else {
            setNewPasswordErr(false);
          }
        }}
        value={newPassword}
        err={newPasswordErr}
        errText={INPUT_ERR.NEW_PASSWORD}
      />

      <Input
        label="Repeat new password*"
        id="repeat-password-id"
        type="password"
        placeholder="Repeat New password"
        onChange={(e) =>
          passwordControl(e, setRepeatPassword, setRepeatPasswordErr)
        }
        value={repeatPassword}
        err={repeatPasswordErr}
        errText={INPUT_ERR.REPEAT_PASSWORD}
      />

      <Select
        value={gender}
        onChangeSelect={(value) => setGender(value)}
        defaultValue="Gender"
        options={[AUTH_GENDER.OTHER, AUTH_GENDER.MALE, AUTH_GENDER.FEMALE]}
      />

      <div className="profile-form-buttons">
        <button type="submit" className="button button--green">
          {user ? "Save" : "Register"}
        </button>

        <button type="reset" className="button button--red" onClick={clearForm}>
          Reset
        </button>
      </div>
    </form>
  );
}
