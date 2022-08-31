import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "list",
  initialState: {
    // design structure like this to allow new list added in the future
    users: [],
  },
  reducers: {
    // Init listing based on type
    initList: (state, action) => {
      let { list, type } = action.payload;
      state[type] = list;
    },
    // Add New User
    addNewUser: (state, action) => {
      let userData = action.payload.newUserData;
      state.users = [...state.users, userData];
    },
    // Update User
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
    // Delete User
    deleteUser: (state, action) => {
      let uid = action.payload.uid;
      state.users = state.users.filter((u) => u.auth_uid !== uid);
    },
  },
});

export const { initList, addNewUser, updateUser, deleteUser } = listSlice.actions;

export default listSlice.reducer;
