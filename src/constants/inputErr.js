import { PHONE_START } from "./index";

export const INPUT_ERR = {
  TEXT: "The text must contain at least 2 characters and no more than 20",
  PHOTO_URL: "The link should look like this https://photoUrl",
  EMAIL: "Invalid email address or more than 30 characters",
  PHONE: `Write this way ${PHONE_START} 44 444 444`,
  PASSWORD: "The password must contain at least 5 characters",
  NEW_PASSWORD: "The new password must contain at least 5 characters",
  REPEAT_PASSWORD: "Password mismatch",
  LOGIN_ERR: "Incorrect login or password",
};
