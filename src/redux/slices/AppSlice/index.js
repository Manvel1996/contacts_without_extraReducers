import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: null,
  token: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setStatus: (state, action) => {
      state.status = action.payload?.message;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setIsLoading, setStatus, setToken } = appSlice.actions;

export default appSlice.reducer;
