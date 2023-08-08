import React from "react";

import "./index.scss";

export default function Error() {
  return (
    <div className="error-page">
      <img
        alt="err img"
        className="error-page__image--404"
        src={
          "https://681828296218-prod-staff.s3.eu-central-1.amazonaws.com/staff.am/images/background/404.png"
        }
      />

      <img
        alt="err img"
        className="error-page__image--robot"
        src={
          "https://681828296218-prod-staff.s3.eu-central-1.amazonaws.com/staff.am/images/background/robby-404.png"
        }
      />

      <h1 className="error-page__title">I have looked everywhere, it`s gone</h1>
    </div>
  );
}
