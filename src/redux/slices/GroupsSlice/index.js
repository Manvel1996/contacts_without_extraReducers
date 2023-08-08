import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const { setGroups } = groupsSlice.actions;

export default groupsSlice.reducer;
