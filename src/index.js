import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./App.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import allReducer from "./Components/Reducers";

const store = configureStore({ reducer: allReducer });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
