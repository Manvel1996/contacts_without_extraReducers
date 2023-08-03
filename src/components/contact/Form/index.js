import React, { useEffect, useState } from "react";

import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Input, Select } from "../../UI";

import {
  emailControl,
  phoneControl,
  photoUrlControl,
  textControl,
} from "../../../controllers";

import {
  getContactsGroups,
  getStatus,
  getUserId,
} from "../../../redux/selector/auth";
import { setUser, setEditUser } from "../../../redux/slices/auth";

import { useFetching } from "../../../hooks";

import { getMe, addContact, editContact } from "../../../Api";

import {
  CONTACT_STATUS,
  CONTACT_GROUP,
  PHONE_START,
  AUTH_DEFAULT_IMG,
  VALID_EMAIL,
  VALID_PHONE,
  VALID_PHOTO_URL,
  INPUT_ERR,
} from "../../../constants";

import "./Form.scss";

export default function Form({ closeModal, editedContact, visible }) {
  const [userName, setUserName] = useState("");
  const [userNameErr, setUserNameErr] = useState(false);

  const [surname, setSurname] = useState("");
  const [surnameErr, setSurnameErr] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const [phone, setPhone] = useState(PHONE_START);
  const [phoneErr, setPhoneErr] = useState(false);

  const [photoUrl, setPhotoUrl] = useState("");
  const [photoUrlErr, setPhotoUrlErr] = useState(false);

  const [status, setStatus] = useState("");
  const [group, setGroup] = useState(CONTACT_GROUP.ALL);

  const userId = useSelector(getUserId);
  const statusState = useSelector(getStatus);
  const contactsGroups = useSelector(getContactsGroups);

  const dispatch = useDispatch();

  const newContact = {
    id: editedContact ? editedContact.id : uuid(),
    userName,
    surname,
    email,
    phone,
    photoUrl,
    status,
    group,
  };

  const userInfo = useFetching(async () => {
    const response = await getMe();
    dispatch(setUser(response));
  });

  const changeContact = useFetching(async () => {
    const response = editedContact
      ? await editContact({ newContact, userId })
      : await addContact({ newContact, userId });
    dispatch(setEditUser(response));
  });

  useEffect(() => {
    if (editedContact) {
      setUserName(editedContact.userName);
      setSurname(editedContact.surname);
      setEmail(editedContact.email);
      setPhone(editedContact.phone);
      setPhotoUrl(editedContact.photoUrl);
      setStatus(editedContact.status);
      setGroup(editedContact.group);

      if (
        editedContact?.userName?.length >= 2 &&
        editedContact?.userName?.length <= 20
      ) {
        setUserNameErr(false);
      }

      if (
        editedContact?.surname?.length >= 2 &&
        editedContact?.surname?.length <= 20
      ) {
        setSurnameErr(false);
      }

      if (
        editedContact?.email?.length > 0 &&
        VALID_EMAIL.test(email) &&
        email?.length < 30
      ) {
        setEmailErr(false);
      }

      if (VALID_PHONE.test(phone)) {
        setPhoneErr(false);
      }

      if (photoUrl?.length > 0 && VALID_PHOTO_URL.test(photoUrl)) {
        setPhotoUrlErr(false);
      }
    } else clearForm();

    if (statusState) {
      toast(statusState, { toastId: 1 });
      userInfo();
    }
  }, [visible]);

  function clearForm() {
    setUserName("");
    setUserNameErr(false);
    setSurname("");
    setSurnameErr(false);
    setEmail("");
    setEmailErr(false);
    setPhone(PHONE_START);
    setPhoneErr(false);
    setPhotoUrl("");
    setPhotoUrlErr(false);
    setStatus("");
    setGroup(CONTACT_GROUP.ALL);
  }

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
      (photoUrl?.length > 0 && !VALID_PHOTO_URL.test(photoUrl))
    )
      return;

    changeContact();
    clearForm();
    closeModal();
  }

  return (
    <form className="contact-form">
      <img
        className="contact-form__image"
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

      <div className="contact-form-selects">
        <Select
          value={status}
          onChangeSelect={(value) => setStatus(value)}
          defaultValue="STATUS"
          options={[CONTACT_STATUS.ONLINE, CONTACT_STATUS.OFFLINE]}
        />

        <Select
          value={group}
          onChangeSelect={(value) => setGroup(value)}
          defaultValue="GROUP"
          options={contactsGroups}
        />
      </div>

      <div className="contact-form-buttons">
        <button type="reset" className="button--red" onClick={clearForm}>
          Reset
        </button>

        <button type="submit" className="button--green" onClick={submit}>
          {editedContact ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}
