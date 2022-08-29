import React from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AdminRoute from "./Routes/AdminRoute"
import UserRoute from "./Routes/UserRoute"

const loginPath = () => {
  if (localStorage.getItem("auth_token")) {
    if (localStorage.getItem("auth_role") === "admin") {
      return <Redirect to="/admin/dashboard" />;
    } else {
      return <Redirect to="/home" />;
    }
  } else {
    return <Login />;
  }
};

const registerPath = () => {
  if (localStorage.getItem("auth_token")) {
    if (localStorage.getItem("auth_role") === "admin") {
      return <Redirect to="/admin/dashboard" />;
    } else {
      return <Redirect to="/home" />;
    }
  } else {
    return <Register />;
  }
};

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={["/", "/login"]}>
            {loginPath}
          </Route>
          <Route exact path="/register">
            {registerPath}
          </Route>
          <AdminRoute path="/admin" name="Admin" />
          <UserRoute path="/" name="User" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
