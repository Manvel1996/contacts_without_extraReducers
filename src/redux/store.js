import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import appReducer from "./slices/app";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
});
