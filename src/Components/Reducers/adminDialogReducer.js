import { createSlice } from "@reduxjs/toolkit";

export const adminDialogSlice = createSlice({
  name: "auth",
  initialState: {
    currDialog: "",
    visible: false,
    targetUser: false,
  },
  reducers: {
    // Switch current dialog and toggle visibility
    toggleDialog: (state, action) => {
      state.currDialog = action.payload.currDialog;
      state.visible = action.payload.visible;
    },
    // Switch dialog with target user
    toggleDialogWithUser: (state, action) => {
      let { currDialog, visible, targetUser } = action.payload;
      state.currDialog = currDialog;
      state.visible = visible;
      state.targetUser = targetUser;
    },
  },
});

export const { toggleDialog, toggleDialogWithUser } = adminDialogSlice.actions;

export default adminDialogSlice.reducer;
