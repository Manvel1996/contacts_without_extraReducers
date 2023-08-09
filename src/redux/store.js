import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/Auth";
import appReducer from "./slices/App";
import contactsReducer from "./slices/Contacts";
import groupsReducer from "./slices/Groups";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    contacts: contactsReducer,
    groups: groupsReducer,
  },
});
