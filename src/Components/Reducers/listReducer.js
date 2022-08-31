import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import firebase from "../../Firebase";

export const listSlice = createSlice({
  name: "list",
  initialState: {
    users: [],
  },
  reducers: {
    initList: (state, action) => {
      let { list, type } = action.payload;
      state[type] = list;
    },
    addNewUser: (state, action) => {
      let userData = action.payload.newUserData;
      state.users = [...state.users, userData];
    },
    updateUser: (state, action) => {
      let userData = action.payload.latestUserData;
      state.users = state.users.map((u) =>
        u.auth_uid === userData.uid
          ? {
              ...u,
              auth_user_det: {
                first_name: userData.firstName,
                last_name: userData.lastName,
                gender: userData.gender,
              },
            }
          : u
      );
    },
    deleteUser: (state, action) => {
      let uid = action.payload.uid;
      state.users = state.users.filter((u) => u.auth_uid != uid);
    },
  },
});

export const { initList, addNewUser, updateUser, deleteUser } = listSlice.actions;

export default listSlice.reducer;
