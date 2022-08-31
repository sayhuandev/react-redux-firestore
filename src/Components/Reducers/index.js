import React from "react";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import listReducer from "./listReducer";

const allReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
});

export default allReducer;