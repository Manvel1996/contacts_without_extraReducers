import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getStatus, getUserId } from "../../../redux/selector/auth";
import { setEditUser, setUser } from "../../../redux/slices/auth";

import { Input } from "../../UI";

import { textControl } from "../../../controllers";

import { useFetching } from "../../../hooks";

import { getMe, addNewGroup } from "../../../Api";

import "./AddGroup.scss";

export default function AddGroup({ visible, closeModal }) {
  const [group, setGroup] = useState("");
  const [groupErr, setGroupErr] = useState(false);

  const userId = useSelector(getUserId);
  const statusState = useSelector(getStatus);

  const dispatch = useDispatch();

  const groupName = group.toUpperCase();

  const userInfo = useFetching(async () => {
    const response = await getMe();
    dispatch(setUser(response));
  });

  const newGroup = useFetching(async () => {
    const response = await addNewGroup({ groupName, userId });
    dispatch(setEditUser(response));
  });

  useEffect(() => {
    if (statusState) {
      toast(statusState, { toastId: 1 });
      userInfo();
    }

    setGroupErr(false);
  }, [visible]);

  function submit(e) {
    e.preventDefault();

    if (group?.length < 2 || group?.length > 20) {
      return setGroupErr(true);
    }

    newGroup();
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
      <button type="submit" className="button--green" onClick={submit}>
        Add group
      </button>
    </form>
  );
}
