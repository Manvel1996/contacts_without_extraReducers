import { VALID_EMAIL, VALID_PHONE, VALID_PHOTO_URL } from "../constants";

export function textControl(e, setText, setTextErr) {
  setText(e.target.value.trim());

  if (
    e.target.value.trim()?.length >= 2 &&
    e.target.value.trim()?.length <= 20
  ) {
    setTextErr(false);
  } else setTextErr(true);
}

export function emailControl(e, setEmail, setEmailErr) {
  setEmail(e.target.value.trim());

  if (
    VALID_EMAIL.test(e.target.value.trim()) &&
    e.target.value.trim()?.length < 30
  ) {
    setEmailErr(false);
  } else setEmailErr(true);
}

export function phoneControl(e, setPhone, setPhoneErr) {
  setPhone(e.target.value.trimLeft());

  if (VALID_PHONE.test(e.target.value.trimLeft())) {
    setPhoneErr(false);
  } else setPhoneErr(true);
}

export function photoUrlControl(e, setPhotoUrl, setPhotoUrlErr) {
  setPhotoUrl(e.target.value.trim());

  if (
    e.target.value.trim()?.length === 0 ||
    VALID_PHOTO_URL.test(e.target.value.trim())
  ) {
    setPhotoUrlErr(false);
  } else setPhotoUrlErr(true);
}

export function passwordControl(e, setPassword, setPasswordErr) {
  setPassword(e.target.value.trim());

  if (e.target.value.trim()?.length >= 5) {
    setPasswordErr(false);
  } else setPasswordErr(true);
}
