export const VALID_EMAIL = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);

export const VALID_PHONE = new RegExp(
  "^[+]?[(]?[0-9]{3}[)]?[s]?[0-9]{2}[s]?[0-9]{3}[s]?[0-9]{3}$"
);

export const VALID_PHOTO_URL = new RegExp(
  "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
);
