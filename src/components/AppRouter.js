import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loader } from "./UI";

import { privateRoutes, publicRoutes } from "../Router";

import { ROUTE } from "../constants";

import {
  getLoggedIn,
  getLoadingState,
} from "../redux/slices/AppSlice/appSelector";

import { Error } from "../pages";

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
                  element={rout.element}
                />
              ))
            : publicRoutes.map((rout) => (
                <Route
                  key={rout.path}
                  path={rout.path}
                  element={rout.element}
                />
              ))}

          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </>
  );
}
