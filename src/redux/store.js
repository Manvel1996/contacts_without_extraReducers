import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/AuthSlice";
import appReducer from "./slices/AppSlice";
import contactsReducer from "./slices/ContactsSlice";
import groupsReducer from "./slices/GroupsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    contacts: contactsReducer,
    groups: groupsReducer,
  },
});
