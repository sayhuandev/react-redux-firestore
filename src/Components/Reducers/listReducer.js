import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const fetchUserList = () => {
  return [
    { id: 1, name: "aaa" },
    { id: 2, name: "bbb" },
    { id: 3, name: "ccc" },
  ];
};

export const listSlice = createSlice({
  name: "list",
  initialState: {
    users: fetchUserList(),
  },
  reducers: {
    initList: (state, action) => {
      let { list, type } = action.payload;
      state[type] = list;
    },
    updateUserList: (state, action) => {
      let { uid, followStatus } = action.payload;
      state.users = state.users.map((u) => (u.id === uid ? { ...u, following: followStatus } : u));
    },
  },
});

export const { initList, updateUserList } = listSlice.actions;

export default listSlice.reducer;
