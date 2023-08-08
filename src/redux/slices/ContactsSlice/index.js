import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setAddContact: (state, action) => {
      state.contacts.push(action.payload);
    },
  },
});

export const { setContacts, setAddContact } = contactsSlice.actions;

export default contactsSlice.reducer;
