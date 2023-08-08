import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "./components/Layout";
import AppRouter from "./components/AppRouter";

import { AUTH_TOKEN, ROUTE } from "./constants";

import { useAxiosAuth } from "./Hooks/useAxiosAuth";

import { getLoggedIn } from "./redux/slices/AppSlice/appSelector";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

export default function App() {
  const navigate = useNavigate();
  const isAuth = useSelector(getLoggedIn);
  const location = useLocation();

  const currentUrl = location.pathname;

  const { getMe } = useAxiosAuth();

  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN)) {
      getMe();
    }
  }, []);

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
