import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  status: null,
  token: null,
  contacts: [],
  groups: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
      state.contacts = [];
      state.groups = [];
    },

    clearStatus: (state) => {
      state.status = null;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    setPending: (state) => {
      state.isLoading = true;
      state.status = null;
    },

    setError: (state, action) => {
      state.status = action.payload?.message;
      state.isLoading = false;
    },

    setUser: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload;
      state.token = action.payload?._id;
      state.contacts = action.payload?.contacts;
      state.groups = action.payload?.groups;
    },

    setNewUser: (state, action) => {
      state.isLoading = false;
      state.status = action.payload?._id
        ? `Welcome ${action.payload?.userName}`
        : action.payload?.message;
      state.token = action.payload?._id ? action.payload?._id : null;
      state.user = action.payload?._id ? action.payload : null;
      state.groups = action.payload?._id ? action.payload?.groups : [];
      state.contacts = [];
    },

    setEditUser: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.status = action.payload?.message;
    },
  },
});

export const {
  logOut,
  clearStatus,
  setIsLoading,
  setPending,
  setError,
  setStatus,
  setUser,
  setNewUser,
  setEditUser,
} = authSlice.actions;

export default authSlice.reducer;
