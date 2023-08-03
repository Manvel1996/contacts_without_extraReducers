import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loader } from "./UI";

import { privateRoutes, publishRoutes } from "../router";

import { ROUTE } from "../constants";

import { getLoggedIn, getLoadingState } from "../redux/selector/auth";

export default function AppRouter() {
  const isAuth = useSelector(getLoggedIn);
  const isLoading = useSelector(getLoadingState);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
}
