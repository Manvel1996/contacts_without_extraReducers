import React, { useEffect, useState } from "react";

import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {Input,Select} from "../../UI";

import {
  emailControl,
  phoneControl,
  photoUrlControl,
  textControl,
} from "../../../controllers";

// import {
//   addContact,
//   getUserId,
//   authStatus,
//   getMe,
//   editContact,
//   getContactsGroups,
// } from "../redux/features/auth/AuthActions";

import {
  CONTACT_STATUS,
  CONTACT_GROUP,
  PHONE_START,
  AUTH_DEFAULT_IMG
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

  // const userId = useSelector(getUserId);
  // const statusState = useSelector(authStatus);
  // const contactsGroups = useSelector(getContactsGroups);
  const userId = 1;
  const statusState = "";
  const contactsGroups = [];

  const dispatch = useDispatch();

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
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) &&
        email?.length < 30
      ) {
        setEmailErr(false);
      }

      if (
        /^[\+]?[(]?[0-9]{3}[)]?[\s]?[0-9]{2}[\s]?[0-9]{3}[\s]?[0-9]{3}$/.test(
          phone
        )
      ) {
        setPhoneErr(false);
      }

      if (
        photoUrl?.length > 0 &&
        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
          photoUrl
        )
      ) {
        setPhotoUrlErr(false);
      }
    } else clearForm();

    if (statusState) {
      toast(statusState, { toastId: 1 });
      // dispatch(getMe());
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
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) ||
      email?.length >= 30
    ) {
      setEmailErr(true);
    }

    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[\s]?[0-9]{2}[\s]?[0-9]{3}[\s]?[0-9]{3}$/.test(
        phone
      )
    ) {
      setPhoneErr(true);
    }

    if (
      photoUrl?.length > 0 &&
      !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
        photoUrl
      )
    ) {
      setPhotoUrlErr(true);
    }

    if (
      userName?.length < 2 ||
      userName?.length > 20 ||
      surname?.length < 2 ||
      surname?.length > 20 ||
      email?.length === 0 ||
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) ||
      email?.length >= 30 ||
      !/^[\+]?[(]?[0-9]{3}[)]?[\s]?[0-9]{2}[\s]?[0-9]{3}[\s]?[0-9]{3}$/.test(
        phone
      ) ||
      (photoUrl?.length > 0 &&
        !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
          photoUrl
        ))
    )
      return;

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

    // if (editedContact) {
    //   dispatch(editContact({ newContact, userId }));
    // } else {
    //   dispatch(addContact({ newContact, userId }));
    // }

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
        errText="The link should look like this https://photoUrl"
      />

      <Input
        label="Name*"
        id="user-name-id"
        type="text"
        placeholder="Name"
        onChange={(e) => textControl(e, setUserName, setUserNameErr)}
        value={userName}
        err={userNameErr}
        errText="The Name must contain at least 2 characters and no more than 20"
      />

      <Input
        label="Surname*"
        id="surname-id"
        type="text"
        placeholder="Surname"
        onChange={(e) => textControl(e, setSurname, setSurnameErr)}
        value={surname}
        err={surnameErr}
        errText="The Surname must contain at least 2 characters and no more than 20"
      />

      <Input
        label="Email*"
        id="email-id"
        type="email"
        placeholder="Email"
        onChange={(e) => emailControl(e, setEmail, setEmailErr)}
        value={email}
        err={emailErr}
        errText="Invalid email address or more than 30 characters"
      />

      <Input
        label="Phone*"
        id="phone-id"
        type="tel"
        placeholder="Phone"
        onChange={(e) => phoneControl(e, setPhone, setPhoneErr)}
        value={phone}
        err={phoneErr}
        errText={`Write this way ${PHONE_START} 44 444 444`}
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
