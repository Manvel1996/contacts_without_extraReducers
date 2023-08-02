import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// import {
//   addNewGroup,
//   authStatus,
//   getMe,
//   getUserId,
// } from "../redux/features/auth/AuthActions";

import {Input} from "../../UI";

import { textControl } from "../../../controllers";

import "./AddGroup.scss";

export default function AddGroup({ visible, closeModal }) {
  const [group, setGroup] = useState("");
  const [groupErr, setGroupErr] = useState(false);

  // const userId = useSelector(getUserId);
  // const statusState = useSelector(authStatus);
  const userId = 1;
  const statusState = "";

  const dispatch = useDispatch();

  useEffect(() => {
    if (statusState) {
      toast(statusState, { toastId: 1 });
      // dispatch(getMe());
    }

    setGroupErr(false);
  }, [visible]);

  function submit(e) {
    e.preventDefault();

    if (group?.length < 2 || group?.length > 20) {
      return setGroupErr(true);
    }

    const groupName = group.toUpperCase();

    // dispatch(addNewGroup({ groupName, userId }));

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
