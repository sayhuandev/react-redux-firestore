import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth_role: "",
    auth_uid: "",
    auth_email: "",
    auth_user_det: {
      first_name: "",
      last_name: "",
      gender: "",
    },
  },
  reducers: {
    // Store auth data to redux store
    initAuth: (state, action) => {
      state.auth_role = action.payload.auth_role;
      state.auth_uid = action.payload.auth_uid;
      state.auth_email = action.payload.auth_email;
      state.auth_user_det = action.payload.auth_user_det;
    },
    // Logout and clear
    logoutAuth: (state, action) => {
      state.auth_role = "";
      state.auth_uid = "";
      state.auth_email = "";
      state.auth_user_det = {
        first_name: "",
        last_name: "",
        gender: "",
      };
      localStorage.clear();
    },
  },
});

export const { initAuth, logoutAuth } = authSlice.actions;

export default authSlice.reducer;
