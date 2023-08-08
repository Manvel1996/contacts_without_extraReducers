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
    setAddGroup: (state, action) => {
      state.groups.push(action.payload);
    },
  },
});

export const { setGroups, setAddGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
