import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "./components/Layout";
import AppRouter from "./components/AppRouter";

import { AUTH_TOKEN, ROUTE } from "./constants";

import { getMe } from "./Api";

import { useFetching } from "./hooks";

import { getLoggedIn } from "./redux/selector/auth";
import { setUser } from "./redux/slices/auth";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuth = useSelector(getLoggedIn);
  const currentUrl = location.pathname;

  const userInfo = useFetching(async () => {
    const response = await getMe();
    dispatch(setUser(response));
  });

  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN)) {
      userInfo();
    }
  }, [userInfo]);

  useEffect(() => {
    if (
      isAuth &&
      (currentUrl === ROUTE.LOGIN || currentUrl === ROUTE.REGISTER)
    ) {
      navigate(ROUTE.HOME);
    }
  }, [currentUrl, isAuth, navigate]);

  return (
    <Layout>
      <AppRouter />
      <ToastContainer position="bottom-right" autoClose={1000} />
    </Layout>
  );
}
