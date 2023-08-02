import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// import { checkIsAuth, loadingState } from "../redux/features/auth/AuthActions";

import { Loader } from "./UI";

import { privateRoutes, publishRoutes } from "../router";

import { ROUTE } from "../constants";

export default function AppRouter() {
  //   const isAuth = useSelector(checkIsAuth);
  //   const isLoading = useSelector(loadingState);
  const isAuth = true;
  const isLoading = false;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuth ? ROUTE.HOME : ROUTE.LOGIN} />}
      />

      {isAuth
        ? privateRoutes.map((rout) => (
            <Route
              key={rout.path}
              path={rout.path}
              element={<rout.element />}
            />
          ))
        : publishRoutes.map((rout) => (
            <Route
              key={rout.path}
              path={rout.path}
              element={<rout.element />}
            />
          ))}
    </Routes>
  );
}
