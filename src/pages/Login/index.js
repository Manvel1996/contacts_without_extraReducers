import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { setClearStatus, setLoginUser } from "../../redux/slices/auth";
import { getStatus } from "../../redux/selector/auth";

import { Input } from "../../components/UI";

import { INPUT_ERR, ROUTE } from "../../constants";

import { useFetching } from "../../hooks";

import { login } from "../../Api";

import "./Login.scss";

export default function Login() {
  const [mailOrPhone, setMailOrPhone] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);

  const dispatch = useDispatch();

  const status = useSelector(getStatus);

  const loginedUser = useFetching(async () => {
    const response = await login({
      mailOrPhone,
      password,
    });

    dispatch(setLoginUser(response));
  });

  useEffect(() => {
    if (status) {
      toast(status, { toastId: 1 });
      dispatch(setClearStatus());
    }
  }, [dispatch, status]);

  function submit(e) {
    e.preventDefault();

    if (mailOrPhone.trim().length < 2 || password.length < 5) {
      return setPasswordErr(true);
    }

    loginedUser();
    clearForm();
  }

  function clearForm() {
    setMailOrPhone("");
    setPassword("");
    setPasswordErr(false);
  }

  return (
    <div className="login">
      <form onSubmit={submit} className="login-form ">
        <h1 className="auth-title">Login</h1>

        <Input
          label="Phone or Email*"
          id="user-name-id"
          type="text"
          placeholder="Phone or Email"
          onChange={(e) => {
            setMailOrPhone(e.target.value);
            setPasswordErr(false);
          }}
          value={mailOrPhone}
        />

        <Input
          label="Password*"
          id="password-id"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordErr(false);
          }}
          value={password}
          err={passwordErr}
          errText={INPUT_ERR.LOGIN_ERR}
        />

        <div className="login-form-buttons">
          <button type="submit" className="button--green" onClick={submit}>
            Login
          </button>

          <button type="reset" className="button--red" onClick={clearForm}>
            Reset
          </button>
        </div>

        <Link to={ROUTE.REGISTER} className="form-link form-link--margin">
          Create new account ?
        </Link>
      </form>
    </div>
  );
}
