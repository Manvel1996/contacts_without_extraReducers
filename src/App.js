import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";
import AppRouter from "./components/AppRouter";

import { AUTH_TOKEN } from "./constants";

import { getMe } from "./Api";

import { useFetching } from "./hooks";

import { setUser } from "./redux/slices/auth";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

export default function App() {
  const dispatch = useDispatch();

  const userInfo = useFetching(async () => {
    const response = await getMe();
    dispatch(setUser(response));
  });

  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN)) {
      userInfo();
    }
  }, [dispatch]);

  return (
    <Layout>
      <AppRouter />
      <ToastContainer position="bottom-right" autoClose={1000} />
    </Layout>
  );
}
