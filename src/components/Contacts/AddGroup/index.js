import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getStatus } from "../../../redux/slices/App/Selector";

import { Input } from "../../UI";

import { textControl } from "../../../Utils/controller";

import { useAxiosAuth } from "../../../Hooks/useAxiosAuth";
import { useAxiosGroups } from "../../../Hooks/useAxiosGroups";

import "./index.scss";

export default function AddGroup({ closeModal }) {
  const [group, setGroup] = useState("");
  const [groupErr, setGroupErr] = useState(false);

  const statusState = useSelector(getStatus);

  const { getMe } = useAxiosAuth();
  const { addGroup } = useAxiosGroups();

  useEffect(() => {
    if (statusState) {
      toast(statusState, { toastId: 1 });
      getMe();
    }

    setGroupErr(false);
  }, [statusState]);

  function submit(e) {
    e.preventDefault();

    if (group?.length < 2 || group?.length > 20) {
      return setGroupErr(true);
    }

    const groupName = group.toUpperCase();

    addGroup(groupName);
    setGroup("");
    closeModal();
  }

  return (
    <form className="create-group">
      <Input
        label="New group"
        id="new-group-id"
        type="text"
        placeholder="New group"
        onChange={(e) => textControl(e, setGroup, setGroupErr)}
        value={group}
        err={groupErr}
        errText="The group must contain at least 2 characters and no more than 20"
      />

      <button type="submit" className="button button--green" onClick={submit}>
        Add group
      </button>
    </form>
  );
}
