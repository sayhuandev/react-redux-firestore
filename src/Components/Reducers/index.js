import React from "react";
import { combineReducers } from "redux";
import adminDialogReducer from "./adminDialogReducer";
import authReducer from "./authReducer";
import listReducer from "./listReducer";

const allReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  adminDialog: adminDialogReducer,
});

export default allReducer;
