import React from "react";

import { Input, Select } from "../../UI";

import "./Filter.scss";

export default function Filter({
  contactsGroups,
  group,
  search,
  setSearch,
  changeGroup,
}) {
  return (
    <div className="contacts-filter">
      <Input
        id="search-id"
        type="search"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <Select
        onChangeSelect={changeGroup}
        options={contactsGroups}
        value={group}
        defaultValue="GROUP"
      />
    </div>
  );
}
